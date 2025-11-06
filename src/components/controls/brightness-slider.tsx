interface BrightnessSliderProps {
  brightness: number;
  onBrightnessChange: (value: number) => void;
}

export function BrightnessSlider({
  brightness,
  onBrightnessChange,
}: BrightnessSliderProps) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <span className="font-medium text-white">Brightness</span>
        <span className="text-slate-400">{brightness}%</span>
      </div>
      <div className="flex items-center gap-4">
        <input
          type="range"
          min="0"
          max="100"
          value={brightness}
          onChange={(e) => onBrightnessChange(Number.parseInt(e.target.value))}
          className="slider-thumb flex-1 cursor-pointer appearance-none rounded-full bg-slate-700"
          style={{
            background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${brightness}%, #475569 ${brightness}%, #475569 100%)`,
          }}
        />
      </div>
    </div>
  );
}
