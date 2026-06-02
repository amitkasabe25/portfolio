// resume-builder/data/defaultResumeData.ts
import type { ResumeData } from "../types/resume";

export const defaultResumeData: ResumeData = {
  personal: {
    fullName: "Alex Rivera",
    email: "alex@example.com",
    phone: "+1 234 567 890",
    location: "San Francisco, CA",
  },
  summary: "Senior Full Stack Engineer with 8+ years of experience building scalable web applications and leading technical teams.",
  experience: [
    {
      company: "TechFlow Inc.",
      title: "Lead Frontend Engineer",
      date: "2022 – Present",
      points: [
        "Architected component library used by 10+ teams.",
        "Reduced bundle size by 40% with dynamic imports.",
        "Led migration from JavaScript to TypeScript for 50+ components.",
      ],
    },
    {
      company: "WebDynamics Ltd.",
      title: "Full Stack Developer",
      date: "2020 – 2022",
      points: [
        "Developed RESTful APIs using Node.js and Express.",
        "Built responsive UI with React and Tailwind CSS.",
        "Improved page load time by 60% through optimization.",
      ],
    },
  ],
  education: [
    {
      institution: "University of Technology",
      degree: "Bachelor of Computer Science",
      startYear: "2016",
      endYear: "2020",
    },
    {
      institution: "Technical Institute",
      degree: "Diploma in Web Development",
      startYear: "2015",
      endYear: "2016",
    },
  ],
  projects: [
    {
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce platform with payment integration and admin dashboard.",
      technologies: "React, Node.js, PostgreSQL, Stripe",
      link: "https://github.com/alexrivera/ecommerce",
    },
    {
      title: "Analytics Dashboard",
      description: "Real-time analytics dashboard with data visualization and reporting features.",
      technologies: "Next.js, TypeScript, TailwindCSS, Chart.js",
      link: "https://github.com/alexrivera/analytics",
    },
  ],
  skills: [
    "React",
    "TypeScript",
    "Next.js",
    "Tailwind CSS",
    "Node.js",
    "PostgreSQL",
    "MongoDB",
    "GraphQL",
    "REST APIs",
    "Git",
    "Docker",
    "AWS",
  ],
  languages: ["English", "Spanish"],
};