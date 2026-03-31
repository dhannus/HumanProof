/**
 * HumanProof — background.js (Service Worker, Manifest V3)
 *
 * NOTE on HTTP header injection:
 * Manifest V3 removed support for blocking webRequest.
 * Real header injection (X-HumanProof-Label) requires the
 * declarativeNetRequest API with dynamic rules — planned for Phase 2.
 *
 * This service worker currently handles:
 *   - Badge icon updates (active / inactive)
 *   - Label expiry via chrome.alarms
 *   - State synchronisation with the popup
 */

'use strict';

// ── Restore state on service worker startup ───────────────────────────────────
// Service workers are terminated and restarted by the browser,
// so we always re-read state from storage on wake-up.
chrome.storage.local.get('humanLabel', ({ humanLabel }) => {
  if (humanLabel && isValid(humanLabel)) {
    setBadge('active');
    scheduleExpiry(humanLabel);
  } else {
    chrome.storage.local.remove('humanLabel');
    setBadge('inactive');
  }
});

// ── Message handling ──────────────────────────────────────────────────────────
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  switch (message.type) {

    case 'LABEL_GENERATED':
      setBadge('active');
      scheduleExpiry(message.label);
      sendResponse({ ok: true });
      break;

    case 'LABEL_REVOKED':
      chrome.storage.local.remove('humanLabel');
      chrome.alarms.clear('labelExpiry');
      setBadge('inactive');
      sendResponse({ ok: true });
      break;

    case 'GET_STATUS':
      chrome.storage.local.get('humanLabel', ({ humanLabel }) => {
        sendResponse({
          active: !!(humanLabel && isValid(humanLabel)),
          label: humanLabel || null
        });
      });
      return true; // keep message channel open for async sendResponse

    default:
      break;
  }
});

// ── Alarm: label expiry ────────────────────────────────────────────────────────
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'labelExpiry') {
    chrome.storage.local.remove('humanLabel');
    setBadge('inactive');
  }
});

function scheduleExpiry(label) {
  chrome.alarms.clear('labelExpiry', () => {
    const msUntilExpiry = label.expires_at * 1000 - Date.now();
    if (msUntilExpiry > 0) {
      chrome.alarms.create('labelExpiry', { when: Date.now() + msUntilExpiry });
    }
  });
}

// ── Badge helper ──────────────────────────────────────────────────────────────
function setBadge(state) {
  if (state === 'active') {
    chrome.action.setBadgeText({ text: '✓' });
    chrome.action.setBadgeBackgroundColor({ color: '#c6ff00' });
    chrome.action.setBadgeTextColor({ color: '#0d0f0a' });
  } else {
    chrome.action.setBadgeText({ text: '' });
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function isValid(label) {
  return label &&
    label.expires_at &&
    Math.floor(Date.now() / 1000) < label.expires_at;
}
