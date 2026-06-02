export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location?: string;
}

export interface Experience {
  company: string;
  title: string;
  date: string;
  points: string[];
}

export interface Education {
  institution: string;
  degree: string;
  startYear: string;
  endYear: string;
}

export interface Project {
  title: string;
  description: string;
  technologies: string;
  link: string;
}

export interface ResumeData {
  personal: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  projects: Project[];
  skills: string[];
  languages: string[];
}
