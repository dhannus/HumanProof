# HumanProof 🧬

> **An open-source protocol to verify humans online — anonymously, without surveillance.**

[![License: EUPL-1.2](https://img.shields.io/badge/License-EUPL_1.2-blue.svg)](https://opensource.org/licenses/EUPL-1.2)
[![Status: Concept / Early PoC](https://img.shields.io/badge/Status-Concept%20%2F%20Early%20PoC-orange)]()
[![Contributions Welcome](https://img.shields.io/badge/Contributions-Welcome-brightgreen)]()
[![Built in Public](https://img.shields.io/badge/Built-In%20Public-lightgrey)]()

---

## The Problem

The internet was built without a way to distinguish humans from machines.

For decades, that was fine.

Today, with generative AI capable of producing text, images, and actions indistinguishable from human output, **the gap between human and machine identity has become a critical infrastructure problem**:

- Bots flood democratic discourse with AI-generated opinions at scale
- Students submit AI-generated work as their own
- Vulnerable people unknowingly interact with AI posing as human therapists or friends
- Criminal actors use AI tools to commit fraud, harassment, and manipulation — with zero accountability
- Platforms have no reliable, privacy-respecting way to tell who they are actually talking to

**We can no longer tell if we are talking to a person or a program.**

And the law has no answer yet.

---

## The Idea

HumanProof proposes a simple, privacy-preserving protocol:

> **Before you act on the internet, you prove — anonymously — that a human is present.**

Not who you are. Not where you are. Just: *a real human is here.*

This is achieved through a **cryptographic Human Label** — a short-lived, unlinkable token generated via a **Zero-Knowledge Proof (ZKP)**. It proves humanity without revealing identity.

Think of it like a concert wristband:  
The bouncer knows you paid and are allowed in.  
He does not know your name, address, or what you do for a living.

```
Human (verified once) ──→ generates Human Label (ZKP token)
                               │
                               ↓
         Website / Platform checks Label via open API
                               │
               ┌──────────────┴──────────────┐
               ↓                             ↓
        ✅ Human confirmed            ❌ No label → blocked
        (anonymous, unlinkable)       (or flagged as AI agent)
```

For AI systems that legitimately act online, a parallel **Machine Token** system allows transparent, registered operation — making bots visible, not invisible.

---

## Core Principles

| Principle | Description |
|-----------|-------------|
| 🔒 **Privacy by design** | No name, no IP, no behavior stored. Only a cryptographic proof. |
| ⚖️ **Legal traceability** | Label resolution only with court order via independent trustee. |
| 🔓 **Open standard** | Protocol is open, auditable, not owned by any government or company. |
| 🤝 **Machine parity** | AI agents get their own transparent token — they are not banned, just labeled. |
| 🛡️ **Fail-safe** | System can enter Safe Mode if abuse is detected. |
| 🌍 **EU-aligned** | Built for GDPR, DSA, EU AI Act, and eIDAS 2.0 compatibility. |

---

## Current Status

This project is in **early concept / proof-of-concept phase**.

We are a small team building in public, starting with the smallest possible working piece.

### What exists right now
- [x] Conceptual framework & 10 User Stories (see `/docs/user-stories.md`)
- [x] Project roadmap 2026–2028 (see `/docs/roadmap.md`)
- [ ] Browser Extension PoC (in progress)
- [ ] ZKP prototype (planned)
- [ ] Reference API implementation (planned)
- [ ] Trustee architecture spec (planned)

We are building this **one piece at a time, in the open.**

---

## Scope: What We Are Building First

We are not starting with legislation. We are not starting with a government committee.

**We are starting with a browser extension.**

### MVP: HumanProof Browser Extension

A lightweight browser extension that:
1. Performs a local, one-time human verification at session start
2. Generates a short-lived ZKP-based Human Label
3. Attaches the label to outgoing requests (opt-in websites only)
4. Stores nothing — no accounts, no server, no tracking

This single working demo is enough to:
- Show the concept is technically feasible
- Spark public and policy discussion
- Attract contributors, researchers, and institutional partners

**If we can show it working, the rest will follow.**

---

## Technical Approach

### Zero-Knowledge Proofs (ZKP)
We use ZKP to prove a property ("this action was initiated by a verified human") without revealing any underlying data. Candidate libraries: [snarkjs](https://github.com/iden3/snarkjs), [circom](https://github.com/iden3/circom).

### Human Label Format (draft)
```json
{
  "version": "0.1",
  "type": "human-label",
  "proof": "<zkp_proof_string>",
  "issued_at": "<unix_timestamp>",
  "ttl": 3600,
  "scope": "session",
  "age_group": null
}
```

### Machine Token Format (draft)
```json
{
  "version": "0.1",
  "type": "machine-token",
  "operator": "<registered_org_id>",
  "purpose": "content-moderation-bot",
  "expires": "<unix_timestamp>",
  "signature": "<operator_signature>"
}
```

These formats are drafts and subject to community discussion. Open an issue to propose changes.

---

## Repository Structure

```
humanproof/
├── docs/
│   ├── user-stories.md        # All 10 User Stories
│   ├── roadmap.md             # Project roadmap 2026–2028
│   ├── architecture.md        # Technical architecture (WIP)
│   └── threat-model.md        # Security & privacy threat model (WIP)
├── extension/
│   ├── manifest.json          # Browser extension manifest
│   └── src/                   # Extension source (PoC)
├── protocol/
│   ├── human-label.md         # Human Label spec (draft)
│   └── machine-token.md       # Machine Token spec (draft)
├── circuits/                  # ZKP circuits (circom, planned)
├── api/                       # Reference API implementation (planned)
├── CONTRIBUTING.md
├── SECURITY.md
├── README.md
└── humanproof-demo.html       # Live Demo under http://tweakz.de/
```

---

## How to Contribute

We explicitly welcome contributions from:

- **Developers** — ZKP, browser extensions, protocol design, API
- **Lawyers & policy experts** — GDPR, DSA, EU AI Act alignment
- **Researchers** — privacy, cryptography, digital identity
- **Journalists & communicators** — help us explain this clearly
- **Public sector employees** — you understand the institutional side

### Getting Started

```bash
git clone https://github.com/dhannus/humanproof.git
cd humanproof
# Extension PoC (no build step yet — plain JS)
open extension/src/popup.html
```

### Ways to contribute right now (no code required)
- ⭐ Star the repo — visibility matters enormously at this stage
- 💬 Open an issue with questions, critique, or ideas
- 📖 Improve the documentation
- 🌐 Translate the README into your language
- 📢 Share this project with one person who should know about it

---

## Frequently Asked Questions

**Is this surveillance?**  
No. The Human Label contains no personal data, no IP address, no behavioral data. It is a cryptographic proof that a human acted — not who that human is. Label resolution requires a court order and goes through an independent trustee, not governments or platforms directly.

**What about privacy activists who want full anonymity?**  
This is a valid and important concern. The protocol is designed so that anonymity is the default. We welcome scrutiny from privacy advocates — please open an issue.

**What about people without digital ID documents?**  
The verification method must not exclude anyone. This is an open design challenge. We are actively seeking input on inclusive verification methods. See [Issue #TODO].

**Can AI systems still operate on the internet?**  
Yes — with a Machine Token. Legitimate AI agents (crawlers, assistants, moderation bots) are not banned, they are made transparent. The goal is visibility, not exclusion.

**Is this only for the EU?**  
We are starting EU-aligned (GDPR, eIDAS 2.0, DSA) because that is where the legal framework is most advanced. But the protocol is designed to be internationally extensible.

**Who is behind this?**  
Currently: one developer in German public service, building in the open. We need more people. Maybe you.

---

## Why Now

Every month we wait, the gap between human and machine identity grows wider.

- The EU AI Act is in force.
- eIDAS 2.0 wallets are rolling out across Europe.
- The DSA requires platforms to act on systemic risks — but gives them no standard tool.

**The window to define this standard is open. If we don't build it open-source and privacy-first, someone else will build it closed and surveillance-first.**

---

## Roadmap (Short Version)

| Phase | Timeline | Goal |
|-------|----------|------|
| **1 – Proof of Concept** | Now – Q2 2026 | Browser extension demo, spec drafts, community building |
| **2 – Protocol Draft** | Q3 2026 | Public review of Human Label & Machine Token specs |
| **3 – Pilot** | Q4 2026 – Q2 2027 | First real-world integration with willing public sector platform |
| **4 – Standard** | 2027–2028 | EU-wide discussion, eIDAS 2.0 alignment, open governance |

Full roadmap: [`/docs/roadmap.md`](/docs/roadmap.md)

---

## License

[EUPL-1.2](https://opensource.org/licenses/EUPL-1.2) — the European Union Public Licence.  
Chosen deliberately: it is designed for public sector software and is compatible with GPL.

---

## Contact & Community

- **Issues:** Use GitHub Issues for all technical and conceptual discussion
- **Matrix/Element:** [coming soon]
- **Mastodon:** [coming soon]
- **Email:** [info@tweakz.de]

---

> *"The internet needs a way to say: a human was here."*  
> Built in public. For everyone. By one developer who got tired of waiting.

---

<p align="center">
  <sub>HumanProof is an independent open-source project. Not affiliated with any government agency.<br>
  Started in Germany. Intended for the world.</sub>
</p>
