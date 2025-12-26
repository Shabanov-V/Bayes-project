# Bayesian Reasoning Tool - Design Document v1.0

**Project Type:** Vite React Single Page Application  
**Purpose:** Educational tool for understanding Bayesian reasoning through interactive hypothesis evaluation  
**Target Users:** People engaged in debates about political decisions, historical events, and complex arguments  
**Document Version:** 1.0  
**Last Updated:** December 24, 2025  
**Status:** Ready for Implementation

---

## Table of Contents
1. [Product Overview](#product-overview)
2. [Core Concept](#core-concept)
3. [User Interface Design](#user-interface-design)
4. [Component Specifications](#component-specifications)
5. [Data Model](#data-model)
6. [User Flows](#user-flows)
7. [Calculation Logic](#calculation-logic)
8. [Technical Requirements](#technical-requirements)
9. [Implementation Phases](#implementation-phases)
10. [Future Extensibility](#future-extensibility)
11. [Appendix](#appendix)

---

## Product Overview

### What Problem Does This Solve?
In debates and arguments, people often disagree not because they have different values, but because they:
- Weight evidence differently
- Don't explicitly consider how evidence relates to competing hypotheses
- Fail to update beliefs systematically based on evidence

This tool makes the reasoning process explicit and visual, helping users understand Bayesian thinking and identify the true sources of disagreement.

### Key Features (v1.0)
- Compare two competing hypotheses
- Add unlimited pieces of evidence
- Adjust likelihood ratios for each evidence item
- Set confidence/certainty for each piece of evidence
- Real-time probability calculations
- Shareable URLs for scenarios
- 3 preset example scenarios
- Local storage for user-created scenarios

### Non-Goals (v1.0)
- Multi-user comparison/disagreement analysis
- Backend/database
- Mobile-first design (desktop-first, touch-compatible)
- Advanced tutorial system
- Export to external formats

---

## Core Concept

### Bayesian Framework
The tool helps users answer: **"Given this evidence, which hypothesis is more likely?"**

**Mathematical Foundation:**
- Users start with two hypotheses at equal probability (50/50) - the prior
- For each piece of evidence, users specify:
  - **Likelihood under H1**: "If Hypothesis 1 were true, how expected is this evidence?" (0-100%)
  - **Likelihood under H2**: "If Hypothesis 2 were true, how expected is this evidence?" (0-100%)
  - **Certainty**: "How confident am I that this evidence is accurate?" (0-100%, default 75%)
- The tool calculates posterior probabilities using Bayesian updating

**Example:**
- **H1:** The moon landing was real
- **H2:** The moon landing was faked
- **Evidence:** "Video footage exists"
  - If H1 true: 95% expected (real landing would definitely produce footage)
  - If H2 true: 40% expected (fake could produce footage but harder)
  - Certainty: 100% (we definitely have footage)

---

## User Interface Design

### Layout Structure

```
┌─────────────────────────────────────────────────────────┐
│                    HEADER SECTION                        │
│  [Logo/Title]            [Load Preset ▾] [Share] [?]   │
└─────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────┐
│                 HYPOTHESIS SECTION                       │
│                                                          │
│  ┌──────────────────────┐    ┌──────────────────────┐ │
│  │   Hypothesis 1       │    │   Hypothesis 2       │ │
│  │                      │ vs │                      │ │
│  │   [Edit text field]  │    │   [Edit text field]  │ │
│  │                      │    │                      │ │
│  │      67%            │    │       33%           │ │
│  │   ██████████        │    │    ████            │ │
│  └──────────────────────┘    └──────────────────────┘ │
│                                                          │
│  Prior Probability: [────●────────] 50% (Advanced)      │
└─────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────┐
│                   EVIDENCE SECTION                       │
│                                                          │
│  ┌────────────────────────────────────────────────────┐│
│  │ Evidence 1                                   [×]   ││
│  │ Market share dropped by 15% after launch          ││
│  │                                                    ││
│  │ If H1 were true, how expected is this evidence?   ││
│  │ [────────●──────────] 70%                         ││
│  │                                                    ││
│  │ If H2 were true, how expected is this evidence?   ││
│  │ [──●────────────────] 30%                         ││
│  │                                                    ││
│  │ How certain are you of this evidence?             ││
│  │ [───────────●───────] 75%                         ││
│  │                                                    ││
│  │ Impact: Increases H1 by 12% ↑                     ││
│  └────────────────────────────────────────────────────┘│
│                                                          │
│  ┌────────────────────────────────────────────────────┐│
│  │ Evidence 2                                   [×]   ││
│  │ CEO resigned suddenly                             ││
│  │ ...                                                ││
│  └────────────────────────────────────────────────────┘│
│                                                          │
│  [+ Add Evidence]                                        │
│                                                          │
│  [Show Calculations ▾]                                   │
└─────────────────────────────────────────────────────────┘
```

### Color Palette

**Primary Colors:**
- Background: `#0f1419` (dark)
- Surface: `#1a1f29` (card background)
- Border: `#2d3748`

**Hypothesis Colors:**
- H1: `#3b82f6` (blue) - gradient to `#2563eb`
- H2: `#8b5cf6` (purple) - gradient to `#7c3aed`
- Neutral: `#6b7280` (gray)

**Evidence Strength Indicators:**
- Strong support: Opacity increase on hypothesis color
- Weak/Neutral: Gray tones
- High certainty: Solid colors
- Low certainty: Faded/transparent

**Interactive Elements:**
- Slider track: `#374151`
- Slider thumb: White `#ffffff`
- Hover states: 10% lighter
- Focus: Blue ring `#3b82f6`

### Typography

**Font Stack:**
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 
             'Helvetica Neue', Arial, sans-serif;
```

**Scale:**
- Title: 32px, bold
- Hypothesis text: 24px, semibold
- Probability percentage: 48px, bold
- Evidence description: 16px, regular
- Slider labels: 14px, medium
- Helper text: 12px, regular

### Spacing System
- Base unit: 4px
- Padding levels: 8px, 16px, 24px, 32px
- Evidence card spacing: 16px between cards
- Section spacing: 32px between major sections

---

## Component Specifications

### 1. Header Component
**Purpose:** Navigation and global actions

**Elements:**
- Logo/Title: "Bayesian Reasoning Tool"
- Preset dropdown: Loads pre-built scenarios
- Share button: Generates shareable URL
- Help icon: Shows inline tooltips explanation

**Behavior:**
- Preset dropdown shows 3 default scenarios + user-saved scenarios
- Share button copies URL to clipboard, shows confirmation toast
- Help icon toggles tooltip visibility across interface

---

### 2. Hypothesis Panel
**Purpose:** Display competing hypotheses and current probabilities

**Layout:**
- Two side-by-side cards (50% width each on desktop)
- Editable text fields for hypothesis names (100 char limit)
- Large percentage display
- Visual probability bars (filled according to %)
- "vs" separator between cards

**Behavior:**
- Text fields auto-save on blur
- Percentages update in real-time (300ms smooth transition)
- Bars animate width changes
- Color gradient indicates strength (darker = higher probability)

**Prior Probability Control:**
- Collapsed by default with "(Advanced)" label
- Single slider controlling H1 prior (H2 auto-calculates to 100-H1)
- Range: 1-99% (not 0 or 100 to avoid division by zero)
- Tooltip: "Starting belief before considering evidence. Usually 50/50 unless you have reason to prefer one hypothesis."

---

### 3. Evidence Card Component
**Purpose:** Single piece of evidence with likelihood adjustments

**Structure:**
```
┌────────────────────────────────────────┐
│ [Text area - 200 char limit]    [×]   │
│                                        │
│ If H1 were true, how expected is this?│
│ [slider] XX%                          │
│                                        │
│ If H2 were true, how expected is this?│
│ [slider] XX%                          │
│                                        │
│ How certain are you of this evidence? │
│ [slider] XX%                          │
│                                        │
│ Impact: [Increases/Decreases] H1 by X%│
└────────────────────────────────────────┘
```

**Slider Specifications:**
- Range: 0-100%
- Snap-to: 5% increments
- Default: 50% for likelihoods, 75% for certainty
- Width: 100% of card (minus padding)
- Thumb size: 20px diameter (44px touch target)
- Track height: 6px
- Tooltip on hover: Shows exact percentage

**Text Area:**
- Auto-growing height (max 4 lines)
- Character counter: "X/200"
- Placeholder: "Describe the evidence..."
- Auto-save on blur

**Delete Button:**
- Top-right corner
- Icon: × (close icon)
- Confirmation: None (can undo by re-adding)
- Minimum: Cannot delete if only 1 evidence item

**Impact Display:**
- Calculated in real-time
- Format: "Increases H1 by 12%" or "Decreases H1 by 8%"
- Color-coded: Green for increase, red for decrease
- Tooltip: "How much this evidence shifts the probability"

---

### 4. Add Evidence Button
**Purpose:** Create new evidence item

**Appearance:**
- Dashed border button
- Icon: + symbol
- Text: "Add Evidence"
- Full width of evidence section

**Behavior:**
- Adds new empty evidence card at bottom
- Auto-focuses on text area
- Scrolls new card into view

---

### 5. Calculations Panel (Collapsible)
**Purpose:** Show step-by-step Bayesian math

**Collapsed State:**
- Button: "Show Calculations ▾"
- Below all evidence cards

**Expanded State:**
```
┌─────────────────────────────────────────┐
│ Hide Calculations ▴                     │
├─────────────────────────────────────────┤
│ Step-by-Step Calculation:               │
│                                         │
│ 1. Starting (Prior) Odds                │
│    H1:H2 = 50:50 = 1.00                │
│                                         │
│ 2. Evidence 1: "Market share dropped"  │
│    Likelihood Ratio = 70% / 30% = 2.33 │
│    Certainty adjusted = 2.33^0.75 = 1.89│
│    New Odds = 1.00 × 1.89 = 1.89       │
│    Probability: H1=65%, H2=35%         │
│                                         │
│ 3. Evidence 2: "CEO resigned"          │
│    Likelihood Ratio = 50% / 80% = 0.63 │
│    Certainty adjusted = 0.63^0.90 = 0.68│
│    New Odds = 1.89 × 0.68 = 1.28       │
│    Probability: H1=56%, H2=44%         │
│                                         │
│ Final Result: H1=56%, H2=44%           │
└─────────────────────────────────────────┘
```

**Behavior:**
- Updates in real-time as sliders change
- Smooth height transition when expanding/collapsing
- Each evidence shows intermediate calculation
- Uses monospace font for numbers alignment

---

### 6. Preset Dropdown Component
**Purpose:** Load example scenarios

**Structure:**
- Dropdown menu from header
- Sections:
  - "Example Scenarios" (3 built-in)
  - Divider
  - "Your Scenarios" (localStorage)
  - "New Blank Scenario"

**Built-in Presets:**

**Preset 1: Historical Event - Moon Landing**
```javascript
{
  h1: "The moon landing was real",
  h2: "The moon landing was faked",
  evidence: [
    {
      description: "High-quality video footage exists",
      likelihoodH1: 95,
      likelihoodH2: 40,
      certainty: 100
    },
    {
      description: "USSR acknowledged the landing",
      likelihoodH1: 90,
      likelihoodH2: 20,
      certainty: 100
    },
    {
      description: "No credible whistleblowers in 50+ years",
      likelihoodH1: 85,
      likelihoodH2: 10,
      certainty: 95
    },
    {
      description: "Technology was theoretically possible",
      likelihoodH1: 80,
      likelihoodH2: 60,
      certainty: 90
    }
  ]
}
```

**Preset 2: Policy Decision - Universal Basic Income**
```javascript
{
  h1: "UBI would help the economy",
  h2: "UBI would harm the economy",
  evidence: [
    {
      description: "Alaska's oil dividend shows stable employment",
      likelihoodH1: 70,
      likelihoodH2: 40,
      certainty: 80
    },
    {
      description: "Finland pilot: improved wellbeing, no job loss",
      likelihoodH1: 75,
      likelihoodH2: 50,
      certainty: 75
    },
    {
      description: "Inflation concerns from economists",
      likelihoodH1: 40,
      likelihoodH2: 70,
      certainty: 70
    },
    {
      description: "Would cost 10% of federal budget",
      likelihoodH1: 50,
      likelihoodH2: 65,
      certainty: 85
    }
  ]
}
```

**Preset 3: Medical Diagnosis**
```javascript
{
  h1: "Patient has Disease A (common)",
  h2: "Patient has Disease B (rare)",
  evidence: [
    {
      description: "Fever present (90% of A, 95% of B)",
      likelihoodH1: 90,
      likelihoodH2: 95,
      certainty: 100
    },
    {
      description: "Rash present (20% of A, 80% of B)",
      likelihoodH1: 20,
      likelihoodH2: 80,
      certainty: 100
    },
    {
      description: "Test positive (70% accuracy)",
      likelihoodH1: 70,
      likelihoodH2: 30,
      certainty: 85
    },
    {
      description: "Patient is young (A common in young)",
      likelihoodH1: 75,
      likelihoodH2: 30,
      certainty: 100
    }
  ]
}
```

**Behavior:**
- Loading preset overwrites current scenario (no undo - warn if unsaved)
- User can edit preset scenarios freely
- Edited presets can be saved as new user scenario

---

### 7. Share Functionality
**Purpose:** Generate shareable URL

**Implementation:**
- Encode entire state in URL query parameters
- Base64 encode JSON for compactness
- Format: `?scenario=<base64-encoded-state>`

**Behavior:**
- Click "Share" button
- Generate URL with current state
- Copy to clipboard
- Show toast: "Link copied! Anyone can view this scenario."
- Loading page with scenario parameter auto-loads that scenario

---

## Data Model

### State Structure
```typescript
interface ScenarioState {
  id: string; // UUID for localStorage
  name: string; // User-defined name
  hypotheses: {
    h1: string; // max 100 chars
    h2: string; // max 100 chars
  };
  priorProbability: number; // 1-99, represents H1 prior
  evidence: Evidence[];
  createdAt: number; // timestamp
  modifiedAt: number; // timestamp
}

interface Evidence {
  id: string; // UUID
  description: string; // max 200 chars
  likelihoodH1: number; // 0-100
  likelihoodH2: number; // 0-100
  certainty: number; // 0-100
  order: number; // for future reordering feature
}

interface CalculatedResult {
  h1Probability: number; // 0-100
  h2Probability: number; // 0-100
  steps: CalculationStep[];
}

interface CalculationStep {
  evidenceId: string;
  evidenceName: string;
  likelihoodRatio: number;
  certaintyAdjusted: number;
  oddsAfter: number;
  probabilityAfter: { h1: number; h2: number };
}
```

### LocalStorage Schema
```javascript
{
  "bayesian-tool-scenarios": [
    {
      id: "uuid-1",
      name: "My Scenario Name",
      // ... ScenarioState
    }
  ],
  "bayesian-tool-current": {
    // Currently active scenario
  }
}
```

---

## User Flows

### Flow 1: First-Time User with Preset
1. User lands on page → sees blank slate
2. Clicks "Load Preset" → sees 3 example scenarios
3. Selects "Moon Landing" preset
4. Page populates with hypotheses and 4 evidence items
5. User adjusts slider for "video footage exists"
6. Sees probabilities update immediately (67% → 72%)
7. Hovers over "Impact" text → sees tooltip
8. Clicks "Show Calculations" → sees step-by-step math
9. Clicks "Share" → URL copied
10. Sends URL to friend → friend sees same scenario

### Flow 2: Creating Custom Scenario
1. User clicks "Load Preset" → "New Blank Scenario"
2. Sees empty hypothesis fields and "Add Evidence" button
3. Types H1: "It will rain tomorrow"
4. Types H2: "It will not rain tomorrow"
5. Clicks "Add Evidence"
6. Types: "Weather forecast says 70% chance of rain"
7. Adjusts sliders:
   - If H1 true: 90% (forecasts are usually accurate for rain)
   - If H2 true: 30% (forecasts sometimes wrong)
   - Certainty: 95% (confident forecast is real)
8. Sees H1 probability jump to 85%
9. Adds more evidence: "Dark clouds visible"
10. Continues building scenario
11. Scenario auto-saves to localStorage
12. Can load it later from "Your Scenarios" section

### Flow 3: Exploring Disagreement
1. User creates scenario about political policy
2. Sets their own likelihood assessments
3. Clicks "Share" → sends to friend
4. Friend opens link, sees same scenario
5. Friend adjusts sliders to their own beliefs
6. Friend shares their version back
7. Both users can compare final probabilities
8. Identifies: They disagree most about evidence #3's likelihood

---

## Calculation Logic

### Bayesian Update Formula

**Step 1: Convert Prior to Odds**
```
odds_prior = P(H1) / P(H2)
```

**Step 2: For Each Evidence Item**
```
likelihood_ratio = P(E|H1) / P(E|H2)

// Adjust for certainty (0-100% converted to 0-1)
certainty_factor = certainty / 100
adjusted_ratio = likelihood_ratio ^ certainty_factor

// Update odds
odds_new = odds_old × adjusted_ratio
```

**Step 3: Convert Final Odds to Probability**
```
P(H1) = odds / (1 + odds)
P(H2) = 1 - P(H1)
```

### Edge Cases
- **Division by zero:** If likelihoodH2 = 0, treat as 0.01 (1%)
- **Both likelihoods = 0:** Skip evidence (no impact)
- **Certainty = 0:** Skip evidence (completely uncertain)
- **Extreme odds:** Cap at 99.9% and 0.1% to avoid display issues

### Implementation Example
```typescript
function calculatePosterior(state: ScenarioState): CalculatedResult {
  let odds = state.priorProbability / (100 - state.priorProbability);
  const steps: CalculationStep[] = [];
  
  for (const evidence of state.evidence) {
    const lh1 = Math.max(evidence.likelihoodH1, 0.01);
    const lh2 = Math.max(evidence.likelihoodH2, 0.01);
    const likelihoodRatio = lh1 / lh2;
    
    const certaintyFactor = evidence.certainty / 100;
    const adjustedRatio = Math.pow(likelihoodRatio, certaintyFactor);
    
    odds *= adjustedRatio;
    
    const h1Prob = (odds / (1 + odds)) * 100;
    const h2Prob = 100 - h1Prob;
    
    steps.push({
      evidenceId: evidence.id,
      evidenceName: evidence.description,
      likelihoodRatio,
      certaintyAdjusted: adjustedRatio,
      oddsAfter: odds,
      probabilityAfter: { h1: h1Prob, h2: h2Prob }
    });
  }
  
  const finalH1 = Math.min(Math.max((odds / (1 + odds)) * 100, 0.1), 99.9);
  const finalH2 = 100 - finalH1;
  
  return {
    h1Probability: finalH1,
    h2Probability: finalH2,
    steps
  };
}
```

---

## Technical Requirements

### Technology Stack
- **Framework:** React 18+ with Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** React Context + useReducer (no Redux for v1)
- **Storage:** localStorage API
- **Routing:** React Router (for shareable URLs)
- **Animations:** CSS transitions (300ms standard)
- **Build:** Vite with optimized production build

### Browser Support
- Chrome 90+
- Firefox 90+
- Safari 14+
- Edge 90+

### Performance Targets
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Lighthouse Score: 90+
- Bundle size: < 200KB (gzipped)

### Accessibility Requirements
- WCAG 2.1 AA compliance
- Keyboard navigation for all interactions
- Screen reader support (ARIA labels on all sliders)
- Focus indicators on all interactive elements
- Sufficient color contrast (4.5:1 minimum)

### Responsive Breakpoints
```css
/* Desktop-first approach */
- Desktop: 1024px and above (primary design)
- Tablet: 768px - 1023px (hypothesis cards stack)
- Mobile: 320px - 767px (single column, touch-optimized)
```

---

## Inline Tooltips Content

### Tooltip Locations & Text

**1. Hypothesis Panel - Prior Probability**
> "Your starting belief before considering any evidence. Usually 50/50 unless you have specific reason to favor one hypothesis. Most disagreements come from weighing evidence differently, not different priors."

**2. Evidence Card - Likelihood H1 Slider**
> "If Hypothesis 1 were definitely true, how often would you expect to see this evidence? 100% = always, 50% = half the time, 0% = never."

**3. Evidence Card - Likelihood H2 Slider**
> "If Hypothesis 2 were definitely true, how often would you expect to see this evidence? Compare this to the H1 slider - large differences mean strong evidence."

**4. Evidence Card - Certainty Slider**
> "How confident are you that this evidence is accurate? 100% = certain fact, 75% = pretty sure (default), 50% = might be true, 0% = completely uncertain."

**5. Evidence Card - Impact Display**
> "How much this single piece of evidence shifts the probability. Large impacts mean this evidence strongly favors one hypothesis."

**6. Calculations Panel - Header**
> "Step-by-step Bayesian calculation showing how each piece of evidence updates the probability. The likelihood ratio (H1/H2) tells you how much stronger this evidence is for one hypothesis."

**7. Share Button**
> "Generate a link that includes this entire scenario. Anyone with the link can view and modify their own copy."

---

## Component File Structure

```
src/
├── components/
│   ├── Header/
│   │   ├── Header.tsx
│   │   ├── PresetDropdown.tsx
│   │   └── ShareButton.tsx
│   ├── HypothesisPanel/
│   │   ├── HypothesisPanel.tsx
│   │   ├── HypothesisCard.tsx
│   │   └── PriorProbabilityControl.tsx
│   ├── Evidence/
│   │   ├── EvidenceList.tsx
│   │   ├── EvidenceCard.tsx
│   │   ├── LikelihoodSlider.tsx
│   │   └── AddEvidenceButton.tsx
│   ├── Calculations/
│   │   ├── CalculationsPanel.tsx
│   │   └── CalculationStep.tsx
│   └── UI/
│       ├── Slider.tsx
│       ├── Tooltip.tsx
│       ├── Toast.tsx
│       └── Button.tsx
├── hooks/
│   ├── useScenario.ts          # Main state management
│   ├── useCalculations.ts      # Bayesian math
│   ├── useLocalStorage.ts      # Persistence
│   └── useShareUrl.ts          # URL encoding/decoding
├── lib/
│   ├── bayesian.ts             # Core calculation logic
│   ├── presets.ts              # Built-in scenarios
│   └── storage.ts              # localStorage utilities
├── types/
│   └── index.ts                # TypeScript interfaces
└── App.tsx
```

---

## Implementation Phases

### Phase 1: Core Functionality (Week 1)
- [ ] Set up Vite + React + TypeScript project
- [ ] Implement data model and state management
- [ ] Build HypothesisPanel component
- [ ] Build EvidenceCard component with sliders
- [ ] Implement Bayesian calculation engine
- [ ] Real-time probability updates

### Phase 2: User Experience (Week 2)
- [ ] Add/remove evidence functionality
- [ ] Prior probability adjustment
- [ ] Animations and transitions
- [ ] Responsive layout (desktop + tablet)
- [ ] Keyboard navigation

### Phase 3: Features (Week 3)
- [ ] Preset scenarios system
- [ ] LocalStorage persistence
- [ ] Shareable URLs
- [ ] Calculations panel
- [ ] Inline tooltips

### Phase 4: Polish (Week 4)
- [ ] Mobile optimization
- [ ] Accessibility audit and fixes
- [ ] Performance optimization
- [ ] Cross-browser testing
- [ ] Documentation

---

## Future Extensibility

### Architecture Decisions for Future Features

**1. Comparison/Disagreement Analysis Mode**
- State already supports unique IDs for scenarios
- Can add `comparisonMode: boolean` flag
- Store second user's adjustments in parallel state
- UI can highlight differing evidence weights

**2. Alternative Weight Concepts**
- Evidence interface can add `weightType: 'likelihood' | 'support' | 'direct'`
- Calculation engine abstracted into strategy pattern
- Each type has own calculator implementation
- UI switches slider labels based on type

**3. Manual Evidence Reordering**
- Evidence already has `order` field (currently auto-incrementing)
- Can add drag-and-drop library in future
- Sort evidence array by `order` field before rendering

**4. Backend/Sync**
- Current localStorage design maps directly to API
- Add `syncStatus` and `remoteId` fields
- Keep localStorage as cache layer
- Progressive enhancement: works offline, syncs when online

**5. Export Features**
- Current state is JSON-serializable
- Can add export as PDF/Markdown
- Could generate visual report from CalculatedResult

**6. Multiple Hypotheses (>2)**
- Current two-hypothesis constraint is UI-only
- Backend state could support array of hypotheses
- Calculation logic needs normalization across N hypotheses
- Major UI redesign needed

---

## Testing Strategy

### Unit Tests
- Bayesian calculation logic (edge cases)
- URL encoding/decoding
- LocalStorage utilities
- Slider snap-to-grid logic

### Integration Tests
- Complete user flow: load preset → modify → share
- State persistence across page reload
- Calculations update with slider changes
- Evidence add/remove operations

### Manual Testing Checklist
- [ ] All sliders work on touch devices
- [ ] Tooltips appear on hover/focus
- [ ] Long hypothesis text wraps properly
- [ ] Evidence descriptions handle 200 chars
- [ ] Share URLs reconstruct state correctly
- [ ] Prior probability affects final result
- [ ] Certainty slider impacts calculations
- [ ] Calculations panel shows correct math
- [ ] Preset loading works for all 3 scenarios
- [ ] LocalStorage persists user scenarios

---

## Success Metrics

### User Engagement
- Average session duration: > 5 minutes
- Evidence items created per session: > 3
- Preset load rate: > 60% of sessions
- Share button usage: > 20% of sessions

### Technical Performance
- Page load time: < 2 seconds
- Slider response time: < 16ms (60fps)
- LocalStorage read/write: < 10ms
- Zero calculation errors in production

### Educational Impact (Future Survey)
- Users report better understanding of Bayesian thinking
- Users feel more confident weighing evidence
- Users identify sources of disagreement more clearly

---

## Appendix

### Resources for Implementation
- **Bayes' Theorem:** https://en.wikipedia.org/wiki/Bayes%27_theorem
- **Likelihood Ratios:** https://www.lesswrong.com/posts/FpKENy8JMnxMw7qLr/likelihood-ratios
- **Slider Implementation:** React + input[type="range"] with custom styling
- **URL Encoding:** btoa/atob for base64, JSON.stringify/parse
- **LocalStorage Limits:** 5-10MB per domain (more than sufficient)

### Glossary
- **Prior Probability:** Initial belief before seeing evidence (P(H))
- **Likelihood:** Probability of seeing evidence given hypothesis (P(E|H))
- **Posterior Probability:** Updated belief after seeing evidence (P(H|E))
- **Likelihood Ratio:** P(E|H1) / P(E|H2) - measures evidence strength
- **Bayesian Updating:** Process of revising beliefs based on new evidence
- **Odds:** Alternative to probability, ratio of P(H1) to P(H2)

### Design Decisions Summary

**Key Choices Made:**
- Evidence Input: Free text, dynamically add/remove, 200 char limit
- Sliders: Continuous with 5% snap-to grid, default 50% start for likelihoods, 75% for certainty
- Mobile: Desktop-first, but ensure sliders work on touch (MVP can be desktop-only)
- Tutorial: Inline tooltips only (no forced walkthrough)
- Presets: Launch with 3 editable templates, localStorage for user scenarios (no backend)
- Visual: Smooth animations (300ms), subtle color gradient, always show percentages
- Evidence Order: Fixed order as added for v1, manual reorder in future
- Terminology: "If [Hypothesis] were true, how expected is this evidence?"
- Prior Adjustment: Shown but discouraged (marked as "Advanced")
- Certainty Default: 75% (modest confidence)
- Math Panel: Step-by-step likelihood ratio multiplication
- Empty State: Show completely blank slate with "Add Evidence" prompt

---

## Quick Reference

### Component Hierarchy
```
App
├── Header
│   ├── PresetDropdown
│   └── ShareButton
├── HypothesisPanel
│   ├── HypothesisCard (x2)
│   └── PriorProbabilityControl
├── EvidenceList
│   ├── EvidenceCard (dynamic)
│   │   ├── LikelihoodSlider (x2)
│   │   └── CertaintySlider
│   └── AddEvidenceButton
└── CalculationsPanel
    └── CalculationStep (dynamic)
```

### State Flow
```
User Action → Component Event → State Update → 
Calculation Engine → New Probabilities → UI Re-render
```

### Critical Paths
1. **Load Preset:** PresetDropdown → loadScenario() → replaceState() → recalculate() → render
2. **Adjust Slider:** Slider onChange → updateEvidence() → recalculate() → render
3. **Add Evidence:** AddButton onClick → addEvidence() → recalculate() → render
4. **Share:** ShareButton onClick → encodeState() → copy to clipboard → show toast

---

## API Reference (Internal Functions)

### Core State Management
```typescript
// useScenario.ts
function loadScenario(scenarioId: string): void
function saveScenario(name: string): void
function updateHypothesis(which: 'h1' | 'h2', text: string): void
function updatePrior(value: number): void
function addEvidence(): string // returns new evidence ID
function removeEvidence(id: string): void
function updateEvidence(id: string, changes: Partial<Evidence>): void
function resetScenario(): void
```

### Calculation Engine
```typescript
// bayesian.ts
function calculatePosterior(state: ScenarioState): CalculatedResult
function calculateImpact(evidence: Evidence, currentOdds: number): number
function oddsToProb(odds: number): number
function probToOdds(prob: number): number
```

### Storage Utilities
```typescript
// storage.ts
function saveToLocalStorage(key: string, data: any): void
function loadFromLocalStorage(key: string): any | null
function listScenarios(): ScenarioState[]
function deleteScenario(id: string): void
```

### URL Management
```typescript
// useShareUrl.ts
function encodeScenario(state: ScenarioState): string
function decodeScenario(encoded: string): ScenarioState | null
function loadFromUrl(): ScenarioState | null
function generateShareUrl(state: ScenarioState): string
```

---

## Visual Design Mockups

### Desktop View (1920x1080)
```
┌────────────────────────────────────────────────────────────────┐
│  Bayesian Reasoning Tool        [Load Preset ▾] [Share] [?]   │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌───────────────────────┐        ┌───────────────────────┐   │
│  │  Hypothesis 1         │   VS   │  Hypothesis 2         │   │
│  │  Moon landing was real│        │  Moon landing faked   │   │
│  │                       │        │                       │   │
│  │       87%            │        │       13%            │   │
│  │  ████████████████     │        │  ██                   │   │
│  └───────────────────────┘        └───────────────────────┘   │
│                                                                 │
│  Prior: [─────────●─────────] 50% (Advanced) ⓘ                │
│                                                                 │
├────────────────────────────────────────────────────────────────┤
│  Evidence                                                       │
│                                                                 │
│  ┌──────────────────────────────────────────────────────┐     │
│  │ ⓘ High-quality video footage exists              [×] │     │
│  │                                                      │     │
│  │ If H1 were true, how expected? ⓘ                    │     │
│  │ [──────────────────●──] 95%                         │     │
│  │                                                      │     │
│  │ If H2 were true, how expected? ⓘ                    │     │
│  │ [────────●────────────] 40%                         │     │
│  │                                                      │     │
│  │ How certain? ⓘ [──────────────────●] 100%          │     │
│  │                                                      │     │
│  │ Impact: ↑ Increases H1 by 25% ⓘ                    │     │
│  └──────────────────────────────────────────────────────┘     │
│                                                                 │
│  [+ Add Evidence]                                               │
│  [Show Calculations ▾]                                          │
└────────────────────────────────────────────────────────────────┘
```

### Tablet View (768px)
```
┌─────────────────────────────────────┐
│  Bayesian Tool    [≡] [Share] [?]  │
├─────────────────────────────────────┤
│  ┌───────────────────────────────┐ │
│  │  Hypothesis 1                 │ │
│  │  Moon landing was real        │ │
│  │  87% ████████████████          │ │
│  └───────────────────────────────┘ │
│                VS                   │
│  ┌───────────────────────────────┐ │
│  │  Hypothesis 2                 │ │
│  │  Moon landing faked           │ │
│  │  13% ██                        │ │
│  └───────────────────────────────┘ │
│                                     │
│  Prior: [───●───] 50% (Adv) ⓘ     │
├─────────────────────────────────────┤
│  Evidence                           │
│  [Stacked cards, same as desktop]  │
└─────────────────────────────────────┘
```

### Mobile View (375px)
```
┌────────────────────────┐
│  Bayesian  [≡][⋮]     │
├────────────────────────┤
│ ┌────────────────────┐│
│ │ H1: Moon real      ││
│ │ 87%                ││
│ │ ████████████       ││
│ └────────────────────┘│
│         VS            │
│ ┌────────────────────┐│
│ │ H2: Moon fake      ││
│ │ 13%                ││
│ │ ██                 ││
│ └────────────────────┘│
│                       │
│ Prior: 50% (Adv) ⓘ   │
├────────────────────────┤
│ Evidence              │
│ ┌──────────────────┐ │
│ │ Video footage    │ │
│ │ exists       [×] │ │
│ │                  │ │
│ │ If H1: 95%       │ │
│ │ [──●──]          │ │
│ │                  │ │
│ │ If H2: 40%       │ │
│ │ [●────]          │ │
│ │                  │ │
│ │ Certain: 100%    │ │
│ │ [────●]          │ │
│ │                  │ │
│ │ ↑ +25% to H1     │ │
│ └──────────────────┘ │
│ [+ Add]              │
└────────────────────────┘
```

---

## Error Handling

### User-Facing Errors
```typescript
// Error scenarios and messages
{
  LOAD_FAILED: "Could not load scenario. Please try again.",
  SAVE_FAILED: "Could not save scenario. Check storage space.",
  INVALID_URL: "Invalid share link. Please check the URL.",
  STORAGE_FULL: "Storage full. Delete old scenarios to continue.",
  INVALID_INPUT: "Please enter valid text (1-200 characters).",
  DELETE_LAST_EVIDENCE: "Cannot delete the only piece of evidence."
}
```

### Technical Error Handling
```typescript
// bayesian.ts
try {
  const result = calculatePosterior(state);
  return result;
} catch (error) {
  console.error('Calculation error:', error);
  // Fallback to 50/50 if calculation fails
  return {
    h1Probability: 50,
    h2Probability: 50,
    steps: [],
    error: true
  };
}

// storage.ts
try {
  localStorage.setItem(key, JSON.stringify(data));
} catch (error) {
  if (error.name === 'QuotaExceededError') {
    throw new Error('STORAGE_FULL');
  }
  throw new Error('SAVE_FAILED');
}
```

---

## Performance Optimization

### Memoization Strategy
```typescript
// Memoize expensive calculations
const memoizedCalculation = useMemo(
  () => calculatePosterior(state),
  [state.evidence, state.priorProbability]
);

// Debounce slider updates
const debouncedUpdate = useMemo(
  () => debounce((id, value) => updateEvidence(id, value), 100),
  []
);
```

### Code Splitting
```typescript
// Lazy load non-critical components
const CalculationsPanel = lazy(() => 
  import('./components/Calculations/CalculationsPanel')
);

const PresetDropdown = lazy(() => 
  import('./components/Header/PresetDropdown')
);
```

### Bundle Size Optimization
- Tree-shake unused Tailwind classes
- Minimize third-party dependencies
- Use native browser APIs where possible
- Compress images/assets

---

## Security Considerations

### Input Validation
```typescript
// Sanitize user input
function sanitizeText(text: string, maxLength: number): string {
  return text
    .trim()
    .slice(0, maxLength)
    .replace(/[<>]/g, ''); // Remove HTML-like characters
}

// Validate numerical inputs
function validatePercentage(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}
```

### URL Parameter Safety
```typescript
// Safe URL decoding
function decodeScenario(encoded: string): ScenarioState | null {
  try {
    const decoded = atob(encoded);
    const parsed = JSON.parse(decoded);
    
    // Validate structure
    if (!isValidScenario(parsed)) {
      throw new Error('Invalid scenario structure');
    }
    
    return sanitizeScenario(parsed);
  } catch (error) {
    console.error('Decode error:', error);
    return null;
  }
}
```

### localStorage Safety
- Implement size limits per scenario
- Validate data structure on load
- Handle corrupted data gracefully
- Clear old/unused scenarios automatically

---

## Deployment Checklist

### Pre-Launch
- [ ] All TypeScript errors resolved
- [ ] All ESLint warnings addressed
- [ ] Accessibility audit passed (WCAG AA)
- [ ] Cross-browser testing complete
- [ ] Mobile responsiveness verified
- [ ] Performance benchmarks met
- [ ] All unit tests passing
- [ ] Integration tests passing
- [ ] Manual testing checklist completed

### Production Build
- [ ] Environment variables configured
- [ ] Production build optimized
- [ ] Source maps generated
- [ ] Bundle size analyzed
- [ ] Assets compressed (images, fonts)
- [ ] CDN configured (if applicable)
- [ ] Error tracking enabled (Sentry, etc.)
- [ ] Analytics configured (optional)

### Post-Launch
- [ ] Monitor error rates
- [ ] Check performance metrics
- [ ] Verify share URLs work correctly
- [ ] Test localStorage persistence
- [ ] Collect user feedback
- [ ] Monitor browser console for errors

---

## Maintenance Plan

### Regular Updates
- **Weekly:** Monitor error logs, user feedback
- **Monthly:** Review performance metrics, update dependencies
- **Quarterly:** Accessibility audit, security review

### Known Limitations (v1.0)
1. Only supports two hypotheses (not 3+)
2. No backend/cloud sync
3. Limited to 5MB localStorage per domain
4. No collaborative/real-time editing
5. No export to PDF/other formats
6. No undo/redo functionality
7. Evidence cannot be manually reordered

### Roadmap (Future Versions)

**v1.1 (Minor Update)**
- Add undo/redo functionality
- Implement evidence reordering (drag-and-drop)
- Add keyboard shortcuts
- Improve mobile experience

**v2.0 (Major Update)**
- Multi-user comparison mode
- Alternative evidence weighting methods
- Export to PDF/Markdown
- Cloud sync with optional accounts
- More preset scenarios

**v3.0 (Advanced Features)**
- Support for 3+ hypotheses
- Integration with external data sources
- Advanced tutorial system
- AI-assisted evidence suggestion
- Collaborative real-time editing

---

## Support & Documentation

### User Documentation (To Be Created)
1. **Getting Started Guide**
   - What is Bayesian reasoning?
   - How to use the tool
   - Understanding the sliders

2. **Tutorial Videos**
   - Quick tour (2 minutes)
   - Working through a preset (5 minutes)
   - Creating your own scenario (10 minutes)

3. **FAQ**
   - What do the percentages mean?
   - Why does certainty matter?
   - How do I share my analysis?
   - What if I disagree with someone's assessment?

### Developer Documentation
- Component API reference
- State management patterns
- Adding new presets
- Extending calculation engine
- Contributing guidelines

---

## Glossary (Extended)

- **Prior Probability:** Initial belief before seeing evidence (P(H))
- **Likelihood:** Probability of seeing evidence given hypothesis (P(E|H))
- **Posterior Probability:** Updated belief after seeing evidence (P(H|E))
- **Likelihood Ratio:** P(E|H1) / P(E|H2) - measures evidence strength
- **Bayesian Updating:** Process of revising beliefs based on new evidence
- **Odds:** Alternative to probability, ratio of P(H1) to P(H2)
- **Base Rate:** The prior probability of a hypothesis before considering specific evidence
- **Conditional Probability:** Probability of an event given that another event has occurred
- **Evidence Weight:** How strongly a piece of evidence supports one hypothesis over another
- **Certainty Adjustment:** Modifying the impact of evidence based on confidence in its accuracy

---

## Contact & Support

**For Implementation Questions:**
- Reference this design document
- Check component specifications
- Review calculation logic section

**For Design Changes:**
- Document proposed changes
- Consider impact on extensibility
- Update this document accordingly

**Version Control:**
- Keep design doc in sync with implementation
- Tag versions with git releases
- Maintain changelog

---

## Document Revision History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | Dec 24, 2025 | Initial complete design document | Design Team |

---

**End of Design Document**

This document is ready for implementation. All critical decisions have been made, all components specified, and all technical requirements defined. Begin with Phase 1 implementation following the component specifications and data model outlined above