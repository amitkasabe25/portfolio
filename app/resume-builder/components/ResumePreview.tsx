"use client";

import { resumeTemplates } from "../templates";
import { useResumeStore } from "../store/useResumeStore";

type Props = {
  resumeData: any;
};

export default function ResumePreview({ resumeData }: Props) {
  const { selectedTemplate } = useResumeStore();

  const Template =
    resumeTemplates[selectedTemplate as keyof typeof resumeTemplates];

  if (!Template) {
    return <div>Template not found</div>;
  }

  return (
    <section className="flex-1 h-full overflow-y-auto bg-muted/20 p-10 flex justify-center">
      <Template data={resumeData} />
    </section>
  );
}