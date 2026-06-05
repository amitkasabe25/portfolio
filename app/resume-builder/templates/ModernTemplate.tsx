// resume-builder/components/ModernTemplate.tsx
"use client";

import { ResumeData } from "@/app/resume-builder/types/resume";

type Props = {
    data: ResumeData;
};

export default function ModernTemplate({ data }: Props) {
    if (!data) {
        return (
            <div className="flex items-center justify-center h-full text-sm text-zinc-400 dark:text-zinc-600">
                Loading resume...
            </div>
        );
    }

    return (
        <section className="flex-1 h-full overflow-y-auto bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900 p-8 flex justify-center">
            <div className="w-[1000px] min-h-[1123px] h-fit bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200/50 dark:border-zinc-800/50 overflow-hidden">

                <div className="grid grid-cols-[1fr_2fr] gap-0">
                    {/* ── Sidebar (Left) ────────────────────────── */}
                    <aside className="bg-zinc-900 dark:bg-black p-8 text-zinc-300 dark:text-zinc-400 space-y-8">
                        {/* Name & Title */}
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight text-white">
                                {data.personal?.fullName || "Your Name"}
                            </h1>
                            {data.personal?.title && (
                                <p className="mt-2 text-sm text-indigo-300 dark:text-indigo-400 font-medium">
                                    {data.personal.title}
                                </p>
                            )}
                        </div>

                        {/* Contact */}
                        <div className="space-y-3 text-sm">
                            <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
                                Contact
                            </h2>
                            <div className="space-y-2">
                                {data.personal?.email && (
                                    <ContactModern icon="📧" value={data.personal.email} />
                                )}
                                {data.personal?.phone && (
                                    <ContactModern icon="📱" value={data.personal.phone} />
                                )}
                                {data.personal?.location && (
                                    <ContactModern icon="📍" value={data.personal.location} />
                                )}
                            </div>
                        </div>

                        {/* Skills */}
                        {data.skills && data.skills.length > 0 && (
                            <div className="space-y-3">
                                <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
                                    Core Skills
                                </h2>
                                <div className="flex flex-wrap gap-2">
                                    {data.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="px-2.5 py-1 text-xs rounded-full bg-white/5 dark:bg-white/5 text-zinc-300 border border-white/10"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </aside>

                    {/* ── Main Content (Right) ──────────────────── */}
                    <main className="p-8 space-y-8">
                        {/* Summary */}
                        {data.summary && (
                            <div>
                                <h2 className="text-sm font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-3">
                                    Profile
                                </h2>
                                <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                                    {data.summary}
                                </p>
                            </div>
                        )}

                        {/* Experience */}
                        {data.experience && data.experience.length > 0 && (
                            <div>
                                <h2 className="text-sm font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-4">
                                    Work Experience
                                </h2>
                                <div className="space-y-6">
                                    {data.experience.map((exp, idx) => (
                                        <div key={idx} className="border-l-2 border-indigo-200 dark:border-indigo-800 pl-4">
                                            <div className="flex flex-wrap justify-between items-baseline gap-2">
                                                <h3 className="text-base font-semibold text-zinc-900 dark:text-white">
                                                    {exp.title}
                                                </h3>
                                                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                                    {exp.date}
                                                </span>
                                            </div>
                                            <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mt-0.5">
                                                {exp.company}
                                            </p>
                                            {exp.points?.length > 0 && (
                                                <ul className="mt-3 space-y-1.5 text-sm text-zinc-600 dark:text-zinc-400">
                                                    {exp.points.map((point, i) => (
                                                        <li key={i} className="flex gap-2">
                                                            <span className="mt-1.5 w-1 h-1 rounded-full bg-indigo-400 dark:bg-indigo-500 shrink-0" />
                                                            <span>{point}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Education */}
                        {data.education && data.education.length > 0 && (
                            <div>
                                <h2 className="text-sm font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-4">
                                    Education
                                </h2>
                                <div className="space-y-4">
                                    {data.education.map((edu, idx) => (
                                        <div key={idx} className="flex justify-between items-start gap-4">
                                            <div>
                                                <h3 className="text-base font-semibold text-zinc-900 dark:text-white">
                                                    {edu.institution}
                                                </h3>
                                                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                                    {edu.degree}
                                                </p>
                                            </div>
                                            <span className="text-xs text-zinc-500 dark:text-zinc-500 whitespace-nowrap">
                                                {edu.startYear} – {edu.endYear}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Projects */}
                        {data.projects && data.projects.length > 0 && (
                            <div>
                                <h2 className="text-sm font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-4">
                                    Featured Projects
                                </h2>
                                <div className="grid grid-cols-1 gap-5">
                                    {data.projects.map((project, idx) => (
                                        <div
                                            key={idx}
                                            className="bg-zinc-50 dark:bg-zinc-800/30 rounded-lg p-4 border border-zinc-200 dark:border-zinc-800"
                                        >
                                            <h3 className="text-base font-semibold text-zinc-900 dark:text-white">
                                                {project.title}
                                            </h3>
                                            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                                {project.description}
                                            </p>
                                            {project.technologies && (
                                                <p className="mt-2 text-xs font-mono text-indigo-600 dark:text-indigo-400">
                                                    {project.technologies}
                                                </p>
                                            )}
                                            {project.link && (
                                                <a
                                                    href={project.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="mt-2 inline-block text-sm text-indigo-600 dark:text-indigo-400 hover:underline underline-offset-2"
                                                >
                                                    View project →
                                                </a>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </section>
    );
}

// Sub-component for contact items in sidebar
function ContactModern({ icon, value }: { icon: string; value: string }) {
    return (
        <div className="flex items-center gap-2 text-sm">
            <span className="text-base">{icon}</span>
            <span className="break-all">{value}</span>
        </div>
    );
}