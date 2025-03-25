import { create } from "zustand";

interface SettingsStore {
  openBilling: boolean;
  setOpenBilling: (openBilling: boolean) => void;
  openAccount: boolean;
  setOpenAccount: (openAccount: boolean) => void;
  openNotification: boolean;
  setOpenNotification: (openNotification: boolean) => void;
  openUpgrade: boolean;
  setOpenUpgrade: (openUpgrade: boolean) => void;

  openSetting: boolean;
  setOpenSetting: (openSetting: boolean) => void;
}

export const useSettings = create<SettingsStore>((set) => ({
  openBilling: false,
  setOpenBilling: (openBilling: boolean) => set({ openBilling }),
  openAccount: false,
  setOpenAccount: (openAccount: boolean) => set({ openAccount }),
  openNotification: false,
  setOpenNotification: (openNotification: boolean) => set({ openNotification }),
  openUpgrade: false,
  setOpenUpgrade: (openUpgrade: boolean) => set({ openUpgrade }),
  openSetting: false,
  setOpenSetting: (openSetting: boolean) => set({ openSetting }),
}));
