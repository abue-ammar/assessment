import { X } from "lucide-react";
import { useState } from "react";

interface SavePresetModalProps {
  deviceType: "light" | "fan";
  onSave: (name: string) => Promise<boolean>;
  onClose: () => void;
}

export function SavePresetModal({ onSave, onClose }: SavePresetModalProps) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      const success = await onSave(name.trim());
      if (!success) {
        setError("Preset name already exists");
      }
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (error) {
      setError("");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-2xl border border-slate-700/50 bg-slate-800/95 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center justify-between border-b border-slate-700 p-6">
          <h2 className="text-xl font-medium text-white">Give me a name</h2>
          <button
            onClick={onClose}
            className="text-slate-400 transition-colors hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="Name it"
              className={`w-full rounded-xl border px-5 py-3 text-base text-white placeholder-slate-500 focus:outline-none ${
                error
                  ? "border-red-500 bg-slate-700/50 focus:ring-2 focus:ring-red-500/50"
                  : "border-transparent bg-slate-700/50 focus:ring-2 focus:ring-blue-500/50"
              }`}
              autoFocus
            />
            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
          </div>

          <p className="mb-6 text-sm text-slate-400">
            By adding this effect as a present you can reuse this anytime.
          </p>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl bg-slate-700/50 px-6 py-3 font-medium text-slate-300 transition-colors hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!name.trim()}
              className="rounded-xl bg-blue-500 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-slate-700/50 disabled:text-slate-500"
            >
              Save Preset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
