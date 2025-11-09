import { Fan, Lightbulb } from "lucide-react";
import { useAppStore } from "../../store/app-store";
import { DraggableDeviceItem } from "./draggable-device-item";

interface DevicesSectionProps {
  activeDevice: string;
  onDeviceSelect: (device: string) => void;
}

export function DevicesSection({
  activeDevice,
  onDeviceSelect,
}: DevicesSectionProps) {
  const devices = useAppStore((state) => state.devices);

  return (
    <div className="mb-8">
      <h2 className="mb-4 text-white">Devices</h2>
      <div className="space-y-3">
        {devices.map((device) => (
          <DraggableDeviceItem
            key={device.id}
            icon={device.type === "light" ? Lightbulb : Fan}
            label={device.name}
            deviceType={device.type}
            isActive={activeDevice === device.type}
            onClick={() => onDeviceSelect(device.type)}
          />
        ))}
      </div>
    </div>
  );
}
