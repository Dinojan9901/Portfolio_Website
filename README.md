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

---

## 📄 License
This project is open-source and available under the MIT License.
