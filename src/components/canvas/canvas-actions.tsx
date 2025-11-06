import { useState } from "react";
import { toast } from "sonner";
import { useAppStore } from "../../store/app-store";
import { SavePresetModal } from "../modals/save-preset-modal";

export function CanvasActions() {
  const [showModal, setShowModal] = useState(false);
  const hasInteraction = useAppStore((state) => state.hasInteraction);
  const canvasDevice = useAppStore((state) => state.canvasDevice);
  const clearCanvas = useAppStore((state) => state.clearCanvas);
  const addPreset = useAppStore((state) => state.addPreset);
  const updatePreset = useAppStore((state) => state.updatePreset);
  const presets = useAppStore((state) => state.presets);
  const setHasInteraction = useAppStore((state) => state.setHasInteraction);

  const handleSave = () => {
    if (!canvasDevice) return;
    if (canvasDevice.presetId) {
      const currentState =
        canvasDevice.type === "light"
          ? canvasDevice.lightState
          : canvasDevice.fanState;

      if (currentState) {
        updatePreset(canvasDevice.presetId, currentState);
        setHasInteraction(false);
        toast.success("Preset updated");
      }
    } else {
      setShowModal(true);
    }
  };

  const handleSavePreset = (name: string): boolean => {
    if (!canvasDevice) return false;

    const duplicateExists = presets.some(
      (p) => p.name.toLowerCase() === name.toLowerCase()
    );
    if (duplicateExists) {
      return false;
    }

    if (canvasDevice.type === "light" && canvasDevice.lightState) {
      addPreset({
        name,
        deviceType: "light",
        state: canvasDevice.lightState,
      });
    } else if (canvasDevice.type === "fan" && canvasDevice.fanState) {
      addPreset({
        name,
        deviceType: "fan",
        state: canvasDevice.fanState,
      });
    }
    setShowModal(false);
    setHasInteraction(false);
    toast.success("Preset saved");
    return true;
  };

  if (!hasInteraction || !canvasDevice) {
    return null;
  }

  return (
    <>
      <div className="flex gap-3">
        <button
          onClick={clearCanvas}
          className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-white transition-colors hover:bg-slate-700"
        >
          Clear
        </button>
        <button
          onClick={handleSave}
          className="rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
        >
          {canvasDevice?.presetId ? "Update Preset" : "Save Preset"}
        </button>
      </div>

      {showModal && (
        <SavePresetModal
          deviceType={canvasDevice.type}
          onSave={handleSavePreset}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
