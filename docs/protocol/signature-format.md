# HHTTPS Content Signature Specification

**Status**: Draft v0.4.1 — Implemented in production
**Last updated**: May 2026

This document specifies how HHTTPS users sign text content (forum posts, comments, emails) so that other users with the HHTTPS browser extension can see a verified inline seal.

---

## Goals

1. **Compact**: Markers must fit in character-limited platforms (Twitter: 280 chars).
2. **Anti-theft**: Signatures cannot be copy-pasted from one site to another and remain valid.
3. **Anti-tampering**: Modifications to the signed text should be detectable (in strict mode).
4. **Forever-verifiable**: A signature created today should be verifiable in 5 years.
5. **Pseudonymity**: Signatures reveal the signer's role and trust score, not their identity.

---

## Marker format

A signed text contains an inline marker of the form:

```
#hhttps:s:<slug>
```

Where `<slug>` is a unique short identifier issued by the HHTTPS issuer when the signature is created. Slug format:

```
hp-XXX-XXXXX-XXX
```

- Prefix: `hp-` (HHTTPS)
- 10 characters of Crockford-style Base32 (alphabet: `23456789ABCDEFGHJKMNPQRSTUVWXYZ`)
- Separators (`-`) for readability
- Example: `hp-7K2-XQ9NMR-3F`

Total marker length: **18 characters** (well under any platform limit).

---

## Lifecycle

### Creating a signature

A client (typically the browser extension) creates a signature by calling:

```
POST {iss}/hhttps/signatures
Content-Type: application/json
HHTTPS-Token: <user-access-token>

{
  "text":         "<the text being signed>",
  "mode":         "alpha",                    // or "beta"
  "bindingType":  "web",                       // or "email" or "document"
  "domain":       "example.com"                // required for web binding
}
```

The issuer:

1. Validates the access token.
2. Normalizes the domain to its apex form (`www.example.com` → `example.com`).
3. Computes two hashes of the text:
   - `text_hash_strict` = `SHA-256(text)` (byte-exact)
   - `text_hash_loose` = `SHA-256(text.trim().replace(/\s+/g, ' ').toLowerCase())`
4. Generates a unique slug (retries on collision; 32^10 ≈ 10^15 namespace, birthday collision at ~30M signatures).
5. Stores a signature record: slug, signer ID, role, trust score, binding type, bound domain, both text hashes, timestamp.
6. Returns the slug + marker URL.

### Posting the signed text

The user (or the extension) appends the marker to their text:

```
Hello! Yes, you can definitely use rust async/await in this case. #hhttps:s:hp-7K2-XQ9NMR-3F
```

Then the user posts this text to the target platform normally.

### Verifying a signature

Other clients (typically browser extensions, but also direct platform integration) verify by calling:

```
GET {iss}/hhttps/s/<slug>?domain=<current-domain>
```

Or, for performance when a page contains many signatures:

```
POST {iss}/hhttps/signatures/batch
Content-Type: application/json

{
  "slugs": ["hp-XXX-XXX-XXX", "hp-YYY-YYY-YYY", ...],
  "domain": "example.com"
}
```

The issuer returns for each slug:

```json
{
  "id":          "hp-7K2-XQ9NMR-3F",
  "status":      "verified",      // or "wrong-domain" / "revoked" / "text-modified" / "unknown"
  "role": {
    "id":         "developer",
    "label":      "Developer",
    "icon":       "💻",
    "trustScore": 72,
    "level":      "github-org",
    "levelLabel": "GitHub Organization"
  },
  "binding": {
    "type":   "web",
    "domain": "reddit.com"
  },
  "textPreview": "Hello! Yes, you can definitely…",
  "createdAt":   "2026-05-14T10:23:00Z"
}
```

---

## Binding types

### `web` (alpha mode, default)

- Signature is bound to a specific apex domain (e.g. `reddit.com`)
- Verifies the signer is who they claim — text can still be edited freely after signing
- Use case: forum posts, comments, social media
- Marker form: `#hhttps:s:hp-...`

### `document` (beta mode, strict)

- Signature is bound to the exact byte-for-byte content of the text
- Any modification to the signed text breaks the signature
- Use case: contracts, petitions, legal documents
- Marker form: `#hhttps:s:hp-...` (same as web)

### `email`

- No domain binding
- Use case: newsletters, mailing lists where the content travels across multiple delivery systems
- Currently text hash is informational only

---

## Anti-theft mechanisms

### Domain binding

A signature created on `reddit.com` cannot be successfully verified on `twitter.com`. The verifier sees:

```json
{
  "status":   "wrong-domain",
  "expected": "reddit.com",
  "observed": "twitter.com"
}
```

The extension renders this as an amber warning: "⚠ Signature does not belong here. Original: reddit.com"

### First-seen lock

On the first verification with a domain, the issuer records `first_seen_domain` and `first_seen_at`. This timestamp + URL is shown in the signature detail card, allowing manual auditability of where a signature was first witnessed.

### Text hashing

In `document` (beta) mode, the verifier checks the strict text hash. If the text has been modified, the verifier sees:

```json
{
  "status": "text-modified"
}
```

The extension renders this as an apricot-colored seal: "⚠ Text changed after signing"

In `web` (alpha) mode, text-tampering is NOT checked (the design assumes text remains editable after signing — alpha is an identity stamp, not a text seal).

### Slug uniqueness

Slugs are generated using `crypto.randomBytes(12)` mapped through the 31-character Crockford alphabet. With 10 random characters, the namespace is 31^10 ≈ 8.2 × 10^14. Birthday collision becomes likely at ~30 million signatures — practically collision-free for the foreseeable lifetime of the protocol.

---

## Revocation

A signer can revoke their own signature:

```
POST {iss}/hhttps/signatures/<slug>/revoke
HHTTPS-Token: <user-access-token>

{
  "reason": "I no longer endorse this content"
}
```

Revoked signatures return `status: "revoked"` plus the revocation timestamp and (optional) reason.

---

## Security considerations

### Why a slug, not the full token?

Earlier versions of HHTTPS embedded the user's full access token in the marker. This was a fundamental security flaw — anyone scraping forums could harvest tokens for replay attacks. The slug-based approach:

- The slug is meaningless without the issuer's database lookup
- Bots cannot use harvested slugs for authentication (slug ≠ token)
- Slugs are short and human-readable, suitable for character-limited platforms
- Slugs are forever-stable identifiers, while access tokens expire in 1 hour

### Domain binding prevents replay across sites

A bot scraping `reddit.com` and re-posting the signature on `boese-fake-seite.de` will not produce a valid green seal — the verifier sees the domain mismatch.

### Same-site copy-paste

A bot copying the signed text (including the slug) on the same domain will currently produce a valid green seal. This is by design for alpha mode: text editing is allowed. Defenders can use the detail card to see "first seen at: [original URL]" and detect plagiarism manually.

For platforms that need stronger same-site anti-replay, use beta (`document`) mode with strict text hashing.

---

## Platform integration notes

Platforms can integrate signature verification server-side (independent of the browser extension) by calling the batch endpoint and rendering badges themselves. This is useful for:

- Email clients (no extension)
- Mobile apps
- Server-side rendering pipelines

---

## Changelog

- **v0.4.1** (May 2026): Slug-based signatures, domain binding, anti-theft hardening
- **v0.4.0** (April 2026): Alpha/beta modes, inline rendering by extension
- **v0.3** (March 2026): First content signature implementation
