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

## 📄 License
This project is open-source and available under the MIT License.
