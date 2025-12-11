Love this direction. Let’s tune it like a _product you’d actually be proud to show a CTO_ and then break it into build phases with ready-to-paste AI prompts + IT-manager checklists.

---

## 0. Product Overview

### 0.1 Vision

Create a beautiful, bilingual income planning tool that shows how rate, hours, taxes, and vacation affect yearly earnings — built with a world-class UX and CushLabs.ai branding as a flagship portfolio piece.

### 0.2 Product Type

Public, free, calculator-style web app

No login, no user accounts

Hosted under CushLabs.ai (e.g., /income-planner)

0.3 Target Users

Freelancers and solo professionals (teachers, consultants, developers, coaches)

SMB owners thinking in terms of time-based revenue

Bilingual users in Mexico / U.S. working in MXN and/or USD

0.4 Core Use Cases

Forward planning:
“If I charge X per hour and work Y hours per week, how much will I earn per month/year?”

What-if scenarios:
“What happens if I raise my rate, work fewer hours, or reduce vacation?”

Target-driven planning:
“If I want to earn X per year after tax, how many hours per week or what hourly rate do I need?”

Bilingual money clarity:
“I want to see this clearly in MXN and USD, in English and Spanish.”

0.5 Business Role

Portfolio piece: Demonstrates CushLabs’ ability to build clean, performant, interactive tools.

Trust builder: Shows Robert as a practical, numbers-focused builder.

Future platform: Base for potential niche planners (e.g., “Freelance Teacher Income Planner”).

### 0.6 Calculation Specifications

**Formulas:**

- Billable weeks: `52 - vacationWeeks` (min: 1)
- Annual gross: `hourlyRate × hoursPerWeek × billableWeeks`
- Annual net: `annualGross × (1 - taxRate/100)`
- Monthly net: `annualNet / 12`
- Weekly net: `annualNet / 52`
- Daily net: `weeklyNet / 5`

**Validation Ranges:**

- Hourly rate: 50–5000
- Hours/week: 0–60
- Vacation weeks: 0–12
- Tax rate: 0–50%

### 0.7 Default Configuration

- Hourly rate: 500 MXN / 25 USD
- Hours per week: 40
- Vacation weeks: 2
- Tax rate: 25%
- Currency: MXN (detect from locale)
- Language: EN (detect from browser)

---

## 1. PRD Review & Upgrades

Your original PRD is already strong: clear scope, good math, nice UX direction, and aligned with CushLabs branding. To make it “world-class” and safe we just need to tighten:

- **Security & privacy**
- **Error handling & validation**
- **Performance & optimization**
- **Delightful UI touches**
- **Toast messaging / feedback**

Below are _additions_ you can append to the PRD; you don’t need to rewrite everything.

---

### 1.1 Security & Privacy Enhancements

Add this section to the PRD:

**11. Security & Privacy**

- No authentication, no backend writes in V1.
- No collection of names, emails, or free-form text.
- If analytics is used:
  - Only anonymous event tracking (no personal identifiers).
  - Respect DNT (Do Not Track) if feasible.
  - Brief notice in footer: “Anonymous usage metrics only.”

- All inputs are numeric; no HTML rendering from user input (prevents XSS).
- Clamp and sanitize all numeric values on input and before calculations:
  - If value is `NaN`, negative, or out of bounds, fall back to safe defaults and show a non-invasive toast.

- Errors are logged to console in dev only; optional integration with an error tracking service (e.g., Sentry) in production via `SENTRY_DSN` env var.

---

### 1.2 Error Handling & Validation

Add:

**12. Error Handling & Validation**

- Every numeric input:
  - Has min/max constraints and helper text.
  - On invalid input:
    - Field shows a small inline validation message.
    - Values are clamped silently, and a subtle toast appears (e.g., “We adjusted your hourly rate to the allowed range.”).

- Calculation layer is isolated in a pure function:
  - Takes a strongly typed config object.
  - Returns either a valid result object or an error object.
  - UI gracefully handles error case (shows friendly message and defaults).

- Global error boundary (if using React):
  - Catches unexpected rendering errors.
  - Shows a generic, branded error screen: “Something went wrong. Please refresh.”

---

### 1.3 Performance & Optimization

Add:

**13. Performance & Optimization**

- Built with **Next.js + React + TypeScript + Tailwind** (or Astro with React islands; pick one and stick with it).
- Static/SSR generation for the page: fast TTFB and full SEO.
- Minimal JS:
  - Only calculator + chart is interactive.
  - No large UI component libraries; rely on Tailwind and small primitives.

- Charting:
  - Use a small footprint chart library (e.g., Recharts) or custom SVG.
  - Lazy-load chart component (dynamic import) after first user interaction if necessary.

- Lighthouse targets:
  - Performance: ≥ 90
  - Accessibility: ≥ 90
  - Best Practices: ≥ 90
  - SEO: ≥ 90

---

### 1.4 UX Delight & Innovative Features

Add:

**14. World-Class UX & Delight Features**

- Micro animations:
  - Smooth transitions when cards update (e.g., opacity/scale).
  - Slider thumb and chart marker animations.

- “What-if” suggestion strip:
  - Non-interactive prompts like:
    - “If you increased your hourly rate by 10%, you’d earn +X per year.”
    - “Reducing your hours by 5/week with the same income requires Y/hour.”

- Local scenario memory:
  - Use `localStorage` to remember last used configuration (no PII).
  - On reload, restore last scenario and gently note: “Loaded your last plan from this browser.”

- Shareable URL:
  - Optional: encode current configuration in query string (`?rate=500&hours=20&tax=0.25…`), so users can share a link to a specific plan.

- Bilingual copy polish:
  - All helper text written with SMB-friendly tone in both EN/ES.
  - No machine-y translations: manual, human-sounding phrasing.

---

### 1.4.5 Additional Features

recommend building this in phases:

Phase 3B (Next) - Basic Forecasting

Add view toggle to Income Planner
Create 3-column scenario builder
Range bar visualization
Basic insights
Phase 3C - Advanced Charts

Monthly projection chart (Recharts)
Seasonal variation modeling
Rate sensitivity analysis
Phase 3D - AI Enhancement

Personalized recommendations
Industry benchmarking

### 1.5 Toast Messages & Feedback

Add:

**15. Feedback & Toast Messages**

Use a global toast system (e.g., `react-hot-toast` or a small custom context). Required toasts:

- Language/currency changes:
  - “Language set to English.” / “Idioma cambiado a español.”
  - “Currency set to MXN.” / “Moneda cambiada a USD.”

- Reset to defaults:
  - “Inputs reset to default values.”

- Validation clamping:
  - “We adjusted your values to stay within a realistic range.”

- Target helper:
  - If target income is impossible given extreme constraints:
    - “With your current limits, this target is not realistic. Try increasing your hours or rate.”

- Error (rare):
  - “Something went wrong calculating your plan. We’ve reset to safe defaults.”

Toasts must be:

- Non-blocking (bottom-right or top-right).
- Auto-dismiss after a few seconds.
- Accessible (ARIA live region).

---

## 2. Phased Project Plan (with AI Prompts & IT Manager Inputs)

Assume **Next.js + TypeScript + Tailwind + Recharts**, deployed to Vercel. (If you want this in Astro instead, we can swap the stack later.)

We’ll go through 5 phases:

1. Architecture & project setup
2. Layout, design system & static UI
3. Calculator logic, validation & toasts
4. Localization, currency & delight features
5. Analytics, error tracking & performance tuning

Each phase includes:

- What to build
- Acceptance criteria
- **AI Coding Assistant Prompt** (for Claude/GPT/Windsurf)
- **IT Manager Prompt / Checklist** (for you)

---

### Phase 1 – Architecture & Project Setup

**Goal:** Clean, secure, fast skeleton ready to build on.

**What to build:**

- New Next.js app (App Router).
- TypeScript, ESLint, Prettier configured.
- Tailwind installed with CushLabs tokens (colors, typography).
- Basic layout with `<Header>` and `<Main>` container.
- Global error boundary and basic toast provider.

**Acceptance Criteria:**

- `npm run lint` and `npm run build` pass.
- Home page loads with CushLabs-styled shell (no calculator yet).
- Toast system available globally.
- Error boundary shows a friendly fallback.

#### AI Coding Assistant Prompt – Phase 1

```text
You are my senior full-stack engineer helping me scaffold a new Next.js 14 project for a public “CushLabs Income Planner” tool.

Context:
- Brand: CushLabs.ai — dark, minimal, premium, technical.
- I am Robert, a solo AI engineer. Copy must never pretend there is a team.
- Stack: Next.js (App Router), TypeScript, TailwindCSS.
- We will later add a client-side calculator and charts, but in this phase we only set up the shell.

Tasks:
1. Create a fresh Next.js + TypeScript project structure suitable for deployment on Vercel.
2. Configure Tailwind with this basic design system:
   - Colors:
     - `background` #000000
     - `foreground` #FFFFFF
     - `accent` #FF6A3D
     - `muted` text #AAAAAA
     - `muted-strong` text #888888
   - Fonts:
     - Headings: Space Grotesk
     - Body: Source Serif 4
3. Implement a global layout with:
   - A simple header with “CushLabs.ai” on the left and a minimal nav (e.g., “Projects”, “Contact” as placeholders).
   - A centered main container with max-width and generous padding.
4. Implement:
   - A global error boundary that catches render errors and shows a branded fallback message.
   - A simple global toast system (either react-hot-toast or a minimal custom context/provider) that can be used later across the app.
5. Add proper TypeScript types, comments on key components, and minimal error handling.
6. Ensure:
   - `npm run lint` passes with no errors.
   - `npm run build` succeeds.
   - There is no unused boilerplate code (clean up default Next.js starter content).

Important:
- Comment non-obvious code.
- Avoid any hard-coded secrets or environment-specific values.
- Make it easy for me to add new pages or client components later.
- Keep the initial bundle as small as possible.

Return:
- Folder and file structure.
- Key code files (layout, Tailwind config, root providers).
- Instructions to run the project locally.
```

#### IT Manager Prompt / Checklist – Phase 1

```text
As the IT Manager, before or during Phase 1:

1. Confirm stack choices:
   - ✅ Next.js 14+ with App Router
   - ✅ TypeScript
   - ✅ TailwindCSS
2. Decide and document:
   - Node.js version to standardize on (e.g., 20.x).
   - Package manager (npm, pnpm, or yarn) for consistent use.
3. Prepare .env.sample file with at least:
   - `NODE_ENV=development`
   - Placeholder for future monitoring/analytics:
     - `NEXT_PUBLIC_ANALYTICS_ID=`
     - `SENTRY_DSN=`
4. Ensure:
   - Repo initialized in GitHub/GitLab.
   - Branch protection rules (main branch protected, require PR).
   - CI pipeline (e.g., GitHub Actions) with steps:
     - `npm install`
     - `npm run lint`
     - `npm run build`
5. Confirm that no secrets will be hard-coded:
   - All keys will live in `.env.local` or environment variables on Vercel.
```

---

### Phase 2 – Layout, Design System & Static UI

**Goal:** World-class static page with CushLabs look, static placeholders for calculator.

**What to build:**

- Hero section (EN only for now).
- Static input panel (no logic yet).
- Static summary cards.
- Placeholder area for chart.
- Respect all brand typography/colors.

**Acceptance Criteria:**

- Page visually matches CushLabs brand: dark, minimal, premium.
- All elements are static; no calculations yet.
- Layout responsive on mobile and desktop.

#### AI Coding Assistant Prompt – Phase 2

```text
We already have a basic Next.js + TypeScript + Tailwind shell with a header and main container.

Now build the static UI for the “CushLabs Income Planner” on a single route (e.g., `/income-planner`).

Requirements:
1. Hero section (English only for now):
   - Headline: “Plan your income like a pro. In minutes.”
   - Subheading: “Adjust your rate, hours, and taxes to see what you can realistically earn per year — in MXN or USD.”
   - Short note: “Hi, I’m Robert — I build practical AI & software tools like this one.” in small text.
2. Main layout:
   - On desktop:
     - Left column: “Inputs” card with labeled controls (as static UI):
       - Hourly rate
       - Billable hours per week
       - Vacation weeks per year
       - Tax rate
       - Target annual net income (optional)
       - Currency toggle (MXN / USD) as buttons or segmented control
       - Language toggle (EN / ES) as pill buttons (non-functional now)
     - Right column:
       - Summary cards (Per day, Per week, Per month, Per year) with fake numbers for now.
       - Placeholder chart area with a bordered box and text “Income chart coming soon”.
   - On mobile:
     - Stack: hero > inputs > summary cards > chart placeholder.
3. Design:
   - Use the Tailwind design tokens configured earlier (background, accent, fonts).
   - Cards with rounded corners and subtle shadows.
   - Clear visual hierarchy: headlines > labels > helper text.
4. Implementation:
   - Build with React functional components and TypeScript props.
   - Add comments explaining the layout structure.
   - No calculation logic yet; use static placeholder values.
5. Accessibility:
   - Use semantic HTML: sections, headings, labels for inputs.
   - Ensure buttons are keyboard-focusable.

Return the key components and pages, with emphasis on clean, readable JSX/TSX and Tailwind classes.
```

#### IT Manager Prompt / Checklist – Phase 2

```text
As the IT Manager, during Phase 2:

1. Confirm route structure: e.g., `/income-planner`.
2. Ensure branding consistency:
   - Header matches CushLabs site.
   - Footer prepared for a short privacy/legal note.
3. Verify responsive behavior using dev tools:
   - Common breakpoints: 375px, 768px, 1024px, 1440px.
4. Confirm no external services or keys are needed yet:
   - `.env.sample` remains unchanged at this phase.
```

---

### Phase 3 – Calculator Logic, Validation & Toasts

**Goal:** Make the calculator fully functional with safe math, validation, and feedback.

**What to build:**

- State layer for inputs.
- Pure calculation utilities.
- Validation & clamping.
- Wiring of outputs to summary cards.
- Toasts for validations/reset/errors.

**Acceptance Criteria:**

- Changing inputs updates all summary cards instantly.
- Invalid input is handled gracefully, with clamping + small toast.
- Target income helper works and shows “required hours” or “required rate”.
- No runtime errors on weird inputs (e.g., blank, negative, huge values).

#### AI Coding Assistant Prompt – Phase 3

```text
The static UI for the CushLabs Income Planner is built. Now make it fully functional and robust.

Goals:
- Implement the income calculation logic.
- Add input validation and clamping.
- Hook up a toast system for feedback.

Requirements:

1. State & Types:
   - Create a strongly-typed state object for all inputs:
     - hourlyRate
     - hoursPerWeek
     - vacationWeeks
     - taxRate
     - targetAnnualNet (optional)
     - currency (MXN | USD)
   - Use TypeScript interfaces/types and React hooks for state.

2. Calculation utilities:
   - Implement pure functions in a separate module `lib/calculations.ts`:
     - `calculateIncome(config)`:
       - Returns an object with daily/weekly/monthly/annual gross and net income.
       - Handles:
         - billableWeeks = 52 - vacationWeeks (min 1).
     - `calculateRequirements(config, targetAnnualNet)`:
       - Computes required hours/week or required hourly rate.
   - Functions must:
     - Accept validated inputs.
     - Return either a result object or a typed error object.
     - Be fully commented with JSDoc-style comments.

3. Validation & clamping:
   - On input change:
     - Parse as number.
     - Clamp within allowed ranges:
       - hourlyRate: 50–5000
       - hoursPerWeek: 0–60
       - vacationWeeks: 0–12
       - taxRate: 0–50 (%)
     - If clamping or correction occurs, show a small toast:
       - “We adjusted your values to stay within a realistic range.”
   - Prevent division by zero and any NaN in calculations.
   - If calculation fails, show a friendly error toast and revert to last known-good state.

4. UI updates:
   - Wire the summary cards to use the real calculation output.
   - Add a subtle loading/transition state (e.g., small fade) when values update.

5. Toasts:
   - Use the existing toast provider:
     - Show toasts for:
       - Reset to default.
       - Validation/clamping.
       - Rare calculation errors.

6. Code quality:
   - Add comments to explain the validation and error-handling strategy.
   - Ensure functions are pure and testable.

Return the updated components, calculation utils, and an example of how to add a unit test for `calculateIncome`.
```

#### IT Manager Prompt / Checklist – Phase 3

```text
As the IT Manager, during Phase 3:

1. Ensure that:
   - `lib/calculations.ts` is pure and has no external dependencies.
   - No external services (APIs, AI keys) are being called yet.
2. Require at least minimal unit tests for:
   - calculateIncome
   - calculateRequirements
3. Confirm CI is running tests on PR:
   - `npm test` or `npm run test` integrated into pipeline.
4. Decide if we want an error monitoring service now:
   - If yes, add `SENTRY_DSN` to `.env.sample` and configure in a future phase.
```

---

### Phase 4 – Localization, Currency & Delight Features

**Goal:** Make it bilingual, polished, and lovable.

**What to build:**

- EN/ES localization.
- MXN/USD currency display.
- LocalStorage to remember last scenario.
- One or two “what-if” suggestion lines.
- Optional sharable URLs with query params.

**Acceptance Criteria:**

- Language toggle fully translates labels and helper text.
- Currency toggle swaps formatting (no FX conversion yet).
- Refreshing the page restores last scenario.
- Delight features present and subtle.

#### AI Coding Assistant Prompt – Phase 4

```text
Now we need to localize and add delight to the CushLabs Income Planner.

Requirements:

1. Localization (EN/ES):
   - Implement a simple i18n system using JSON dictionaries:
     - `en.ts` and `es.ts` with keys for:
       - Labels, headings, helper text, button text, toast messages.
   - Language toggle:
     - Switches dictionaries at runtime.
     - Persists choice in localStorage (e.g., `income-planner-lang`).
   - Default language:
     - Use browser locale if available, else English.

2. Currency display:
   - Currency toggle for MXN / USD:
     - This is a formatting choice only in V1.
   - Format using Intl.NumberFormat with appropriate locale and currency code.
   - Persist choice in localStorage (e.g., `income-planner-currency`).

3. Local scenario memory:
   - Store the last valid configuration in localStorage under a key like `income-planner-config`.
   - On load:
     - Try to hydrate from localStorage.
     - If valid, use it and display a subtle toast:
       - “Loaded your last plan from this browser.”
   - If invalid, fall back to defaults silently.

4. Delight features:
   - Compute and display 1–2 “what-if” suggestions, e.g.:
     - “If you increased your hourly rate by 10%, you’d earn +X per year.”
     - “If you reduced your hours by 5/week but kept your income, you’d need Y/hour.”
   - Place this in a small, muted panel under the summary cards.

5. Optional: Shareable URLs
   - Encode the current configuration into query parameters:
     - `?rate=500&hours=20&vacation=4&tax=25&currency=MXN`
   - On initial load, if query params exist, they override localStorage.
   - Sanitize and validate any values from the URL before using them.

6. Comments & safety:
   - Comment any logic related to localStorage and URL parsing.
   - Ensure all parsed values are validated and clamped before use.

Return:
- i18n implementation.
- Updated components using translation hooks or helpers.
- LocalStorage utilities.
- Any additional utility functions for URL state sync.
```

#### IT Manager Prompt / Checklist – Phase 4

```text
As the IT Manager, during Phase 4:

1. Review i18n implementation:
   - Ensure all copies in EN/ES match our CushLabs voice.
   - Avoid hard-coded strings in components.
2. Confirm privacy:
   - LocalStorage is only used for non-sensitive numeric config and language/currency.
   - No personal data is stored.
3. If shareable URLs are implemented:
   - Ensure the app handles malicious or malformed query parameters safely (clamping, defaults).
4. No new environment variables should be required in this phase.
```

---

### Phase 5 – Analytics, Error Tracking & Performance Tuning

**Goal:** Measure usage, catch issues, and ensure world-class performance.

**What to build:**

- Lightweight analytics (e.g., Plausible, PostHog, or Vercel Analytics).
- Optional Sentry error tracking.
- Performance pass (bundle size, lazy-loading).
- Final Lighthouse checks.

**Acceptance Criteria:**

- Anonymous usage metrics integrated.
- Any unexpected errors are logged to monitoring.
- Lighthouse scores ≥ 90 across categories.

#### AI Coding Assistant Prompt – Phase 5

```text
Now we’ll add light analytics, optional error tracking, and tune performance for the CushLabs Income Planner.

Requirements:

1. Analytics:
   - Integrate a lightweight, privacy-friendly analytics solution.
   - Use a single public environment variable, e.g. `NEXT_PUBLIC_ANALYTICS_ID`.
   - Track:
     - Page views.
     - Interactions:
       - Language toggle.
       - Currency toggle.
       - Changes to target income.
   - Ensure no personal data is collected or stored.

2. Error tracking (optional but preferred):
   - Integrate Sentry or similar using `SENTRY_DSN` from env.
   - Wrap app with Sentry’s error boundary (if used) while preserving our custom fallback UI.
   - Capture unexpected runtime errors and log them.

3. Performance tuning:
   - Analyze bundle size, split if necessary.
   - Lazy-load chart component and any heavy modules.
   - Confirm that calculations and main UI remain responsive on low-end devices.
   - Run Lighthouse and address obvious issues.

4. Configuration:
   - Read all keys from environment variables; no secrets in code.
   - Provide mock or disabled modes when env vars missing (e.g., analytics disabled in dev).

Return:
- Updated `_app`/layout or providers with analytics and error tracking integrated.
- Instructions on setting the required environment variables.
- Notes on performance improvements made.
```

#### IT Manager Prompt / Checklist – Phase 5

```text
As the IT Manager, during Phase 5:

1. Provision any required external services:
   - Analytics account (e.g., Plausible, PostHog, or Vercel Analytics).
   - Error tracking (Sentry or similar) if chosen.
2. Update `.env.sample` with:
   - `NEXT_PUBLIC_ANALYTICS_ID=`
   - `SENTRY_DSN=`
3. Configure these environment variables in:
   - Local `.env.local` for development.
   - Vercel (or hosting provider) project environment for production.
4. Validate:
   - Analytics events are visible in dashboards and contain no PII.
   - Error tracking receives test errors and can be monitored.
5. Run and record Lighthouse scores for the `/income-planner` route.
```

---

If you’d like, next step I can:

- Generate the **i18n dictionary skeletons** (EN + ES) for all labels/toasts,
- Or write a **single big “super prompt”** that walks an AI coding assistant through _all phases_ sequentially.
