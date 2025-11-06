import { useDraggable } from "@dnd-kit/core";

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

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`cursor-grab rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 transition-colors hover:bg-slate-700 active:cursor-grabbing ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-white">{name}</span>
        <span className="text-xs text-slate-400 capitalize">{deviceType}</span>
      </div>
    </div>
  );
}
