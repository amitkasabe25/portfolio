"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Experience = {
  company: string;
  title: string;
  date: string;
  points: string[];
};

type Education = {
  institution: string;
  degree: string;
  startYear: string;
  endYear: string;
};

type Project = {
  title: string;
  description: string;
  technologies: string;
  link?: string;
};

type ResumeData = {
  personal?: {
    fullName?: string;
    title?: string;       // ← added
    email?: string;
    phone?: string;
    location?: string;
  };
  summary?: string;
  experience?: Experience[];
  skills?: string[];
  education?: Education[];
  projects?: Project[];
};

type Props = {
  resumeData: ResumeData | null;
};

export default function ResumePreview({ resumeData }: Props) {
  if (!resumeData) return <div className="p-10">Loading resume data...</div>;

  return (
    // ✅ FIX 1: Added h-full so the section has a bounded height and can scroll
    <section className="flex-1 h-full overflow-y-auto bg-muted/20 p-10 flex justify-center">
      <Card className="w-[820px] min-h-[1123px] h-fit shadow-xl rounded-lg overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-primary/80 to-primary" />
        <CardContent className="p-12 space-y-8">

          {/* Header */}
          <div className="flex items-start justify-between gap-10">
            <div>
              <h1 className="text-5xl font-black tracking-tight">
                {resumeData.personal?.fullName || "Your Name"}
              </h1>
              {/* ✅ FIX 2: Read title from data, fallback gracefully */}
              {resumeData.personal?.title && (
                <p className="mt-4 text-lg text-muted-foreground">
                  {resumeData.personal.title}
                </p>
              )}
            </div>
            <div className="text-sm text-muted-foreground text-right space-y-1">
              {resumeData.personal?.email && <p>{resumeData.personal.email}</p>}
              {resumeData.personal?.phone && <p>{resumeData.personal.phone}</p>}
              {resumeData.personal?.location && <p>{resumeData.personal.location}</p>}
            </div>
          </div>

          {/* Summary */}
          {resumeData.summary && (
            <div className="space-y-4">
              <SectionHeading label="Professional Summary" />
              <p className="text-[15px] leading-7 text-foreground/80">
                {resumeData.summary}
              </p>
            </div>
          )}

          {/* Experience */}
          {resumeData.experience && resumeData.experience.length > 0 && (
            <div className="space-y-6">
              <SectionHeading label="Experience" />
              <div className="space-y-8">
                {resumeData.experience.map((exp, idx) => (
                  <div key={idx} className="relative pl-6 border-l border-border">
                    <div className="absolute left-[-5px] top-2 w-2 h-2 rounded-full bg-primary" />
                    <div className="flex flex-wrap justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-semibold">{exp.company}</h3>
                        <p className="text-muted-foreground font-medium">{exp.title}</p>
                      </div>
                      <span className="text-sm text-muted-foreground whitespace-nowrap">
                        {exp.date}
                      </span>
                    </div>
                    {exp.points?.length > 0 && (
                      <ul className="mt-4 space-y-2 text-sm leading-6 list-disc list-inside">
                        {exp.points.map((point, i) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {resumeData.skills && resumeData.skills.length > 0 && (
            <div className="space-y-5">
              <SectionHeading label="Skills" />
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="px-4 py-1">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {resumeData.education && resumeData.education.length > 0 && (
            <div className="space-y-6">
              <SectionHeading label="Education" />
              <div className="space-y-6">
                {resumeData.education.map((edu, idx) => (
                  <div key={idx} className="relative pl-6 border-l border-border">
                    <div className="absolute left-[-5px] top-2 w-2 h-2 rounded-full bg-primary" />
                    <div className="flex flex-wrap justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold">{edu.institution}</h3>
                        <p className="text-muted-foreground">{edu.degree}</p>
                      </div>
                      <span className="text-sm text-muted-foreground whitespace-nowrap">
                        {edu.startYear} – {edu.endYear}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {resumeData.projects && resumeData.projects.length > 0 && (
            <div className="space-y-6">
              <SectionHeading label="Projects" />
              <div className="space-y-6">
                {resumeData.projects.map((project, idx) => (
                  <div key={idx} className="relative pl-6 border-l border-border">
                    <div className="absolute left-[-5px] top-2 w-2 h-2 rounded-full bg-primary" />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{project.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {project.description}
                      </p>
                      {project.technologies && (
                        <p className="text-xs text-muted-foreground mt-2">
                          <span className="font-medium">Tech:</span> {project.technologies}
                        </p>
                      )}
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-primary hover:underline mt-1 inline-block"
                        >
                          {project.link}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </CardContent>
      </Card>
    </section>
  );
}

// ✅ Extracted reusable section heading to reduce repetition
function SectionHeading({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-8 h-px bg-primary/60" />
      <h2 className="text-xs font-bold tracking-wide uppercase text-muted-foreground">
        {label}
      </h2>
    </div>
  );
}