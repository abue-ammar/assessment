import { useAppStore } from "../../store/app-store";

import { FanControlPanel } from "../controls/fan-control-panel";
import { LightControlPanel } from "../controls/light-control-panel";
import { CanvasContent } from "./canvas-content";
import { CanvasHeader } from "./canvas-header";

export function Canvas() {
  const canvasDevice = useAppStore((state) => state.canvasDevice);
  const updateLightState = useAppStore((state) => state.updateLightState);
  const updateFanState = useAppStore((state) => state.updateFanState);
  const getBulbColor = () => {
    if (!canvasDevice?.lightState) return "#FFE5B4";
    const colorMap: Record<string, string> = {
      warm: "#FFE5B4",
      cool: "#F0F8FF",
      blue: "#87CEEB",
      pink: "#FFB6C1",
    };
    return colorMap[canvasDevice.lightState.colorTemp] || "#FFE5B4";
  };

  const getGlowIntensity = () => {
    if (!canvasDevice?.lightState) return 0;
    return canvasDevice.lightState.power
      ? canvasDevice.lightState.brightness / 100
      : 0;
  };

  const getFanAnimationDuration = () => {
    if (!canvasDevice?.fanState) return "0s";
    const speed = canvasDevice.fanState.speed;
    if (speed === 0) return "0s";
    return `${(100 / speed) * 0.2}s`;
  };

  const colorTemps = [
    { id: "warm", label: "Warm", color: "#FFE5B4" },
    { id: "cool", label: "Cool", color: "#F0F8FF" },
    { id: "blue", label: "Blue", color: "#87CEEB" },
    { id: "pink", label: "Pink", color: "#FFB6C1" },
  ];

  return (
    <div className="relative flex flex-1 flex-col p-6">
      <CanvasHeader />
      <CanvasContent
        hasDevice={!!canvasDevice}
        deviceType={canvasDevice?.type}
        lightPower={canvasDevice?.lightState?.power ?? false}
        glowIntensity={getGlowIntensity()}
        bulbColor={getBulbColor()}
        fanPower={canvasDevice?.fanState?.power ?? false}
        fanSpeed={canvasDevice?.fanState?.speed ?? 0}
        fanAnimationDuration={getFanAnimationDuration()}
      />
      {canvasDevice?.type === "light" && canvasDevice.lightState && (
        <LightControlPanel
          power={canvasDevice.lightState.power}
          brightness={canvasDevice.lightState.brightness}
          colorTemp={canvasDevice.lightState.colorTemp}
          colorTemps={colorTemps}
          onPowerToggle={() =>
            updateLightState({ power: !canvasDevice.lightState!.power })
          }
          onBrightnessChange={(brightness) => updateLightState({ brightness })}
          onColorTempChange={(colorTemp) => updateLightState({ colorTemp })}
        />
      )}
      {canvasDevice?.type === "fan" && canvasDevice.fanState && (
        <FanControlPanel
          power={canvasDevice.fanState.power}
          speed={canvasDevice.fanState.speed}
          onPowerToggle={() =>
            updateFanState({ power: !canvasDevice.fanState!.power })
          }
          onSpeedChange={(speed) => updateFanState({ speed })}
        />
      )}
    </div>
  );
}
