import React from 'react';

interface ShareButtonProps {
  onShare: () => void;
}

export function ShareButton({ onShare }: ShareButtonProps) {
  return (
    <button onClick={onShare} className="bg-green-600 hover:bg-green-500 p-2 rounded-lg">
      Share
    </button>
  );
}
