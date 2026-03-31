# Contributing to HumanProof

First of all: thank you for being here. This project is built in public, by people who care.

HumanProof is in its earliest phase. That means your contribution — whether it is a line of code, a legal opinion, a spotted typo, or a hard question — matters more than it ever will again.

---

## What We Need Right Now

We are not a team of 50. We are a small project that needs:

| What | Who |
|------|-----|
| ZKP implementation (snarkjs/circom) | Cryptographers, security engineers |
| Browser extension refinement | Frontend / extension developers |
| Protocol review | Security researchers |
| GDPR / DSA / EU AI Act analysis | Lawyers, policy experts |
| Documentation & translation | Technical writers |
| Hard questions & critique | Everyone |

If you do not see yourself in this list, open an issue anyway. We will figure it out together.

---

## Ground Rules

1. **Be direct, not unkind.** Critique the idea, not the person.
2. **No decision is final without public discussion.** Everything is open for challenge.
3. **Privacy is a first-class concern.** If a contribution weakens privacy guarantees, it needs a very strong justification.
4. **Small, focused contributions are better than large, sprawling ones.** One thing at a time.
5. **Silence is not consent.** If you see something wrong, say something.

---

## How to Contribute

### Report a bug or issue

Open a [GitHub Issue](https://github.com/YOUR_USERNAME/humanproof/issues).  
Please include:
- What you expected
- What actually happened
- Steps to reproduce

For security issues, do NOT use public issues. See [`SECURITY.md`](./SECURITY.md).

### Propose a change to the protocol spec

1. Open an issue tagged `spec:human-label` or `spec:machine-token`
2. Describe the change and your reasoning
3. Allow **at least 14 days** for community discussion before a PR
4. Protocol changes require maintainer approval

### Contribute code

1. Fork the repository
2. Create a branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Write or update tests where applicable
5. Open a Pull Request with a clear description

**PR checklist:**
- [ ] Does not introduce any new outbound network connections without justification
- [ ] Does not store personal data
- [ ] Documented (inline comments + relevant `.md` update)
- [ ] Works in Chrome and Firefox (for extension changes)

### Contribute documentation

Documentation PRs are welcome without prior issue. Fix away.

### Translate the README

If you want to translate the README into your language:
1. Create `README.{lang}.md` (e.g. `README.de.md`)
2. Open a PR — we will add a language selector to the main README

---

## Development Setup

### Browser Extension (PoC)

No build step required for the PoC.

```bash
git clone https://github.com/YOUR_USERNAME/humanproof.git
cd humanproof/extension

# Chrome / Chromium
# 1. Open chrome://extensions
# 2. Enable "Developer mode" (top right)
# 3. Click "Load unpacked"
# 4. Select the /extension folder

# Firefox
# 1. Open about:debugging
# 2. Click "This Firefox"
# 3. Click "Load Temporary Add-on"
# 4. Select /extension/manifest.json
```

### ZKP Circuits (planned)

```bash
# Requirements: Node.js 18+, circom 2.x
npm install -g circom snarkjs
cd humanproof/circuits
# Instructions TBD as circuits are developed
```

---

## Commit Message Format

We use a simple convention:

```
type: short description

Optional longer description.

Refs: #issue-number
```

Types: `feat`, `fix`, `docs`, `spec`, `chore`, `security`, `test`

Example:
```
feat: add label expiry countdown to popup UI

Shows remaining TTL in mm:ss format, updates every second.
Automatically reverts to unverified state on expiry.

Refs: #12
```

---

## Code of Conduct

We follow the [Contributor Covenant v2.1](https://www.contributor-covenant.org/version/2/1/code_of_conduct/).

Short version: treat everyone with respect. Discrimination, harassment, and bad faith are not welcome here.

Report issues to the project maintainer via the contact in the GitHub profile.

---

## A Note on Scope

HumanProof is intentionally starting small. We are not trying to solve every problem at once.

If you have an idea that is larger than the current scope — great. Open an issue and let us talk about it. But we will not merge changes that significantly expand scope before the PoC is stable.

**We would rather do one thing well than ten things poorly.**

---

*Built in public. For everyone.*
