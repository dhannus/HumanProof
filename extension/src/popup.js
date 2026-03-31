/**
 * HumanProof — popup.js
 * Runs inside the browser extension popup.
 * Guards all chrome.* calls so errors are clear if run outside extension context.
 */

'use strict';

const TTL = 3600; // seconds

// ── DOM ──────────────────────────────────────────────────────────────────────
const dot         = document.getElementById('dot');
const statusText  = document.getElementById('statusText');
const metaGrid    = document.getElementById('metaGrid');
const tokenBox    = document.getElementById('tokenBox');
const tokenPrev   = document.getElementById('tokenPreview');
const expiresIn   = document.getElementById('expiresIn');
const btnVerify   = document.getElementById('btnVerify');
const btnRevoke   = document.getElementById('btnRevoke');

// ── Sanity check ─────────────────────────────────────────────────────────────
if (typeof chrome === 'undefined' || !chrome.storage) {
  statusText.textContent = 'Error: not running as extension';
  dot.className = 'dot dot-inactive';
  btnVerify.disabled = true;
  throw new Error(
    'HumanProof popup must run inside a browser extension context. ' +
    'Load via chrome://extensions → Load unpacked.'
  );
}

// ── Boot: restore state from storage ─────────────────────────────────────────
chrome.storage.local.get('humanLabel', ({ humanLabel }) => {
  if (humanLabel && !isExpired(humanLabel)) {
    renderActive(humanLabel);
  } else {
    if (humanLabel) chrome.storage.local.remove('humanLabel');
    renderInactive();
  }
});

// ── Button handlers ───────────────────────────────────────────────────────────
btnVerify.addEventListener('click', async () => {
  renderPending();

  // Simulate ZKP proof generation latency (~200–800 ms in real snarkjs)
  await sleep(1300);

  const label = createLabel();

  chrome.storage.local.set({ humanLabel: label }, () => {
    // Notify background service worker so it can update the badge
    chrome.runtime.sendMessage({ type: 'LABEL_GENERATED', label })
      .catch(() => {}); // background may not be listening yet in PoC — that's fine
    renderActive(label);
  });
});

btnRevoke.addEventListener('click', () => {
  chrome.storage.local.remove('humanLabel', () => {
    chrome.runtime.sendMessage({ type: 'LABEL_REVOKED' }).catch(() => {});
    renderInactive();
  });
});

// ── Label generation (simulated ZKP) ─────────────────────────────────────────
/**
 * In production this would:
 *   1. Load a compiled circom/snarkjs circuit
 *   2. Feed the user's eIDAS 2.0 wallet credential as private input
 *   3. Compute a Groth16 proof (~200–500 ms)
 *   4. Return the proof bytes as the label's cryptographic core
 *
 * For the PoC we simulate the output structure only.
 */
function createLabel() {
  const now = Math.floor(Date.now() / 1000);
  return {
    version:    '0.1',
    type:       'human-label',
    proof:      randomHex(64),   // simulated — not a real ZKP proof
    issued_at:  now,
    ttl:        TTL,
    expires_at: now + TTL,
    scope:      'session',
    age_group:  null,
    poc:        true
  };
}

function randomHex(length) {
  const chars = '0123456789abcdef';
  return Array.from({ length }, () => chars[Math.floor(Math.random() * 16)]).join('');
}

// ── UI renderers ──────────────────────────────────────────────────────────────
function renderInactive() {
  dot.className = 'dot dot-inactive';
  statusText.textContent = 'Not verified';
  metaGrid.classList.add('hidden');
  tokenBox.classList.add('hidden');
  btnVerify.classList.remove('hidden');
  btnVerify.disabled = false;
  btnVerify.textContent = '▶ Generate Human Label';
  btnRevoke.classList.add('hidden');
  stopCountdown();
}

function renderPending() {
  dot.className = 'dot dot-pending';
  statusText.textContent = 'Generating proof…';
  btnVerify.disabled = true;
  btnVerify.textContent = '… Computing ZKP';
}

function renderActive(label) {
  dot.className = 'dot dot-active';
  statusText.textContent = 'Human verified ✓';

  metaGrid.classList.remove('hidden');
  tokenBox.classList.remove('hidden');
  tokenPrev.textContent = `hp0.1:${label.proof.slice(0, 28)}…`;

  btnVerify.classList.add('hidden');
  btnRevoke.classList.remove('hidden');

  startCountdown(label);
}

// ── Countdown ─────────────────────────────────────────────────────────────────
let _countdownInterval = null;

function startCountdown(label) {
  stopCountdown();
  tick();
  _countdownInterval = setInterval(tick, 1000);

  function tick() {
    const remaining = label.expires_at - Math.floor(Date.now() / 1000);
    if (remaining <= 0) {
      stopCountdown();
      chrome.storage.local.remove('humanLabel');
      renderInactive();
      return;
    }
    const m = Math.floor(remaining / 60).toString().padStart(2, '0');
    const s = (remaining % 60).toString().padStart(2, '0');
    expiresIn.textContent = `${m}:${s}`;
  }
}

function stopCountdown() {
  if (_countdownInterval) {
    clearInterval(_countdownInterval);
    _countdownInterval = null;
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function isExpired(label) {
  return !label.expires_at || Math.floor(Date.now() / 1000) >= label.expires_at;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
