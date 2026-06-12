// resume-builder/data/defaultResumeData.ts
import type { ResumeData } from "../types/resume";

export const defaultResumeData: ResumeData = {
  personal: {},
  summary: "",
  experience: [],
  education: [],        // if your type includes it
  skills: [],           // if your type includes it
  certifications: [],   // etc.
  projects: [],
  languages: [],
};