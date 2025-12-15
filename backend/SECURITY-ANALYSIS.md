# SECURITY-ANALYSIS.md

Säkerhetsanalys för User CRUD API (Node.js + Express + TypeScript)

## 📌 Översikt

Denna säkerhetsanalys beskriver de mest relevanta säkerhetshoten för applikationen “User CRUD API”.  
Applikationen består av ett REST API (GET, POST, DELETE), en enklare frontend, samt in-memory datalagring.  
Analysen utgår från OWASP Top 10.

---

## ⚠️ Identifierade hotbilder

### 1. Injection Attacks

**Risknivå:** Hög  
**Beskrivning:**  
Applikationen accepterar användarinmatning utan validering i POST /users. Detta innebär risk för:

- JSON injection
- Prototype pollution
- Skadliga textsträngar (t.ex. `<script>alert(1)</script>`)

**Konsekvens:**

- Manipulation av API-data
- Oväntade krascher (DoS)

**Åtgärder:**

- Inputvalidering/sanering
- Införa JSON-schema för POST-body

---

### 2. Broken Access Control

**Risknivå:** Hög  
**Beskrivning:**  
API:et saknar åtkomstkontroller. Vem som helst kan:

- skapa användare (POST)
- radera användare (DELETE)
- läsa alla användare (GET)

**Konsekvens:**

- Obehöriga ändringar
- Dataförlust och sabotage

**Åtgärder:**

- Införa behörighetskontroll (auth)
- Begränsa DELETE till administratörer

---

### 3. Sensitive Data Exposure

**Risknivå:** Medel  
**Beskrivning:**  
API:et returnerar namn och e-post öppet via GET /users.

**Konsekvens:**

- Personuppgiftsläckage
- GDPR-relaterade risker

**Åtgärder:**

- Maskera e-post i UI
- Kräva autentisering för GET

---

### 4. Security Misconfiguration

**Risknivå:** Hög  
**Beskrivning:**  
Servern saknar följande skydd:

- Rate limiting
- CORS-begränsningar
- HTTP-säkerhetsheaders
- Centralt felhanteringslager

**Konsekvens:**

- DoS-attacker
- Informationsläckage

**Åtgärder:**

- Använd `helmet`, `cors`, `express-rate-limit`
- Inför en global error-handler

---

### 5. Avsaknad av Inputvalidering

**Risknivå:** Hög  
**Beskrivning:**  
POST/DELETE endpoints kontrollerar inte datatyper eller format.

**Konsekvens:**

- Felaktig data
- Ökad attackyta

**Åtgärder:**

- Validera name/email
- 400-response vid fel format

---

### 6. Brist på loggning och övervakning

**Risknivå:** Medel  
**Beskrivning:**  
Raderingar loggas inte strukturerat. Misstänkt aktivitet kan inte spåras.

**Konsekvens:**

- Svårt att upptäcka attacker
- Ingen revisionsspårning

**Åtgärder:**

- Införa audit-logging
- Logga DELETE-operatoner

---

## 🧪 Sammanfattning av risknivåer

| Hotbild                   | Risknivå | Kommentar                                |
| ------------------------- | -------- | ---------------------------------------- |
| Injection                 | Hög      | Ingen validering av POST-body            |
| Broken Access Control     | Hög      | API helt öppet                           |
| Sensitive Data Exposure   | Medel    | E-post exponeras                         |
| Security Misconfiguration | Hög      | Saknar grundläggande säkerhetsmiddleware |
| Missing Input Validation  | Hög      | Kan krascha servern                      |
| Lack of Logging           | Medel    | Ingen spårbarhet                         |

---

## 🛡 Rekommenderade åtgärder

- Lägg in valideringssteg för POST/DELETE
- Inför autentisering
- Lägg till Helmet + CORS + Rate limiting
- Strukturerad loggning av kritiska händelser
- Testa endpoints med säkerhetsverktyg (t.ex. OWASP ZAP)

---

## ✔ Slutsats

Även om applikationen är enkel och körs lokalt, är samma sårbarheter relevanta som för riktiga webbtjänster.  
De mest kritiska riskerna är brist på inputvalidering och avsaknad av åtkomstkontroll.  
Genom föreslagna mitigation-åtgärder kan API:t uppnå en grundläggande säkerhetsnivå.
