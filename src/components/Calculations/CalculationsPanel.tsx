import React, { useState } from 'react';
import { CalculationStep } from '../../types';

interface CalculationsPanelProps {
  steps: CalculationStep[];
  priorProbability: number;
}

const CalculationsPanel = React.memo(function CalculationsPanel({ steps, priorProbability }: CalculationsPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const priorOdds = priorProbability / (100 - priorProbability);

  return (
    <div className="mt-8">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-center p-2 bg-surface hover:bg-border rounded-lg"
      >
        {isExpanded ? 'Hide Calculations ▴' : 'Show Calculations ▾'}
      </button>
      {isExpanded && (
        <div className="bg-gray-800 p-4 mt-2 rounded-lg text-sm font-mono">
          <div className="mb-4">
            <h4 className="font-bold text-white">1. Starting (Prior) Odds</h4>
            <p>H1:H2 = {priorProbability}:{100 - priorProbability} = {priorOdds.toFixed(2)}</p>
          </div>
          {steps.map((step, index) => (
            <div key={step.evidenceId} className="mb-4">
              <h4 className="font-bold text-white">{index + 2}. Evidence: "{step.evidenceName}"</h4>
              <p>Likelihood Ratio = {step.likelihoodRatio.toFixed(2)}</p>
              <p>Certainty Adjusted = {step.certaintyAdjusted.toFixed(2)}</p>
              <p>New Odds = {(index === 0 ? priorOdds : steps[index-1].oddsAfter).toFixed(2)} × {step.certaintyAdjusted.toFixed(2)} = {step.oddsAfter.toFixed(2)}</p>
              <p>Probability: H1={step.probabilityAfter.h1.toFixed(1)}%, H2={step.probabilityAfter.h2.toFixed(1)}%</p>
            </div>
          ))}
          <div className="pt-4 border-t border-gray-700">
            <h4 className="font-bold text-white">Final Result</h4>
            <p>H1={steps[steps.length - 1]?.probabilityAfter.h1.toFixed(1) || priorProbability}%</p>
            <p>H2={steps[steps.length - 1]?.probabilityAfter.h2.toFixed(1) || 100 - priorProbability}%</p>
          </div>
        </div>
      )}
    </div>
  );
});

export { CalculationsPanel };
