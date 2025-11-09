import { useDraggable } from "@dnd-kit/core";
import { Fan, Lightbulb } from "lucide-react";

interface PresetItemProps {
  id: string;
  name: string;
  deviceType: "light" | "fan";
}

export function PresetItem({ id, name, deviceType }: PresetItemProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `preset-${id}`,
    data: { type: "preset", presetId: id },
  });

  const Icon = deviceType === "light" ? Lightbulb : Fan;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`flex w-full items-center gap-3 rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-white transition-colors hover:bg-slate-700 ${
        isDragging
          ? "cursor-grabbing opacity-50"
          : "cursor-grab active:cursor-grabbing"
      }`}
    >
      <Icon size={18} className="text-gray-400" />
      <span>{name}</span>
    </div>
  );
}
