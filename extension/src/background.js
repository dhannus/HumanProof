/**
 * HumanProof Browser Extension — Background Service Worker
 *
 * Responsibilities:
 * - Listens for label generation / revocation events from popup
 * - Injects Human Label into outgoing HTTP request headers (opt-in sites)
 * - Manages label expiry via alarms
 * - Maintains no persistent personal data
 */

// ─── State ────────────────────────────────────────────────────────────────────

let currentLabel = null;

// Restore label from storage on startup
chrome.storage.local.get(['humanLabel'], ({ humanLabel }) => {
  if (humanLabel && isValid(humanLabel)) {
    currentLabel = humanLabel;
    scheduleExpiry(humanLabel);
    updateIcon('active');
  } else {
    updateIcon('inactive');
  }
});

// ─── Message handling ─────────────────────────────────────────────────────────

chrome.runtime.onMessage.addListener((message) => {
  switch (message.type) {
    case 'LABEL_GENERATED':
      currentLabel = message.label;
      scheduleExpiry(message.label);
      updateIcon('active');
      break;

    case 'LABEL_REVOKED':
      currentLabel = null;
      chrome.alarms.clear('labelExpiry');
      updateIcon('inactive');
      break;

    case 'GET_LABEL':
      return currentLabel;
  }
});

// ─── HTTP Header Injection ────────────────────────────────────────────────────

/**
 * Injects the Human Label as a custom HTTP header on all outgoing requests.
 *
 * In production, this would only apply to sites that have registered
 * as HumanProof-compatible platforms.
 *
 * For the PoC, we attach to all requests so the label is demonstrable.
 * The header is: X-HumanProof-Label: <base64 encoded label>
 */
chrome.webRequest.onBeforeSendHeaders.addListener(
  (details) => {
    if (!currentLabel || !isValid(currentLabel)) {
      return {};
    }

    const encodedLabel = btoa(JSON.stringify(currentLabel));

    const headers = details.requestHeaders || [];
    headers.push({
      name: 'X-HumanProof-Label',
      value: encodedLabel
    });
    headers.push({
      name: 'X-HumanProof-Version',
      value: '0.1'
    });

    return { requestHeaders: headers };
  },
  { urls: ['<all_urls>'] },
  ['blocking', 'requestHeaders']
);

// ─── Label Expiry ─────────────────────────────────────────────────────────────

function scheduleExpiry(label) {
  chrome.alarms.clear('labelExpiry');
  const msUntilExpiry = (label.expires_at * 1000) - Date.now();
  if (msUntilExpiry > 0) {
    chrome.alarms.create('labelExpiry', { when: Date.now() + msUntilExpiry });
  }
}

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'labelExpiry') {
    currentLabel = null;
    chrome.storage.local.remove('humanLabel');
    updateIcon('inactive');
  }
});

// ─── Icon State ───────────────────────────────────────────────────────────────

function updateIcon(state) {
  // In a real extension, swap between icon sets (active/inactive PNGs)
  // For PoC, we use the badge text as a simple indicator
  if (state === 'active') {
    chrome.action.setBadgeText({ text: '✓' });
    chrome.action.setBadgeBackgroundColor({ color: '#c6ff00' });
  } else {
    chrome.action.setBadgeText({ text: '' });
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isValid(label) {
  return label && Math.floor(Date.now() / 1000) < label.expires_at;
}
