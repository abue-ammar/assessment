interface SpeedSliderProps {
  speed: number;
  onSpeedChange: (value: number) => void;
}

export function SpeedSlider({ speed, onSpeedChange }: SpeedSliderProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="font-medium text-white">Speed</span>
        <span className="text-slate-400">{speed}%</span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={speed}
        onChange={(e) => onSpeedChange(Number.parseInt(e.target.value))}
        className="slider-thumb w-full cursor-pointer appearance-none rounded-lg bg-slate-700"
        style={{
          background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${speed}%, #475569 ${speed}%, #475569 100%)`,
        }}
      />
    </div>
  );
}
