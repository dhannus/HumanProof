/**
 * HumanProof — content.js
 *
 * Injected into every page. Checks if the page declares HumanProof support
 * via a meta tag and optionally shows a non-intrusive banner.
 *
 * Integration signal (add to your site's <head>):
 *   <meta name="humanproof" content="required">   ← blocks without label
 *   <meta name="humanproof" content="optional">   ← informs but does not block
 */

'use strict';

(function () {

  // Only act if the page opts in
  const meta = document.querySelector('meta[name="humanproof"]');
  if (!meta) return;

  const mode = meta.getAttribute('content'); // 'required' | 'optional'
  if (mode !== 'required' && mode !== 'optional') return;

  // Ask the background service worker whether a label is currently active
  chrome.runtime.sendMessage({ type: 'GET_STATUS' }, (response) => {

    // Extension may have been reloaded — guard against missing runtime
    if (chrome.runtime.lastError) return;
    if (!response) return;

    const hasLabel = response.active;

    if (!hasLabel) {
      showBanner(mode);
    }
    // If label exists: nothing to display — label is visible in the popup badge
  });

  // ── Banner ──────────────────────────────────────────────────────────────────
  function showBanner(mode) {
    if (document.getElementById('hp-banner')) return;

    const isRequired = mode === 'required';
    const color = isRequired ? '#ff6b2b' : '#c6ff00';
    const bg    = isRequired ? '#1a0800' : '#0a0f0a';

    const banner = document.createElement('div');
    banner.id = 'hp-banner';

    Object.assign(banner.style, {
      position:       'fixed',
      top:            '0',
      left:           '0',
      right:          '0',
      zIndex:         '2147483647',
      background:     bg,
      borderBottom:   `1px solid ${color}`,
      color:          color,
      fontFamily:     'monospace',
      fontSize:       '11px',
      padding:        '7px 16px',
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'space-between',
      letterSpacing:  '0.03em',
    });

    const icon = isRequired ? '⚠' : 'ℹ';
    const msg  = isRequired
      ? 'This site requires a HumanProof label to interact. Click the extension icon.'
      : 'This site supports HumanProof. Click the extension icon to generate a label.';

    banner.innerHTML = `
      <span>${icon}&nbsp; ${msg}</span>
      <span id="hp-close" style="cursor:pointer;opacity:0.55;padding-left:16px;font-size:13px;">✕</span>
    `;

    document.documentElement.insertBefore(banner, document.documentElement.firstChild);

    document.getElementById('hp-close')?.addEventListener('click', () => {
      banner.remove();
    }, { once: true });
  }

})();
