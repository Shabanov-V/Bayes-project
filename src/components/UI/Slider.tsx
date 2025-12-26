import React from 'react';

interface SliderProps {
  label: React.ReactNode;
  value: number;
  onChange: (newValue: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

export function Slider({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 5,
}: SliderProps) {
  return (
    <div>
      <label className="text-sm text-gray-400 flex items-center">{label}</label>
      <div className="flex items-center gap-4">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value, 10))}
          className="w-full h-3 sm:h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <span className="text-white font-semibold">{value}%</span>
      </div>
    </div>
  );
}
