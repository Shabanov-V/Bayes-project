import React from 'react';
import { Evidence } from '../../types';
import { Slider } from '../UI/Slider';
import { Tooltip } from '../UI/Tooltip';

interface EvidenceCardProps {
  evidence: Evidence;
  onUpdate: (id: string, newValues: Partial<Evidence>) => void;
  onDelete: (id:string) => void;
  impact: number;
}

const EvidenceCard = React.memo(function EvidenceCard({ evidence, onUpdate, onDelete, impact }: EvidenceCardProps) {
  const impactColor = impact > 0 ? 'text-green-500' : 'text-red-500';
  const impactArrow = impact > 0 ? '↑' : '↓';

  const h1Tooltip = 'If Hypothesis 1 were definitely true, how often would you expect to see this evidence? 100% = always, 50% = half the time, 0% = never.';
  const h2Tooltip = 'If Hypothesis 2 were definitely true, how often would you expect to see this evidence? Compare this to the H1 slider - large differences mean strong evidence.';
  const certaintyTooltip = 'How confident are you that this evidence is accurate? 100% = certain fact, 75% = pretty sure (default), 50% = might be true, 0% = completely uncertain.';
  const impactTooltip = 'How much this single piece of evidence shifts the probability. Large impacts mean this evidence strongly favors one hypothesis.';

  return (
    <div className="bg-surface p-4 rounded-lg border border-border mb-4 animate-fade-in">
      <div className="flex justify-between items-start mb-4">
        <textarea
          value={evidence.description}
          onChange={(e) => onUpdate(evidence.id, { description: e.target.value })}
          maxLength={200}
          className="bg-transparent text-white w-full focus:outline-none resize-none"
          placeholder="Describe the evidence..."
          rows={3}
          aria-label="Evidence description"
        />
        <button
          onClick={() => onDelete(evidence.id)}
          className="text-red-500 hover:text-red-400 font-bold text-2xl"
          aria-label="Delete evidence"
        >
          &times;
        </button>
      </div>
      <div className="text-right text-sm text-gray-500 mb-4">
        {evidence.description.length}/200
      </div>
      <div className="space-y-4">
        <Slider
          label={
            <Tooltip text={h1Tooltip}>
              <span>If H1 were true, how expected is this evidence? ⓘ</span>
            </Tooltip>
          }
          value={evidence.likelihoodH1}
          onChange={(value) => onUpdate(evidence.id, { likelihoodH1: value })}
        />
        <Slider
          label={
            <Tooltip text={h2Tooltip}>
              <span>If H2 were true, how expected is this evidence? ⓘ</span>
            </Tooltip>
          }
          value={evidence.likelihoodH2}
          onChange={(value) => onUpdate(evidence.id, { likelihoodH2: value })}
        />
        <Slider
          label={
            <Tooltip text={certaintyTooltip}>
              <span>How certain are you of this evidence? ⓘ</span>
            </Tooltip>
          }
          value={evidence.certainty}
          onChange={(value) => onUpdate(evidence.id, { certainty: value })}
        />
      </div>
      <div className={`text-sm mt-4 ${impactColor}`}>
        <Tooltip text={impactTooltip}>
          <span>
            Impact: {impactArrow} {impact > 0 ? 'Increases' : 'Decreases'} H1 by {Math.abs(impact).toFixed(1)}% ⓘ
          </span>
        </Tooltip>
      </div>
    </div>
  );
});

export { EvidenceCard };
