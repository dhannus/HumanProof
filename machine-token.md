# Machine Token Specification — v0.1 (Draft)

> Status: **Draft — open for community review**  
> Counterpart to the Human Label for legitimate AI agents operating online.

---

## Purpose

The Machine Token is a signed, publicly registered credential that identifies a legitimate AI agent operating on the internet.

Where the Human Label says *"a human is here"*, the Machine Token says *"a registered AI agent is here, operated by [entity], for [declared purpose]"*.

The goal is not to ban AI from the internet — it is to make AI **visible**.

---

## Design Goals

| Goal | Description |
|------|-------------|
| **Transparency** | Every Machine Token is publicly listed in an open registry. |
| **Accountability** | The operator is identifiable and legally responsible for the agent's actions. |
| **Scoping** | Tokens are limited to declared purposes and platforms. |
| **Revocability** | Tokens can be revoked by the operator or the registrar. |
| **Non-repudiation** | Cryptographic signature prevents an operator from denying ownership. |

---

## Token Format

### JSON Representation

```json
{
  "version":           "0.1",
  "type":              "machine-token",
  "token_id":          "mt_a3f8c2e1d9b047f5",
  "operator_id":       "org_de_example_gmbh",
  "operator_name":     "Example GmbH",
  "agent_name":        "ExampleCorp-ContentModerationBot-v2",
  "purpose":           "content-moderation",
  "allowed_platforms": ["*"],
  "issued_at":         1743000000,
  "expires_at":        1774536000,
  "registry_url":      "https://registry.humanproof.org/tokens/mt_a3f8c2e1d9b047f5",
  "signature":         "<operator_signature_base64>"
}
```

### Field Definitions

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `version` | string | ✅ | Protocol version. Always `"0.1"`. |
| `type` | string | ✅ | Always `"machine-token"`. |
| `token_id` | string | ✅ | Unique, globally unique identifier. Format: `mt_<hex>`. |
| `operator_id` | string | ✅ | Registered operator identifier. Unique in the registry. |
| `operator_name` | string | ✅ | Human-readable name of the operating entity. |
| `agent_name` | string | ✅ | Descriptive name of the specific agent or bot. |
| `purpose` | string | ✅ | Declared purpose. See **Purpose Vocabulary** below. |
| `allowed_platforms` | array | ✅ | List of platform IDs this token is valid for. `["*"]` = all platforms. |
| `issued_at` | integer | ✅ | Unix timestamp of issuance. |
| `expires_at` | integer | ✅ | Unix timestamp of expiry. Maximum validity: 1 year. |
| `registry_url` | string | ✅ | Public URL where this token can be verified independently. |
| `signature` | string | ✅ | Base64-encoded signature of the token body, signed with operator's registered private key. |

---

## Purpose Vocabulary

The `purpose` field MUST be one of the following registered values:

| Value | Description |
|-------|-------------|
| `content-moderation` | Automated review of user-generated content |
| `accessibility` | Screen readers, translation, accessibility tools |
| `web-crawler` | Indexing, archival, research crawling |
| `customer-service` | Declared AI chatbots on customer-facing platforms |
| `research` | Academic or non-commercial research agents |
| `security-scanning` | Vulnerability scanning (with platform consent) |
| `monitoring` | Uptime, performance, or compliance monitoring |
| `other` | Any other purpose — requires written description in registry |

Unknown purpose values MUST be rejected by compliant platforms.

---

## Wire Format

Machine Tokens are transmitted as **Base64-encoded JSON** in an HTTP request header:

```
X-HumanProof-Token: eyJ2ZXJzaW9uIjoiMC4xIiwidHlwZSI6Im1hY2hpbmUtdG9rZW4...
X-HumanProof-Version: 0.1
```

Note: A request carries EITHER an `X-HumanProof-Label` (human) OR an `X-HumanProof-Token` (machine). Never both.

---

## Verification

### Platform Verification Flow

```
1. Decode Base64 → parse JSON
2. Check type == "machine-token"
3. Check version is supported
4. Check expires_at > current timestamp
5. Check allowed_platforms includes this platform (or "*")
6. Fetch public key for operator_id from registry
7. Verify signature against token body
8. Check token is not in revocation list
9. Return: VALID | EXPIRED | REVOKED | INVALID
```

### Minimal Verification (PoC / No Registry)

```javascript
function verifyMachineToken(base64Token) {
  try {
    const token = JSON.parse(atob(base64Token));
    if (token.type !== 'machine-token') return 'INVALID';
    if (Date.now() / 1000 > token.expires_at) return 'EXPIRED';
    if (!token.operator_id || !token.agent_name) return 'INVALID';
    // TODO: signature verification against registry public key
    // TODO: revocation list check
    return 'VALID_UNVERIFIED'; // signature not yet checked in PoC
  } catch {
    return 'INVALID';
  }
}
```

---

## Token Registry

All Machine Tokens MUST be listed in the public HumanProof token registry.

The registry is:
- **Open** — anyone can look up any token
- **Append-only** — issued tokens are never deleted (only revoked)
- **Auditable** — all registrations and revocations are timestamped

### Registry API (planned)

```
GET  /tokens/{token_id}              → Token details + status
GET  /tokens?operator_id={id}        → All tokens for an operator
POST /tokens/register                → Register new token (authenticated)
POST /tokens/{token_id}/revoke       → Revoke token (operator or registrar)
GET  /tokens/{token_id}/revoked      → Check revocation status
```

---

## Operator Registration

To receive a Machine Token, an operator must:

1. Register their legal entity with the HumanProof registrar
2. Submit: legal name, jurisdiction, contact address, public key
3. Declare the agent's purpose and target platforms
4. Accept the Machine Token usage policy
5. Receive a signed Machine Token (valid up to 1 year, renewable)

Operators are legally responsible for all actions taken by their registered agents.  
Misuse of a token is grounds for revocation and may result in legal liability.

---

## Interaction with Human Labels

| Scenario | Expected Header | Platform Response |
|----------|----------------|-------------------|
| Human with valid label | `X-HumanProof-Label` | Allow, full access |
| Registered AI with valid token | `X-HumanProof-Token` | Allow, possibly limited access per platform policy |
| Neither header present | (none) | Platform decides — may block or flag |
| Both headers present | (invalid) | Reject — ambiguous identity |
| Expired label or token | Either | Reject with `HTTP 401` |
| Unregistered AI, no token | (none) | Treat as unverified — platform may block |

---

## Open Questions (for community)

- [ ] Should token registration be centralised (one registrar) or federated (multiple national registrars)?
- [ ] How are tokens issued for open-source AI agents without a legal entity operator?
- [ ] What is the revocation response time requirement?
- [ ] Should `allowed_platforms: ["*"]` require additional scrutiny?

Weigh in in GitHub Issues — tagged `spec:machine-token`.
