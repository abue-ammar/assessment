import { BrightnessSlider } from "./brightness-slider";
import { ColorTemperature } from "./color-temperature";
import { PowerToggle } from "./power-toggle";

interface ColorTemp {
  id: string;
  label: string;
  color: string;
}

interface LightControlPanelProps {
  power: boolean;
  brightness: number;
  colorTemp: string;
  colorTemps: ColorTemp[];
  onPowerToggle: () => void;
  onBrightnessChange: (value: number) => void;
  onColorTempChange: (tempId: string) => void;
}

export function LightControlPanel({
  power,
  brightness,
  colorTemp,
  colorTemps,
  onPowerToggle,
  onBrightnessChange,
  onColorTempChange,
}: LightControlPanelProps) {
  return (
    <div className="absolute bottom-12 left-1/2 w-full max-w-md -translate-x-1/2 rounded-2xl border border-slate-700 bg-slate-900/95 p-6 shadow-2xl backdrop-blur-lg">
      <PowerToggle power={power} onToggle={onPowerToggle} />
      <ColorTemperature
        colorTemps={colorTemps}
        selectedColorTemp={colorTemp}
        onColorTempChange={onColorTempChange}
        power={power}
      />
      <BrightnessSlider
        brightness={brightness}
        onBrightnessChange={onBrightnessChange}
      />
    </div>
  );
}
