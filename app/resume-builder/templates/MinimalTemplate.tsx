// resume-builder/components/MinimalTemplate.tsx
"use client";

import { ResumeData } from "@/app/resume-builder/types/resume";

type Props = {
    data: ResumeData;
};

export default function MinimalTemplate({ data }: Props) {
    if (!data) {
        return (
            <div className="flex items-center justify-center h-full text-sm text-zinc-400 dark:text-zinc-600">
                Loading resume...
            </div>
        );
    }

    return (
        <div className="w-[820px] min-h-[1123px] h-fit bg-white dark:bg-zinc-900 shadow-sm border border-zinc-200 dark:border-zinc-800 p-6 space-y-5">

                {/* ── Header ─────────────────────────────── */}
                <header className="pb-4 border-b border-zinc-200 dark:border-zinc-800">
                    <h1 className="text-3xl font-light tracking-wide uppercase text-zinc-900 dark:text-zinc-50">
                        {data.personal?.fullName || "Your Name"}
                    </h1>

                    {data.personal?.title && (
                        <p className="mt-1 text-xs uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                            {data.personal.title}
                        </p>
                    )}

                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-500 dark:text-zinc-400">
                        {data.personal?.email && <ContactItem icon="✉" value={data.personal.email} />}
                        {data.personal?.phone && <ContactItem icon="✆" value={data.personal.phone} />}
                        {data.personal?.location && <ContactItem icon="⌖" value={data.personal.location} />}
                    </div>
                </header>

                {/* ── Summary ────────────────────────────── */}
                {data.summary && (
                    <ResumeSection label="Summary">
                        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                            {data.summary}
                        </p>
                    </ResumeSection>
                )}

                {/* ── Experience ─────────────────────────── */}
                {data.experience && data.experience.length > 0 && (
                    <ResumeSection label="Experience">
                        <div className="space-y-5">
                            {data.experience.map((exp, idx) => (
                                <div key={idx} className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-0">
                                    <div>
                                        <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                            {exp.company}
                                        </h3>
                                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0">
                                            {exp.title}
                                        </p>
                                    </div>
                                    <span className="text-[11px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wide whitespace-nowrap mt-0.5 text-right">
                                        {exp.date}
                                    </span>
                                    {exp.points?.length > 0 && (
                                        <ul className="col-span-2 mt-2 space-y-1 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                                            {exp.points.map((point, i) => (
                                                <li key={i} className="flex gap-2">
                                                    <span className="mt-1.5 w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-600 shrink-0" />
                                                    <span>{point}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    </ResumeSection>
                )}

                {/* ── Skills ─────────────────────────────── */}
                {data.skills && data.skills.length > 0 && (
                    <ResumeSection label="Skills">
                        <div className="flex flex-wrap gap-1.5">
                            {data.skills.map((skill) => (
                                <span
                                    key={skill}
                                    className="px-2 py-0.5 text-[11px] tracking-wide border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 rounded-sm"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </ResumeSection>
                )}

                {/* ── Education ──────────────────────────── */}
                {data.education && data.education.length > 0 && (
                    <ResumeSection label="Education">
                        <div className="space-y-3">
                            {data.education.map((edu, idx) => (
                                <div key={idx} className="flex justify-between items-start gap-4">
                                    <div>
                                        <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                            {edu.institution}
                                        </h3>
                                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0">
                                            {edu.degree}
                                        </p>
                                    </div>
                                    <span className="text-[11px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wide whitespace-nowrap mt-0.5">
                                        {edu.startYear} – {edu.endYear}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </ResumeSection>
                )}

                {/* ── Projects ───────────────────────────── */}
                {data.projects && data.projects.length > 0 && (
                    <ResumeSection label="Projects">
                        <div className="space-y-4">
                            {data.projects.map((project, idx) => (
                                <div key={idx}>
                                    <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                        {project.title}
                                    </h3>
                                    <p className="mt-1 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                                        {project.description}
                                    </p>
                                    {project.technologies && (
                                        <p className="mt-1 text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                                            {project.technologies}
                                        </p>
                                    )}
                                    {project.link && (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-1 inline-block text-[11px] underline underline-offset-4 text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
                                        >
                                            {project.link}
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    </ResumeSection>
                )}

        </div>
    );
}

// ── Sub-components ──────────────────────────────────────────────────

function ResumeSection({
    label,
    children,
}: {
    label: string;
    children: React.ReactNode;
}) {
    return (
        <section>
            <div className="flex items-center gap-3 mb-2">
                <span className="text-[9px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                    {label}
                </span>
                <div className="flex-1 h-px bg-zinc-100 dark:bg-zinc-800" />
            </div>
            {children}
        </section>
    );
}

function ContactItem({ icon, value }: { icon: string; value: string }) {
    return (
        <span className="flex items-center gap-1">
            <span className="text-zinc-300 dark:text-zinc-600 text-[11px]">{icon}</span>
            <span>{value}</span>
        </span>
    );
}