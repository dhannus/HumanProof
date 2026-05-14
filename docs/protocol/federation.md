# HHTTPS Federation Specification

**Status**: Draft v0.1 — Spec phase
**Last updated**: May 2026

This document specifies how multiple HHTTPS issuers can coexist and how platforms decide which issuers to trust.

---

## The federation model

HHTTPS is designed to be **federated, not centralized**. Multiple organizations can run their own HHTTPS issuer (e.g. `hhttps.org`, `hhttps.uni-leipzig.de`, `hhttps.berlin.de`), and platforms can choose which issuers to accept.

This is similar to how:
- TLS certificates work (multiple CAs, browsers trust a curated root store)
- ActivityPub / Mastodon work (federated servers with curated trust)
- Email works (anyone can run a server, but reputation matters)

### Three-tier trust model

Each issuer has one of three trust statuses:

| Status | Multiplier | Description |
|---|---|---|
| **`audited`** | 1.0 | Operated by a known organization, passes manual review, follows the HHTTPS spec without modifications |
| **`community-verified`** | 0.8 | Verified by community discussion or vouched for by an existing audited issuer |
| **`unverified`** | 0.5 | Self-declared, no external review |

When a platform receives a token from an issuer, the **effective trust score** the platform displays is:

```
effective_trust = user_trust × issuer_multiplier
```

Example: A `developer` token with `trustScore: 90` from an `unverified` issuer becomes effectively `45` to the platform. A platform that requires effective trust ≥ 60 for posting in technical categories would reject this user.

This is **not a gate** — issuers below `audited` still work. It's a **signal** so platforms can make informed decisions.

---

## The Federation Registry

`hhttps.org` publishes an authoritative federation registry:

```
GET https://hhttps.org/hhttps/issuers
```

Response:

```json
{
  "issuers": [
    {
      "issuer":           "https://hhttps.org",
      "name":             "HHTTPS Reference Issuer",
      "status":           "audited",
      "trust_multiplier": 1.0,
      "operator":         "iamhmn.org",
      "contact":          "info@iamhmn.org",
      "verified_at":      "2025-09-15",
      "jwks_uri":         "https://hhttps.org/.well-known/jwks.json"
    },
    {
      "issuer":           "https://hhttps.uni-leipzig.de",
      "name":             "Universität Leipzig",
      "status":           "audited",
      "trust_multiplier": 1.0,
      "operator":         "Universität Leipzig, Rechenzentrum",
      "contact":          "hhttps@uni-leipzig.de",
      "verified_at":      "2025-11-03",
      "jwks_uri":         "https://hhttps.uni-leipzig.de/.well-known/jwks.json"
    }
  ],
  "spec_version": "0.1"
}
```

### Platform integration options

Platforms have three choices for handling federation:

1. **Use the hhttps.org registry** (default, recommended): Periodically fetch `/hhttps/issuers`, trust what's listed at the levels indicated.
2. **Maintain your own whitelist**: For high-stakes platforms (e.g. medical, legal), maintain a hardcoded list of trusted issuers and reject others.
3. **Accept any issuer with warning**: For low-stakes platforms (e.g. casual discussion forums), accept any issuer that responds at its JWKS endpoint, but display the trust status visibly to users.

---

## How an issuer joins the registry

The process for getting an issuer listed at `audited` status:

### Phase 1 (current): manual review

Submit a request via email to [info@iamhmn.org](mailto:info@iamhmn.org) including:

- Issuer URL (must be HTTPS, must have a valid TLS cert)
- Operator name and contact information
- Imprint / responsible party information (per German Impressumspflicht for DACH operators; equivalent in other jurisdictions)
- Statement of compliance with the HHTTPS spec
- Optional: technical audit report

Review process:

1. Domain verification (DNS TXT record check)
2. Spec compliance check (does the issuer correctly implement the endpoints?)
3. Operator verification (does the organization exist? is the contact authoritative?)
4. Manual decision by the registry maintainer

Approval typically takes 7-14 days. Rejection comes with written reasoning and remediation steps.

### Phase 2 (planned for 2026 Q4): community review

A `community-verified` tier will allow existing `audited` issuers to vouch for new issuers, similar to web-of-trust models. Three audited vouches = community-verified status.

### Phase 3 (planned for 2027): governance handoff

Once the federation has multiple `audited` issuers, the registry will be governed by a multi-stakeholder body rather than by a single maintainer. Specification at [`governance.md`](../docs/governance.md).

---

## Issuer operator's responsibilities

An issuer operator agrees to:

1. **Implement the spec correctly**: All endpoints (authorize, token, userinfo, jwks, check, sign) MUST behave as specified in [`identity-token.md`](identity-token.md) and [`oauth-extension.md`](oauth-extension.md).
2. **Use ES256 signatures**: Other algorithms not currently allowed (may be expanded in future).
3. **Publish JWKS**: Public keys at `/.well-known/jwks.json`, refreshable.
4. **Rotate keys**: Issuers SHOULD rotate signing keys at least annually.
5. **Respect privacy**: Don't share user data with third parties beyond what the OAuth scope permits.
6. **Honor revocations**: Users MUST be able to revoke their own tokens and signatures.
7. **Operate transparently**: Publish uptime, downtime, security incidents.

Failure to meet these obligations may result in demotion to `unverified` or removal from the registry.

---

## Role harmonization

For federation to work, all issuers must use the same role taxonomy. The 15-role spec is defined in [`roles.md`](roles.md) and includes mandatory verification method standards.

Issuers MAY add their own roles (e.g. a university issuer might add `tenured-professor`), but these custom roles MUST be prefixed with the issuer domain in the token (e.g. `uni-leipzig.de/tenured-professor`) so platforms can distinguish standard from custom roles.

Custom roles are not part of the federation trust signal — platforms decide for themselves how to handle them.

---

## Cross-issuer revocation

If user A is registered on issuer X and posts content on platform P with a signature from issuer X, and then leaves issuer X (account deletion), the signature record on issuer X should be revoked.

If user A was the same person on issuer Y, that's not the federation's business — issuers don't share user identity (that would break the privacy model).

---

## Threat model

### What federation protects against

- **Single point of failure**: If hhttps.org goes down, other issuers still work
- **Single point of trust**: If hhttps.org is compromised, other issuers still issue valid tokens
- **Single point of policy**: If hhttps.org makes a decision platforms disagree with, they can use a different issuer

### What federation doesn't protect against

- **Malicious issuers issuing fake tokens**: This is what trust tiers are for. Platforms decide which issuers to trust.
- **Sybil attacks across issuers**: Cross-issuer pseudonyms are intentionally not linkable (by design). A determined attacker could register on multiple issuers under different identities. Anti-Sybil mitigation is platform-level, not protocol-level.

---

## Open questions

These are unresolved and subject to community discussion:

1. **Governance model**: Who maintains the registry once HHTTPS has scaled beyond a single maintainer? Foundation? DAO? Multi-stakeholder committee?
2. **Cross-issuer reputation**: Should an `audited` user from issuer X have any trust advantage on platforms primarily served by issuer Y?
3. **Role gating**: Should certain roles (e.g. `medical_professional`) only be issuable by `audited` issuers?
4. **Default trust multiplier values**: 1.0 / 0.8 / 0.5 are first-guess. Should they be 1.0 / 0.7 / 0.4?

Discuss these in GitHub Discussions.
