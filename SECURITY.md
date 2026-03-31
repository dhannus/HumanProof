# Security Policy — HumanProof

## Our Commitment

HumanProof is a privacy and security infrastructure project. Security is not a feature — it is the foundation.

We take all security reports seriously, respond promptly, and will credit researchers publicly (unless they prefer otherwise).

---

## Supported Versions

| Version | Supported |
|---------|-----------|
| `0.1.x` (PoC) | ✅ Active development |
| Earlier | ❌ Not supported |

---

## Reporting a Vulnerability

**Please do NOT report security vulnerabilities through public GitHub Issues.**

A public issue immediately discloses the vulnerability to potential attackers before we can address it.

### How to report

Send a detailed report to:

**Email:** security@humanproof.org *(placeholder — update before publishing)*

Or use GitHub's private [Security Advisory](https://github.com/YOUR_USERNAME/humanproof/security/advisories/new) feature.

### What to include

- A description of the vulnerability and its potential impact
- Steps to reproduce
- Any proof-of-concept code (if available)
- Your preferred contact method for follow-up

### What to expect

| Milestone | Target Time |
|-----------|-------------|
| Acknowledgement of report | Within 48 hours |
| Initial assessment | Within 7 days |
| Fix or mitigation (critical) | Within 14 days |
| Fix or mitigation (high) | Within 30 days |
| Public disclosure | Coordinated with reporter |

---

## Scope

### In scope

- Human Label generation logic (`extension/src/`)
- Label verification flow
- Privacy property violations (linkability, data leakage)
- Machine Token forgery or bypass
- Extension permission escalation
- Any issue that allows a non-human actor to obtain a valid Human Label

### Out of scope (for now)

- Theoretical attacks without a practical exploit path
- Simulated ZKP weaknesses in the PoC (the PoC proof is intentionally not cryptographically secure — that is by design)
- Social engineering attacks against users
- Issues in third-party dependencies (report those to the upstream project)

---

## PoC Security Posture

The current PoC (`poc: true` labels) is **not cryptographically secure by design**.

The PoC exists to demonstrate the flow and protocol structure, not to provide real security guarantees. Do not deploy the PoC in any production environment or use it for any real access control.

---

## Disclosure Policy

We follow **coordinated disclosure**:

1. Reporter submits vulnerability privately
2. We confirm receipt and assess impact
3. We develop a fix
4. We agree on a disclosure timeline with the reporter (typically 30–90 days from fix)
5. We publish a security advisory with full details
6. We credit the reporter (unless they prefer anonymity)

We will never request that a researcher stay silent indefinitely. If we cannot fix a critical vulnerability within 90 days, we will discuss extension with the reporter — but the reporter retains the right to disclose.

---

## Hall of Fame

We maintain a public list of security researchers who have responsibly disclosed vulnerabilities.

*(None yet — be the first.)*

---

## A Note on the Threat Model

Our threat model is documented in [`docs/threat-model.md`](./docs/threat-model.md).

We encourage security researchers to read it before reporting — it describes what we consider in-scope risks and what we have already considered. If you find a gap in our threat model, that is itself a valuable contribution.
