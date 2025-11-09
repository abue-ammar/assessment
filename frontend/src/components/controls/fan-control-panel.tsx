import { PowerToggle } from "./power-toggle";
import { SpeedSlider } from "./speed-slider";

interface FanControlPanelProps {
  power: boolean;
  speed: number;
  onPowerToggle: () => void;
  onSpeedChange: (value: number) => void;
}

export function FanControlPanel({
  power,
  speed,
  onPowerToggle,
  onSpeedChange,
}: FanControlPanelProps) {
  return (
    <div className="absolute bottom-6 left-1/2 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-2xl border border-slate-700 bg-slate-900/95 p-4 shadow-2xl backdrop-blur-lg md:bottom-12 md:w-full md:p-6">
      <PowerToggle power={power} onToggle={onPowerToggle} />
      <SpeedSlider speed={speed} onSpeedChange={onSpeedChange} />
    </div>
  );
}
