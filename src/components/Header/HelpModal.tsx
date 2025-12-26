import React from 'react';

interface HelpModalProps {
  onClose: () => void;
}

export function HelpModal({ onClose }: HelpModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-surface p-8 rounded-lg max-w-2xl text-white">
        <h2 className="text-2xl font-bold mb-4">How to Use This Tool</h2>
        <p className="mb-4">
          This tool helps you think like a Bayesian. It's all about updating your beliefs as you get new evidence.
        </p>
        <h3 className="text-xl font-bold mb-2">The Basics:</h3>
        <ul className="list-disc list-inside mb-4">
          <li>Start with two competing hypotheses.</li>
          <li>For each piece of evidence, ask yourself: "How likely is this evidence if Hypothesis 1 is true?" and "How likely is this evidence if Hypothesis 2 is true?"</li>
          <li>Adjust the sliders to reflect your beliefs.</li>
          <li>The tool will automatically calculate the probability of each hypothesis being true.</li>
        </ul>
        <h3 className="text-xl font-bold mb-2">Tips:</h3>
        <ul className="list-disc list-inside mb-4">
          <li>Strong evidence is much more likely under one hypothesis than the other.</li>
          <li>Don't be afraid to use extreme values (like 99% or 1%) if you're confident.</li>
          <li>The "Certainty" slider lets you account for how reliable you think the evidence is.</li>
        </ul>
        <button onClick={onClose} className="bg-blue-600 hover:bg-blue-500 p-2 rounded-lg w-full">
          Got it!
        </button>
      </div>
    </div>
  );
}
