import MinimalTemplate from "./MinimalTemplate";

export const resumeTemplates = {
  minimal: MinimalTemplate,
};

export type TemplateKey = keyof typeof resumeTemplates;