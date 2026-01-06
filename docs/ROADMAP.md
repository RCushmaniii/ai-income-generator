---
title: Product Roadmap
description: Development roadmap for Freelance Income Planner
order: 2
---

# Product Roadmap

**Last Updated:** January 6, 2026  
**Project:** Freelance Income Planner

---

## Phase 1: Core Calculator (✅ Complete)

### Snapshot View

- ✅ **Input Panel**: Hourly rate, hours/week, weeks worked, business/personal expenses
- ✅ **Currency Support**: USD and MXN with custom exchange rates
- ✅ **Tax Calculations**: Simple percentage and progressive bracket modes
- ✅ **Cash Flow Breakdown**: Transparent calculation showing gross → taxes → expenses → net leftover
- ✅ **Reality Check Stats**: Effective hourly rate, annual/weekly projections with calculation tooltips
- ✅ **Lifestyle Feasibility**: Visual indicator showing if income covers expenses with buffer
- ✅ **What-If Scenarios**: Interactive rate adjustment showing impact on annual income
- ✅ **Bilingual Support**: Full English and Spanish translations
- ✅ **Dark/Light Themes**: User preference with system default detection
- ✅ **Responsive Design**: Mobile-first, works on all screen sizes

### Technical Foundation

- ✅ Next.js 14 with App Router
- ✅ TypeScript with strict typing
- ✅ Zustand for state management
- ✅ Tailwind CSS for styling
- ✅ Local storage persistence

---

## Phase 2: AI-Enhanced Features (🚧 Planned)

### 1. Market Rate Recommendations

**Goal:** Help freelancers price their services competitively

**Features:**

- **Rate Benchmarking**: Compare user's rate against market data for their skills/location
- **Competitive Analysis**: Show percentile ranking (e.g., "Your rate is in the 60th percentile")
- **Optimization Suggestions**: "Raising your rate by $15/hr would put you at market average"
- **Industry Insights**: Display typical rate ranges for different experience levels

**Implementation:**

- Integrate with freelance rate APIs (e.g., Upwork, Fiverr, industry surveys)
- Use AI to analyze skill combinations and suggest appropriate rates
- Cache market data to minimize API calls
- Show confidence levels for recommendations

**User Experience:**

- New "Rate Insights" card in Snapshot view
- Tooltip on hourly rate input showing market comparison
- Optional: Rate recommendation wizard for new users

---

### 2. Natural Language Queries

**Goal:** Make the calculator conversational and intuitive

**Features:**

- **Goal-Based Input**: "I want to earn $120k next year working 30 hours a week"
- **AI Translation**: Convert natural language to calculator inputs
- **Follow-Up Questions**: "What if I take 4 weeks vacation?"
- **Scenario Exploration**: "Show me how to reach $150k with different rate/hour combinations"
- **Contextual Suggestions**: AI suggests relevant what-if scenarios based on current inputs

**Implementation:**

- OpenAI API integration (GPT-4 or similar)
- Structured prompts to ensure reliable parameter extraction
- Fallback to traditional inputs if AI parsing fails
- Conversation history for context-aware responses

**User Experience:**

- New "Ask AI" input field at top of Snapshot view
- Chat-style interface showing AI interpretation
- One-click apply to populate calculator inputs
- Show both natural language and calculated values for transparency

---

### 3. Enhanced Forecast View

**Goal:** Expand the Forecast tab with scenario planning

**Features:**

- **Three Scenarios**: Pessimistic, Realistic, Optimistic projections
- **Range Visualization**: Min/max income based on different assumptions
- **Sensitivity Analysis**: Show which variables have biggest impact
- **Goal Tracking**: Set income targets and track progress
- **Historical Comparison**: If user returns, compare to previous sessions

**Implementation:**

- Deterministic calculations with configurable variance ranges
- Visual charts using Chart.js or Recharts
- Local storage for historical data
- Optional: AI-suggested scenario parameters based on market trends

---

## Phase 3: Future Considerations (💡 Ideas)

### Smart Forecasting

- Pattern recognition from historical data
- Seasonality detection
- Probability distributions for different scenarios

### Expense Intelligence

- Receipt scanning and categorization
- Anomaly detection for unusual expenses
- Tax deduction suggestions

### Advanced Features

- Multi-currency portfolio tracking
- Team/agency mode with multiple freelancers
- Integration with accounting software (QuickBooks, FreshBooks)
- Export reports (PDF, CSV)

---

## Technical Debt & Improvements

### Performance

- [ ] Optimize bundle size
- [ ] Implement code splitting for forecast view
- [ ] Add service worker for offline support

### Testing

- [ ] Unit tests for calculation engine
- [ ] E2E tests for critical user flows
- [ ] Accessibility audit and improvements

### Documentation

- [ ] API documentation for calculation functions
- [ ] Component storybook
- [ ] User guide and tutorials

---

## Release Strategy

### Phase 1 (Current)

- **Status**: Production-ready
- **Target**: January 2026
- **Focus**: Core calculator with transparent math

### Phase 2 (AI Features)

- **Status**: Planning
- **Target**: Q2 2026
- **Focus**: Market rate recommendations + natural language queries
- **Requirements**: OpenAI API key, rate data source

### Phase 3 (Advanced)

- **Status**: Conceptual
- **Target**: Q3-Q4 2026
- **Focus**: Smart forecasting and expense intelligence

---

## Success Metrics

### Phase 1

- User engagement: Time on site, return visits
- Calculation accuracy: Zero reported math errors
- Mobile usage: >40% of traffic

### Phase 2

- AI adoption: % of users trying natural language queries
- Rate adjustments: % of users who change rate after seeing market data
- Conversion: Free → paid (if monetization added)

### Phase 3

- Forecast accuracy: How close predictions are to actual outcomes
- Feature usage: Which advanced features get most engagement
- User retention: Monthly active users growth
