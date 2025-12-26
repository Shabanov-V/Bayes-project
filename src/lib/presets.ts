import { ScenarioState } from '../types';

// Using a partial type because we don't need all the state fields for a preset.
type Preset = Omit<ScenarioState, 'id' | 'createdAt' | 'modifiedAt' | 'name'> & { name: string };

export const BUILT_IN_PRESETS: Preset[] = [
  {
    name: "Historical Event - Moon Landing",
    hypotheses: {
      h1: "The moon landing was real",
      h2: "The moon landing was faked",
    },
    priorProbability: 50,
    evidence: [
      {
        id: crypto.randomUUID(),
        description: "High-quality video footage exists",
        likelihoodH1: 95,
        likelihoodH2: 40,
        certainty: 100,
        order: 1,
      },
      {
        id: crypto.randomUUID(),
        description: "USSR acknowledged the landing",
        likelihoodH1: 90,
        likelihoodH2: 20,
        certainty: 100,
        order: 2,
      },
      {
        id: crypto.randomUUID(),
        description: "No credible whistleblowers in 50+ years",
        likelihoodH1: 85,
        likelihoodH2: 10,
        certainty: 95,
        order: 3,
      },
      {
        id: crypto.randomUUID(),
        description: "Technology was theoretically possible",
        likelihoodH1: 80,
        likelihoodH2: 60,
        certainty: 90,
        order: 4,
      }
    ]
  },
  {
    name: "Policy Decision - Universal Basic Income",
    hypotheses: {
      h1: "UBI would help the economy",
      h2: "UBI would harm the economy",
    },
    priorProbability: 50,
    evidence: [
      {
        id: crypto.randomUUID(),
        description: "Alaska's oil dividend shows stable employment",
        likelihoodH1: 70,
        likelihoodH2: 40,
        certainty: 80,
        order: 1,
      },
      {
        id: crypto.randomUUID(),
        description: "Finland pilot: improved wellbeing, no job loss",
        likelihoodH1: 75,
        likelihoodH2: 50,
        certainty: 75,
        order: 2,
      },
      {
        id: crypto.randomUUID(),
        description: "Inflation concerns from economists",
        likelihoodH1: 40,
        likelihoodH2: 70,
        certainty: 70,
        order: 3,
      },
      {
        id: crypto.randomUUID(),
        description: "Would cost 10% of federal budget",
        likelihoodH1: 50,
        likelihoodH2: 65,
        certainty: 85,
        order: 4,
      }
    ]
  },
  {
    name: "Medical Diagnosis",
    hypotheses: {
      h1: "Patient has Disease A (common)",
      h2: "Patient has Disease B (rare)",
    },
    priorProbability: 50,
    evidence: [
      {
        id: crypto.randomUUID(),
        description: "Fever present (90% of A, 95% of B)",
        likelihoodH1: 90,
        likelihoodH2: 95,
        certainty: 100,
        order: 1,
      },
      {
        id: crypto.randomUUID(),
        description: "Rash present (20% of A, 80% of B)",
        likelihoodH1: 20,
        likelihoodH2: 80,
        certainty: 100,
        order: 2,
      },
      {
        id: crypto.randomUUID(),
        description: "Test positive (70% accuracy)",
        likelihoodH1: 70,
        likelihoodH2: 30,
        certainty: 85,
        order: 3,
      },
      {
        id: crypto.randomUUID(),
        description: "Patient is young (A common in young)",
        likelihoodH1: 75,
        likelihoodH2: 30,
        certainty: 100,
        order: 4,
      }
    ]
  }
];