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

  const handleSave = async () => {
    if (!canvasDevice) return;
    if (canvasDevice.presetId) {
      const currentState =
        canvasDevice.type === "light"
          ? canvasDevice.lightState
          : canvasDevice.fanState;

      if (currentState) {
        await updatePreset(canvasDevice.presetId, currentState);
        setHasInteraction(false);
        toast.success("Preset updated");
      }
    } else {
      setShowModal(true);
    }
  };

  const handleSavePreset = async (name: string): Promise<boolean> => {
    if (!canvasDevice) return false;

    const duplicateExists = presets.some(
      (p) => p.name.toLowerCase() === name.toLowerCase()
    );
    if (duplicateExists) {
      return false;
    }

    let success = false;
    if (canvasDevice.type === "light" && canvasDevice.lightState) {
      success = await addPreset({
        name,
        deviceType: "light",
        state: canvasDevice.lightState,
      });
    } else if (canvasDevice.type === "fan" && canvasDevice.fanState) {
      success = await addPreset({
        name,
        deviceType: "fan",
        state: canvasDevice.fanState,
      });
    }

    if (success) {
      setShowModal(false);
      setHasInteraction(false);
      toast.success("Preset saved");
      return true;
    }
    return false;
  };

  if (!hasInteraction || !canvasDevice) {
    return null;
  }

  return (
    <>
      <div className="flex gap-2 md:gap-3">
        <button
          onClick={clearCanvas}
          className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-sm text-white transition-colors hover:bg-slate-700 md:px-4 md:py-2 md:text-base"
        >
          Clear
        </button>
        <button
          onClick={handleSave}
          className="rounded-lg bg-blue-500 px-3 py-1.5 text-sm text-white transition-colors hover:bg-blue-600 md:px-4 md:py-2 md:text-base"
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
