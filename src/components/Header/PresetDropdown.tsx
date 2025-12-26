import React, { useState } from 'react';
import { BUILT_IN_PRESETS } from '../../lib/presets';
import { ScenarioState } from '../../types';

interface PresetDropdownProps {
  userScenarios: ScenarioState[];
  onLoad: (scenario: Omit<ScenarioState, 'id' | 'createdAt' | 'modifiedAt'>) => void;
  onDelete: (id: string) => void;
}

export function PresetDropdown({ userScenarios, onLoad, onDelete }: PresetDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (preset: Omit<ScenarioState, 'id' | 'createdAt' | 'modifiedAt'>) => {
    onLoad(preset);
    setIsOpen(false);
  };

  const newBlankScenario = {
    name: 'New Scenario',
    hypotheses: { h1: 'Hypothesis 1', h2: 'Hypothesis 2' },
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
  };

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="bg-surface p-2 rounded-lg">
        Load Scenario ▾
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-surface rounded-lg shadow-lg">
          <div className="p-2">
            <h3 className="text-sm font-bold text-gray-400">Example Scenarios</h3>
            {BUILT_IN_PRESETS.map((preset) => (
              <button
                key={preset.name}
                onClick={() => handleSelect(preset)}
                className="block w-full text-left p-2 hover:bg-border rounded"
              >
                {preset.name}
              </button>
            ))}
          </div>
          {userScenarios.length > 0 && (
            <div className="border-t border-border p-2">
              <h3 className="text-sm font-bold text-gray-400">Your Scenarios</h3>
              {userScenarios.map((scenario) => (
                <div key={scenario.id} className="flex items-center justify-between">
                  <button
                    onClick={() => handleSelect(scenario)}
                    className="block w-full text-left p-2 hover:bg-border rounded"
                  >
                    {scenario.name}
                  </button>
                  <button
                    onClick={() => onDelete(scenario.id)}
                    className="text-red-500 hover:text-red-400 p-2"
                    aria-label={`Delete scenario: ${scenario.name}`}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="border-t border-border p-2">
            <button
              onClick={() => handleSelect(newBlankScenario)}
              className="block w-full text-left p-2 hover:bg-border rounded"
            >
              New Blank Scenario
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
