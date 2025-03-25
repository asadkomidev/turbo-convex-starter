import { create } from "zustand";

interface State {
  isPending: boolean;
  setIsPending: (pending: boolean) => void;
}

export const useIsPending = create<State>((set) => ({
  isPending: false,
  setIsPending: (isPending: boolean) => set({ isPending }),
}));
