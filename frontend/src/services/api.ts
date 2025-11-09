import axios from "axios";
import type { FanState, LightState } from "../store/app-store";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

// API Service for backend communication
export const api = {
  presets: {
    getAll: async () => {
      const response = await axios.get(`${API_BASE_URL}/presets`);
      return response.data;
    },
    getById: async (id: string) => {
      const response = await axios.get(`${API_BASE_URL}/presets/${id}`);
      return response.data;
    },

    create: async (data: {
      name: string;
      device_type: "light" | "fan";
      device_state: LightState | FanState;
    }) => {
      const response = await axios.post(`${API_BASE_URL}/presets`, data);
      return response.data;
    },

    update: async (id: string, device_state: LightState | FanState) => {
      const response = await axios.put(`${API_BASE_URL}/presets/${id}`, {
        device_state,
      });
      return response.data;
    },

    delete: async (id: string) => {
      const response = await axios.delete(`${API_BASE_URL}/presets/${id}`);
      return response.data;
    },
  },

  devices: {
    getAll: async () => {
      const response = await axios.get(`${API_BASE_URL}/devices`);
      return response.data;
    },

    create: async (data: {
      type: "light" | "fan";
      name?: string;
      settings: LightState | FanState;
    }) => {
      const response = await axios.post(`${API_BASE_URL}/devices`, data);
      return response.data;
    },

    update: async (id: string, settings: LightState | FanState) => {
      const response = await axios.put(`${API_BASE_URL}/devices/${id}`, {
        settings,
      });
      return response.data;
    },
  },
};
