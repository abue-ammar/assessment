import { create } from "zustand";
import { api } from "../services/api";

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

export interface Device {
  id: string;
  type: "light" | "fan";
  name: string;
  settings: LightState | FanState;
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

  devices: Device[];
  loadDevices: () => Promise<void>;

  presets: Preset[];
  loadPresets: () => Promise<void>;
  addPreset: (preset: Omit<Preset, "id" | "createdAt">) => Promise<boolean>;
  updatePreset: (id: string, state: LightState | FanState) => Promise<void>;
  removePreset: (id: string) => Promise<void>;

  updateLightState: (state: Partial<LightState>) => void;
  updateFanState: (state: Partial<FanState>) => void;
}

export const useAppStore = create<AppStore>((set, get) => ({
  canvasDevice: null,
  hasInteraction: false,
  devices: [],
  presets: [],

  setCanvasDevice: (device) =>
    set({ canvasDevice: device, hasInteraction: false }),

  clearCanvas: () => set({ canvasDevice: null, hasInteraction: false }),

  setHasInteraction: (value) => set({ hasInteraction: value }),

  // Load devices from backend
  loadDevices: async () => {
    try {
      const data = await api.devices.getAll();
      const devices = data.map(
        (d: {
          id: number;
          type: string;
          name: string;
          settings: LightState | FanState;
        }) => ({
          id: d.id.toString(),
          type: d.type as "light" | "fan",
          name: d.name,
          settings: d.settings,
        })
      );
      set({ devices });
    } catch (error) {
      console.error("Failed to load devices:", error);
    }
  },

  // Load presets from backend
  loadPresets: async () => {
    try {
      const data = await api.presets.getAll();
      const presets = data.map(
        (p: {
          id: string;
          name: string;
          device_type: string;
          device_state: LightState | FanState;
          created_at: string;
        }) => ({
          id: p.id,
          name: p.name,
          deviceType: p.device_type as "light" | "fan",
          state: p.device_state,
          createdAt: new Date(p.created_at).getTime(),
        })
      );
      set({ presets });
    } catch (error) {
      console.error("Failed to load presets:", error);
    }
  },

  // Add preset to backend and local state
  addPreset: async (preset) => {
    try {
      const response = await api.presets.create({
        name: preset.name,
        device_type: preset.deviceType,
        device_state: preset.state,
      });

      const newPreset: Preset = {
        id: response.id.toString(),
        name: preset.name,
        deviceType: preset.deviceType,
        state: preset.state,
        createdAt: Date.now(),
      };

      set((state) => ({
        presets: [newPreset, ...state.presets],
      }));

      return true;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Failed to save preset:", error);
      }
      return false;
    }
  },

  // Update preset in backend and local state
  updatePreset: async (id, state) => {
    try {
      await api.presets.update(id, state);
      set((store) => ({
        presets: store.presets.map((p) => (p.id === id ? { ...p, state } : p)),
      }));
    } catch (error) {
      console.error("Failed to update preset:", error);
    }
  },

  // Remove preset from backend and local state
  removePreset: async (id) => {
    try {
      await api.presets.delete(id);
      set((state) => ({
        presets: state.presets.filter((p) => p.id !== id),
      }));
    } catch (error) {
      console.error("Failed to delete preset:", error);
    }
  },

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
}));
