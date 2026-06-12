import MinimalTemplate from "./MinimalTemplate";
import ModernTemplate from "./ModernTemplate";
import ClassicTemplate from "./ClassicTemplate";
import TrendingTemplate from "./TrendingTemplate";
export const resumeTemplates = {
  minimal: MinimalTemplate,
  modern: ModernTemplate,
  classic: ClassicTemplate,
  trending: TrendingTemplate,
};

export type TemplateKey = keyof typeof resumeTemplates;