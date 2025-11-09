import { useDroppable } from "@dnd-kit/core";
import { FanVisualization } from "../fan/fan-visualization";
import { LightBulb } from "../light/light-bulb";

interface CanvasContentProps {
  hasDevice: boolean;
  deviceType?: "light" | "fan";
  lightPower?: boolean;
  glowIntensity?: number;
  bulbColor?: string;
  fanPower?: boolean;
  fanSpeed?: number;
  fanAnimationDuration?: string;
}

export function CanvasContent({
  hasDevice,
  deviceType,
  lightPower = false,
  glowIntensity = 0,
  bulbColor = "#F5E6D3",
  fanPower = false,
  fanSpeed = 0,
  fanAnimationDuration = "0s",
}: CanvasContentProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: "canvas-drop-zone",
  });

  return (
    <div
      ref={setNodeRef}
      className={`relative flex flex-1 items-center justify-center overflow-hidden rounded-xl border p-6 pb-24 transition-colors md:pb-32 ${
        isOver
          ? "border-blue-500 bg-slate-900"
          : "border-slate-800 bg-slate-900/50"
      }`}
    >
      {!hasDevice ? (
        <div className="text-center">
          <p className="text-lg text-slate-600">Drag anything here</p>
        </div>
      ) : (
        <div className="-mt-30 flex h-full w-full items-center justify-center">
          {deviceType === "light" && (
            <LightBulb
              power={lightPower}
              glowIntensity={glowIntensity}
              bulbColor={bulbColor}
            />
          )}
          {deviceType === "fan" && (
            <FanVisualization
              power={fanPower}
              speed={fanSpeed}
              animationDuration={fanAnimationDuration}
            />
          )}
        </div>
      )}
    </div>
  );
}
