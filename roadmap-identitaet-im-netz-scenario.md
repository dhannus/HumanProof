# Projektroadmap – Identität im Netz

> **PRJ-HLI-2026-001** · Stand: März 2026 · Version 1.0  
> Status: **In Planung**  
> Referenz: US-001 bis US-010 · DSGVO · DSA · EU-KI-VO · eIDAS 2.0

---

## Legende

| Symbol | Bedeutung |
|--------|-----------|
| 🔴 Phase 1 | Fundament |
| 🟠 Phase 2 | Schärfung |
| 🟢 Phase 3 | Pilot |
| 🔵 Phase 4 | Skalierung |
| 🔒 | Pflicht-Gate — kein Weitergehen ohne Freigabe |
| `US-001` | Referenz User Story |

---

## Phase 01 — Fundament legen

**Zeitraum:** Q1–Q2 2026 · **Dauer:** 6 Monate

### Feb 26 — Task Force konstituieren

Interdisziplinäres Kernteam aus 12–16 Personen berufen: Juristen (EU-Recht, Datenschutz), Sicherheitsarchitekten, Kryptographen, Ethikrat, Zivilgesellschaft & Politikvertreter.

**Deliverables:** `Task-Force-Charta` · Besetzungsplan · Governance-Modell

---

### Mär 26 — Stakeholder-Analyse & politisches Mapping

Wer sind Befürworter, wer Blocker? EU-Kommission, BSI, nationale Datenschutzbehörden, Plattformbetreiber (Big Tech), Bürgerrechtsorganisationen, Journalistenverbände einbinden.

**Deliverables:** `Stakeholder-Matrix` · Einfluss-Interessen-Map · Kommunikationsplan  
**Referenz:** US-001 · US-006 · US-010

---

### Apr 26 — Rechtsgutachten & DPIA beauftragen

Unabhängiges Rechtsgutachten zur Vereinbarkeit mit DSGVO, DSA, EU-KI-Verordnung, eIDAS 2.0 und nationalen Grundrechten. Datenschutz-Folgenabschätzung (Art. 35 DSGVO) einleiten.

**Deliverables:** `Rechtsgutachten` · `DPIA-Bericht (Entwurf)` · Compliance-Lückenanalyse  
**Referenz:** US-003 · US-008 · US-010

---

### Mai 26 — Technische Architektur – Konzept

Zero-Knowledge-Proof-Architektur skizzieren. Entscheidung: zentraler Treuhänder vs. dezentrales DID-Modell (W3C). Schnittstellen zu eIDAS 2.0 Wallet definieren. Kein Code – nur Architektur-Blueprint.

**Deliverables:** `Architektur-Blueprint` · Technologie-Entscheidungsmatrix · API-Skizze  
**Referenz:** US-001 · US-002 · US-004

---

> 🔒 **Gate 1 – Fundament-Freigabe**  
> Rechtsgutachten positiv · DPIA eingeleitet · Task Force vollständig · politisches Mandat vorhanden → Nur dann weiter zu Phase 2

---

## Phase 02 — Stories schärfen & MVP definieren

**Zeitraum:** Q3 2026 · **Dauer:** 3 Monate

### Jul 26 — Story-Mapping-Workshop

Alle 10 User Stories gegen drei Kriterien prüfen: technisch realisierbar, rechtlich durchsetzbar, gesellschaftlich akzeptabel. Widersprüche explizit entscheiden (z. B. US-006 vs. US-003: Whistleblower-Schutz vs. Strafverfolgung).

**Deliverables:** `Priorisierte Story-Map` · Konfliktentscheidungs-Log · ICE-Score-Tabelle  
**Referenz:** US-001 · US-002 · US-003 · US-004 · US-005 · US-006 · US-007 · US-008 · US-009 · US-010

---

### Aug 26 — MVP-Scope festlegen

MVP-Kern: US-001 (Browser-Auth) + US-004 (Maschinentoken) + US-010 (Audit-Infrastruktur). Alles andere ist Phase 3+. Technisches Proof-of-Concept mit ZKP-Bibliothek starten (kein Produktivcode).

**Deliverables:** `MVP-Scope-Dokument` · PoC-Ergebnis · Tech-Stack-Entscheidung  
**Referenz:** US-001 · US-004 · US-010

---

### Sep 26 — Öffentliche Konsultation

Bürger, NGOs und Fachöffentlichkeit werden über das Vorhaben informiert und können Feedback einreichen. Ergebnisse fließen in die Pilot-Spezifikation ein. Transparenz von Anfang an als Vertrauensaufbau.

**Deliverables:** `Konsultationsbericht` · Angepasste Anforderungen · Kommunikations-Whitepaper

---

> 🔒 **Gate 2 – MVP-Freigabe**  
> PoC erfolgreich · MVP-Scope politisch genehmigt · Konsultation abgeschlossen · kein offener Rechtskonflikt → Pilotprojekt starten

---

## Phase 03 — Kontrollierter Pilot

**Zeitraum:** Q4 2026 – Q2 2027 · **Dauer:** 9 Monate

### Okt 26 — Pilotumgebung aufsetzen

Zwei Pilotdomänen: (1) E-Government-Portal eines Bundeslandes, (2) Bildungsplattform einer Hochschule. Begrenzte Nutzerzahl: max. 50.000 Teilnehmer. Opt-in, vollständig freiwillig.

**Deliverables:** `Pilot-Infrastruktur` · Onboarding-Prozess · Monitoring-Dashboard  
**Referenz:** US-001 · US-004 · US-007

---

### Jan 27 — Treuhänderstelle rechtlich gründen

Die unabhängige Treuhänderstelle für Label-Auflösungen muss parallel zur Pilot-Laufzeit als eigenständige Körperschaft gegründet werden. Besetzung des unabhängigen Expertengremiums (US-010).

**Deliverables:** `Gründungsdokument` · Betriebshandbuch · Gremium besetzt  
**Referenz:** US-003 · US-010

---

### Apr 27 — Pilot-Midterm-Audit

Unabhängiger Sicherheitsaudit nach 6 Monaten Pilot. Penetrationstests, Datenschutzprüfung, Nutzerakzeptanzmessung. Kritische Befunde stoppen den Pilot sofort (Safe Mode US-010).

**Deliverables:** `Audit-Bericht (öffentlich)` · Schwachstellen-Log · Nutzer-Akzeptanzstudie  
**Referenz:** US-010

---

### Jun 27 — Pilot-Abschlussbericht & Gesetzgebungsimpuls

Vollständiger Ergebnisbericht wird dem Bundestag / EU-Parlament vorgelegt. Empfehlungen für das notwendige Gesetz (Identitätsverifizierungsgesetz – IVG). Keine Skalierung ohne parlamentarischen Beschluss.

**Deliverables:** `Abschlussbericht` · `Gesetzentwurf IVG` · Policy-Briefing

---

> 🔒 **Gate 3 – Pilotfreigabe für Skalierung**  
> Audit ohne kritische Befunde · Nutzerakzeptanz ≥ 70 % · Treuhänderstelle operativ · parlamentarischer Beschluss → Nationale Ausrollung

---

## Phase 04 — Skalierung & Internationalisierung

**Zeitraum:** Q3 2027 – Q4 2028 · **Dauer:** 18 Monate

### Jul 27 — Nationaler Rollout Deutschland

Schrittweise Ausweitung auf alle Bundesbehörden-Portale, dann auf verpflichtete Plattformen gemäß DSA. Rollout-Geschwindigkeit: quartalsweise Kohorten, kein Big-Bang-Launch.

**Deliverables:** `Rollout-Plan (16 Bundesländer)` · Plattform-Onboarding-Toolkit · Bürger-Helpdesk  
**Referenz:** US-001 · US-002 · US-004 · US-005

---

### Jan 28 — EU-weite Harmonisierung

Abstimmung mit EU-Partnern zur gegenseitigen Anerkennung nationaler Human-Labels via eIDAS 2.0 Wallet. Ziel: EU-weit interoperabler Standard bis Ende 2028. Maschinentokens werden EU-weit harmonisiert.

**Deliverables:** `EU-Interoperabilitäts-Framework` · eIDAS-2.0-Integration · Multilaterales Abkommen  
**Referenz:** US-004 · US-008

---

### Dez 28 — Vollbetrieb & kontinuierliches Audit

Alle Stories vollständig implementiert. Halbjährliche externe Audits (US-010) als Dauerbetrieb etabliert. Jährlicher Transparenzbericht der Treuhänderstelle wird öffentlich veröffentlicht. System gilt als produktionsreif.

**Deliverables:** `Betriebskonzept Dauerbetrieb` · Erster Jahresbericht · Lessons-Learned-Dokument  
**Referenz:** US-006 · US-007 · US-008 · US-009 · US-010

---

> ✓ **Zielzustand 2028**  
> Alle 10 User Stories produktiv · EU-Interoperabilität hergestellt · Treuhänderstelle im Dauerbetrieb · Erste internationale Kooperationen initiiert

---

## Parallele Arbeitsstränge

> Laufen phasenübergreifend durch alle 4 Phasen.

### Recht & Regulierung
- Gesetzentwurf IVG vorbereiten
- DSGVO-Konformität sichern
- EU-Koordination DSA / KI-VO
- Richterliche Verfahren definieren
- Strafrechts-Tatbestände schärfen

### Technik & Sicherheit
- ZKP-Implementierung
- Penetrationstests (laufend)
- eIDAS-2.0-Integration
- API-Standardisierung
- Safe-Mode-Implementierung

### Kommunikation & Vertrauen
- Bürger-Aufklärungskampagne
- Transparenz-Dashboard (public)
- NGO-Einbindung laufend
- Jahrestransparenzberichte
- Feedback-Kanäle offen halten

### Governance & Audit
- Treuhänderstelle aufbauen
- Expertengremium besetzen
- Halbjährliche Audits
- Audit-Log-Infrastruktur
- Internationale Abstimmung

---

## Erfolgskennzahlen (Zielwerte 2028)

| Kennzahl | Zielwert | Beschreibung |
|----------|----------|--------------|
| Nutzerakzeptanz | ≥ 75 % | der Befragten vertrauen dem System |
| Auth-Latenz | < 10 s | Verifizierungszeit pro Session |
| Falsch-Positiv-Rate | < 0,1 % | Menschen fälschl. als KI blockiert |
| Label-Auflösungen | 100 % | nur mit richterlichem Beschluss |
| Datenpannen | 0 | kritische Sicherheitsvorfälle |
| EU-Partner | ≥ 12 | Länder mit Interoperabilität 2028 |

---

## Top-Risiken

### ▲ Hohes Risiko — Politischer Widerstand / Big Tech
Große Plattformen könnten Implementierung verzögern oder juristisch anfechten.  
**Mitigation:** Frühzeitige Einbindung, klare DSA-Rechtsgrundlage.

### ◆ Mittleres Risiko — Technische Umgehung durch KI-Akteure
Deepfake-Verfahren könnten Biometrie-basierte Auth unterlaufen.  
**Mitigation:** ZKP statt Biometrie, kontinuierliche Adversarial-Tests.

### ● Niedriges Risiko — Geringe Nutzerakzeptanz
Bevölkerung lehnt Verifizierungspflicht als Überwachung ab.  
**Mitigation:** Starke Datenschutzgarantien, Opt-in-Pilot, transparente Kommunikation.

---

*PRJ-HLI-2026-001 · Stand: März 2026 · Version 1.0*
