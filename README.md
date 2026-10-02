# 🐾 Petling — Kids Voice AI Learning Companion

> **A playful, voice-powered bilingual learning app for early learners (Ages 3–8). Practice words, math, and stories in English and Arabic with a 3D companion that hatches and grows with you!**

[![Next.js](https://img.shields.io/badge/Next.js-16.3.8-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v3-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Kid-Safe](https://img.shields.io/badge/COPPA-Compliant%20%E2%80%A2%20Ad--Free-2e7d32)](https://github.com)

---

## 🌟 What is Petling?

**Petling** turns early learning into a joyful, conversational adventure. Rather than passively tapping buttons, children speak naturally with their personal 3D Petling companion. 

As kids practice daily phonics, vocabulary, numbers, and bedtime stories, their Petling companion hatches from a magical egg, levels up, celebrates achievements with strawberry feasts, and unlocks new evolutionary stages.

---

## ✨ Key Features & What Does It Do?

- 🗣️ **Conversational Voice Practice:** Real-time bilingual voice interaction powered by the browser's Web Speech API (`SpeechRecognition` & `SpeechSynthesis`) in both **English** and **Arabic (العربية)**.
- 🐣 **Hatch & Grow Evolution:** Children start with an egg that hatches into a baby Petling and levels up through daily consistency.
- 🍓 **Interactive Feeding & Vitals Mini-Game:** Keep your Petling happy by feeding them strawberries earned from completed quests.
- 🎯 **Daily Micro-Quests:** Phonics adventures, addition safaris (1 to 10), and moral storybooks.
- 📱 **100% Responsive Design:** Smooth, tactile interface designed for mobile phones, tablets, and desktop displays with an accessible drawer navigation.
- 🛡️ **Child-Safe by Design:** Zero ads, no public storage of voice recordings, and fully COPPA-compliant parent dashboard.

---

## 🐾 Meet the Petling Universe

| Character | Species | Specialty | Favorite Treat | Personality |
|:---:|:---:|:---:|:---:|:---:|
| **Pip** | Coral Bear | Storytelling & Early Vocabulary | Sweet Strawberries 🍓 | Warm, Encouraging, Curious |
| **Momo** | Baby Dinosaur | Math Safari & Logic Puzzles | Juicy Watermelons 🍉 | Adventurous, Brave, Energetic |
| **Zuzu** | Star Alien | Bilingual Phonics & Science | Glowing Star Apples 🍏 | Inventive, Playful, Quick-witted |
| **Lulu** | Sunny Owl | Rhymes, Poetry & Reading | Golden Honey Puffs 🍯 | Wise, Cheerful, Bubbly |
| **Bumble** | Cloud Bee | Music & Alphabet Rhythm | Sweet Clover Dew 🌼 | Bouncy, Joyful, Musical |
| **Toby** | Peaceful Otter | Calm Mind & Patient Listening | River Berries 🫐 | Gentle, Soulful, Patient |

---

## 🚀 Application Screens

- **🏡 Home (`/`)**: Hero mascot showcase with animated tactile aura, value proposition cards, quick audio launcher, and character directory.
- **🐾 Choose Pet (`/choose`)**: Interactive companion selection stage with live voice pitch previews and personality dossiers.
- **🌟 Dashboard (`/dashboard`)**: Daily command center with pet mood status, strawberry feeding mini-game, growth progress bars, and daily learning quests.
- **💬 Talk HUD (`/talk`)**: Immersive full-screen voice call HUD with live waveform visualizer, prompt cues, hint helpers, and interactive speech recognition.
- **💡 About & Safety (`/about`)**: Explains the 3-step hatch-and-grow methodology and our commitment to children's digital privacy.
- **👤 Profile (`/profile`)**: Weekly learning summaries, streak calendar, audio time limit controls, and parent settings.
- **⭐ Upgrade (`/upgrade`)**: Milestone celebrations and full conversational speech unlock tiers.

---

## 🛠️ Technology Stack

| Layer | Technology | Details |
|:---|:---|:---|
| **Framework** | **Next.js 16.3.8** | App Router, Turbopack, React 19 Server & Client Components |
| **Language** | **TypeScript 5.x** | Fully typed interfaces, props, and buddy definitions |
| **Styling** | **Tailwind CSS v3** | Custom tactile color tokens, pill shapes, 3D button shadows |
| **Design System** | **Stitch AI Tokens** | Palette tokens (`primary-container #f28b6b`, `surface #fcf9f8`, `mint #7BC67B`, `lavender #B79CFF`) |
| **Typography** | **Google Fonts** | `Rubik` (Chunky playful headlines) & `Quicksand` (Friendly readable body text) |
| **Voice & Speech** | **Web Speech API** | `SpeechRecognition` / `webkitSpeechRecognition` & `speechSynthesis` |
| **Assets & Icons** | **Vector SVGs & 3D Renders** | Bespoke hand-crafted SVG icon components and optimized 3D mascot sprites |

---

## 📁 Project Directory Structure

```text
petling/
├── public/
│   └── characters/           # 3D mascot artwork (pip, momo, zuzu, lulu, bumble, toby, egg, logo)
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Root HTML layout with Google Fonts & global Navbar/Footer
│   │   ├── globals.css       # Core typography, keyframe animations & Tailwind directives
│   │   ├── page.tsx          # Screen 1: Home page & hero
│   │   ├── choose/page.tsx   # Screen 2: Choose Petling & voice preview
│   │   ├── dashboard/page.tsx# Screen 3: Dashboard & strawberry feeding
│   │   ├── talk/page.tsx     # Screen 4: Voice talk HUD & audio visualizer
│   │   ├── about/page.tsx    # Screen 5: About & 100% kid-safety guide
│   │   ├── profile/page.tsx  # Screen 6: Parent settings & learner profile
│   │   └── upgrade/page.tsx  # Screen 7: Evolutionary tier unlock
│   └── components/
│       ├── Navbar.tsx        # Responsive header with mobile hamburger drawer
│       ├── Footer.tsx        # Kid-safe badges, language tags & footer nav
│       └── Icons.tsx         # Clean vector SVG icons (Mic, Volume, Check, Menu, Close, etc.)
├── tailwind.config.ts        # Custom tactile color palette & typography tokens
├── postcss.config.mjs        # PostCSS configuration
└── package.json              # Project scripts & dependencies
```

---

## ⚡ Getting Started

### 1. Prerequisites
- **Node.js** 18.17+ or 20+
- **npm**, **pnpm**, or **yarn**

### 2. Installation
Clone the repository and install dependencies:

```bash
git clone https://github.com/mohammadrahal/petling.git
cd petling
npm install
```

### 3. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
To generate an optimized production bundle:

```bash
npm run build
npm run start
```

---

## 🔒 Child Safety & Privacy Commitment

- 🚫 **No Advertisements:** Zero third-party behavioral tracking or advertisements.
- 🛡️ **COPPA & GDPR-K Compliant:** Explicit parental gate for all account management and external settings.
- 🎙️ **On-Device Audio Handling:** Interactive voice recognition is handled through browser APIs without permanently saving raw voice snippets.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
