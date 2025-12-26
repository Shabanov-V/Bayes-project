import { useReducer } from 'react';
import { ScenarioState, Evidence } from '../types';

type Action =
  | { type: 'UPDATE_HYPOTHESIS'; payload: { h: 'h1' | 'h2'; value: string } }
  | { type: 'UPDATE_PRIOR'; payload: number }
  | { type: 'ADD_EVIDENCE' }
  | { type: 'REMOVE_EVIDENCE'; payload: string }
  | { type: 'UPDATE_EVIDENCE'; payload: { id: string; newValues: Partial<Evidence> } }
  | { type: 'LOAD_SCENARIO'; payload: Omit<ScenarioState, 'id' | 'createdAt' | 'modifiedAt'> }
  | { type: 'UPDATE_NAME'; payload: string };

const initialState: ScenarioState = {
  id: crypto.randomUUID(),
  name: 'New Scenario',
  hypotheses: {
    h1: 'Hypothesis 1',
    h2: 'Hypothesis 2',
  },
  priorProbability: 50,
  evidence: [
    {
      id: crypto.randomUUID(),
      description: '',
      likelihoodH1: 50,
      likelihoodH2: 50,
      certainty: 75,
      order: 1,
    },
  ],
  createdAt: Date.now(),
  modifiedAt: Date.now(),
};

function scenarioReducer(state: ScenarioState, action: Action): ScenarioState {
  switch (action.type) {
    case 'UPDATE_HYPOTHESIS':
      return {
        ...state,
        hypotheses: {
          ...state.hypotheses,
          [action.payload.h]: action.payload.value,
        },
        modifiedAt: Date.now(),
      };
    case 'UPDATE_PRIOR':
      return { ...state, priorProbability: action.payload, modifiedAt: Date.now() };
    case 'ADD_EVIDENCE':
      const newEvidence: Evidence = {
        id: crypto.randomUUID(),
        description: '',
        likelihoodH1: 50,
        likelihoodH2: 50,
        certainty: 75,
        order: state.evidence.length + 1,
      };
      return {
        ...state,
        evidence: [...state.evidence, newEvidence],
        modifiedAt: Date.now(),
      };
    case 'REMOVE_EVIDENCE':
      return {
        ...state,
        evidence: state.evidence.filter((e) => e.id !== action.payload),
        modifiedAt: Date.now(),
      };
    case 'UPDATE_EVIDENCE':
      return {
        ...state,
        evidence: state.evidence.map((e) =>
          e.id === action.payload.id ? { ...e, ...action.payload.newValues } : e
        ),
        modifiedAt: Date.now(),
      };
    case 'LOAD_SCENARIO':
      return {
        ...action.payload,
        id: crypto.randomUUID(),
        createdAt: Date.now(),
        modifiedAt: Date.now(),
      };
    case 'UPDATE_NAME':
      return { ...state, name: action.payload, modifiedAt: Date.now() };
    default:
      return state;
  }
}

export function useScenario() {
  const [state, dispatch] = useReducer(scenarioReducer, initialState);
  return { state, dispatch };
}
