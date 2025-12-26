# Bayesian Reasoning Tool

This is an educational tool for understanding Bayesian reasoning through interactive hypothesis evaluation. It is built as a single-page application using React, TypeScript, and Vite, with Tailwind CSS for styling.

## Features

- **Interactive Hypothesis Evaluation:** Compare two competing hypotheses and see how the probability shifts as you add evidence.
- **Likelihood & Certainty Sliders:** Adjust the likelihood of evidence under each hypothesis and your certainty in the evidence itself.
- **Real-time Calculations:** See the posterior probabilities update instantly as you adjust the inputs.
- **Step-by-Step Breakdown:** An expandable panel shows the mathematical calculations for each step of the Bayesian update.
- **Preset Scenarios:** Load pre-built scenarios to explore different examples of Bayesian reasoning.
- **Save & Share:** Save your scenarios to your browser's local storage and share them with others via a URL.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/bayesian-reasoning-tool.git
   cd bayesian-reasoning-tool
   ```

2. **Install the dependencies:**
   ```bash
   npm install
   ```

### Running the Development Server

To start the development server, run the following command:

```bash
npm run dev
```

This will start the application on `http://localhost:5173`.

## Building for Production

To create an optimized production build, run:

```bash
npm run build
```

The production-ready files will be located in the `dist/` directory.

## Tech Stack

- **Framework:** React 18 with Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** React Context + `useReducer`
- **Storage:** `localStorage` API
- **Routing:** URL query parameters for sharing
