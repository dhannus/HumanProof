# Threat Model — HumanProof

> Status: **Work in Progress**  
> This document follows the [STRIDE](https://en.wikipedia.org/wiki/STRIDE_model) threat modelling methodology.  
> Last updated: March 2026

---

## Scope

This threat model covers:
- The HumanProof browser extension (PoC)
- The Human Label generation and verification flow
- The Machine Token registration and verification flow
- The (future) Trustee architecture for label resolution

Out of scope for now: the legislative and governance layer (addressed in policy documents).

---

## Assets to Protect

| Asset | Description | Sensitivity |
|-------|-------------|-------------|
| User's real identity | The link between a person and their Human Labels | **Critical** |
| Human Label private key material | Used to generate proofs on-device | **Critical** |
| Label-to-identity mapping (Trustee) | Encrypted, held by independent trustee | **Critical** |
| Machine Token registry | List of registered AI operators | High |
| Verification API availability | Platforms depend on this to function | High |
| User's browsing behaviour | Cross-site correlation of label use | High |

---

## Threat Analysis (STRIDE)

### S — Spoofing

| Threat | Description | Likelihood | Impact | Mitigation |
|--------|-------------|------------|--------|------------|
| AI spoofing human | An AI generates a valid-looking Human Label | Medium | Critical | ZKP requires valid credential only the device/user holds. Simulated in PoC — real ZKP in Phase 2. |
| Label forgery | Attacker forges a Human Label without valid credential | Low | Critical | Cryptographic signature over label. Invalid signatures rejected by verification API. |
| Machine Token forgery | AI agent forges a Machine Token for a legitimate operator | Low | High | Tokens are signed by operator private key. Registry enables public verification. |
| Phishing for credential | Attacker tricks user into authenticating on fake site | Medium | High | Extension only triggers on user-initiated verification. HTTPS enforcement. |

---

### T — Tampering

| Threat | Description | Likelihood | Impact | Mitigation |
|--------|-------------|------------|--------|------------|
| Label tampering in transit | Attacker modifies Human Label in HTTP header | Low | High | Label is cryptographically signed. Modification invalidates signature. |
| Extension code tampering | Malicious modification of the browser extension | Low | Critical | Extension distributed via official browser stores. Code signing. Open source for auditability. |
| Verification API response tampering | MITM attack on API response | Low | High | HTTPS/TLS for all API communication. Certificate pinning (planned). |

---

### R — Repudiation

| Threat | Description | Likelihood | Impact | Mitigation |
|--------|-------------|------------|--------|------------|
| User denies human action | User claims they did not perform a verified action | Medium | Medium | Human Label is cryptographically bound to session. Trustee holds encrypted evidence for court use only. |
| Operator denies AI agent actions | Operator claims Machine Token was not theirs | Low | High | Machine Tokens are signed by operator key. Public registry provides non-repudiation. |
| Trustee denies resolution | Trustee claims no record of label-to-identity mapping | Low | Critical | Immutable audit log of all resolutions. Independent oversight board. |

---

### I — Information Disclosure

| Threat | Description | Likelihood | Impact | Mitigation |
|--------|-------------|------------|--------|------------|
| Cross-site label correlation | Platforms collude to link labels across sites | High | High | Labels are **session-scoped and unlinkable** — new label per session by design. |
| Label reveals age or other attributes | Platforms infer sensitive data from label fields | Medium | High | Age group field is optional and only included when explicitly consented. No other attributes in label. |
| Trustee data breach | Attacker gains access to label-to-identity mapping | Low | Critical | End-to-end encryption of mapping. HSM storage. Court-order-only access. Transparency log of all access. |
| Browser extension data leak | Extension leaks credential data to external server | Low | Critical | Extension operates entirely locally. No outbound connections except to verification API. Open source for audit. |

---

### D — Denial of Service

| Threat | Description | Likelihood | Impact | Mitigation |
|--------|-------------|------------|--------|------------|
| Verification API flooding | Attacker floods API to block legitimate verification | Medium | High | Rate limiting per platform. CDN distribution. Graceful degradation (platforms can cache last valid result). |
| Label exhaustion | Attacker generates millions of labels to devalue them | Low | Medium | Labels are tied to valid credentials. Without credential, no valid label. |
| Trustee unavailability | Trustee goes offline, blocking legal resolutions | Low | High | Trustee redundancy (multiple instances). SLA requirement in trustee charter. |

---

### E — Elevation of Privilege

| Threat | Description | Likelihood | Impact | Mitigation |
|--------|-------------|------------|--------|------------|
| Platform accesses trustee without court order | Platform attempts to resolve labels directly | Low | Critical | Trustee architecture has no direct platform interface. All access via court-mandated process. |
| Government mass surveillance via HumanProof | State actor uses system for mass monitoring | Medium | Critical | No central label database. Decentralised design. Independent trustee not under government control. Transparency reports. |
| Extension gains excessive browser permissions | Extension requests permissions beyond its stated purpose | Low | High | Minimum permission manifest. Community audit of permissions on every release. |

---

## Key Risk: Government or Platform Misuse

This is the most critical systemic risk and deserves special attention.

**Threat:** A government or powerful platform actor pressures the trustee to provide bulk label resolution without individual court orders — effectively creating a mass surveillance infrastructure.

**Why it matters:** HumanProof without strong trustee independence is worse than no system at all.

**Mitigations:**
1. Trustee is constituted as an independent legal entity — not a government body, not a commercial company.
2. Every resolution requires individual court order — bulk requests are technically impossible by design.
3. All resolutions are logged in a public transparency report (count only, no details).
4. An independent oversight board with civil society representation reviews all resolutions.
5. The protocol is open source — if the trustee is compromised, the community can fork.

---

## Known Unmitigated Risks (PoC Phase)

These risks exist in the current PoC and will be addressed in later phases:

| Risk | Status |
|------|--------|
| No real ZKP — PoC uses simulated proof | Accepted for PoC. Real ZKP in Phase 2. |
| No real credential binding — any user can get a label | Accepted for PoC. Real verification in Phase 2. |
| Single verification API instance — no redundancy | Accepted for PoC. Distributed in Phase 3. |
| No formal security audit | Planned before Phase 3 pilot. |

---

## Reporting Security Issues

Please do **not** report security vulnerabilities in public GitHub Issues.

See [`SECURITY.md`](../SECURITY.md) for responsible disclosure process.
