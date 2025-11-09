import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import { Canvas } from "./components/canvas/canvas";
import { DragIndicator } from "./components/canvas/drag-indicator";
import { DragOverlayWrapper } from "./components/dnd/drag-overlay-wrapper";
import { Sidebar } from "./components/sidebar/sidebar";
import { api } from "./services/api";
import { useAppStore, type FanState, type LightState } from "./store/app-store";

interface DragData {
  type: string;
  presetId?: string;
}

export default function App() {
  const [activeDevice, setActiveDevice] = useState("");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeData, setActiveData] = useState<DragData | null>(null);
  const setCanvasDevice = useAppStore((state) => state.setCanvasDevice);
  const canvasDevice = useAppStore((state) => state.canvasDevice);
  const loadDevices = useAppStore((state) => state.loadDevices);
  const loadPresets = useAppStore((state) => state.loadPresets);

  // Configure sensors for both mouse and touch
  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 100,
      tolerance: 5,
    },
  });
  const sensors = useSensors(mouseSensor, touchSensor);

  // Load devices and presets from backend on mount
  useEffect(() => {
    loadDevices();
    loadPresets();
  }, [loadDevices, loadPresets]);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
    setActiveData((event.active.data.current as DragData) || null);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
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
      } else if (dragData?.type === "preset" && dragData.presetId) {
        try {
          // Fetch preset from backend by ID
          console.log("Fetching preset by ID:", dragData.presetId);
          const preset = await api.presets.getById(dragData.presetId);
          console.log("Loaded preset:", preset);

          if (preset) {
            if (preset.device_type === "light") {
              setCanvasDevice({
                type: "light",
                lightState: preset.device_state as LightState,
                presetId: preset.id.toString(),
              });
              setActiveDevice("light");
            } else if (preset.device_type === "fan") {
              setCanvasDevice({
                type: "fan",
                fanState: preset.device_state as FanState,
                presetId: preset.id.toString(),
              });
              setActiveDevice("fan");
            }
          }
        } catch (error) {
          console.error("Failed to load preset:", error);
        }
      }
    }
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="relative flex h-screen flex-col overflow-hidden bg-[#030712] text-white md:flex-row">
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
