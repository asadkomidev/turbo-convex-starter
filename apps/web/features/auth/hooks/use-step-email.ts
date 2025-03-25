import { create } from "zustand";

export type Step = "email" | "code";

type State = {
  step: Step;
  email: string;
  setEmail: (email: string) => void;
  setStep: (step: Step) => void;
};
export const useStepEmail = create<State>((set) => ({
  step: "email",
  email: "",
  setStep: (step: Step) => set({ step }),
  setEmail: (email: string) => set({ email }),
}));
