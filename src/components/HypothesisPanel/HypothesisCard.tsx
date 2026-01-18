import React from 'react';

interface HypothesisCardProps {
  text: string;
  onTextChange: (newText: string) => void;
  color: 'blue' | 'purple';
  probability: number;
}

const HypothesisCard = React.memo(function HypothesisCard({ text, onTextChange, color, probability, isCompact = false }: HypothesisCardProps & { isCompact?: boolean }) {
  const colorClasses = {
    blue: {
      border: 'border-blue-500',
      text: 'text-blue-400',
      bar: 'bg-blue-500',
    },
    purple: {
      border: 'border-purple-500',
      text: 'text-purple-400',
      bar: 'bg-purple-500',
    },
  };

  return (
    <div
      className={`bg-surface rounded-lg border-2 ${colorClasses[color].border} w-full flex ${isCompact ? 'flex-row items-center p-2 gap-3 h-16 transition-all duration-300' : 'flex-col items-center p-4 transition-all duration-300'
        }`}
    >
      <input
        type="text"
        value={text}
        onChange={(e) => onTextChange(e.target.value)}
        maxLength={100}
        className={`bg-transparent font-semibold text-center focus:outline-none transition-all duration-300 ${isCompact ? 'text-lg text-left flex-1' : 'text-lg sm:text-2xl w-full'
          }`}
        placeholder="Enter Hypothesis"
      />
      <div
        className={`font-bold ${colorClasses[color].text} transition-all duration-300 ${isCompact ? 'text-2xl whitespace-nowrap' : 'text-4xl sm:text-5xl mt-4'
          }`}
      >
        {Math.round(probability)}%
      </div>
      <div className={`w-full h-2 bg-gray-700 rounded-full mt-4 transition-all duration-300 ${isCompact ? 'hidden' : 'block'}`}>
        <div
          className={`${colorClasses[color].bar} h-2 rounded-full transition-all duration-300`}
          style={{ width: `${probability}%` }}
        ></div>
      </div>
    </div>
  );
});

export { HypothesisCard };
