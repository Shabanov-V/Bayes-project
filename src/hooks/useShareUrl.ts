import { ScenarioState } from '../types';

/**
 * Encodes the scenario state into a Base64 string to be used in a URL.
 * @param state The scenario state to encode.
 * @returns A Base64 encoded string representing the scenario.
 */
export function encodeScenario(state: Omit<ScenarioState, 'id' | 'createdAt' | 'modifiedAt'>): string {
  try {
    const json = JSON.stringify(state);
    return btoa(json);
  } catch (error) {
    console.error('Failed to encode scenario:', error);
    return '';
  }
}

/**
 * Decodes a Base64 string from a URL back into a scenario state object.
 * @param encoded The Base64 encoded string.
 * @returns A scenario state object or null if decoding fails.
 */
export function decodeScenario(encoded: string): Omit<ScenarioState, 'id' | 'createdAt' | 'modifiedAt'> | null {
  try {
    const json = atob(encoded);
    const scenario = JSON.parse(json);
    // Here you might want to add validation to ensure the parsed object matches the ScenarioState shape
    return scenario;
  } catch (error) {
    console.error('Failed to decode scenario:', error);
    return null;
  }
}

/**
 * Generates a full shareable URL for the current scenario.
 * @param state The scenario state to share.
 * @returns A full URL with the scenario data in a query parameter.
 */
export function generateShareUrl(state: Omit<ScenarioState, 'id' | 'createdAt' | 'modifiedAt'>): string {
  const encoded = encodeScenario(state);
  return `${window.location.origin}${window.location.pathname}?scenario=${encoded}`;
}
