import { create } from "zustand";

type ResumeStore = {
  selectedTemplate: string;
  setSelectedTemplate: (template: string) => void;
};

export const useResumeStore = create<ResumeStore>((set) => ({
  selectedTemplate: "modern",

  setSelectedTemplate: (template) =>
    set({ selectedTemplate: template }),
}));