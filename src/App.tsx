import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { DndContext } from "@dnd-kit/core";
import { useState } from "react";
import { Toaster } from "sonner";
import { Canvas } from "./components/canvas/canvas";
import { DragIndicator } from "./components/canvas/drag-indicator";
import { DragOverlayWrapper } from "./components/dnd/drag-overlay-wrapper";
import { Sidebar } from "./components/sidebar/sidebar";
import { useAppStore, type FanState, type LightState } from "./store/app-store";

interface DragData {
  type: string;
  presetId?: string;
}

export default function App() {
  const [activeDevice, setActiveDevice] = useState("light");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeData, setActiveData] = useState<DragData | null>(null);
  const setCanvasDevice = useAppStore((state) => state.setCanvasDevice);
  const canvasDevice = useAppStore((state) => state.canvasDevice);
  const presets = useAppStore((state) => state.presets);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
    setActiveData((event.active.data.current as DragData) || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    setActiveData(null);
    const { active, over } = event;

    if (over && over.id === "canvas-drop-zone") {
      const dragData = active.data.current;

      if (dragData?.type === "light") {
        setCanvasDevice({
          type: "light",
          lightState: {
            power: false,
            brightness: 70,
            colorTemp: "warm",
          },
        });
        setActiveDevice("light");
      } else if (dragData?.type === "fan") {
        setCanvasDevice({
          type: "fan",
          fanState: {
            power: false,
            speed: 64,
          },
        });
        setActiveDevice("fan");
      } else if (dragData?.type === "preset") {
        const preset = presets.find((p) => p.id === dragData.presetId);
        if (preset) {
          if (preset.deviceType === "light") {
            setCanvasDevice({
              type: "light",
              lightState: preset.state as LightState,
              presetId: preset.id,
            });
            setActiveDevice("light");
          } else if (preset.deviceType === "fan") {
            setCanvasDevice({
              type: "fan",
              fanState: preset.state as FanState,
              presetId: preset.id,
            });
            setActiveDevice("fan");
          }
        }
      }
    }
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="relative flex h-screen bg-[#030712] text-white">
        <Sidebar activeDevice={activeDevice} onDeviceSelect={setActiveDevice} />
        <Canvas />
        {!canvasDevice && <DragIndicator />}
      </div>
      <DragOverlayWrapper activeId={activeId} activeData={activeData} />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#1F2937",
            color: "#F3F4F6",
            border: "1px solid #374151",
            borderRadius: "12px",
            padding: "16px",
            fontSize: "16px",
            fontWeight: "500",
          },
          className: "toast-custom",
        }}
      />
    </DndContext>
  );
}
