# User Stories — HumanProof

> All 10 User Stories defining the scope of the HumanProof protocol.  
> Status: **Approved for PoC phase**. Stories marked `MVP` are in scope for the first browser extension prototype.

---

## Index

| ID | Role | Topic | Priority | MVP |
|----|------|--------|----------|-----|
| [US-001](#us-001) | Internet User | Browser authentication before browsing | Critical | ✅ |
| [US-002](#us-002) | Platform Operator | Platform-side AI detection & Human Label check | High | ✅ |
| [US-003](#us-003) | Law Enforcement | Traceability for criminal AI-assisted actions | Critical | — |
| [US-004](#us-004) | AI Developer / Company | Machine Token for legitimate AI agents | High | ✅ |
| [US-005](#us-005) | Minor / Student | Age-adapted Human Label for protected persons | Medium | — |
| [US-006](#us-006) | Journalist / Whistleblower | Anonymous verification for investigative journalism | Critical | — |
| [US-007](#us-007) | Teacher / Educational Institution | Verification in digital exams & AI usage detection | High | — |
| [US-008](#us-008) | Electoral Authority / Democratic Institution | Protection of democratic processes from AI influence operations | Critical | — |
| [US-009](#us-009) | Patient / Healthcare System | Protection of vulnerable persons from AI manipulation | High | — |
| [US-010](#us-010) | Data Protection Authority / Regulatory Body | Auditability and revision of the entire system | Medium | — |

---

## US-001

**Role:** Internet User / Citizen  
**Priority:** Critical &nbsp;|&nbsp; **MVP:** ✅  
**Tags:** `eIDAS 2.0` `ZKP` `Browser` `Privacy by Design`

### Story
> *As an internet user, I want to authenticate myself once per browser session via a state-recognised, anonymous procedure as a human, so that my activities on the internet can legally be attributed to a real person — without my personal data being publicly visible.*

### Acceptance Criteria
- [ ] The authentication process takes a maximum of 10 seconds and is fully accessible.
- [ ] No real name is stored — only an anonymous, cryptographic Human Label is transmitted.
- [ ] The browser displays a standardised symbol after successful authentication (e.g. "✓ Human verified").
- [ ] Without authentication, only publicly accessible basic services (emergency services, authorities) remain reachable.
- [ ] The label is not traceable by third parties — resolution is only possible by authorised law enforcement agencies with a court order.

---

## US-002

**Role:** Platform Operator / Online Service  
**Priority:** High &nbsp;|&nbsp; **MVP:** ✅  
**Tags:** `API` `Platform Integration` `DSA Art. 34` `HTTP 451`

### Story
> *As the operator of an online platform, I want to automatically check for every incoming request whether a valid Human Label is present, so that I can technically and legally block AI-driven mass actions such as fake comments, spam, and manipulation.*

### Acceptance Criteria
- [ ] A standardised API interface enables label validation in under 50 ms.
- [ ] Requests without a valid Human Label are rejected with HTTP 451 (Unavailable For Legal Reasons).
- [ ] The system distinguishes between human users and authorised AI agents with their own Machine Token.
- [ ] Platforms are not liable for blocked content provided they fulfil their verification obligation under applicable law.
- [ ] Logs contain no personal data — only anonymised label hashes.

---

## US-003

**Role:** Law Enforcement / Public Prosecutor  
**Priority:** Critical &nbsp;|&nbsp; **MVP:** —  
**Tags:** `Court Order` `Trustee` `Audit Log` `Prompt Logging`

### Story
> *As a public prosecutor, I want to be able to resolve an anonymous Human Label into a real identity by court order when a provable criminal offence has been committed via an AI service, so that perpetrators can be prosecuted and victims protected — without enabling mass surveillance.*

### Acceptance Criteria
- [ ] Label resolution is only possible with a court order and a specific, documented initial suspicion.
- [ ] Every request for label resolution is recorded in an immutable audit log and reviewed independently.
- [ ] Resolution occurs within 24 hours of the court order, processed by a central, independent trustee.
- [ ] AI providers are required to maintain encrypted, legally compliant prompt logs for use in criminal proceedings where their services have been used for unlawful purposes.
- [ ] Affected persons are informed of any resolution after proceedings conclude, provided this does not jeopardise the investigation.

---

## US-004

**Role:** AI Developer / Company  
**Priority:** High &nbsp;|&nbsp; **MVP:** ✅  
**Tags:** `Machine Token` `Public Registry` `Transparency` `Operator Liability`

### Story
> *As a developer of an AI agent, I want to register and label my service with an official Machine Token, so that my AI agent is transparently recognisable as such, may operate legally, and is not mistakenly treated as a human actor or misused for illegal purposes.*

### Acceptance Criteria
- [ ] Every AI agent requires an officially registered Machine Token with an expiry date and declared purpose.
- [ ] The token is machine-readable by recipient platforms and unambiguously distinguishes AI from human.
- [ ] AI agents without a Machine Token are treated as unauthenticated users and blocked.
- [ ] A public registry lists all approved AI agents with operator details, in compliance with applicable data protection law.
- [ ] In cases of misuse, the registered operator bears liability under applicable law.

---

## US-005

**Role:** Minor / Student  
**Priority:** Medium &nbsp;|&nbsp; **MVP:** —  
**Tags:** `Child Protection` `Age Group` `Parental Consent` `DSA` `GDPR`

### Story
> *As a minor user, I want to receive a specially protected Human Label that contains my age category (without an exact date of birth), so that platforms automatically apply stricter child protection measures and I cannot be unknowingly manipulated or harassed by AI systems or adults.*

### Acceptance Criteria
- [ ] The label contains only the anonymous age group (e.g. "under 18") — no further data.
- [ ] Platforms with age-restricted content automatically deny access when presented with a minor's label.
- [ ] AI chatbots recognise the label and activate strict conversation filters and mandatory reporting obligations in the event of threshold violations.
- [ ] Parents or legal guardians must authorise the initial label creation for children under 14 years of age.
- [ ] The system is compatible with applicable EU regulations including the DSA, GDPR, and the EU AI Act.

---

## US-006

**Role:** Journalist / Whistleblower  
**Priority:** Critical &nbsp;|&nbsp; **MVP:** —  
**Tags:** `Press Freedom` `Source Protection` `SecureDrop` `Whistleblower Directive EU 2019/1937`

### Story
> *As an investigative journalist or whistleblower, I want to operate online as a verified human without my identity being traceable via the Human Label or by authorities without a judicial order, so that press freedom and source protection remain structurally guaranteed even in an authenticated internet — and are not undermined by the verification requirement.*

### Acceptance Criteria
- [ ] Journalists and whistleblowers can apply for a Protected Label via accredited ombudsman bodies, which incorporates additional anonymisation layers.
- [ ] Even in cases where a court order exists, an independent press chamber must act as an intermediary before a Protected Label can be resolved.
- [ ] The system explicitly excludes intelligence service requests without dual legal review.
- [ ] Protected Labels are compatible with systems such as SecureDrop and encrypted communication platforms.
- [ ] An annual transparency report published by the trustee discloses how many Protected Labels were requested and resolved.

---

## US-007

**Role:** Teacher / Educational Institution  
**Priority:** High &nbsp;|&nbsp; **MVP:** —  
**Tags:** `Academic Integrity` `Active Human Binding` `E-Assessment` `Accessibility`

### Story
> *As a teacher at a school or university, I want to be able to verify that examination performance was genuinely produced by the verified human to whom the Human Label belongs — and not by an AI system acting on their behalf — so that educational qualifications retain their validity and academic integrity remains enforceable in purely digital learning environments.*

### Acceptance Criteria
- [ ] Examination platforms can request an "Active Human Binding" that confirms the continuous presence of a real human throughout the examination session.
- [ ] If AI usage is detected during a verified session, the system automatically generates an integrity alert — without storing session content.
- [ ] Educational institutions receive an anonymous audit report (human/machine ratio for the session) — no personal data.
- [ ] The system distinguishes between declared, permitted AI assistance and covert use.
- [ ] Students with accessibility needs can use an exemption label with assistive tools, without being placed at a disadvantage.

---

## US-008

**Role:** Electoral Authority / Democratic Institution  
**Priority:** Critical &nbsp;|&nbsp; **MVP:** —  
**Tags:** `Democracy Protection` `Disinformation` `DSA Art. 34` `Botnet Detection` `Freedom of Expression`

### Story
> *As the head of a national electoral authority, I want to ensure that political statements on social media, comment sections, and petition platforms originate exclusively from verified humans or transparently labelled AI agents, so that coordinated AI-driven disinformation campaigns can be identified, contained, and legally prosecuted — without restricting legitimate political freedom of expression.*

### Acceptance Criteria
- [ ] Political advertisements and petitions must carry a verified Human Label or a transparent Machine Token with operator details.
- [ ] Platforms must automatically report clusters of similar AI-generated content within defined time windows (botnet detection).
- [ ] Users can optionally view whether content originated from a human or an AI agent (transparency layer).
- [ ] Campaign periods (90 days before an election) are subject to heightened verification requirements for political content.
- [ ] The regulation applies across platforms and cannot be circumvented through offshore domiciliation of platform operators.

---

## US-009

**Role:** Patient / Healthcare System  
**Priority:** High &nbsp;|&nbsp; **MVP:** —  
**Tags:** `Patient Protection` `Crisis Intervention` `MDR Compliance` `Informed Consent` `eHealth`

### Story
> *As a patient with a mental health condition, I want to know whether a conversation partner in an online health portal, a crisis chat service, or a self-help group is a human or an AI, so that I can make an informed decision about trust and disclosure — and so I cannot be led toward harmful actions or manipulated by AI systems.*

### Acceptance Criteria
- [ ] Health platforms are required to clearly display the Human Label or Machine Token of a conversation partner at the start of every interaction.
- [ ] AI chatbots operating in healthcare contexts require a dedicated Healthcare Machine Token with extended medical approval, analogous to the EU Medical Device Regulation (MDR).
- [ ] Attempts to present an AI as a human therapist or physician are unlawful and technically blocked by the system.
- [ ] Users can set a preference for "human conversation partners only" — platforms must enforce this technically.
- [ ] When crisis detection signals are identified (suicide prevention), the system automatically routes the conversation to a qualified human professional and documents this in the audit log.

---

## US-010

**Role:** Data Protection Authority / Regulatory Body  
**Priority:** Medium &nbsp;|&nbsp; **MVP:** —  
**Tags:** `System Audit` `DPIA` `Transparency` `Safe Mode` `Art. 35 GDPR` `Accountability`

### Story
> *As a government data protection officer, I want to audit the entire Human Label system regularly and without prior notice, identify technical vulnerabilities, and detect patterns of misuse, so that public trust in the system remains justified over time — and so that data protection violations or state misuse are identified and sanctioned at an early stage.*

### Acceptance Criteria
- [ ] The entire technical system — trustee infrastructure, label issuance, API interfaces — must be fully auditable by accredited supervisory bodies.
- [ ] A publicly accessible real-time dashboard displays aggregated, non-personal system metrics (number of active labels, resolution requests, error rates).
- [ ] Every system change must undergo a standardised Data Protection Impact Assessment (DPIA, Art. 35 GDPR) before going live.
- [ ] In the event of detected misuse, the authority can place the system into a "Safe Mode" with restricted functionality within 4 hours.
- [ ] An independent expert panel — comprising technologists, lawyers, and civil society representatives — reviews the system every six months and publishes the report in an accessible format.

---

## Technical Context

All stories are grounded in the principle of **anonymous verification** — comparable to Zero-Knowledge Proofs. No central system stores a link between identity and behaviour.

The legal basis must be developed in close alignment with:

- **EU General Data Protection Regulation (GDPR)**
- **Digital Services Act (DSA)**
- **EU AI Act**
- **eIDAS 2.0**

Technical implementation builds on open standards: **W3C Decentralized Identifiers (DID)** and **eIDAS 2.0 Wallet**.

---

*For questions, critique, or proposals related to these stories, open a GitHub Issue tagged `user-story`.*
