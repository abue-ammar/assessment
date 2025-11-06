import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface LightState {
  power: boolean;
  brightness: number;
  colorTemp: string;
}

export interface FanState {
  power: boolean;
  speed: number;
}

export interface Preset {
  id: string;
  name: string;
  deviceType: "light" | "fan";
  state: LightState | FanState;
  createdAt: number;
}

interface CanvasDevice {
  type: "light" | "fan";
  lightState?: LightState;
  fanState?: FanState;
  presetId?: string;
}

interface AppStore {
  canvasDevice: CanvasDevice | null;
  setCanvasDevice: (device: CanvasDevice | null) => void;
  clearCanvas: () => void;
  hasInteraction: boolean;
  setHasInteraction: (value: boolean) => void;

  presets: Preset[];
  addPreset: (preset: Omit<Preset, "id" | "createdAt">) => void;
  updatePreset: (id: string, state: LightState | FanState) => void;
  removePreset: (id: string) => void;

  updateLightState: (state: Partial<LightState>) => void;
  updateFanState: (state: Partial<FanState>) => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      canvasDevice: null,
      hasInteraction: false,
      presets: [],

      setCanvasDevice: (device) =>
        set({ canvasDevice: device, hasInteraction: false }),

      clearCanvas: () => set({ canvasDevice: null, hasInteraction: false }),

      setHasInteraction: (value) => set({ hasInteraction: value }),

      addPreset: (preset) =>
        set((state) => ({
          presets: [
            ...state.presets,
            {
              ...preset,
              id: `preset-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              createdAt: Date.now(),
            },
          ],
        })),

      updatePreset: (id, state) =>
        set((store) => ({
          presets: store.presets.map((p) =>
            p.id === id ? { ...p, state } : p
          ),
        })),

      removePreset: (id) =>
        set((state) => ({
          presets: state.presets.filter((p) => p.id !== id),
        })),

      updateLightState: (state) => {
        const current = get().canvasDevice;
        if (current?.type === "light") {
          set({
            canvasDevice: {
              ...current,
              lightState: { ...current.lightState!, ...state },
            },
            hasInteraction: true,
          });
        }
      },

      updateFanState: (state) => {
        const current = get().canvasDevice;
        if (current?.type === "fan") {
          set({
            canvasDevice: {
              ...current,
              fanState: { ...current.fanState!, ...state },
            },
            hasInteraction: true,
          });
        }
      },
    }),
    {
      name: "app-storage",
      partialize: (state) => ({ presets: state.presets }),
    }
  )
);
