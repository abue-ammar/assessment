import { DevicesSection } from "./devices-section";
import { PresetsSection } from "./presets-section";

interface SidebarProps {
  activeDevice: string;
  onDeviceSelect: (device: string) => void;
}

export function Sidebar({ activeDevice, onDeviceSelect }: SidebarProps) {
  return (
    <div className="flex w-56 flex-col overflow-y-scroll border-r border-slate-800 bg-slate-900 p-4">
      <DevicesSection
        activeDevice={activeDevice}
        onDeviceSelect={onDeviceSelect}
      />
      <PresetsSection />
    </div>
  );
}
