export interface ScenarioState {
  id: string;
  name: string;
  hypotheses: {
    h1: string;
    h2: string;
  };
  priorProbability: number; // 1-99
  evidence: Evidence[];
  createdAt: number;
  modifiedAt: number;
}

export interface Evidence {
  id: string;
  description: string;
  likelihoodH1: number; // 0-100
  likelihoodH2: number; // 0-100
  certainty: number; // 0-100
  order: number;
}

export interface CalculatedResult {
  h1Probability: number; // 0-100
  h2Probability: number; // 0-100
  steps: CalculationStep[];
}

export interface CalculationStep {
  evidenceId: string;
  evidenceName: string;
  likelihoodRatio: number;
  certaintyAdjusted: number;
  oddsAfter: number;
  probabilityAfter: { h1: number; h2: number };
}
