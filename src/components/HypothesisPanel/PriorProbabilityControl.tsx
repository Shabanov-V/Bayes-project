import React, { useState } from 'react';
import { Slider } from '../UI/Slider';
import { Tooltip } from '../UI/Tooltip';

interface PriorProbabilityControlProps {
  value: number;
  onUpdate: (newValue: number) => void;
}

export function PriorProbabilityControl({ value, onUpdate }: PriorProbabilityControlProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const tooltipText =
    'Your starting belief before considering any evidence. Usually 50/50 unless you have specific reason to favor one hypothesis.';

  if (!isExpanded) {
    return (
      <div className="text-center text-gray-400 mt-4">
        <Tooltip text={tooltipText}>
          <button onClick={() => setIsExpanded(true)} className="hover:text-white">
            Prior Probability: {value}% (Advanced) ⓘ
          </button>
        </Tooltip>
      </div>
    );
  }

  return (
    <div className="bg-surface p-4 rounded-lg border border-border mt-4">
      <Slider
        label={
          <Tooltip text={tooltipText}>
            <span>Starting belief in H1 before evidence ⓘ</span>
          </Tooltip>
        }
        value={value}
        onChange={onUpdate}
        min={1}
        max={99}
        step={1}
      />
    </div>
  );
}
