# Security Policy

## Reporting a vulnerability

If you discover a security vulnerability in HHTTPS, please report it responsibly.

**Do not open a public GitHub issue.**

Email: [info@iamhmn.org](mailto:info@iamhmn.org)
Subject: `[SECURITY] HHTTPS vulnerability`

Please include:

- Description of the vulnerability
- Steps to reproduce
- Affected components (issuer, extension, OAuth flow, etc.)
- Suggested fix if you have one
- Whether you'd like to be credited in the disclosure

## What to expect

- **Acknowledgment within 72 hours** of receipt
- **Initial assessment within 14 days** — is it confirmed, what's the severity, what's the rough remediation plan
- **Fix timeline depends on severity**:
  - Critical (token forgery, mass deanonymization, RCE): 30 days
  - High (auth bypass, privacy leak in single user): 60 days
  - Medium (information disclosure, DoS): 90 days
  - Low (best-practice deviations): next regular release
- **Public disclosure**: coordinated with reporter, typically 90 days after fix is deployed, unless the vulnerability is being actively exploited

## Scope

In scope for vulnerability reports:

- Issuer server code (`server/`)
- Browser extension (`extension/`)
- Reference OAuth client examples (`examples/`)
- Protocol specifications (`protocol/`)
- The live hhttps.org service

Out of scope (please don't test against these):

- Other people's identities or accounts
- Third-party platforms using HHTTPS (report to that platform's security team)
- iamhmn.org marketing site (low-stakes static content)
- ask.iamhmn.org demo platform — report there only if it affects HHTTPS protocol itself

## What we consider a security issue

**Yes**:
- Token forgery, signature bypass
- Auth flow vulnerabilities (CSRF, redirect attacks, code interception)
- Privacy leaks (PII exposure, cross-platform correlation possible)
- Cryptographic weaknesses
- Denial of service that's easy to trigger
- Privilege escalation
- Issuer key extraction paths

**No**:
- Best practice violations without a concrete exploit
- Vulnerabilities in dependencies (report upstream, but tell us so we can update)
- Theoretical attacks requiring impractical resources
- Issues in unsupported environments (very old browsers, etc.)
- "Send me the database" — that's not how this works

## Bug bounty

We do not currently have a paid bug bounty program. We're a small civic-tech project. We do offer:

- Credit in `SECURITY.md` after disclosure
- Credit in release notes when fixes are deployed
- Public thanks on the project's communication channels
- Strong, written reference if you want one for your résumé / portfolio

## Historical disclosures

(None yet — please be the first.)

## Threat model

For a complete view of what we consider in-scope threats, see [`docs/threat-model.md`](docs/threat-model.md).

## Cryptography

HHTTPS uses:

- **ES256 (ECDSA over P-256)** for JWT signatures
- **HMAC-SHA256** for pairwise subject IDs
- **SHA-256** for content hashing in signatures
- **WebAuthn (FIDO2)** for user authentication
- **TLS 1.2+ required** for all HTTP transport

If you find concrete crypto weaknesses, please report. Theoretical post-quantum concerns are tracked on the roadmap (Phase 7+).

## Last security audit

No formal external audit has been performed yet. This is a known gap. We are seeking funding for an audit in 2026 Q4.

In the meantime, the code is open source — your scrutiny is welcomed.
