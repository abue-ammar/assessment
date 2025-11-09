interface PowerToggleProps {
  power: boolean;
  onToggle: () => void;
}

export function PowerToggle({ power, onToggle }: PowerToggleProps) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <span className="font-medium text-white">Power</span>
      <button
        onClick={onToggle}
        className={`flex h-8 w-14 items-center rounded-full px-1 transition-colors ${
          power ? "bg-blue-500" : "bg-slate-600"
        }`}
      >
        <div
          className={`h-6 w-6 rounded-full bg-white transition-transform ${
            power ? "translate-x-6" : "translate-x-0"
          }`}
        ></div>
      </button>
    </div>
  );
}
