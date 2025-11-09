import { DevicesSection } from "./devices-section";
import { PresetsSection } from "./presets-section";

interface SidebarProps {
  activeDevice: string;
  onDeviceSelect: (device: string) => void;
}

export function Sidebar({ activeDevice, onDeviceSelect }: SidebarProps) {
  return (
    <div className="flex max-h-65 w-full flex-col overflow-y-scroll border-b border-slate-800 bg-slate-900 p-4 md:max-h-none md:w-56 md:border-r md:border-b-0">
      <DevicesSection
        activeDevice={activeDevice}
        onDeviceSelect={onDeviceSelect}
      />
      <PresetsSection />
    </div>
  );
}
