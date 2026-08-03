import { create } from "zustand";

interface AppState {
  isLoaded: boolean;
  isHovering3D: boolean;
  setLoaded: (loaded: boolean) => void;
  setHovering3D: (hovering: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isLoaded: false,
  isHovering3D: false,
  setLoaded: (loaded) => set({ isLoaded: loaded }),
  setHovering3D: (hovering) => set({ isHovering3D: hovering }),
}));
