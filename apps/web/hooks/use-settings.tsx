import { create } from "zustand";

interface SettingsStore {
  openBilling: boolean;
  setOpenBilling: (openBilling: boolean) => void;
  openAccount: boolean;
  setOpenAccount: (openAccount: boolean) => void;

  openSetting: boolean;
  setOpenSetting: (openSetting: boolean) => void;
}

export const useSettings = create<SettingsStore>((set) => ({
  openBilling: false,
  setOpenBilling: (openBilling: boolean) => set({ openBilling }),
  openAccount: false,
  setOpenAccount: (openAccount: boolean) => set({ openAccount }),
  openSetting: false,
  setOpenSetting: (openSetting: boolean) => set({ openSetting }),
}));
