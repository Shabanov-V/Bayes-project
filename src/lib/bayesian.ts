import { ScenarioState, CalculatedResult, CalculationStep } from '../types';

/**
 * Calculates the posterior probabilities for two hypotheses given a set of evidence using Bayesian updating.
 * This function takes the entire scenario state, including the prior probability and all pieces of evidence,
 * and returns the final posterior probabilities along with a detailed breakdown of the calculation steps.
 *
 * @param {ScenarioState} state The current scenario state.
 * @param {object} state.hypotheses The two hypotheses being compared.
 * @param {number} state.priorProbability The prior probability of Hypothesis 1 (from 1 to 99).
 * @param {Evidence[]} state.evidence An array of evidence objects to be considered.
 * @returns {CalculatedResult} An object containing the final H1 and H2 probabilities, and an array of calculation steps.
 * @example
 * const state = {
 *   priorProbability: 50,
 *   evidence: [{ likelihoodH1: 80, likelihoodH2: 20, certainty: 100, ... }],
 *   ...
 * };
 * const results = calculatePosterior(state);
 * console.log(results.h1Probability); // e.g., 80.0
 */
export function calculatePosterior(state: ScenarioState): CalculatedResult {
  // 1. Convert the prior probability (for H1) into odds.
  // Odds = P(H1) / P(H2) = P(H1) / (1 - P(H1))
  const priorProb = state.priorProbability / 100;
  let odds = priorProb / (1 - priorProb);

  const steps: CalculationStep[] = [];

  // 2. Sequentially update the odds with each piece of evidence.
  for (const evidence of state.evidence) {
    // To avoid division by zero, treat 0% likelihood as a very small number (1%).
    const lh1 = Math.max(evidence.likelihoodH1, 1) / 100;
    const lh2 = Math.max(evidence.likelihoodH2, 1) / 100;

    // The likelihood ratio is the core of the evidence's strength.
    const likelihoodRatio = lh1 / lh2;

    // Adjust the evidence's impact based on our certainty.
    // A certainty of 100% (1.0) means the evidence has full impact.
    // A certainty of 0% (0.0) means the evidence has no impact (ratio^0 = 1).
    const certaintyFactor = evidence.certainty / 100;
    const adjustedRatio = Math.pow(likelihoodRatio, certaintyFactor);

    // Update the odds by multiplying by the adjusted ratio.
    odds *= adjustedRatio;

    // Store the intermediate results for this step.
    const probAfter = (odds / (1 + odds)) * 100;
    steps.push({
      evidenceId: evidence.id,
      evidenceName: evidence.description || 'Unnamed Evidence',
      likelihoodRatio,
      certaintyAdjusted: adjustedRatio,
      oddsAfter: odds,
      probabilityAfter: { h1: probAfter, h2: 100 - probAfter },
    });
  }

  // 3. Convert the final odds back into a probability for H1.
  let h1Probability = (odds / (1 + odds)) * 100;

  // 4. Cap the probability to avoid extreme values of 0% or 100%.
  h1Probability = Math.max(0.1, Math.min(99.9, h1Probability));
  const h2Probability = 100 - h1Probability;

  return {
    h1Probability,
    h2Probability,
    steps,
  };
}
