import { create } from "zustand";

interface State {
  toggle: boolean;
  setToggle: (toggle: boolean) => void;
}

export const usePlanToggle = create<State>((set) => ({
  toggle: false,
  setToggle: (toggle) => set({ toggle }),
}));
