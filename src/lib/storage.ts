import { ScenarioState } from '../types';

const SCENARIOS_KEY = 'bayesian-scenarios';
const CURRENT_SCENARIO_KEY = 'bayesian-current';

/**
 * Saves the current scenario to local storage.
 * It also updates the list of all saved scenarios.
 * @param state The scenario state to save.
 */
export function saveScenario(state: ScenarioState): void {
  try {
    const scenarios = listScenarios();
    const existingIndex = scenarios.findIndex((s) => s.id === state.id);
    if (existingIndex > -1) {
      scenarios[existingIndex] = state;
    } else {
      scenarios.push(state);
    }
    localStorage.setItem(SCENARIOS_KEY, JSON.stringify(scenarios));
    localStorage.setItem(CURRENT_SCENARIO_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save scenario:', error);
  }
}

/**
 * Loads a scenario from local storage by its ID.
 * @param id The ID of the scenario to load.
 * @returns The scenario state or null if not found.
 */
export function loadScenario(id: string): ScenarioState | null {
  try {
    const scenarios = listScenarios();
    return scenarios.find((s) => s.id === id) || null;
  } catch (error) {
    console.error('Failed to load scenario:', error);
    return null;
  }
}

/**
 * Retrieves the list of all saved scenarios from local storage.
 * @returns An array of scenario states.
 */
export function listScenarios(): ScenarioState[] {
  try {
    const scenarios = localStorage.getItem(SCENARIOS_KEY);
    return scenarios ? JSON.parse(scenarios) : [];
  } catch (error) {
    console.error('Failed to list scenarios:', error);
    return [];
  }
}

/**
 * Deletes a scenario from local storage by its ID.
 * @param id The ID of the scenario to delete.
 */
export function deleteScenario(id: string): void {
  try {
    let scenarios = listScenarios();
    scenarios = scenarios.filter((s) => s.id !== id);
    localStorage.setItem(SCENARIOS_KEY, JSON.stringify(scenarios));
  } catch (error) {
    console.error('Failed to delete scenario:', error);
  }
}

/**
 * Loads the last-used scenario from local storage.
 * @returns The last-used scenario state or null if not found.
 */
export function loadCurrentScenario(): ScenarioState | null {
  try {
    const scenario = localStorage.getItem(CURRENT_SCENARIO_KEY);
    return scenario ? JSON.parse(scenario) : null;
  } catch (error) {
    console.error('Failed to load current scenario:', error);
    return null;
  }
}
