import React from 'react';

interface HypothesisCardProps {
  text: string;
  onTextChange: (newText: string) => void;
  color: 'blue' | 'purple';
  probability: number;
}

const HypothesisCard = React.memo(function HypothesisCard({ text, onTextChange, color, probability }: HypothesisCardProps) {
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
      className={`bg-surface p-4 rounded-lg border-2 ${colorClasses[color].border} w-full flex flex-col items-center`}
    >
      <input
        type="text"
        value={text}
        onChange={(e) => onTextChange(e.target.value)}
        maxLength={100}
        className="bg-transparent text-lg sm:text-2xl font-semibold text-center w-full focus:outline-none"
        placeholder="Enter Hypothesis"
      />
      <div className={`text-4xl sm:text-5xl font-bold mt-4 ${colorClasses[color].text} transition-all duration-300`}>
        {Math.round(probability)}%
      </div>
      <div className="w-full h-2 bg-gray-700 rounded-full mt-4">
        <div
          className={`${colorClasses[color].bar} h-2 rounded-full transition-all duration-300`}
          style={{ width: `${probability}%` }}
        ></div>
      </div>
    </div>
  );
});

export { HypothesisCard };
