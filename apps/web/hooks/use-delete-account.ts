import { create } from "zustand";

interface DeleteAccountStore {
  userId: string;
  setUserId: (userId: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  close: () => void;
}

export const useDeleteAccount = create<DeleteAccountStore>((set) => ({
  userId: "",
  setUserId: (userId: string) => set({ userId }),
  isOpen: false,
  setIsOpen: (isOpen: boolean) => set({ isOpen }),
  close: () => set({ isOpen: false }),
}));
