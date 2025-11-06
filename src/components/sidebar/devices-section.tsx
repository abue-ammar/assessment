import { Fan, Lightbulb } from "lucide-react";
import { DraggableDeviceItem } from "./draggable-device-item";

interface DevicesSectionProps {
  activeDevice: string;
  onDeviceSelect: (device: string) => void;
}

export function DevicesSection({
  activeDevice,
  onDeviceSelect,
}: DevicesSectionProps) {
  return (
    <div className="mb-8">
      <h2 className="mb-4 text-white">Devices</h2>
      <div className="space-y-3">
        <DraggableDeviceItem
          icon={Lightbulb}
          label="Light"
          deviceType="light"
          isActive={activeDevice === "light"}
          onClick={() => onDeviceSelect("light")}
        />
        <DraggableDeviceItem
          icon={Fan}
          label="Fan"
          deviceType="fan"
          isActive={activeDevice === "fan"}
          onClick={() => onDeviceSelect("fan")}
        />
      </div>
    </div>
  );
}
