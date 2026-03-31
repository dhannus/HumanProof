/**
 * HumanProof Browser Extension — Popup Script
 * PoC: Simulates ZKP-based Human Label generation.
 * No real identity data is used or transmitted.
 */

const LABEL_TTL_SECONDS = 3600; // 1 hour

// DOM references
const statusDot    = document.getElementById('statusDot');
const statusText   = document.getElementById('statusText');
const labelInfo    = document.getElementById('labelInfo');
const tokenPreview = document.getElementById('tokenPreview');
const tokenValue   = document.getElementById('tokenValue');
const expiresIn    = document.getElementById('expiresIn');
const verifyBtn    = document.getElementById('verifyBtn');
const revokeBtn    = document.getElementById('revokeBtn');

// ─── Initialise UI from stored state ─────────────────────────────────────────

chrome.storage.local.get(['humanLabel'], ({ humanLabel }) => {
  if (humanLabel && !isExpired(humanLabel)) {
    renderActive(humanLabel);
  } else if (humanLabel && isExpired(humanLabel)) {
    chrome.storage.local.remove('humanLabel');
    renderInactive();
  } else {
    renderInactive();
  }
});

// ─── Button handlers ──────────────────────────────────────────────────────────

verifyBtn.addEventListener('click', async () => {
  renderPending();

  // Simulate ZKP proof generation delay (real ZKP: ~200-800ms with snarkjs)
  await delay(1200);

  const label = generateSimulatedLabel();
  chrome.storage.local.set({ humanLabel: label });

  // Notify background service worker
  chrome.runtime.sendMessage({ type: 'LABEL_GENERATED', label });

  renderActive(label);
});

revokeBtn.addEventListener('click', () => {
  chrome.storage.local.remove('humanLabel');
  chrome.runtime.sendMessage({ type: 'LABEL_REVOKED' });
  renderInactive();
});

// ─── Simulated ZKP Label Generation (PoC) ────────────────────────────────────

/**
 * In the real implementation, this would:
 * 1. Load the ZKP circuit (circom/snarkjs)
 * 2. Supply the user's local credential as private input
 * 3. Generate a Groth16 or PLONK proof
 * 4. Return the proof as the label's cryptographic core
 *
 * For the PoC, we simulate the output format only.
 */
function generateSimulatedLabel() {
  const now = Math.floor(Date.now() / 1000);
  return {
    version:    '0.1',
    type:       'human-label',
    proof:      generateSimulatedProof(),
    issued_at:  now,
    ttl:        LABEL_TTL_SECONDS,
    expires_at: now + LABEL_TTL_SECONDS,
    scope:      'session',
    age_group:  null,
    poc:        true  // flag: this is a simulated proof
  };
}

function generateSimulatedProof() {
  // Simulated proof string — in production this is a real ZKP proof (~200 bytes)
  const chars = 'abcdef0123456789';
  return Array.from({ length: 64 }, () =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join('');
}

// ─── UI State Renderers ───────────────────────────────────────────────────────

function renderInactive() {
  statusDot.className = 'status-dot inactive';
  statusText.textContent = 'Not verified';
  labelInfo.style.display = 'none';
  tokenPreview.style.display = 'none';
  verifyBtn.style.display = 'block';
  verifyBtn.disabled = false;
  verifyBtn.textContent = '▶ Generate Human Label';
  revokeBtn.style.display = 'none';
}

function renderPending() {
  statusDot.className = 'status-dot pending';
  statusText.textContent = 'Generating proof…';
  verifyBtn.disabled = true;
  verifyBtn.textContent = '… Computing';
}

function renderActive(label) {
  statusDot.className = 'status-dot active';
  statusText.textContent = 'Human verified ✓';

  labelInfo.style.display = 'grid';
  tokenPreview.style.display = 'block';

  const secondsLeft = label.expires_at - Math.floor(Date.now() / 1000);
  expiresIn.textContent = formatDuration(secondsLeft);

  tokenValue.textContent = `hp0.1:${label.proof.substring(0, 32)}…`;

  verifyBtn.style.display = 'none';
  verifyBtn.disabled = false;
  revokeBtn.style.display = 'block';

  // Live countdown
  startCountdown(label);
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isExpired(label) {
  return Math.floor(Date.now() / 1000) >= label.expires_at;
}

function formatDuration(seconds) {
  if (seconds <= 0) return 'Expired';
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}s`;
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function startCountdown(label) {
  const interval = setInterval(() => {
    const secondsLeft = label.expires_at - Math.floor(Date.now() / 1000);
    if (secondsLeft <= 0) {
      clearInterval(interval);
      chrome.storage.local.remove('humanLabel');
      renderInactive();
      return;
    }
    expiresIn.textContent = formatDuration(secondsLeft);
  }, 1000);
}
