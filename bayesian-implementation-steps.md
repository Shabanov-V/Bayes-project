# Bayesian Reasoning Tool - Step-by-Step Implementation Guide

**Purpose:** Build the application incrementally, one feature at a time, using AI code generation  
**Strategy:** Each step is self-contained and testable before moving to the next  
**Approach:** Start minimal, add complexity gradually

---

## Phase 1: Foundation & Basic Structure

### Step 1.1: Project Setup & Blank Canvas
**Goal:** Get a working Vite React app with TypeScript and Tailwind

**What to ask the AI:**
> "Create a Vite React TypeScript project with Tailwind CSS. Set up the basic App.tsx with a dark background (#0f1419) and a centered title 'Bayesian Reasoning Tool' in white text. Include basic Tailwind configuration for the color palette: background #0f1419, surface #1a1f29, border #2d3748, blue #3b82f6, purple #8b5cf6."

**Expected output:**
- `package.json` with dependencies
- `tailwind.config.js` with custom colors
- `App.tsx` with basic layout
- Working dev server

**How to verify:**
- Run `npm install && npm run dev`
- See title on dark background
- No console errors

---

### Step 1.2: Basic Layout Structure
**Goal:** Create the main layout sections without functionality

**What to ask the AI:**
> "Update App.tsx to create three main sections: Header (with logo/title, empty space for future buttons), Hypothesis Panel (two empty side-by-side cards with 'vs' between them), and Evidence Section (empty for now). Use the color palette: surface cards on #1a1f29 background, #2d3748 borders. Add proper spacing: 32px between sections, 16px padding inside cards."

**Expected output:**
- Three distinct visual sections
- Proper spacing and colors
- Responsive layout (50% width cards on desktop)

**How to verify:**
- Visual inspection matches design
- Cards are centered and properly spaced
- Looks clean and organized

---

### Step 1.3: TypeScript Data Model
**Goal:** Define all interfaces and types

**What to ask the AI:**
> "Create a types/index.ts file with TypeScript interfaces for: ScenarioState (with id, name, hypotheses {h1, h2}, priorProbability, evidence array, timestamps), Evidence (with id, description, likelihoodH1, likelihoodH2, certainty, order), CalculatedResult (with h1Probability, h2Probability, steps array), and CalculationStep (with evidenceId, evidenceName, likelihoodRatio, certaintyAdjusted, oddsAfter, probabilityAfter). Make all fields properly typed with number ranges noted in comments."

**Expected output:**
- `types/index.ts` with all interfaces
- Clear comments on constraints
- Export all types

**How to verify:**
- File compiles without errors
- Can import types in other files

---

## Phase 2: Core State & Simple Display

### Step 2.1: Basic State Management
**Goal:** Set up React state to hold one scenario

**What to ask the AI:**
> "Create a custom hook 'useScenario' in hooks/useScenario.ts that uses useReducer to manage ScenarioState. Include actions for: updateHypothesis, updatePrior, addEvidence, removeEvidence, updateEvidence. Initialize with empty hypotheses ('Hypothesis 1', 'Hypothesis 2'), prior at 50, and one empty evidence item. Export the hook with state and actions."

**Expected output:**
- `hooks/useScenario.ts` with useReducer
- All basic actions defined
- Default initial state

**How to verify:**
- Import hook in App.tsx
- Log state to console
- Call an action, verify state updates

---

### Step 2.2: Editable Hypothesis Cards
**Goal:** Make hypothesis text editable and display them

**What to ask the AI:**
> "Create a HypothesisCard component in components/HypothesisPanel/HypothesisCard.tsx. It should accept: text, color (blue or purple), onTextChange callback. Display the text in an editable input field (24px font, semibold), with a large placeholder percentage '50%' below it (48px, bold). Style the card with rounded corners, surface background, and a subtle border. Make the input have a 100 character limit."

**Expected output:**
- `HypothesisCard.tsx` component
- Styled input field
- Character limit enforced

**How to verify:**
- Use in App.tsx with useScenario hook
- Type in hypothesis fields
- See character count enforced at 100

---

### Step 2.3: Display Static Probability
**Goal:** Show hardcoded 50/50 probabilities (calculation comes later)

**What to ask the AI:**
> "Update HypothesisCard to accept a 'probability' prop (number 0-100). Display it as a large percentage (48px bold) in the hypothesis color. Below it, add a horizontal bar that fills according to the percentage (height 8px, rounded). For now, pass 50 as the probability from App.tsx to both cards."

**Expected output:**
- Probability displayed prominently
- Visual bar showing 50% fill
- Colors match hypothesis (blue/purple)

**How to verify:**
- Both cards show 50%
- Bars are half-filled
- Colors are correct

---

## Phase 3: Evidence Cards (No Calculations Yet)

### Step 3.1: Basic Evidence Card Display
**Goal:** Show evidence description with no sliders yet

**What to ask the AI:**
> "Create an EvidenceCard component in components/Evidence/EvidenceCard.tsx. Accept: evidence object, onUpdate callback, onDelete callback. Display: a textarea for description (16px font, 200 char limit with counter, auto-growing up to 4 lines, placeholder 'Describe the evidence...'), and a delete button (× icon, top-right corner, red on hover). Style with surface background, border, rounded corners, 16px padding."

**Expected output:**
- `EvidenceCard.tsx` component
- Working textarea with character counter
- Functional delete button

**How to verify:**
- Display one evidence card in App.tsx
- Type in textarea, see counter update
- Click delete, log to console

---

### Step 3.2: Add Evidence Button
**Goal:** Let users add new evidence items

**What to ask the AI:**
> "Create an AddEvidenceButton component in components/Evidence/AddEvidenceButton.tsx. It should be a full-width button with dashed border, gray color, with a + icon and text 'Add Evidence'. On click, call an onClick prop. Style it to match the evidence cards width and have a hover state that brightens the border."

**Expected output:**
- `AddEvidenceButton.tsx` component
- Dashed border styling
- Hover effect

**How to verify:**
- Place below evidence cards
- Click button
- Verify onClick fires (log to console)

---

### Step 3.3: Connect Evidence to State
**Goal:** Wire up add/delete to actually modify state

**What to ask the AI:**
> "Update App.tsx to map over state.evidence and render an EvidenceCard for each. Wire the onDelete callback to call removeEvidence action with the evidence id. Wire AddEvidenceButton onClick to call addEvidence action. When addEvidence is called, generate a new UUID, create an evidence object with empty description, all values at defaults (50, 50, 75), and order set to current max order + 1."

**Expected output:**
- List of evidence cards from state
- Add button creates new cards
- Delete button removes cards

**How to verify:**
- Click add 3 times → see 4 evidence cards (1 initial + 3 new)
- Delete one → card disappears
- Add another → new card appears

---

### Step 3.4: Basic Slider Component
**Goal:** Create a reusable slider (no functionality yet)

**What to ask the AI:**
> "Create a Slider component in components/UI/Slider.tsx. Accept props: value (0-100), onChange callback, label (string), min, max, step. Render: a label above, an input[type='range'] styled with Tailwind (custom thumb, track background #374151, thumb white 20px diameter), and the current percentage value to the right of the slider. The slider should snap to 5% increments by default (step=5). Style the label as 14px medium weight, gray text."

**Expected output:**
- `Slider.tsx` reusable component
- Styled range input
- Value displayed next to slider

**How to verify:**
- Use in isolation with useState
- Drag slider, see value update
- Verify 5% snap behavior

---

### Step 3.5: Add Sliders to Evidence Cards
**Goal:** Display all three sliders per evidence

**What to ask the AI:**
> "Update EvidenceCard to include three Slider components below the textarea: 'If H1 were true, how expected is this evidence?' (value: likelihoodH1), 'If H2 were true, how expected is this evidence?' (value: likelihoodH2), 'How certain are you of this evidence?' (value: certainty). Wire each slider's onChange to call onUpdate with the evidence id and the changed field. Use 16px spacing between sliders."

**Expected output:**
- Three sliders in each evidence card
- Labels match specification
- OnChange updates log correctly

**How to verify:**
- Move each slider
- Check console for update calls
- Verify correct field and value logged

---

### Step 3.6: Wire Sliders to State
**Goal:** Make slider changes persist in state

**What to ask the AI:**
> "In the useScenario hook, implement the updateEvidence action to find the evidence by id and update only the changed fields using spread operator. In App.tsx, wire the EvidenceCard onUpdate to call this action. Verify that moving a slider updates the state and re-renders with the new value."

**Expected output:**
- Slider changes persist
- State updates correctly
- Re-render shows new values

**How to verify:**
- Move a slider
- Check React DevTools for state change
- Refresh page (state resets but sliders worked)

---

## Phase 4: Bayesian Calculations

### Step 4.1: Core Calculation Function
**Goal:** Implement the Bayesian math

**What to ask the AI:**
> "Create lib/bayesian.ts with a calculatePosterior function. It takes ScenarioState and returns CalculatedResult. Implement: (1) Convert prior to odds, (2) For each evidence, calculate likelihood ratio (likelihoodH1 / likelihoodH2, with min 0.01 to avoid division by zero), adjust for certainty using power function (ratio^(certainty/100)), multiply odds by adjusted ratio, store each step. (3) Convert final odds back to probabilities, cap at 0.1-99.9%. Return h1Probability, h2Probability, and steps array. Add detailed comments explaining the math."

**Expected output:**
- `lib/bayesian.ts` with calculation logic
- Edge case handling (division by zero)
- Step-by-step tracking

**How to verify:**
- Import and test with sample data
- Verify math: prior 50/50, one evidence (90% vs 30%) → should give ~75% for H1
- Check edge cases: 0% likelihoods, 0% certainty

---

### Step 4.2: Calculate on Every Change
**Goal:** Hook up calculations to state updates

**What to ask the AI:**
> "Create hooks/useCalculations.ts that accepts the current ScenarioState and uses useMemo to call calculatePosterior. Memoize based on evidence array and priorProbability. In App.tsx, call this hook and log the result. Verify calculations update when any slider moves or evidence is added/removed."

**Expected output:**
- `hooks/useCalculations.ts` with memoization
- Efficient recalculation (only on relevant changes)

**How to verify:**
- Move slider → see new probabilities in console
- Add evidence → probabilities recalculate
- Edit hypothesis text → NO recalculation (correct)

---

### Step 4.3: Display Real Probabilities
**Goal:** Show calculated probabilities in hypothesis cards

**What to ask the AI:**
> "Update App.tsx to pass the calculated h1Probability and h2Probability from useCalculations to the HypothesisCard components. Update HypothesisCard to animate the probability change over 300ms using CSS transition on the percentage text and bar width. Round probabilities to whole numbers for display."

**Expected output:**
- Real probabilities shown
- Smooth animation on change
- Numbers always sum to 100%

**How to verify:**
- Move evidence sliders
- Watch probabilities update smoothly
- Verify math makes sense (stronger evidence → higher probability)

---

### Step 4.4: Evidence Impact Display
**Goal:** Show how much each evidence shifts probability

**What to ask the AI:**
> "Add an 'impact' calculation to each evidence card. This is: (probability after this evidence) - (probability before this evidence). In useCalculations, track intermediate probabilities after each evidence item. Add getEvidenceImpact(evidenceId) function that returns the shift. Display in EvidenceCard as: 'Impact: ↑ Increases H1 by 12%' (green) or '↓ Decreases H1 by 8%' (red). Use 12px gray text."

**Expected output:**
- Impact shown below each evidence
- Correct increase/decrease with arrow
- Color coding (green up, red down)

**How to verify:**
- Evidence favoring H1 (higher likelihood) → positive green impact
- Evidence favoring H2 → negative red impact
- Adjust certainty → impact changes proportionally

---

## Phase 5: Prior Probability Control

### Step 5.1: Prior Slider (Hidden by Default)
**Goal:** Add collapsible prior adjustment

**What to ask the AI:**
> "Create PriorProbabilityControl component in components/HypothesisPanel/. It should show 'Prior Probability: 50% (Advanced)' by default as clickable text. When clicked, expand to show a slider (1-99%, default 50%) with label 'Starting belief in H1 before evidence'. Include a small info tooltip icon. Style as subtle, gray, collapsed by default. OnChange should call updatePrior action."

**Expected output:**
- `PriorProbabilityControl.tsx` component
- Collapsible behavior
- Slider with 1-99% range

**How to verify:**
- Click "(Advanced)" → slider appears
- Adjust slider → probabilities shift
- Verify calculation uses new prior

---

### Step 5.2: Tooltip System
**Goal:** Add info tooltips throughout UI

**What to ask the AI:**
> "Create a Tooltip component in components/UI/Tooltip.tsx. It should show an 'ⓘ' icon that displays a text tooltip on hover (dark background, white text, small arrow, positioned above icon, max 300px width). Use CSS for hover behavior, no JS needed. Create a TooltipText component that wraps text that should show tooltip on hover."

**Expected output:**
- `Tooltip.tsx` reusable component
- Hover-based display
- Positioned correctly

**How to verify:**
- Add to slider labels
- Hover → tooltip appears
- Move mouse away → tooltip disappears

---

### Step 5.3: Add Tooltips to All Sliders
**Goal:** Implement all tooltip content from design doc

**What to ask the AI:**
> "Add Tooltip components next to each slider label in EvidenceCard and PriorProbabilityControl. Use these exact texts:
> - Prior: 'Your starting belief before considering any evidence. Usually 50/50 unless you have specific reason to favor one hypothesis.'
> - Likelihood H1: 'If Hypothesis 1 were definitely true, how often would you expect to see this evidence? 100% = always, 50% = half the time, 0% = never.'
> - Likelihood H2: 'If Hypothesis 2 were definitely true, how often would you expect to see this evidence? Compare this to the H1 slider - large differences mean strong evidence.'
> - Certainty: 'How confident are you that this evidence is accurate? 100% = certain fact, 75% = pretty sure (default), 50% = might be true, 0% = completely uncertain.'
> - Impact: 'How much this single piece of evidence shifts the probability. Large impacts mean this evidence strongly favors one hypothesis.'"

**Expected output:**
- Tooltips on all relevant elements
- Correct educational text
- Consistent styling

**How to verify:**
- Hover each ⓘ icon
- Read tooltip text
- Verify it matches design doc

---

## Phase 6: Calculations Panel

### Step 6.1: Collapsible Panel Structure
**Goal:** Create expandable calculations display

**What to ask the AI:**
> "Create CalculationsPanel component in components/Calculations/. Show a button 'Show Calculations ▾' below evidence list. When clicked, expand to show a panel with border and padding. Button should change to 'Hide Calculations ▴' when expanded. Use smooth height transition (300ms). Panel background should be slightly lighter than surface (#1e2530)."

**Expected output:**
- `CalculationsPanel.tsx` with expand/collapse
- Smooth animation
- Toggle button

**How to verify:**
- Click button → panel expands
- Click again → panel collapses
- Transition is smooth

---

### Step 6.2: Display Calculation Steps
**Goal:** Show step-by-step math

**What to ask the AI:**
> "Update CalculationsPanel to accept 'steps' prop from CalculatedResult. Display:
> 1. Starting odds (prior as ratio)
> 2. For each evidence step: Evidence name, Likelihood Ratio, Certainty Adjusted Ratio, New Odds, Probability after this evidence
> 3. Final result
> Format numbers to 2 decimal places. Use monospace font for numbers. Add subtle borders between steps. Style section headers in bold."

**Expected output:**
- Complete calculation breakdown
- Each step shown clearly
- Numbers aligned and readable

**How to verify:**
- Expand panel
- Verify calculation steps match formula
- Change evidence → steps update

---

### Step 6.3: Real-time Calculation Updates
**Goal:** Ensure panel updates as sliders move

**What to ask the AI:**
> "Wire CalculationsPanel to receive fresh calculation steps from useCalculations hook. Ensure it re-renders when any evidence changes. Add a subtle 'Calculating...' state if needed (though calculations should be instant). Verify that expanding the panel while moving sliders shows live updates."

**Expected output:**
- Live updates as sliders move
- No lag or delay
- Panel stays expanded during updates

**How to verify:**
- Expand calculations panel
- Move any slider
- See numbers update in real-time
- Try with multiple evidence items

---

## Phase 7: Presets System

### Step 7.1: Define Preset Data
**Goal:** Create the 3 built-in scenarios

**What to ask the AI:**
> "Create lib/presets.ts with an array of 3 preset scenarios (Moon Landing, UBI Policy, Medical Diagnosis). Each preset should have: id, name, hypotheses, priorProbability (50), and evidence array. Use the exact data from the design document for each preset. Export as 'BUILT_IN_PRESETS' constant."

**Expected output:**
- `lib/presets.ts` with 3 complete scenarios
- Properly typed with ScenarioState interface
- Export constant

**How to verify:**
- Import in console
- Check data structure
- Verify all evidence items present

---

### Step 7.2: Load Preset Function
**Goal:** Add ability to load a preset into state

**What to ask the AI:**
> "In useScenario hook, add a 'loadScenario' action that replaces the entire state with a new ScenarioState object. Generate a new UUID for id and set current timestamp for createdAt/modifiedAt. In App.tsx, add a temporary button that loads the Moon Landing preset when clicked."

**Expected output:**
- loadScenario action in reducer
- Button to test loading
- State fully replaced

**How to verify:**
- Click load button
- See hypothesis text change to Moon Landing
- See 4 evidence items appear
- Verify probabilities calculate correctly

---

### Step 7.3: Preset Dropdown UI
**Goal:** Create dropdown menu in header

**What to ask the AI:**
> "Create PresetDropdown component in components/Header/. It should be a styled dropdown button in the header that shows 'Load Preset ▾'. When clicked, show a menu with sections: 'Example Scenarios' (list 3 built-in presets by name), a divider, 'Your Scenarios' (empty for now), another divider, and 'New Blank Scenario'. Each item should be clickable. Style with dark background, hover states, smooth open/close animation."

**Expected output:**
- `PresetDropdown.tsx` component
- Dropdown menu with sections
- Click handlers on items

**How to verify:**
- Click dropdown → menu appears
- Click preset name → calls load function
- Click outside → menu closes
- Hover items → highlight

---

### Step 7.4: Wire Presets to Load
**Goal:** Connect dropdown to actual preset loading

**What to ask the AI:**
> "Wire each preset item in PresetDropdown to call loadScenario with that preset's data. Also implement 'New Blank Scenario' to call loadScenario with an empty scenario (empty hypotheses, prior 50, one empty evidence). After loading, close the dropdown. Test that clicking each preset loads the correct scenario."

**Expected output:**
- All 3 presets load correctly
- "New Blank Scenario" clears everything
- Dropdown closes after selection

**How to verify:**
- Load Moon Landing → see moon landing data
- Load UBI → see UBI data
- Load Medical → see medical data
- Load New Blank → see empty fields
- Switch between them multiple times

---

## Phase 8: Local Storage

### Step 8.1: Save to localStorage
**Goal:** Persist current scenario

**What to ask the AI:**
> "Create lib/storage.ts with functions: saveScenario(state), loadScenario(id), listScenarios(), deleteScenario(id). Implement saveScenario to store ScenarioState in localStorage under key 'bayesian-scenarios'. Store as an array of scenarios. Also save the current scenario separately under 'bayesian-current'. Handle JSON stringify/parse and potential errors."

**Expected output:**
- `lib/storage.ts` with storage utilities
- Error handling for quota exceeded
- JSON serialization

**How to verify:**
- Call saveScenario with test data
- Check localStorage in DevTools
- Verify JSON structure

---

### Step 8.2: Auto-save Current Scenario
**Goal:** Save state automatically on changes

**What to ask the AI:**
> "Add a useEffect in App.tsx that calls saveScenario from storage.ts whenever the state changes. Debounce this to avoid saving on every keystroke (500ms delay). Also save immediately before page unload. Test that changes persist after refresh."

**Expected output:**
- Auto-save on state changes
- Debounced to avoid spam
- Saves before unload

**How to verify:**
- Make changes (type, move sliders)
- Refresh page
- Changes should persist
- Check localStorage in DevTools

---

### Step 8.3: Load on Mount
**Goal:** Restore last scenario on page load

**What to ask the AI:**
> "Update App.tsx to check localStorage on mount. If 'bayesian-current' exists, load that scenario into state. Otherwise, load the Moon Landing preset as default. Add a try-catch to handle corrupted localStorage data gracefully (fall back to default preset)."

**Expected output:**
- Loads last state on refresh
- Falls back to default if corrupted
- No console errors

**How to verify:**
- Make changes
- Refresh → see same state
- Manually corrupt localStorage
- Refresh → loads Moon Landing preset

---

### Step 8.4: Save User Scenarios
**Goal:** Let users save named scenarios

**What to ask the AI:**
> "Add a 'Save As' button in the header. When clicked, show a prompt asking for scenario name. Save the current state to the scenarios array in localStorage with that name. Update PresetDropdown to show saved scenarios in the 'Your Scenarios' section. Each should have a delete button (small × that calls deleteScenario)."

**Expected output:**
- Save As button and prompt
- Named scenarios saved
- List of user scenarios in dropdown
- Delete functionality

**How to verify:**
- Click Save As → enter name → saved
- Open dropdown → see saved scenario
- Click it → loads correctly
- Delete it → disappears from list

---

## Phase 9: Share Functionality

### Step 9.1: URL Encoding
**Goal:** Encode state into URL parameter

**What to ask the AI:**
> "Create hooks/useShareUrl.ts with functions: encodeScenario(state) that converts ScenarioState to JSON, then base64 encodes it, and returns a full URL with ?scenario=<encoded>. Also add decodeScenario(encoded) that reverses the process. Handle encoding errors gracefully."

**Expected output:**
- `hooks/useShareUrl.ts` with encode/decode
- Base64 encoding of JSON
- URL generation

**How to verify:**
- Encode test scenario
- Copy URL
- Decode it back
- Verify state matches original

---

### Step 9.2: Share Button
**Goal:** Add share button to header

**What to ask the AI:**
> "Create ShareButton component in components/Header/. It should be a button in the header with a share icon. When clicked, generate the share URL for current state, copy it to clipboard using navigator.clipboard.writeText, and show a toast notification 'Link copied! Anyone can view this scenario.' Style the toast as a small popup at bottom of screen that fades in/out."

**Expected output:**
- `ShareButton.tsx` component
- Clipboard copy functionality
- Toast notification

**How to verify:**
- Click Share button
- See toast appear
- Paste URL → verify it's correct
- Toast disappears after 3 seconds

---

### Step 9.3: Load from URL Parameter
**Goal:** Detect and load shared scenarios

**What to ask the AI:**
> "Update App.tsx initialization to check for ?scenario= URL parameter on mount. If present, decode it and load that scenario instead of localStorage. If decoding fails, show an error toast 'Invalid share link' and load default. After loading from URL, optionally update the URL to remove the parameter (using history.replaceState)."

**Expected output:**
- URL parameter detection
- Scenario loads from URL
- Error handling for invalid URLs

**How to verify:**
- Generate share URL
- Open in new tab → scenario loads
- Try invalid URL → error toast, loads default
- Share URL for different scenarios

---

### Step 9.4: Toast Notification Component
**Goal:** Reusable toast system

**What to ask the AI:**
> "Create Toast component in components/UI/ that can show temporary notifications. It should accept: message, type (success/error), duration. Display at bottom center of screen, fade in smoothly, stay for 3 seconds (or specified duration), then fade out. Support multiple toasts stacking. Use React context to make it accessible throughout the app."

**Expected output:**
- `Toast.tsx` component and context
- Auto-dismiss after duration
- Multiple toasts support

**How to verify:**
- Trigger multiple toasts quickly
- See them stack
- Each dismisses after 3 seconds
- Smooth animations

---

## Phase 10: Polish & Refinements

### Step 10.1: Responsive Layout
**Goal:** Make it work on tablet and mobile

**What to ask the AI:**
> "Update all components to be responsive. At 768px and below: Stack hypothesis cards vertically instead of side-by-side. At 640px and below: Reduce font sizes (title 24px, hypotheses 18px, percentages 36px), reduce padding (16px to 12px), make sliders taller (12px track height for better touch targets). Test on mobile viewport."

**Expected output:**
- Media queries for breakpoints
- Vertical stacking on small screens
- Touch-friendly elements

**How to verify:**
- Resize browser to tablet width
- Resize to mobile width
- Test touch interaction on sliders (if possible)

---

### Step 10.2: Keyboard Navigation
**Goal:** Full keyboard accessibility

**What to ask the AI:**
> "Ensure all interactive elements are keyboard accessible. Add tab navigation support. Arrow keys should adjust sliders. Enter should submit text inputs. Escape should close dropdown/modal. Add visible focus indicators (blue ring) on all focusable elements. Test tab order is logical (top to bottom, left to right)."

**Expected output:**
- Tab navigation works
- Arrow keys on sliders
- Focus indicators visible

**How to verify:**
- Tab through entire interface
- Use only keyboard to perform all actions
- Verify focus indicators visible

---

### Step 10.3: Loading States
**Goal:** Show feedback during operations

**What to ask the AI:**
> "Add loading states where appropriate: When loading scenario from localStorage (show spinner on hypothesis panel), when sharing (show 'Generating link...' on button), when calculations are running (unlikely but good practice). Use a simple spinner component with the blue accent color."

**Expected output:**
- Spinner component
- Loading states on async operations
- Smooth transitions

**How to verify:**
- Artificial delay if needed to see spinners
- No UI freezing
- Clear feedback for user

---

### Step 10.4: Empty States
**Goal:** Guide users when sections are empty

**What to ask the AI:**
> "Add helpful empty states: When evidence list is empty (show 'Add your first piece of evidence to begin' with an arrow pointing to the Add Evidence button), when no saved scenarios exist (show 'Your saved scenarios will appear here' in dropdown), when hypotheses are empty (show placeholder text 'Enter your first hypothesis')."

**Expected output:**
- Empty state messages
- Helpful guidance text
- Styled consistently

**How to verify:**
- Load blank scenario
- See helpful messages
- Clear what user should do next

---

### Step 10.5: Error Boundaries
**Goal:** Graceful error handling

**What to ask the AI:**
> "Add React Error Boundary component that catches JavaScript errors anywhere in the tree. Display a friendly error message: 'Something went wrong. Try refreshing the page.' with a button to reset state to default. Also wrap calculation function in try-catch that falls back to 50/50 if calculation fails."

**Expected output:**
- ErrorBoundary component
- Fallback UI
- Try-catch in calculations

**How to verify:**
- Manually trigger error
- See fallback UI
- Reset button works
- No white screen of death

---

### Step 10.6: Animations & Transitions
**Goal:** Smooth, professional feel

**What to ask the AI:**
> "Add smooth transitions throughout: Probability bar width changes (300ms ease-out), probability number changes (300ms with number animation), evidence card add/remove (fade in/out 200ms), dropdown open/close (150ms), hover states (100ms). Use CSS transitions, not JS animation. Keep performance smooth (60fps)."

**Expected output:**
- CSS transitions on key elements
- Smooth animations
- No janky performance

**How to verify:**
- Move sliders → smooth updates
- Add/remove evidence → smooth fade
- Open dropdown → smooth expansion
- Check 60fps in DevTools performance tab

---

### Step 10.7: Final Styling Pass
**Goal:** Match design document exactly

**What to ask the AI:**
> "Review all spacing, colors, typography, and layout against the design document. Ensure: Cards have proper rounded corners and shadows, Colors exactly match palette (verify hex codes), Spacing follows 8px base unit grid, Font sizes match specification, Hover states are subtle but clear, Focus states are visible but not overwhelming. Make any final adjustments needed."

**Expected output:**
- Pixel-perfect match to design
- Consistent spacing
- Professional appearance

**How to verify:**
- Side-by-side comparison with design doc
- Check every color in DevTools
- Measure spacing with pixel ruler
- Get second opinion on aesthetics

---

## Phase 11: Testing & Optimization

### Step 11.1: Manual Test Suite
**Goal:** Verify all functionality works

**What to ask the AI:**
> "Create a manual testing checklist as a markdown file. Include tests for: All preset loading, Evidence add/remove, Slider interactions, Calculation accuracy (with known test cases), LocalStorage persistence, Share URL generation/loading, Keyboard navigation, Mobile responsiveness, Error scenarios. Number each test and provide space for pass/fail/notes."

**Expected output:**
- `TESTING.md` with complete checklist
- Test cases with expected results
- Space to record outcomes

**How to verify:**
- Run through entire checklist
- Document any failures
- Fix issues found

---

### Step 11.2: Cross-Browser Testing
**Goal:** Ensure compatibility

**What to ask the AI:**
> "Test the application in Chrome, Firefox, Safari, and Edge. Document any browser-specific issues. Common issues to check: Slider styling differences, Input field behavior, Clipboard API support, LocalStorage limits, CSS flexbox/grid rendering. Create a compatibility matrix showing tested browsers and pass/fail status."

**Expected output:**
- Compatibility matrix document
- List of browser-specific issues
- Fixes for any compatibility problems

**How to verify:**
- Open in each browser
- Run through core features
- Document any issues
- Implement fixes or workarounds

---

### Step 11.3: Performance Optimization
**Goal:** Ensure smooth 60fps performance

**What to ask the AI:**
> "Analyze performance using Chrome DevTools. Check: Bundle size (should be < 200KB gzipped), Initial load time (< 2s), Time to Interactive (< 3s), Slider response time (should be instant, < 16ms), Memory usage (no leaks when adding/removing evidence). Optimize: Add React.memo to components that don't need to re-render, ensure useMemo is used for calculations, lazy load CalculationsPanel if it's rarely used."

**Expected output:**
- Performance audit results
- Optimizations applied
- Before/after metrics

**How to verify:**
- Run Lighthouse audit → score 90+
- Test with 20+ evidence items → still smooth
- Profile with DevTools → no memory leaks
- Check bundle size with analyzer

---

### Step 11.4: Accessibility Audit
**Goal:** WCAG 2.1 AA compliance

**What to ask the AI:**
> "Run accessibility audit. Check: All interactive elements have ARIA labels, Color contrast ratio is 4.5:1 minimum, Slider inputs have proper labels and roles, Focus indicators are visible, Screen reader announces changes (probability updates), Semantic HTML used throughout, Alt text on any icons, Keyboard navigation is logical. Use tools: Chrome Lighthouse, axe DevTools, manual screen reader test."

**Expected output:**
- Accessibility audit report
- ARIA labels added where needed
- Contrast fixes
- Screen reader compatible

**How to verify:**
- Lighthouse accessibility score 100
- Navigate with screen reader (NVDA/JAWS)
- Tab through interface with keyboard only
- Check contrast with DevTools

---

### Step 11.5: Edge Case Testing
**Goal:** Handle unusual scenarios gracefully

**What to ask the AI:**
> "Test edge cases: What happens with 100 evidence items? What if all sliders are at 0%? What if all are at 100%? What if hypothesis text is exactly 100 characters? What if evidence description is 200 characters? What if localStorage is full? What if user has JavaScript disabled? What if viewport is extremely narrow (320px) or wide (4K)? Document behavior and fix any issues."

**Expected output:**
- Edge case test results
- Fixes for any breaking cases
- Graceful degradation where needed

**How to verify:**
- Try each edge case
- App doesn't crash
- Error messages are helpful
- Data doesn't corrupt

---

## Phase 12: Documentation & Launch Prep

### Step 12.1: Code Comments
**Goal:** Well-documented codebase

**What to ask the AI:**
> "Add JSDoc comments to all major functions explaining: Purpose, Parameters, Return values, Example usage. Add inline comments for complex logic (especially in bayesian.ts calculation). Add README.md with: Project description, How to install and run, Tech stack, Project structure, How to add new features. Keep comments concise but helpful."

**Expected output:**
- JSDoc on all exports
- README.md file
- Clear code documentation

**How to verify:**
- Another developer can understand code
- README has all needed info
- Comments explain WHY not just WHAT

---

### Step 12.2: User Documentation
**Goal:** Help users understand the tool

**What to ask the AI:**
> "Create a simple help overlay that explains: What is Bayesian reasoning (2 sentences), How to use the tool (5 bullet points), What the sliders mean (brief), Tips for good hypotheses. Accessible via the ? icon in header. Style as a modal overlay with dark background, centered card, close button. Keep text simple and friendly, avoid jargon."

**Expected output:**
- Help modal component
- Clear user-friendly text
- Accessible from header

**How to verify:**
- Click ? icon → help appears
- Read through content
- Is it understandable to non-technical user?
- Close button works

---

### Step 12.3: Sample Scenarios Documentation
**Goal:** Explain the preset scenarios

**What to ask the AI:**
> "For each of the 3 presets, add a brief explanation that appears when hovering over the preset name in the dropdown. Explain: Why these hypotheses matter, What the evidence represents, What makes this a good example for learning Bayes. Keep to 2-3 sentences each. Style as a tooltip that appears after 1 second hover."

**Expected output:**
- Tooltips on preset names
- Educational context
- Delayed hover (1s)

**How to verify:**
- Hover each preset → see explanation
- Read explanations → they're helpful
- Tooltip positioned correctly

---

### Step 12.4: Final QA Checklist
**Goal:** Everything works perfectly

**What to ask the AI:**
> "Create a comprehensive pre-launch checklist covering: All features working, All browsers tested, Mobile responsive, Accessibility compliant, Performance metrics met, No console errors, LocalStorage works, Share URLs work, All tooltips present, All animations smooth, Error handling works, Empty states helpful, Loading states show, No typos in text, Colors match design, Spacing consistent. Mark each item as tested/pass."

**Expected output:**
- Complete QA checklist
- Every item tested
- All items passing

**How to verify:**
- Go through entire checklist
- Test each item systematically
- Fix any failures
- Get sign-off

---

### Step 12.5: Production Build
**Goal:** Optimized build ready to deploy

**What to ask the AI:**
> "Configure Vite for production build: Enable minification, tree-shaking, code splitting. Set up proper environment variables. Generate source maps for debugging. Configure asset optimization (compress images if any). Add build script to package.json. Test production build locally before deploying. Verify bundle size, load time, and functionality."

**Expected output:**
- Production build configuration
- Optimized bundle
- Working production build

**How to verify:**
- Run `npm run build`
- Check dist/ folder size
- Test production build locally
- Verify all features work in prod mode

---

## Bonus Phase: Future Enhancements (Optional)

### Bonus 1: Undo/Redo
**Goal:** Let users undo changes

**What to ask the AI:**
> "Implement undo/redo functionality. Keep a history stack of state changes (max 20 items). Add undo/redo buttons in header (or Ctrl+Z/Ctrl+Shift+Z). Update state management to support time travel. Don't save undo history to localStorage (only current state)."

**Expected output:**
- Undo/redo buttons
- History stack
- Keyboard shortcuts

---

### Bonus 2: Export to Text
**Goal:** Share analysis as text

**What to ask the AI:**
> "Add 'Export' button that generates a text summary of the analysis: Hypotheses, List of evidence with their likelihoods, Final probabilities, Key insights (strongest evidence, biggest impacts). Format as readable plain text or Markdown. Copy to clipboard or download as .txt file."

**Expected output:**
- Export button
- Text generation
- Download or copy

---

### Bonus 3: Dark/Light Mode Toggle
**Goal:** Theme switching

**What to ask the AI:**
> "Add theme toggle in header. Support dark mode (current) and light mode. Store preference in localStorage. Update color palette for light mode: white background, dark text, lighter cards. Ensure contrast ratios still meet accessibility standards. Smooth transition between themes."

**Expected output:**
- Theme toggle
- Light mode palette
- Smooth transitions

---

### Bonus 4: Comparison Mode (Preview)
**Goal:** Foundation for future feature

**What to ask the AI:**
> "Add a 'Compare' button that duplicates current scenario into a second column. This is a preview/foundation for future disagreement analysis. For now, just show two identical scenarios side-by-side. User can adjust sliders independently in each. Don't implement sync or comparison logic yet - just the UI structure."

**Expected output:**
- Comparison UI layout
- Two independent states
- Side-by-side display

---

## Step-by-Step Usage Guide

### How to Use This Document

**For AI-Assisted Development:**

1. **Start at Step 1.1** - Copy the "What to ask the AI" text exactly
2. **Paste into your AI coding assistant** (Claude, ChatGPT, GitHub Copilot Chat, etc.)
3. **Review the generated code** - Make sure it matches "Expected output"
4. **Test using "How to verify"** - Confirm it works before moving on
5. **Move to next step** - Don't skip ahead, each builds on previous

**If Something Goes Wrong:**

- **Code doesn't work:** Show the AI the error message and ask for fix
- **Stuck on verification:** Ask AI "How do I test that [specific functionality] works?"
- **Need clarification:** Ask AI to explain what a step does before implementing
- **Want to modify:** Tell AI "I want to change [X] to do [Y] instead" with context

**Tips for Success:**

- ✅ Complete each step fully before moving on
- ✅ Test after every step (catch bugs early)
- ✅ Commit to git after each working step
- ✅ Take breaks between phases (fresh eyes catch bugs)
- ✅ Verify on different screen sizes regularly
- ❌ Don't skip verification steps
- ❌ Don't implement multiple steps at once
- ❌ Don't continue if a step isn't working

---

## Prompt Templates

### When You Get Stuck

**Template 1 - Error Fix:**
> "I'm on Step [X.X] and getting this error: [paste error]. Here's my current code: [paste relevant code]. How do I fix this?"

**Template 2 - Clarification:**
> "I'm on Step [X.X]. Can you explain what [specific concept] means and why we're doing it this way?"

**Template 3 - Modification:**
> "I've completed Step [X.X] but I want to modify it to [describe change]. How should I adjust the code?"

**Template 4 - Verification Help:**
> "I've implemented Step [X.X] but I'm not sure how to verify it works. Can you give me detailed steps to test [specific feature]?"

**Template 5 - Restart Step:**
> "Step [X.X] isn't working. Can you regenerate the complete code for this step from scratch?"

---

## Progress Tracker

Use this to track your progress:

```
Phase 1: Foundation & Basic Structure
[ ] 1.1 - Project Setup
[ ] 1.2 - Basic Layout
[ ] 1.3 - TypeScript Data Model

Phase 2: Core State & Simple Display
[ ] 2.1 - Basic State Management
[ ] 2.2 - Editable Hypothesis Cards
[ ] 2.3 - Display Static Probability

Phase 3: Evidence Cards (No Calculations Yet)
[ ] 3.1 - Basic Evidence Card Display
[ ] 3.2 - Add Evidence Button
[ ] 3.3 - Connect Evidence to State
[ ] 3.4 - Basic Slider Component
[ ] 3.5 - Add Sliders to Evidence Cards
[ ] 3.6 - Wire Sliders to State

Phase 4: Bayesian Calculations
[ ] 4.1 - Core Calculation Function
[ ] 4.2 - Calculate on Every Change
[ ] 4.3 - Display Real Probabilities
[ ] 4.4 - Evidence Impact Display

Phase 5: Prior Probability Control
[ ] 5.1 - Prior Slider (Hidden by Default)
[ ] 5.2 - Tooltip System
[ ] 5.3 - Add Tooltips to All Sliders

Phase 6: Calculations Panel
[ ] 6.1 - Collapsible Panel Structure
[ ] 6.2 - Display Calculation Steps
[ ] 6.3 - Real-time Calculation Updates

Phase 7: Presets System
[ ] 7.1 - Define Preset Data
[ ] 7.2 - Load Preset Function
[ ] 7.3 - Preset Dropdown UI
[ ] 7.4 - Wire Presets to Load

Phase 8: Local Storage
[ ] 8.1 - Save to localStorage
[ ] 8.2 - Auto-save Current Scenario
[ ] 8.3 - Load on Mount
[ ] 8.4 - Save User Scenarios

Phase 9: Share Functionality
[ ] 9.1 - URL Encoding
[ ] 9.2 - Share Button
[ ] 9.3 - Load from URL Parameter
[ ] 9.4 - Toast Notification Component

Phase 10: Polish & Refinements
[ ] 10.1 - Responsive Layout
[ ] 10.2 - Keyboard Navigation
[ ] 10.3 - Loading States
[ ] 10.4 - Empty States
[ ] 10.5 - Error Boundaries
[ ] 10.6 - Animations & Transitions
[ ] 10.7 - Final Styling Pass

Phase 11: Testing & Optimization
[ ] 11.1 - Manual Test Suite
[ ] 11.2 - Cross-Browser Testing
[ ] 11.3 - Performance Optimization
[ ] 11.4 - Accessibility Audit
[ ] 11.5 - Edge Case Testing

Phase 12: Documentation & Launch Prep
[ ] 12.1 - Code Comments
[ ] 12.2 - User Documentation
[ ] 12.3 - Sample Scenarios Documentation
[ ] 12.4 - Final QA Checklist
[ ] 12.5 - Production Build

Bonus Features (Optional)
[ ] Bonus 1 - Undo/Redo
[ ] Bonus 2 - Export to Text
[ ] Bonus 3 - Dark/Light Mode Toggle
[ ] Bonus 4 - Comparison Mode Preview
```

---

## Estimated Time Per Phase

**Phase 1:** 1-2 hours  
**Phase 2:** 2-3 hours  
**Phase 3:** 3-4 hours  
**Phase 4:** 2-3 hours  
**Phase 5:** 2 hours  
**Phase 6:** 2 hours  
**Phase 7:** 2 hours  
**Phase 8:** 2-3 hours  
**Phase 9:** 2 hours  
**Phase 10:** 3-4 hours  
**Phase 11:** 4-6 hours  
**Phase 12:** 2-3 hours  

**Total:** ~30-40 hours for complete implementation

**Per Session:** Aim to complete 1-2 phases per coding session (3-4 hours)

---

## Common Pitfalls to Avoid

### Pitfall 1: Skipping Verification
**Problem:** Moving to next step without testing current one  
**Result:** Bugs compound and become hard to debug  
**Solution:** Always complete "How to verify" before continuing

### Pitfall 2: Deviating from Steps
**Problem:** "I'll just add this extra feature while I'm here"  
**Result:** Complexity grows, hard to track what broke  
**Solution:** Stick to the plan, note ideas for later

### Pitfall 3: Copy-Paste Without Understanding
**Problem:** Pasting AI code without reading it  
**Result:** Don't understand your own codebase  
**Solution:** Read generated code, ask questions if unclear

### Pitfall 4: Not Using Git
**Problem:** No commits between steps  
**Result:** Can't roll back when something breaks  
**Solution:** Commit after each working step

### Pitfall 5: Testing Only in Chrome
**Problem:** Assuming it works everywhere  
**Result:** Broken on Safari/Firefox  
**Solution:** Test in multiple browsers regularly

### Pitfall 6: Ignoring Mobile
**Problem:** Only testing on desktop  
**Result:** Unusable on phones  
**Solution:** Toggle device toolbar often in DevTools

### Pitfall 7: No Error Handling
**Problem:** "It works on happy path"  
**Result:** Crashes on edge cases  
**Solution:** Follow error handling steps carefully

### Pitfall 8: Skipping Accessibility
**Problem:** "I'll add that later"  
**Result:** Much harder to retrofit  
**Solution:** Follow keyboard/screen reader steps

---

## Success Criteria

### You Know You're Done When:

✅ All 67 checkboxes in Progress Tracker are checked  
✅ App works smoothly in Chrome, Firefox, Safari, Edge  
✅ Mobile experience is smooth and touch-friendly  
✅ All 3 presets load correctly  
✅ Calculations are mathematically correct  
✅ Share URLs work across devices  
✅ localStorage persists everything  
✅ Keyboard navigation works completely  
✅ Screen reader can use the app  
✅ Lighthouse scores: Performance 90+, Accessibility 100  
✅ Bundle size < 200KB gzipped  
✅ No console errors or warnings  
✅ Someone else can understand your code  
✅ You can explain how Bayes' theorem works  

---

## Getting Help

### If Truly Stuck:

1. **Re-read the step** - Sometimes the answer is there
2. **Check the design doc** - Reference the full specification
3. **Ask the AI for help** - Use prompt templates above
4. **Search the error** - Google/Stack Overflow
5. **Simplify** - Remove code until it works, then add back
6. **Take a break** - Fresh perspective helps
7. **Start the step over** - Sometimes easier than debugging

### Resources:
- React docs: https://react.dev
- TypeScript handbook: https://www.typescriptlang.org/docs/
- Tailwind docs: https://tailwindcss.com/docs
- Vite guide: https://vitejs.dev/guide/
- MDN Web Docs: https://developer.mozilla.org

---

## Final Notes

**Remember:**
- This is a learning project - take time to understand each step
- The step-by-step approach prevents overwhelm
- Each completed step is progress - celebrate small wins
- The goal is both a working app AND understanding how it works
- Quality over speed - better to do it right than do it fast

**After Completion:**
- Share your creation (use the share button!)
- Get feedback from real users
- Consider adding bonus features
- Maybe write a blog post about building it
- Use it for real debates and arguments

**Good luck! You've got this! 🚀**

---

*End of Step-by-Step Implementation Guide*