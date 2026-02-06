# Nexus UI Kit & Gemini AI Architect

Nexus is a high-performance, modular React component library built with Tailwind CSS and Atomic Design principles. It features a live "AI Architect" playground powered by Google Gemini, allowing for instant UI prototyping and real-time code execution.

## 🚀 Key Features

- **Nexus UI Library**: A comprehensive set of components including Buttons, Cards, Inputs, Toasts, Terminal, and more.
- **AI Architect**: A sophisticated playground that generates and renders UI components on the fly.
- **Multi-Environment Support**: Toggle between TypeScript, JavaScript, and pure HTML environments.
- **Styling Options**: Choose between Tailwind CSS (utility-first) or Standard CSS (scoped) generation.
- **Live Preview**: Real-time rendering of generated React components using Babel Standalone.
- **Dark Mode First**: Optimized for high-contrast, professional developer experiences.

## 🛠 Tech Stack

- **Framework**: React 19+
- **Styling**: Tailwind CSS
- **AI Engine**: Google Gemini 3 (Flash & Pro)
- **Runtime Compilation**: Babel Standalone
- **Architecture**: Atomic Design (Atoms, Molecules, Organisms)

## 📁 Project Structure

```text
.
├── components/          # React Components
│   ├── ui/              # Atom & Molecule level UI primitives
│   ├── GeminiPlayground.tsx # AI Architect Interface
│   └── Showcase.tsx     # Design System Documentation
├── services/            # API & External Logic
│   └── geminiService.ts # Gemini Pro/Flash Integration
├── App.tsx              # Root Application Logic
├── types.ts             # Global TypeScript Definitions
├── utils.ts             # Performance & UI Helpers
└── index.tsx            # Application Entry Point
```

## 🤖 AI Architect Configuration

The AI Architect allows for granular control over output:

1.  **Language Selection**: 
    - `React (TS)`: Generates modern TypeScript components with strict typing.
    - `React (JS)`: Generates clean JavaScript components.
    - `HTML Only`: Generates raw HTML/CSS for non-React contexts.

2.  **Styling Selection**:
    - `Tailwind`: Utilizes the full power of Tailwind's utility classes.
    - `CSS`: Generates standard scoped CSS or style objects.

## 🚦 Getting Started

1. Ensure your environment has the `API_KEY` variable set.
2. The application will automatically connect to the Gemini API.
3. Use the **Showcase** tab to explore the existing component library.
4. Use the **AI Architect** tab to generate new UI patterns using natural language.

## 📜 License

MIT - Built for the Nexus ecosystem.
