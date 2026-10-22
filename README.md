# Dinojan Vivekanantharasa - Modern Next.js Portfolio

A modern, high-performance personal portfolio website built with **Next.js 14 (App Router)**, **TypeScript**, and **Vanilla CSS** design system.

## 🚀 Features

- **Next.js 14 App Router & React**: Lightning-fast performance, static page generation, and responsive client hydration.
- **Specialized Multi-track CV Center**: Interactive modal allowing recruiters to view and download role-tailored CVs:
  - 💼 **Software / Full-Stack Engineering** (`Dinojan_Vivekanantharasa_Software.pdf`)
  - 🤖 **AI & Machine Learning** (`Dinojan_Vivekanantharasa_AI.pdf`)
  - ☁️ **DevOps & Cloud** (`Dinojan_Vivekanantharasa_DevOps.pdf`)
  - 🧩 **Combined (Full-Stack + AI + DevOps)** (`Dinojan_Vivekanantharasa_Combined.pdf`)
  - 🧪 **QA & Testing** (`Dinojan_Vivekanantharasa_QA.pdf`)
  - 🔌 **Embedded Systems** (`Dinojan_Vivekanantharasa_Embedded.pdf`)
  - 🌐 **Networking & Infrastructure** (`Dinojan_Vivekanantharasa_Networking.pdf`)

  All CVs live in `public/assets/` and are configured in `cvTracks` in `src/data/portfolioData.ts`.
- **Professional Experience Spotlight**: Detailed overview of work at **Yarl Ventures (PVT) Ltd** (EDUS LMS, MediMan, CI/CD, AWS).
- **Academic Research Publication**: Featured peer-reviewed abstract for *AutoGradePro* (Academic Sessions 2026, University of Ruhuna, ISSN 2362-0412) with one-click citation copying.
- **Interactive Project Filtering**: Live filtering by domain (Full-Stack, AI / ML, Cloud & DevOps, QA & Testing, Mobile & Systems); a filter only appears when at least one project uses it.
- **Comprehensive Skills Matrix**: Categorized tech stacks, hot competencies, non-technical abilities, and languages.
- **Dark / Light Theme Switcher**: Modern glassmorphic theme system with smooth CSS variable transitions and `localStorage` persistence.
- **Interactive Contact Form & Direct Links**: Form validation, copy-to-clipboard email pill, and academic referee contacts. Set `NEXT_PUBLIC_WEB3FORMS_KEY` to deliver messages via Web3Forms; without it the form opens the visitor's email app pre-filled.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Vanilla CSS with modern Design Tokens & Glassmorphism
- **Icons**: Lucide React
- **Fonts**: Inter, Outfit & Fira Code

---

## 💻 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 3. Build for Production
```bash
npm run build
```

### 4. Lint and test
```bash
npm run lint
npm test
```

---

## 📊 Analytics (Google Analytics 4)

GA4 loads only when `NEXT_PUBLIC_GA_ID` is set. It's set in Vercel's **Production** environment only, so local development and preview deployments send nothing.

### What's tracked

Besides GA4's standard page views, the site sends three events. Their names live in one typed module, [`src/lib/analytics.ts`](src/lib/analytics.ts).

| Event | When it fires | Parameters |
|---|---|---|
| `contact_form_submit` | A contact message was delivered (Web3Forms confirmed it). This is the key event. Opening the email-app fallback doesn't count. | none |
| `project_link_click` | A project's Live Demo, Source Code or Model link | `project` (e.g. `lendlot`, `larkway`), `link_type` (`live`, `source`, `model`), `placement` |
| `cv_or_profile_click` | A LinkedIn or GitHub link, or a CV preview or download | `target` (`linkedin`, `github`, `cv`), `placement` (`hero`, `contact`, `footer`, `cv_modal`), `cv_track` for CVs |

**No personal data is sent.** Event parameters are fixed labels only; the site never sends a visitor's name, email address or message text. GA4 itself still collects its standard usage data (pages viewed, device, browser, approximate location) and sets analytics cookies.

### Weekly report

[`scripts/ga4_report/ga4_report.py`](scripts/ga4_report/ga4_report.py) uses the official `google-analytics-data` client to pull users, sessions, top pages and the three events. It compares them with the previous period and prints a Markdown report.

**One-time setup:**

1. In the [Google Cloud console](https://console.cloud.google.com/), pick or create a project, then enable the **Google Analytics Data API** (APIs & Services → Library).
2. Create a service account (IAM & Admin → Service Accounts → Create; it needs no project roles). Open it, then go to Keys → Add key → Create new key → JSON.
3. Save the key **outside the repo**, e.g. `%USERPROFILE%\.secrets\ga4-service-account.json`. `.gitignore` also blocks `*service-account*.json` and any JSON in `scripts/ga4_report/` in case one lands there by mistake.
4. In GA4, go to Admin → Property access management → **+** → Add users. Paste the service account's email (`…@….iam.gserviceaccount.com`), choose the **Viewer** role, untick "Notify new users by email" and click Add.
5. Find the numeric property ID under GA4 Admin → Property settings → Property details. This isn't the `G-…` measurement ID.

**Run it (PowerShell):**

```powershell
cd scripts\ga4_report
py -3 -m venv .venv
.venv\Scripts\python -m pip install -r requirements.txt
$env:GOOGLE_APPLICATION_CREDENTIALS = "$HOME\.secrets\ga4-service-account.json"

.venv\Scripts\python ga4_report.py --property 123456789          # last 7 complete days
.venv\Scripts\python ga4_report.py --property 123456789 --start 2026-10-01 --end 2026-10-14 --output "$HOME\ga4-report.md"
```

The property ID can also come from `GA4_PROPERTY_ID`. If credentials are missing, the key file isn't a service-account key, the account has no access, or the property ID is wrong, the script says so in one line and exits with code 1. With no data yet, it still prints the report, with zeros and a hint.

**Example output** (sample numbers from the test data, not real traffic):

```markdown
# Portfolio GA4 report

Property 123456789: **2026-10-15 to 2026-10-21**, compared with 2026-10-08 to 2026-10-14.

## Traffic

| Metric | This period | Previous | Change |
|---|---:|---:|---:|
| Users | 42 | 30 | +40.0% |
| Sessions | 57 | 40 | +42.5% |

## Events

| Event | This period | Previous | Change |
|---|---:|---:|---:|
| contact_form_submit (key event) | 3 | 0 | new |
| project_link_click | 25 | 20 | +25.0% |
| cv_or_profile_click | 12 | 12 | +0.0% |

## Top pages

| Page | Views | Previous |
|---|---:|---:|
| `/` | 54 | 38 |
| `/resume` | 2 | 0 |
```

The site is a single page, so "Top pages" is mostly `/`. Any other path is a 404 that someone reached through a mistyped or outdated link.

**Tests** run against a mocked client, with no network or credentials:

```powershell
.venv\Scripts\python -m pip install -r requirements-dev.txt
.venv\Scripts\python -m pytest
```

---

## 🤝 Event leads → HubSpot

[`scripts/hubspot_leads/hubspot_leads.py`](scripts/hubspot_leads/hubspot_leads.py) cleans a messy event-lead CSV and upserts the leads into HubSpot as contacts.

**Cleaning:**
- **Headers:** messy names (`E-mail`, `Email Address`, `Full Name`, `Organisation`, `Position`, …) are mapped to HubSpot's `email`, `firstname`, `lastname`, `company` and `jobtitle`. Other columns are ignored and listed.
- **Emails:** trimmed, unwrapped (`mailto:`, `<…>`), lowercased and validated. Rejected rows are reported with their line number and the reason.
- **Names:** full names are split (`Jane Doe`, `Doe, Jane`, `Jane van der Berg`), and ALL-CAPS or all-lowercase names are fixed.
- **Duplicates:** merged by email. The first row is kept, and its blanks are filled from later rows.
- **Other formats:** handles comma or semicolon delimiters, Excel's UTF-8 byte-order mark, and Windows-1252 files.

**Uploading:**
- **Endpoint:** HubSpot CRM v3 `POST /crm/v3/objects/contacts/batch/upsert`, matched on email (`idProperty=email`), 100 contacts per request.
- **Values sent:** only non-empty values, so an upload never blanks a field that's already set in HubSpot.
- **Retries:** a 429 is retried using `Retry-After`. When that header is missing, the script waits HubSpot's rate-limit window, backing off further each time. 5xx and network errors are retried the same way. The daily limit isn't retried, because waiting can't help until it resets.
- **Errors:** a bad token (401) or a missing scope (403) gives one clear line, which names the missing scope.

### HubSpot access token

HubSpot is replacing legacy private apps with **service keys**. New accounts (created on or after 28 Sep 2026) can't create legacy private apps, and existing accounts lose the option on 26 Oct 2026. Existing private-app tokens keep working.

1. In HubSpot, go to **Development → Keys → Service keys → Create service key**. You need to be a super admin or have Developer tools access.
2. Name it (e.g. `Lead import`), click **Add new scope**, select **`crm.objects.contacts.read`** and **`crm.objects.contacts.write`**, then click **Create**.
3. Open the key, click **Show → Copy**, and set it for the current terminal only. Never put it in a file in the repo:
   ```powershell
   $env:HUBSPOT_ACCESS_TOKEN = "pat-..."
   ```

### Run it (PowerShell)

```powershell
cd scripts\hubspot_leads
py -3 -m venv .venv
.venv\Scripts\python -m pip install -r requirements.txt

.venv\Scripts\python hubspot_leads.py sample_leads.csv --dry-run   # clean + plan, sends nothing
.venv\Scripts\python hubspot_leads.py leads.csv                    # clean + upsert to HubSpot
```

The cleaned file is written next to the input as `<name>.clean.csv`; use `--output` to choose another path. `.gitignore` blocks lead CSVs (except the fake sample), every `*.clean.csv`, `*.token` files and `.env.*` files, because real lead data is personal data.

**Example: `--dry-run` on the sample** (fake `@example.com` leads only):

```text
Rows in:     14
Valid:       6  (written to sample_leads.clean.csv)
Duplicates:  2  (merged by email)
Invalid:     5
  line 5: missing email
  line 6: email must contain exactly one @ (not-an-email)
  line 7: invalid email format (sofia.marquez@example)
  line 12: email must contain exactly one @ (two@@example.com)
  line 14: email contains a space (maya.ross @example.com)
Blank rows:  1  (skipped)
Columns:     "E-mail Address" -> email, "Full Name" -> firstname + lastname, "Company Name" -> company, "Job Title" -> jobtitle
Ignored:     Phone, Notes

Dry run: would upsert 6 contacts to HubSpot in 1 batch(es) of up to 100, matched on email. Nothing was sent.
```

**Tested against a real (free) HubSpot account** with the sample file. The first run reported `6 created, 0 updated`. Running it again reported `0 created, 6 updated`: the upsert matched the same contacts by email instead of duplicating them.

### As an MCP tool

[`mcp_server.py`](scripts/hubspot_leads/mcp_server.py) exposes the same functions over MCP (stdio) as two tools:
- **`clean_leads`** cleans a CSV; nothing leaves the machine.
- **`upload_leads`** is a **dry run unless called with `dry_run: false`**.

The token is read from the server's own environment and is never a tool argument, so it can't end up in a model's context. Only `.csv` files can be read or written. To add it to Claude Code:

```powershell
claude mcp add hubspot-leads -e HUBSPOT_ACCESS_TOKEN=$env:HUBSPOT_ACCESS_TOKEN -- "$PWD\.venv\Scripts\python.exe" "$PWD\mcp_server.py"
```

`-e` saves the token in Claude Code's own config file in your user profile. That's outside the repo, but it's stored in plain text, so rotate the key if that machine is shared or compromised.

**Tests** use a fake HTTP session (and the MCP SDK's own in-process client), so they need no network or token:

```powershell
.venv\Scripts\python -m pip install -r requirements-dev.txt
.venv\Scripts\python -m pytest
```

---

## 📄 License
This project is open-source and available under the MIT License.
