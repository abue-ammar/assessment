import { useDraggable } from "@dnd-kit/core";
import type { LucideIcon } from "lucide-react";

interface DraggableDeviceItemProps {
  icon: LucideIcon;
  label: string;
  deviceType: string;
  isActive: boolean;
  onClick: () => void;
}

export function DraggableDeviceItem({
  icon: Icon,
  label,
  deviceType,
  isActive,
  onClick,
}: DraggableDeviceItemProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `device-${deviceType}`,
    data: { type: deviceType },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-lg border border-slate-700 px-4 py-2 text-white transition-colors ${
        isActive ? "bg-slate-500" : "bg-slate-800 hover:bg-slate-700"
      } ${
        isDragging
          ? "cursor-grabbing opacity-50"
          : "cursor-grab active:cursor-grabbing"
      }`}
    >
      <Icon
        size={18}
        className={`${isActive ? "text-white" : "text-gray-400"}`}
      />
      <span>{label}</span>
    </div>
  );
}
