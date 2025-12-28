
interface AddEvidenceButtonProps {
  onClick: () => void;
}

export function AddEvidenceButton({ onClick }: AddEvidenceButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full border-2 border-dashed border-gray-600 hover:border-gray-500 rounded-lg p-4 text-center text-gray-400"
    >
      + Add Evidence
    </button>
  );
}
