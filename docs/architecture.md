# Technical Architecture — HumanProof

> Status: **Work in Progress** — this document evolves with the project.  
> Contributions and critiques welcome. Open an issue or PR.

---

## Overview

HumanProof is a **protocol**, not a product. It defines:

1. How a human proves their humanity anonymously (Human Label)
2. How AI agents identify themselves transparently (Machine Token)
3. How platforms verify both without storing personal data
4. How label resolution works in exceptional legal circumstances

The architecture is deliberately **decentralised by default** and **surveillance-resistant by design**.

---

## System Components

```
┌─────────────────────────────────────────────────────────────────────┐
│                        USER DEVICE                                  │
│                                                                     │
│  ┌──────────────────┐     ┌─────────────────────────────────────┐  │
│  │ Browser Extension│────▶│  Local ZKP Engine                   │  │
│  │ (HumanProof PoC) │     │  - Generates proof from local cred  │  │
│  └──────────────────┘     │  - Never sends raw identity data    │  │
│                           │  - Produces short-lived Human Label │  │
│                           └─────────────────────────────────────┘  │
└───────────────────────────────────┬─────────────────────────────────┘
                                    │ Human Label (ZKP token, TTL: 1h)
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        PLATFORM / WEBSITE                           │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │ HumanProof Verification API                                  │  │
│  │ - Validates label signature                                  │  │
│  │ - Checks TTL and scope                                       │  │
│  │ - Returns: HUMAN / MACHINE / UNVERIFIED                      │  │
│  │ - Stores nothing beyond label hash for dedup                 │  │
│  └──────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
                                    │ (exceptional case only)
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                   INDEPENDENT TRUSTEE (future)                      │
│                                                                     │
│  - Holds encrypted mapping: label ↔ verified identity              │
│  - Access only via court order + independent review board           │
│  - Publishes transparency report (aggregated, no personal data)     │
│  - Cannot be accessed by platforms or governments directly          │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Human Label — How It Works

### Step 1: Initial Verification (once per device)

The user verifies once using an existing trusted credential — the key insight is that **we do not create a new identity**, we prove an existing one cryptographically without revealing it.

Candidate verification methods (ranked by privacy):
1. **eIDAS 2.0 Wallet** — EU digital identity wallet, ZKP-native (preferred, future)
2. **Local biometric** — device biometric (Face ID, fingerprint) as proof-of-person, processed entirely on-device
3. **CAPTCHA-Plus** — enhanced human challenge, no personal data (PoC fallback)

> ⚠️ **PoC scope:** The browser extension prototype uses a simulated local verification (no real identity required) to demonstrate the label generation and verification flow. Real verification methods are Phase 2+.

### Step 2: Label Generation (every session)

```
Input:  Local credential proof (never leaves device)
        Current timestamp
        Session scope identifier

Process: ZKP circuit computes proof that:
         "I hold a valid credential" WITHOUT revealing the credential

Output: Human Label
        {
          version:    "0.1",
          type:       "human-label",
          proof:      "<zkp_proof>",
          issued_at:  <unix_timestamp>,
          ttl:        3600,
          scope:      "session",
          age_group:  null   // optional, for age-restricted platforms
        }
```

### Step 3: Label Presentation

The browser extension attaches the Human Label to outgoing HTTP requests as a custom header:

```
X-HumanProof-Label: <base64_encoded_label>
X-HumanProof-Version: 0.1
```

Platforms that support HumanProof verify this header via the open verification API.

### Step 4: Platform Verification

```
POST /verify
Content-Type: application/json

{
  "label": "<base64_encoded_label>",
  "platform_id": "<registered_platform_id>"
}

Response:
{
  "status": "HUMAN" | "MACHINE" | "UNVERIFIED" | "EXPIRED" | "INVALID",
  "scope": "session",
  "age_group": null,
  "verified_at": <unix_timestamp>
}
```

---

## Machine Token — How It Works

AI agents that legitimately operate online register with a designated authority and receive a Machine Token:

```json
{
  "version": "0.1",
  "type": "machine-token",
  "operator": "<registered_org_id>",
  "agent_name": "ExampleCorp-ContentModerationBot",
  "purpose": "content-moderation",
  "allowed_platforms": ["*"],
  "expires": "<unix_timestamp>",
  "signature": "<operator_signature>"
}
```

Machine Tokens are:
- **Public** — anyone can look up a token in the public registry
- **Signed** — tamper-evident
- **Scoped** — limited to declared purpose
- **Revocable** — operator and registrar can revoke

---

## ZKP Technology Selection

### Current PoC: Simulated proof (no real ZKP library)
The browser extension PoC simulates the proof generation to demonstrate the flow without requiring complex cryptographic setup.

### Target: snarkjs + circom
- [snarkjs](https://github.com/iden3/snarkjs) — JavaScript ZKP library, runs in browser
- [circom](https://github.com/iden3/circom) — circuit description language
- Proof system: **Groth16** or **PLONK** (TBD based on performance benchmarks)

### Why not other approaches?
| Approach | Problem |
|----------|---------|
| Traditional OAuth/SSO | Requires identity disclosure to third party |
| CAPTCHA | Easily bypassed by modern AI, no legal standing |
| Biometric without ZKP | Biometric data leaves the device |
| Blockchain-based identity | Performance, complexity, energy cost |

---

## Privacy Architecture Decisions

| Decision | Rationale |
|----------|-----------|
| Labels are unlinkable across sessions | New label every session = no cross-session tracking |
| Labels contain no user identifier | Verification proves humanity, not identity |
| Platforms only receive pass/fail + metadata | Minimum necessary data principle |
| Trustee holds encrypted mapping, not platforms | Resolving identity requires additional legal step |
| No central label database | Decentralised by design — nothing to breach |

---

## What This Architecture Does NOT Solve (Yet)

- **Account takeover:** A human can share their verified device with another person.
- **Coerced verification:** A human can be forced to verify on behalf of a bad actor.
- **Inclusive verification:** People without digital ID documents need alternative paths.
- **Cross-device sessions:** Verification is currently per-device.

These are known open problems. See GitHub Issues for active discussion.

---

## Threat Model

See [`threat-model.md`](./threat-model.md) for a full analysis.

---

## Contributing to the Architecture

Architecture decisions are made transparently in GitHub Issues.  
Tag your issue with `architecture` to join the discussion.  
No decision is final until it has been open for community review for at least 14 days.
