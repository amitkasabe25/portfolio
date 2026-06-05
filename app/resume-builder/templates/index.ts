import MinimalTemplate from "./MinimalTemplate";
import ModernTemplate from "./ModernTemplate";
import ClassicTemplate from "./ClassicTemplate";
export const resumeTemplates = {
  minimal: MinimalTemplate,
  modern: ModernTemplate,
  classic: ClassicTemplate,
};

export type TemplateKey = keyof typeof resumeTemplates;