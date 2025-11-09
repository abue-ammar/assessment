import { useAppStore } from "../../store/app-store";
import { PresetItem } from "./preset-item";

export function PresetsSection() {
  const presets = useAppStore((state) => state.presets);

  return (
    <div>
      <h2 className="mb-4 text-slate-300">Saved Presets</h2>
      {presets.length === 0 ? (
        <div className="rounded-lg border border-slate-700 px-4 py-3">
          <p className="text-sm text-slate-500">Nothing added yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {presets.map((preset) => (
            <PresetItem
              key={preset.id}
              id={preset.id}
              name={preset.name}
              deviceType={preset.deviceType}
            />
          ))}
        </div>
      )}
    </div>
  );
}
