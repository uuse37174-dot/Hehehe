# HackRoad - The Ultimate Ethical Hacking Roadmap & Learning Platform

Welcome to **HackRoad**, an offline-first, highly detailed, gamified interactive learning syllabus designed to guide aspiring cybersecurity professionals from Level 1 (Beginner Foundations) to Level 100 (Expert Red Teaming and Bug Bounty Mastery).

---

## 🚀 Key Architectural Features

- **100% Frontend Only**: Zero server requirements, no cloud backends, no logins, and zero telemetry logs.
- **Durable Local State Persistence**: All educational stats, level completions, quiz scorecards, and research notebook records are synchronized offline using **Zustand with localStorage persistence**.
- **100 Progressive Levels**: Tracks progressive security concepts mapped across 4 tracks:
  - **Levels 1-25**: Beginner Foundations (Linux commands, OSI/TCP models, cryptology)
  - **Levels 26-55**: Intermediate Web & Network Hacking (Port scans, Nmap parameters, OWASP Web vulnerabilities)
  - **Levels 56-85**: Advanced Exploitation & Post-Exploitation (Assembly registers, Buffer overflows, Mobile Frida hooking, S3 buckets)
  - **Levels 86-100**: Expert Red Teaming & Bug Bounty Mastery (Active Directory, reporting)
- **50-Question Assessment Per Level**: Integrated assessment engine compiling custom challenge scenarios (verifying code snips, auditing logs, identifying injection types). Requires a minimum **70% score (35/50)** to unlock target apps.
- **Interactive Terminal Sandbox Emulator**: Allows users to input realistic terminal operations (like scanning with Nmap, dump tables via SQLmap, navigate Linux directories) to trace vulnerabilities.
- **Offline Research Scratchpad**: Built-in notepad per level, allowing users to compile their own local security notebook and keep it stored safe offline.

---

## 🛠️ Tech Stack & Dependencies

- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Animations**: Framer Motion (`motion/react`)
- **Icons**: Lucide React
- **Ambient Style**: Custom-tailored canvas-based dynamic falling Matrix binary code background.

---

## 💻 How to Run the Project Local

1. Ensure you have **Node.js** (v18+) and **npm** installed.
2. In the project root, install all required dependencies:
   ```bash
   npm install
   ```
3. Boot up the local development server:
   ```bash
   npm run dev
   ```
4. Open the development link (usually `http://localhost:3000`) in your web browser.

---

## 📂 Codebase File Layout

- `/src/types.ts`: Master TypeScript type specifications for roadmap levels, quiz questions, and state.
- `/src/store.ts`: State container managing level completed lists, XP totals, scorecards, and notes.
- `/src/data/topics.ts`: Comprehensive encyclopedia of security descriptions, analogies, syntax structures, and mitigations.
- `/src/data/questions.ts`: Procedural quiz engine compiling exactly 50 challenging multiple-choice questions for each of the 100 levels.
- `/src/data/levels.ts`: Metadata catalog compiling 100 targets (Wikipedia, GitHub, Stripe, Discord, AWS) and terminal emulator rules.
- `/src/components/TerminalSimulator.tsx`: Interactive command line sandbox interpreter.
- `/src/components/HackerConfetti.tsx`: custom neon-green matrix character celebration particle burst.

---

## 🛠️ How to Extend HackRoad

### 1. Adding a New Security Topic
Open `/src/data/topics.ts`, create a new unique ID under the `TOPICS` dictionary, and satisfy the `TopicDetail` interface:
```typescript
my_custom_topic: {
  id: "my_custom_topic",
  title: "My Custom Title",
  category: "Web / Network",
  analogy: "A short intuitive comparison...",
  explanation: "Deep technical dive...",
  realWorldExample: "A real audit case...",
  commands: [{ cmd: "tool -flag", desc: "Description..." }],
  tools: ["ToolName"],
  prevention: "How developers resolve this vulnerability..."
}
```

### 2. Handcrafting Custom Questions
Open `/src/data/questions.ts` and add questions directly under the matched topic category in the `MASTER_QUESTIONS` object. The procedural quiz compiler automatically prioritizes master hand-coded items.

---

## 🛡️ Ethical Code & Legal Disclaimer

**HackRoad is built strictly for defensive, educational, and authorized security auditing purposes.** 

Accessing computer systems without explicit, written legal authorization from the respective system owner is a serious crime under laws like the **CFAA** (United States) and the **Computer Misuse Act 1990** (United Kingdom). 

Always conduct tests strictly under official **Bug Bounty VDP (Vulnerability Disclosure Policies)** or within locally-hosted virtual sandboxes. The authors and developers of HackRoad bear no responsibility or liability for unauthorized actions or damage resulting from the educational material contained herein.
