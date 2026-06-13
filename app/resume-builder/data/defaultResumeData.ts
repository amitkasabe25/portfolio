// resume-builder/data/defaultResumeData.ts
import type { ResumeData } from "../types/resume";

export const defaultResumeData: ResumeData = {
  personal: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    title: "",
  },
  summary: "",
  experience: [],
  education: [],
  skills: [],
  projects: [],
  languages: [],
};