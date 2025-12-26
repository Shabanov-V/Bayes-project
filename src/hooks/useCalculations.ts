import { useMemo } from 'react';
import { ScenarioState } from '../types';
import { calculatePosterior } from '../lib/bayesian';

export function useCalculations(state: ScenarioState) {
  const calculatedResult = useMemo(() => {
    return calculatePosterior(state);
  }, [state.evidence, state.priorProbability]);

  return calculatedResult;
}
