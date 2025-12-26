import React from 'react';

interface SaveButtonProps {
  onSave: () => void;
}

export function SaveButton({ onSave }: SaveButtonProps) {
  return (
    <button onClick={onSave} className="bg-blue-600 hover:bg-blue-500 p-2 rounded-lg">
      Save As
    </button>
  );
}
