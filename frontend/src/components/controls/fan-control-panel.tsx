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
    <div className="absolute bottom-12 left-1/2 w-full max-w-md -translate-x-1/2 rounded-2xl border border-slate-700 bg-slate-900/95 p-6 shadow-2xl backdrop-blur-lg">
      <PowerToggle power={power} onToggle={onPowerToggle} />
      <SpeedSlider speed={speed} onSpeedChange={onSpeedChange} />
    </div>
  );
}
