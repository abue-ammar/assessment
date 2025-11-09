import { DragOverlay } from "@dnd-kit/core";
import { Fan, Lightbulb } from "lucide-react";

interface DragData {
  type: string;
  presetId?: string;
}

interface DragOverlayWrapperProps {
  activeId: string | null;
  activeData: DragData | null;
}

export function DragOverlayWrapper({
  activeId,
  activeData,
}: DragOverlayWrapperProps) {
  if (!activeId) return null;

  const renderDragContent = () => {
    if (activeData?.type === "light") {
      return (
        <div className="flex items-center gap-3 rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white shadow-2xl">
          <Lightbulb size={18} />
          <span>Light</span>
        </div>
      );
    }

    if (activeData?.type === "fan") {
      return (
        <div className="flex items-center gap-3 rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white shadow-2xl">
          <Fan size={18} />
          <span>Fan</span>
        </div>
      );
    }

    if (activeData?.type === "preset") {
      return (
        <div className="rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white shadow-2xl">
          <span className="text-sm font-medium">Preset</span>
        </div>
      );
    }

    return null;
  };

  return <DragOverlay>{renderDragContent()}</DragOverlay>;
}
