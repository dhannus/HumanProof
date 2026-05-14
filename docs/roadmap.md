# HHTTPS Roadmap

**Last updated**: May 2026

This document describes the medium- and long-term direction of HHTTPS. It is a living document — phases shift as we learn what works.

---

## Completed phases

### Phase 1 — Foundation (2025 H2) ✅

- Initial issuer server with WebAuthn registration
- Basic identity token format (JWT, ES256)
- Email + ORCID verification methods
- First browser extension prototype
- Public website at hhttps.org

### Phase 2 — Content signatures (2026 Q1) ✅

- Inline seal protocol
- Browser extension renders seals
- Alpha mode (identity stamp) and beta mode (text-bound)
- Initial bot-resistance via marker scanning

### Phase 2.5 — Slug-based signatures (2026 Q1) ✅

- Replaced token-in-marker with slug-based references (closed token-theft vector)
- Domain binding (anti-replay across sites)
- Strict + loose text hashing
- Improved iframe support (webmail clients)
- Production hardening

### Phase 3a — OAuth Provider (2026 Q2) ✅

- OAuth 2.0 / OpenID Connect authorization code flow
- PKCE support
- Pairwise subject IDs (cross-platform tracking prevention)
- Discovery document
- First OAuth client: ask.iamhmn.org Q&A platform
- Pretty consent UI

---

## Current phase

### Phase 3b — Developer self-service (2026 Q3) 🟡

**Goal**: Make it possible for any developer to register their platform without manual admin intervention.

- `/developers` portal on hhttps.org
- Self-service client registration with email confirmation (double opt-in)
- Per-platform stats dashboard for owners
- Admin queue for verification requests
- DNS-TXT record automation for domain proofs

**Why this matters**: Currently, platforms must email me to get a `client_id`. That's a bottleneck. Self-service registration unlocks the federation.

---

## Near-term

### Phase 3c — Extension OAuth integration (2026 Q3) 🟡

- Browser extension can complete OAuth flows without bouncing through hhttps.org pages (when user is already logged in)
- "Connected platforms" tab in extension popup
- One-click revoke for any platform
- Auto-detection of "Login with HHTTPS" buttons on sites

### Phase 3d — SDKs (2026 Q3) 🟡

- `@hhttps/client-js` — frontend JS library (`<HHTTPSLogin />` React component, etc.)
- `@hhttps/express` — Node.js / Express middleware
- `hhttps-python` — Flask / Django adapters
- `hhttps/oauth-client` — PHP / Composer package

Each SDK should be < 100 lines core code plus examples. Wraps the OAuth flow and provides idiomatic API.

### Phase 4 — Federation (2026 Q4) 🟡

- Multiple issuers operating in production
- Federation registry at hhttps.org/hhttps/issuers
- Three-tier trust model (audited / community-verified / unverified)
- Platform settings to choose which issuers to accept
- Migration tool for users wanting to move between issuers

---

## Mid-term

### Phase 5 — Public pilot (2027 Q1) 🔵

Partnership with a public-sector platform — a city, ministry, election service, or similar — to demonstrate HHTTPS at real scale.

Target candidates:
- A German city's citizen-engagement platform
- A federal participation portal (e.g. Konsultations-Plattform)
- A public-broadcasting outlet's comment system

Goal: real-world stress test with thousands of users, proves HHTTPS handles production traffic.

### Phase 6 — Standard track (2027–2028) 🔵

Submit HHTTPS as a draft to:
- IETF (as an extension to OIDC)
- W3C (web authentication coordination)
- National standards bodies (DIN, ANSI)

Goal: vendor-neutral standardization, multi-stakeholder governance.

---

## Long-term vision

### Phase 7 — ZKP migration (2028+) 🔵

Once zero-knowledge proof tooling matures (snarkjs, circom, or a successor library reaches production maturity):

1. Replace the JWT token layer with ZKP-based proofs
2. Issuer no longer learns which platforms a user uses
3. Pairwise pseudonyms become circuit-derived, no longer requires trust in `issuer-secret`
4. Deanonymization becomes cryptographically impossible (not just policy-prevented)

**Why this is future, not now**: ZKP libraries today require either centralized trusted setup (which has its own problems) or extremely expensive proof generation (~30 seconds per proof). Neither is acceptable for a daily-use identity protocol. We're betting on hardware acceleration + library maturity by ~2028.

The architecture is designed so this migration changes only the token format and verification logic. Platform integration code does not need to change.

---

## Non-goals

To stay focused, HHTTPS explicitly does NOT aim to:

- **Replace eIDAS** — eIDAS is a heavyweight identity system for legally-binding transactions. HHTTPS is for everyday "is this a real human" use cases.
- **Be a wallet** — no credit cards, payment, ticket storage. Just identity.
- **Track behavior** — no analytics, no metrics on what users do across platforms.
- **Profile users** — no demographics inferred from role, no marketing segmentation.
- **Be commercial** — operated as civic-tech, not VC-funded.

---

## Funding & sustainability

Current model: bootstrapped by the maintainer. This is not sustainable beyond Phase 4.

Funding paths under consideration:

1. **Public-sector grants** (NLnet, NGI, BMBF, EU NGI)
2. **Foundation grants** (e.g. Mozilla, Linux Foundation)
3. **Membership model** for organizations running their own issuers
4. **Optional paid hosting** for platforms that don't want to self-host their integration

No path forward involves user tracking, ads, or selling data.

---

## How to influence the roadmap

Open a [GitHub Issue](https://github.com/dhannus/HumanProof/issues) or [Discussion](https://github.com/dhannus/HumanProof/discussions). The roadmap is shaped by:

- User needs (what real platforms actually need to integrate)
- Security findings (vulnerabilities prioritize themselves)
- Funding (some phases may be accelerated by grants)
- Maintainer capacity (currently: one developer)

We are explicitly **not** roadmap-driven from a marketing perspective. Features ship when they're ready and useful, not on a quarterly demo schedule.
