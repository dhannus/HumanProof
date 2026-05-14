# HHTTPS Threat Model

**Last updated**: May 2026
**Status**: Living document — updated as new threats are identified or mitigations are added

This document analyzes threats to HHTTPS users and the protocol itself.

---

## Assets we protect

| Asset | Owner | Why it matters |
|---|---|---|
| User identity (real name, email, ID) | User | Privacy harm if leaked |
| User role + trust score | User | Reputation harm if misrepresented |
| Pairwise subject IDs | User | Cross-platform tracking if linkable |
| Issuer signing keys | Issuer operator | Forged tokens if compromised |
| Issuer user database | Issuer operator | Mass deanonymization if leaked |
| Platform `client_secret` | Platform operator | Token impersonation if leaked |
| Signature records | Issuer | Repudiation if deleted/altered |

---

## Threat actors

### T1 — Casual scraper bot
**Capability**: Reads public web pages, extracts patterns
**Motivation**: Build a bot army that appears human

### T2 — Sophisticated AI operator
**Capability**: Creates user accounts with various verification methods, operates at scale, has budget
**Motivation**: Bypass platform restrictions on AI content

### T3 — Identity thief
**Capability**: Compromises individual user accounts via phishing, credential stuffing, device theft
**Motivation**: Impersonate target user

### T4 — Hostile state / surveillance authority
**Capability**: Legal compulsion, network observation, possibly infrastructure access
**Motivation**: Deanonymize political dissidents, journalists, whistleblowers

### T5 — Malicious platform operator
**Capability**: Operates a legitimate-looking platform that requests HHTTPS login
**Motivation**: Harvest pseudonyms, track users, phish credentials

### T6 — Compromised issuer
**Capability**: Has access to issuer's signing key and user database
**Motivation**: Issue fake tokens, deanonymize users

### T7 — Honest-but-curious researcher
**Capability**: Has authorized access to publicly available data
**Motivation**: De-anonymize via statistical analysis

---

## Threats and mitigations

### Token theft / replay

**Threat (T1, T3)**: Attacker harvests a HHTTPS access token from a network capture or scrape and re-uses it.

**Mitigations**:
- Tokens are not exposed in URLs or referer headers (always in body or `Authorization` header)
- Tokens have short TTLs (1h for native use, 5min for OAuth-issued)
- Tokens are revocable
- HTTPS is mandatory — no plaintext exposure
- Slug-based content signatures (Phase 2.5+) replaced earlier marker formats that embedded tokens directly

**Residual risk**: If an attacker has TLS interception (e.g. malware on the user's device), tokens can still be stolen. This is outside the protocol's threat model — the user's device must be trusted.

---

### Cross-platform user tracking

**Threat (T2, T5, T7)**: Two or more platforms collude to identify the same user across platforms.

**Mitigations**:
- Pairwise subject IDs computed as `HMAC(user_id + client_id, issuer-secret)`
- The HMAC is one-way; platforms cannot reverse-engineer the original `user_id`
- Per-platform IDs are deterministic per-user-per-platform but uncorrelated across platforms
- The `issuer-secret` is held only by the issuer; even if a platform was compromised, the secret is not exposed

**Residual risk**:
- A determined attacker correlating writing styles, posting times, IP addresses (from non-HHTTPS sources), etc. could de-anonymize users via side-channels
- Multiple users sharing a device (same passkey/device) appear as one user — not a protocol flaw but worth noting

---

### Phishing platform

**Threat (T5)**: Attacker registers a HHTTPS client called e.g. `secure-banking-login` and tricks users into approving access.

**Mitigations**:
- Unverified platforms get a red "⚠ Not verified" banner on the consent screen
- The consent screen shows the platform's homepage URL prominently
- Users are warned to verify the URL matches the expected domain
- Verified platforms (after manual admin review) get a green checkmark
- Platforms with confusingly similar names to known platforms (e.g. typo squatting) can be reported and removed

**Residual risk**: Users who ignore warnings are still vulnerable. Education matters. Defense in depth via the browser extension auto-suggesting trusted platforms (Phase 3c).

---

### Issuer compromise / mass deanonymization

**Threat (T6)**: Issuer's user database is leaked. All pseudonyms become linkable to real identities.

**Mitigations**:
- Issuer stores minimum necessary PII (no addresses, no behavioral data)
- Database encryption at rest
- Pairwise IDs are HMAC-derived; with `issuer-secret` rotation, future tokens use new pseudonyms
- Open-source code allows external security audit

**Residual risk**: This is the **core trust assumption** of the JWT-based design and the reason ZKP migration is on the roadmap. Until ZKP is in place, users must trust their chosen issuer. We document this honestly rather than hiding it.

**Mitigation strategy if compromise detected**:
1. Public disclosure within 72 hours
2. Mass token revocation
3. Rotation of `issuer-secret` (breaks linkability of past pseudonyms to future tokens)
4. Forced re-registration for all affected users
5. Possible federation registry update to mark issuer as compromised

---

### Forged tokens

**Threat (T6, advanced T2)**: Attacker mints fake tokens claiming to be from a legitimate issuer.

**Mitigations**:
- Tokens signed with ES256 (256-bit ECDSA, computationally infeasible to forge without private key)
- Private keys stored encrypted, loaded only into memory
- Public verification via JWKS endpoint — platforms can verify locally without issuer roundtrip
- Key rotation on schedule and on suspected compromise

**Residual risk**: Quantum computers will eventually break ECDSA. Migration path to post-quantum signatures (Dilithium, etc.) on roadmap for ~2030.

---

### Signature theft (content)

**Threat (T1, T2)**: Bot copies a `#hhttps:s:hp-XXX-XXX-XXX` marker from one site and re-posts elsewhere.

**Mitigations**:
- Signatures are bound to the apex domain at creation time
- Verification with mismatched domain returns "wrong-domain" status
- Same-domain re-posting is detectable via `first_seen_domain` field
- For strict use cases, `document` binding adds byte-exact text hashing

**Residual risk**: Same-platform plagiarism (e.g. someone copies a verified Reddit comment and re-posts on Reddit) appears valid in alpha mode by design. Plagiarism detection is platform-level.

---

### Sybil attacks

**Threat (T2)**: Attacker creates many HHTTPS identities to bypass platform-level user limits.

**Mitigations**:
- Each identity requires a passkey + verification
- Higher-trust roles (`developer`, `medical_professional`) require third-party verification (ORCID, GitHub org membership, etc.)
- Cost-of-attack scales with desired trust level
- Platforms can require minimum trust scores for sensitive actions

**Residual risk**:
- Low-trust roles (`citizen` with self-declared verification) are cheap to mint
- This is intentional — HHTTPS is not designed to prevent all Sybil attacks, just to make AI bot armies expensive
- Determined attackers can still mint identities; the cost is the bottleneck

---

### Legal compulsion / state surveillance

**Threat (T4)**: Government compels issuer to reveal user identity behind a pseudonym.

**Mitigations**:
- Issuer should have a documented legal process for handling such requests
- Issuer should publish a transparency report on requests received
- Strong jurisdictional choice (the German operator of hhttps.org is bound by German law and EU data protection)
- Trustee model on roadmap: lawful deanonymization only via court-supervised independent trustee, never directly by issuer or state

**Residual risk**: This is the strongest argument for ZKP migration — to remove the issuer's ability to deanonymize entirely. Until then, jurisdiction and policy are the defense.

---

### Platform impersonation in OAuth

**Threat (T2, T5)**: Attacker creates a malicious site that mimics a verified platform's consent flow.

**Mitigations**:
- OAuth redirect_uri is exact-match (not pattern-match)
- `state` parameter prevents CSRF
- PKCE prevents code interception
- Platforms registered with their actual domain; an attacker cannot register `gehackt-amazon.de` as `amazon.de`

**Residual risk**: Users still need to check the URL on the consent screen. Visual cues (verified badge, homepage URL displayed) help.

---

## Out of scope

The following are NOT addressed by the HHTTPS protocol:

- **Endpoint compromise**: If the user's device is compromised, tokens can be stolen. Use device security.
- **Social engineering**: Tricking users into giving consent to malicious platforms.
- **Platform-side data harvesting**: Once a user is logged in, the platform decides what to do with the user's content.
- **Off-protocol identification**: Writing style, posting times, IP from non-HHTTPS sources, etc.
- **Bot detection beyond identity**: HHTTPS proves a token came from an authenticated user; whether that user is *currently* behaving like a bot is a separate problem.

---

## Reporting security issues

If you discover a security vulnerability in HHTTPS:

**Do not open a public GitHub issue.**

Email [info@iamhmn.org](mailto:info@iamhmn.org) with subject line `[SECURITY] HHTTPS vulnerability`.

You will receive an acknowledgment within 72 hours. Disclosure follows responsible disclosure principles:

1. Acknowledge receipt within 72 hours
2. Investigate and confirm within 14 days
3. Develop a fix within 30 days for critical issues, 90 days for less severe
4. Public disclosure coordinated with you, typically 90 days after fix is deployed

We do not currently have a bug bounty, but security researchers are credited in our `SECURITY.md` and in release notes.

---

## Last security audit

No formal external audit has been performed yet. This is a known gap. We are seeking funding for an audit by an established firm (e.g. Cure53, NCC Group, Cryptography Engineering LLC) in 2026 Q4.

In the meantime: the code is open source, scrutiny welcome.
