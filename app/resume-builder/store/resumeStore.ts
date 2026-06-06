import { create } from "zustand";
import { defaultResumeData } from "../data/defaultResumeData";
import type {
  ResumeData,
  Experience,
  Education,
  Project,
} from "../types/resume";

interface ResumeStore {
  resumeData: ResumeData;

  // Personal
  updatePersonal: (
    field: keyof ResumeData["personal"],
    value: string
  ) => void;

  // Summary
  updateSummary: (text: string) => void;

  // Experience
  addExperience: (exp: Experience) => void;
  removeExperience: (index: number) => void;
  updateExperience: (
    index: number,
    field: keyof Experience,
    value: any
  ) => void;

  // Education
  addEducation: (edu: Education) => void;
  removeEducation: (index: number) => void;
  updateEducation: (
    index: number,
    field: keyof Education,
    value: any
  ) => void;

  // Projects
  addProject: (project: Project) => void;
  removeProject: (index: number) => void;
  updateProject: (
    index: number,
    field: keyof Project,
    value: any
  ) => void;

  // Skills
  addSkill: (skill: string) => void;
  removeSkill: (index: number) => void;
  updateSkill: (index: number, value: string) => void;
}

export const useResumeStore = create<ResumeStore>((set) => ({
  resumeData: defaultResumeData,

  // Personal
  updatePersonal: (field, value) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        personal: {
          ...state.resumeData.personal,
          [field]: value,
        },
      },
    })),

  // Summary
  updateSummary: (text) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        summary: text,
      },
    })),

  // Experience
  addExperience: (exp) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        experience: [...state.resumeData.experience, exp],
      },
    })),

  removeExperience: (index) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        experience: state.resumeData.experience.filter(
          (_, i) => i !== index
        ),
      },
    })),

  updateExperience: (index, field, value) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        experience: state.resumeData.experience.map((exp, i) =>
          i === index ? { ...exp, [field]: value } : exp
        ),
      },
    })),

  // Education
  addEducation: (edu) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        education: [...state.resumeData.education, edu],
      },
    })),

  removeEducation: (index) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        education: state.resumeData.education.filter(
          (_, i) => i !== index
        ),
      },
    })),

  updateEducation: (index, field, value) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        education: state.resumeData.education.map((edu, i) =>
          i === index ? { ...edu, [field]: value } : edu
        ),
      },
    })),

  // Projects
  addProject: (project) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        projects: [...state.resumeData.projects, project],
      },
    })),

  removeProject: (index) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        projects: state.resumeData.projects.filter(
          (_, i) => i !== index
        ),
      },
    })),

  updateProject: (index, field, value) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        projects: state.resumeData.projects.map((project, i) =>
          i === index ? { ...project, [field]: value } : project
        ),
      },
    })),

  // Skills
  addSkill: (skill) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        skills: [...state.resumeData.skills, skill],
      },
    })),

  removeSkill: (index) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        skills: state.resumeData.skills.filter(
          (_, i) => i !== index
        ),
      },
    })),

  updateSkill: (index, value) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        skills: state.resumeData.skills.map((skill, i) =>
          i === index ? value : skill
        ),
      },
    })),
}));