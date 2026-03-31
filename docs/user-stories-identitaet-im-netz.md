# User Stories – Identität im Netz

> Product Backlog · 2026  
> Mit dem Aufkommen generativer KI wird die Unterscheidung zwischen Mensch und Maschine im Netz nahezu unmöglich. Diese User Stories adressieren die Notwendigkeit einer gesetzlichen, technischen und ethischen Grundlage für eine verifizierte, dennoch anonyme digitale Identität.

---

## US-001 — Browser-Authentifizierung vor dem Surfen

**Rolle:** Internetnutzer / Bürgerin  
**Priorität:** Kritisch

### Story
> *Als Internetnutzerin möchte ich mich einmalig pro Browser-Session über ein staatlich anerkanntes, anonymes Verfahren als Mensch identifizieren können, damit meine Aktivitäten im Netz rechtlich einem realen Menschen zugeordnet werden können, ohne dass meine persönlichen Daten öffentlich sichtbar sind.*

### Akzeptanzkriterien
- [ ] Der Authentifizierungsprozess dauert maximal 10 Sekunden und ist barrierefrei.
- [ ] Es wird kein Klarname gespeichert – nur ein anonymes, kryptografisches „Human-Label" wird übertragen.
- [ ] Der Browser zeigt nach erfolgreicher Authentifizierung ein standardisiertes Symbol (z. B. „✓ Mensch verifiziert") an.
- [ ] Ohne Authentifizierung sind nur öffentlich-rechtliche Basisdienste (Notfall, Behörden) erreichbar.
- [ ] Das Label ist nicht zurückverfolgbar durch Dritte, nur durch autorisierte Strafverfolgungsbehörden mit Richterbeschluss.

---

## US-002 — Plattformseitige KI-Erkennung & Human-Label-Prüfung

**Rolle:** Plattformbetreiber / Online-Dienst  
**Priorität:** Hoch

### Story
> *Als Betreiber einer Online-Plattform möchte ich für jeden eingehenden Request automatisch prüfen können, ob ein gültiges Human-Label vorliegt, damit ich KI-gesteuerte Massenaktionen (z. B. Fake-Kommentare, Spam, Manipulation) technisch und rechtssicher blockieren kann.*

### Akzeptanzkriterien
- [ ] Eine standardisierte API-Schnittstelle ermöglicht die Label-Validierung in unter 50 ms.
- [ ] Requests ohne gültiges Human-Label werden mit HTTP 451 (Gesetzlich nicht verfügbar) zurückgewiesen.
- [ ] Das System unterscheidet zwischen menschlichen Nutzern und autorisiert betriebenen KI-Agenten mit eigenem Maschinentoken.
- [ ] Plattformen haften nicht für blockierte Inhalte, sofern sie die Prüfpflicht gemäß Gesetz erfüllen.
- [ ] Logs enthalten keine personenbezogenen Daten, nur anonymisierte Label-Hashes.

---

## US-003 — Rückverfolgbarkeit bei strafbaren KI-Handlungen

**Rolle:** Strafverfolgungsbehörde / Staatsanwaltschaft  
**Priorität:** Kritisch

### Story
> *Als Staatsanwalt möchte ich bei nachgewiesener strafbarer Handlung, die über einen KI-Dienst ausgeführt wurde, das anonyme Human-Label per richterlichem Beschluss in eine reale Identität auflösen können, damit Täter rechtlich verfolgt und Opfer geschützt werden können, ohne dass anlasslose Massenüberwachung stattfindet.*

### Akzeptanzkriterien
- [ ] Die Auflösung eines Labels ist ausschließlich mit richterlichem Beschluss und konkretem Anfangsverdacht möglich.
- [ ] Jede Anfrage zur Label-Auflösung wird in einem unveränderlichen Audit-Log erfasst und unabhängig geprüft.
- [ ] Die Auflösung erfolgt innerhalb von 24 Stunden nach Beschluss durch eine zentrale, unabhängige Treuhänderstelle.
- [ ] KI-Anbieter sind verpflichtet, bei der Nutzung ihrer Dienste für strafbare Zwecke eine Prompt-Protokollierung (verschlüsselt, gesetzeskonform) vorzuhalten.
- [ ] Betroffene werden nach Abschluss des Verfahrens über die Auflösung informiert, sofern dies den Ermittlungszweck nicht gefährdet.

---

## US-004 — Maschinentoken für legitime KI-Agenten

**Rolle:** KI-Entwickler / Unternehmen  
**Priorität:** Hoch

### Story
> *Als Entwickler eines KI-Agenten möchte ich meinen Dienst mit einem offiziellen Maschinentoken registrieren und kennzeichnen können, damit mein KI-Agent transparent als solcher erkennbar ist, rechtlich operieren darf und nicht fälschlicherweise als menschlicher Akteur behandelt oder für illegale Zwecke missbraucht wird.*

### Akzeptanzkriterien
- [ ] Jeder KI-Agent benötigt ein behördlich registriertes Maschinentoken mit Ablaufdatum und Verwendungszweck.
- [ ] Das Token ist für Empfänger-Plattformen maschinenlesbar und unterscheidet KI von Mensch eindeutig.
- [ ] KI-Agenten ohne Maschinentoken werden wie nicht-authentifizierte Nutzer behandelt und blockiert.
- [ ] Ein öffentliches Register listet alle zugelassenen KI-Agenten mit Betreiberangabe (DSGVO-konform).
- [ ] Bei Missbrauch des Tokens haftet der registrierte Betreiber nach geltendem Recht.

---

## US-005 — Altersadaptiertes Human-Label für Schutzpersonen

**Rolle:** Minderjährige / Schüler  
**Priorität:** Mittel

### Story
> *Als minderjähriger Nutzer möchte ich ein speziell geschütztes Human-Label erhalten, das mein Alter (ohne genaues Geburtsdatum) als Kategorie enthält, damit Plattformen automatisch strengere Kinderschutzmaßnahmen anwenden und ich nicht von KI-Systemen oder Erwachsenen unbemerkt manipuliert oder belästigt werden kann.*

### Akzeptanzkriterien
- [ ] Das Label enthält ausschließlich die anonyme Altersgruppe (z. B. „unter 18"), keine weiteren Daten.
- [ ] Plattformen mit altersgeschützten Inhalten lehnen Zugang bei Minderjährigen-Label automatisch ab.
- [ ] KI-Chatbots erkennen das Label und aktivieren strikte Gesprächsfilter sowie Meldepflichten bei Grenzwertverstößen.
- [ ] Eltern oder Erziehungsberechtigte müssen die initiale Label-Erstellung für Kinder unter 14 Jahren autorisieren.
- [ ] Das System ist kompatibel mit bestehenden EU-Regelungen (DSA, DSGVO, KI-Verordnung).

---

## Technologischer Kontext

Alle Stories basieren auf dem Prinzip der **anonymen Verifikation** – vergleichbar mit Zero-Knowledge-Proofs. Kein zentrales System speichert eine Verknüpfung zwischen Identität und Verhalten. Die gesetzliche Grundlage muss in enger Abstimmung mit EU-Datenschutzrecht (DSGVO), dem Digital Services Act (DSA) und der EU-KI-Verordnung entwickelt werden. Technische Umsetzung sollte auf offenen Standards (W3C DID, eIDAS 2.0) aufbauen.
