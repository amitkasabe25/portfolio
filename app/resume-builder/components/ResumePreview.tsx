// resume-builder/components/ResumePreview.tsx
"use client";          // Required if using hooks in Next.js App Router

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Props = {
  resumeData: any
}

export default function ResumePreview({ resumeData }: Props) {
  if (!resumeData) return <div className="p-10">Loading resume data...</div>;

  return (
    <section className="flex-1 overflow-y-auto bg-muted/20 p-10 flex justify-center">
      <Card className="w-[820px] min-h-[1123px] shadow-xl rounded-lg overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-primary/80 to-primary" />
        <CardContent className="p-12 space-y-8">
          {/* Header */}
          <div className="flex items-start justify-between gap-10">
            <div>
              <h1 className="text-5xl font-black tracking-tight">
                {resumeData.personal?.fullName || "Your Name"}
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                {/* You may want a 'title' field, otherwise leave or hardcode */}
                Full Stack Engineer
              </p>
            </div>
            <div className="text-sm text-muted-foreground text-right">
              <p>{resumeData.personal?.email}</p>
              <p>{resumeData.personal?.phone}</p>
              <p>{resumeData.personal?.location}</p>
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-8 h-px bg-primary/60" />
              <h2 className="text-xs font-bold tracking-wide uppercase text-muted-foreground">
                Professional Summary
              </h2>
            </div>
            <p className="text-[15px] leading-7 text-foreground/80">
              {resumeData.summary || "No summary provided."}
            </p>
          </div>

          {/* Experience */}
          {resumeData.experience && resumeData.experience.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-8 h-px bg-primary/60" />
                <h2 className="text-xs font-bold tracking-wide uppercase text-muted-foreground">
                  Experience
                </h2>
              </div>
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
                    <ul className="mt-4 space-y-2 text-sm leading-6 list-disc list-inside">
                      {exp.points.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {resumeData.skills && resumeData.skills.length > 0 && (
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-8 h-px bg-primary/60" />
                <h2 className="text-xs font-bold tracking-wide uppercase text-muted-foreground">
                  Skills
                </h2>
              </div>
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
              <div className="flex items-center gap-4">
                <div className="w-8 h-px bg-primary/60" />
                <h2 className="text-xs font-bold tracking-wide uppercase text-muted-foreground">
                  Education
                </h2>
              </div>
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
              <div className="flex items-center gap-4">
                <div className="w-8 h-px bg-primary/60" />
                <h2 className="text-xs font-bold tracking-wide uppercase text-muted-foreground">
                  Projects
                </h2>
              </div>
              <div className="space-y-6">
                {resumeData.projects.map((project, idx) => (
                  <div key={idx} className="relative pl-6 border-l border-border">
                    <div className="absolute left-[-5px] top-2 w-2 h-2 rounded-full bg-primary" />
                    <div className="flex flex-wrap justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">{project.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {project.description}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          <span className="font-medium">Tech:</span> {project.technologies}
                        </p>
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