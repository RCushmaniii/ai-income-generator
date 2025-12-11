# CushLabs Income Planner

A beautiful, bilingual income planning tool built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.sample .env.local
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## 📦 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 🛠️ Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **React Hot Toast** - Toast notifications
- **Space Grotesk & Source Serif 4** - Custom fonts

## 📁 Project Structure

```
ai-income-generator/
├── app/
│   ├── layout.tsx       # Root layout with fonts and providers
│   ├── page.tsx         # Home page
│   ├── providers.tsx    # Global providers (toast, error boundary)
│   └── globals.css      # Global styles with Tailwind directives
├── components/
│   ├── Header.tsx       # Site header
│   └── ErrorBoundary.tsx # Error boundary component
├── lib/                 # Utility functions (to be added)
├── prd.md              # Product Requirements Document
├── next.config.js      # Next.js configuration
├── tailwind.config.js  # Tailwind CSS with CushLabs design tokens
├── tsconfig.json       # TypeScript configuration
└── package.json        # Project dependencies
```

## 🎨 Design System

### CushLabs Brand Colors

- **Background**: `#000000` (black)
- **Foreground**: `#FFFFFF` (white)
- **Accent**: `#FF6A3D` (orange)
- **Muted**: `#AAAAAA` (light gray)
- **Muted Strong**: `#888888` (medium gray)

### Typography

- **Headings**: Space Grotesk
- **Body**: Source Serif 4

## 📝 Development Phases

See `prd.md` for the complete product requirements and phased implementation plan.

**Current Status**: Phase 1 Complete ✅
- Next.js 14 with App Router
- TypeScript configured
- Tailwind with CushLabs design tokens
- Error boundary and toast system
- Custom fonts loaded

**Next**: Phase 2 - Build static UI for income planner

## 📝 License

MIT
