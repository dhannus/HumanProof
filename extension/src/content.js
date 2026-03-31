/**
 * HumanProof Browser Extension — Content Script
 *
 * Injected into every page. Responsibilities:
 * - Detects if a page supports HumanProof verification
 * - Shows a subtle indicator if the current site requests a Human Label
 * - Communicates page-side verification requests to the background worker
 *
 * NOTE: This script has no access to the Human Label itself.
 * Label injection happens in background.js at the HTTP header level.
 */

(function () {
  'use strict';

  // Check if this page signals HumanProof support via a meta tag:
  // <meta name="humanproof" content="required|optional">
  const metaTag = document.querySelector('meta[name="humanproof"]');

  if (!metaTag) return; // Site does not participate — do nothing

  const requirement = metaTag.getAttribute('content'); // 'required' | 'optional'

  if (!['required', 'optional'].includes(requirement)) return;

  // Query background for current label status
  chrome.runtime.sendMessage({ type: 'GET_LABEL' }, (label) => {
    if (chrome.runtime.lastError) return;

    if (!label && requirement === 'required') {
      showBanner('required');
    } else if (!label && requirement === 'optional') {
      showBanner('optional');
    }
    // If label exists: nothing to show — header is already being sent
  });

  /**
   * Renders a small, non-intrusive banner at the top of the page
   * informing the user that the site supports/requires HumanProof.
   */
  function showBanner(type) {
    if (document.getElementById('humanproof-banner')) return;

    const banner = document.createElement('div');
    banner.id = 'humanproof-banner';

    const isRequired = type === 'required';

    Object.assign(banner.style, {
      position:       'fixed',
      top:            '0',
      left:           '0',
      right:          '0',
      zIndex:         '2147483647',
      background:     isRequired ? '#1a0a00' : '#0a0f0a',
      borderBottom:   `1px solid ${isRequired ? '#ff6b2b' : '#c6ff00'}`,
      color:          isRequired ? '#ff6b2b' : '#c6ff00',
      fontFamily:     'monospace',
      fontSize:       '11px',
      padding:        '6px 16px',
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'space-between',
      letterSpacing:  '0.04em',
    });

    banner.innerHTML = `
      <span>
        ${isRequired ? '⚠' : 'ℹ'} This site ${isRequired ? 'requires' : 'supports'} HumanProof verification.
        ${isRequired ? 'A Human Label is needed to interact.' : ''}
      </span>
      <span style="cursor:pointer;opacity:0.6" id="hp-dismiss">✕</span>
    `;

    document.documentElement.prepend(banner);

    document.getElementById('hp-dismiss')?.addEventListener('click', () => {
      banner.remove();
    });
  }
})();
