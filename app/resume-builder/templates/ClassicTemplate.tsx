// resume-builder/components/ClassicTemplate.tsx
"use client";

import { ResumeData } from "@/app/resume-builder/types/resume";

type Props = {
    data: ResumeData;
};

export default function ClassicTemplate({ data }: Props) {
    if (!data) {
        return (
            <div className="flex items-center justify-center h-full text-sm text-zinc-400 dark:text-zinc-600">
                Loading resume...
            </div>
        );
    }

    return (
        <div className="w-[800px] min-h-[1123px] h-fit bg-white dark:bg-zinc-900 shadow-lg border border-zinc-200 dark:border-zinc-800 p-12 space-y-8">

                {/* ── Header (centered, formal) ─────────────────── */}
                <header className="text-center pb-6 border-b border-zinc-300 dark:border-zinc-700">
                    <h1 className="text-4xl font-serif font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                        {data.personal?.fullName || "Your Name"}
                    </h1>

                    {data.personal?.title && (
                        <p className="mt-2 text-sm uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                            {data.personal.title}
                        </p>
                    )}

                    <div className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm text-zinc-600 dark:text-zinc-400">
                        {data.personal?.email && <span>{data.personal.email}</span>}
                        {data.personal?.email && data.personal?.phone && <span className="text-zinc-300 dark:text-zinc-600">|</span>}
                        {data.personal?.phone && <span>{data.personal.phone}</span>}
                        {data.personal?.phone && data.personal?.location && <span className="text-zinc-300 dark:text-zinc-600">|</span>}
                        {data.personal?.location && <span>{data.personal.location}</span>}
                    </div>
                </header>

                {/* ── Summary ───────────────────────────────────── */}
                {data.summary && (
                    <ClassicSection title="Professional Summary">
                        <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 text-justify">
                            {data.summary}
                        </p>
                    </ClassicSection>
                )}

                {/* ── Work Experience ───────────────────────────── */}
                {data.experience && data.experience.length > 0 && (
                    <ClassicSection title="Work Experience">
                        <div className="space-y-6">
                            {data.experience.map((exp, idx) => (
                                <div key={idx}>
                                    <div className="flex flex-wrap justify-between items-baseline">
                                        <h3 className="text-base font-serif font-semibold text-zinc-900 dark:text-zinc-100">
                                            {exp.title}
                                        </h3>
                                        <span className="text-sm text-zinc-500 dark:text-zinc-400 italic">
                                            {exp.date}
                                        </span>
                                    </div>
                                    <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mt-0.5">
                                        {exp.company}
                                    </p>
                                    {exp.points?.length > 0 && (
                                        <ul className="mt-3 space-y-1.5 text-sm text-zinc-700 dark:text-zinc-300 list-disc list-outside ml-5">
                                            {exp.points.map((point, i) => (
                                                <li key={i} className="leading-relaxed">
                                                    {point}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    </ClassicSection>
                )}

                {/* ── Education ─────────────────────────────────── */}
                {data.education && data.education.length > 0 && (
                    <ClassicSection title="Education">
                        <div className="space-y-4">
                            {data.education.map((edu, idx) => (
                                <div key={idx} className="flex flex-wrap justify-between items-baseline">
                                    <div>
                                        <h3 className="text-base font-serif font-semibold text-zinc-900 dark:text-zinc-100">
                                            {edu.institution}
                                        </h3>
                                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                            {edu.degree}
                                        </p>
                                    </div>
                                    <span className="text-sm text-zinc-500 dark:text-zinc-400 italic">
                                        {edu.startYear} – {edu.endYear}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </ClassicSection>
                )}

                {/* ── Skills (grouped by category, optional) ────── */}
                {data.skills && data.skills.length > 0 && (
                    <ClassicSection title="Core Competencies">
                        <div className="flex flex-wrap gap-2">
                            {data.skills.map((skill) => (
                                <span
                                    key={skill}
                                    className="px-2.5 py-1 text-sm bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-sm"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </ClassicSection>
                )}

                {/* ── Projects (optional, classic style) ────────── */}
                {data.projects && data.projects.length > 0 && (
                    <ClassicSection title="Selected Projects">
                        <div className="space-y-5">
                            {data.projects.map((project, idx) => (
                                <div key={idx}>
                                    <h3 className="text-base font-serif font-semibold text-zinc-900 dark:text-zinc-100">
                                        {project.title}
                                    </h3>
                                    <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                        {project.description}
                                    </p>
                                    {project.technologies && (
                                        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                                            <span className="font-medium">Technologies:</span> {project.technologies}
                                        </p>
                                    )}
                                    {project.link && (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-1 inline-block text-sm text-zinc-600 dark:text-zinc-400 underline underline-offset-2 hover:text-zinc-900 dark:hover:text-zinc-200"
                                        >
                                            {project.link}
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    </ClassicSection>
                )}

                {/* ── Footer (optional) ─────────────────────────── */}
                <footer className="pt-4 text-center text-xs text-zinc-400 dark:text-zinc-600 border-t border-zinc-200 dark:border-zinc-800">
                    References available upon request
                </footer>
            </div>
    );
}

// ── Sub-component for consistent section styling ────────────────────
function ClassicSection({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section>
            <h2 className="text-lg font-serif font-semibold uppercase tracking-wide text-zinc-800 dark:text-zinc-200 pb-1 border-b border-zinc-300 dark:border-zinc-700 mb-4">
                {title}
            </h2>
            {children}
        </section>
    );
}