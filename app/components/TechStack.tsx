'use client'

import React, { useState } from 'react'
import Heading from './Heading'

type Category = {
    title: string
    icon: string
    description: string
    technologies: string[]
}

const stackCategories: Category[] = [
    {
        title: 'Backend engineering',
        icon: 'server',
        description:
            'Scalable APIs, distributed systems, and high-performance architectures.',
        technologies: [
            'Laravel',
            'Node.js',
            'Express.js',
            'PHP',
            'Python',
            'REST APIs',
            'GraphQL',
            'Microservices',
        ],
    },
    {
        title: 'Frontend systems',
        icon: 'layout-2',
        description:
            'Modern, responsive UI with production-ready component systems.',
        technologies: [
            'React.js',
            'Next.js',
            'TypeScript',
            'Tailwind CSS',
            'Material UI',
            'Framer Motion',
        ],
    },
    {
        title: 'Security & auth',
        icon: 'shield-lock',
        description:
            'Secure auth flows and production-grade API protection.',
        technologies: [
            'OAuth 2.0',
            'JWT',
            'SSL/TLS',
            'RBAC',
            'Zero Trust',
            'OWASP',
        ],
    },
    {
        title: 'Database & caching',
        icon: 'database',
        description:
            'Optimised schemas and fast caching strategies for scale.',
        technologies: [
            'PostgreSQL',
            'MySQL',
            'MongoDB',
            'Redis',
            'Query optimisation',
            'Indexing',
        ],
    },
    {
        title: 'DevOps & cloud',
        icon: 'cloud',
        description:
            'Automated deployments, observability, and infrastructure reliability.',
        technologies: [
            'Docker',
            'CI/CD',
            'AWS',
            'Azure',
            'Prometheus',
            'Apache Kafka',
        ],
    },
    {
        title: 'Testing & tooling',
        icon: 'test-pipe',
        description:
            'Reliability through automation, testing, and engineering workflows.',
        technologies: [
            'PHPUnit',
            'Jest',
            'PyTest',
            'Swagger',
            'Postman',
            'Git',
        ],
    },
]

const iconPaths: Record<string, React.ReactNode> = {
    server: (
        <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect x="2" y="2" width="20" height="8" rx="2" />
            <rect x="2" y="14" width="20" height="8" rx="2" />
            <line x1="6" y1="6" x2="6.01" y2="6" />
            <line x1="6" y1="18" x2="6.01" y2="18" />
        </svg>
    ),

    'layout-2': (
        <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect x="3" y="3" width="7" height="18" rx="1" />
            <rect x="14" y="3" width="7" height="10" rx="1" />
            <rect x="14" y="17" width="7" height="4" rx="1" />
        </svg>
    ),

    'shield-lock': (
        <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 3l8 4v5c0 5-3.5 8.5-8 10C7.5 20.5 4 17 4 12V7l8-4z" />
            <circle cx="12" cy="13" r="1.5" />
            <line x1="12" y1="14.5" x2="12" y2="16" />
        </svg>
    ),

    database: (
        <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <ellipse cx="12" cy="5" rx="9" ry="3" />
            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
    ),

    cloud: (
        <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
        </svg>
    ),

    'test-pipe': (
        <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M14.5 2H9.5l-5 12a5 5 0 0 0 9.17 3.97A5 5 0 0 0 19.5 14L14.5 2z" />
            <line x1="8.5" y1="9" x2="15.5" y2="9" />
        </svg>
    ),
}

const TechStack: React.FC = () => {
    const [hovered, setHovered] = useState<number | null>(null)

    return (
        <section className="py-[100px] px-6 font-['DM_Sans',system-ui,sans-serif] bg-white dark:bg-[#050816] transition-all duration-250 ease">
            <div className="max-w-[1180px] mx-auto">
                <Heading
                    title="Engineering Stack"
                    subtitle={
                        <>
                            Technologies <em className="text-sky-600 dark:text-sky-400 italic">I build</em>
                            <br />
                            with
                        </>
                    }
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-zinc-200 dark:border-white/10 backdrop-blur-[10px]">
                    {stackCategories.map((cat, i) => (
                        <div
                            key={i}
                            className={`relative overflow-hidden border-r border-b border-zinc-200 dark:border-white/10 p-8 bg-white dark:bg-[#0f172a] transition-all duration-250 ease cursor-default ${
                                hovered === i ? 'bg-zinc-50 dark:bg-[#162033] -translate-y-1' : ''
                            }`}
                            onMouseEnter={() => setHovered(i)}
                            onMouseLeave={() => setHovered(null)}
                        >
                            <div className={`absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.12),transparent_45%)] transition-opacity duration-250 ease pointer-events-none ${
                                hovered === i ? 'opacity-100' : 'opacity-0'
                            }`} />

                            <div className={`w-[42px] h-[42px] border border-zinc-200 dark:border-white/10 rounded-xl flex items-center justify-center text-zinc-600 dark:text-slate-400 mb-6 bg-white dark:bg-white/5 transition-all duration-250 ease ${
                                hovered === i ? 'border-sky-500 dark:border-sky-400 text-sky-500 dark:text-sky-400 scale-105' : ''
                            }`}>
                                {iconPaths[cat.icon]}
                            </div>

                            <h3 className="text-base font-medium text-zinc-900 dark:text-slate-100 m-0 mb-2.5 tracking-[-0.02em]">
                                {cat.title}
                            </h3>

                            <p className="text-sm text-zinc-600 dark:text-slate-400 leading-[1.7] m-0 mb-6 font-light">
                                {cat.description}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {cat.technologies.map((tech, j) => (
                                    <span
                                        key={j}
                                        className={`text-[11px] text-zinc-600 dark:text-slate-400 border border-zinc-200 dark:border-white/10 rounded-full px-3 py-1.5 bg-transparent font-normal tracking-[0.02em] transition-all duration-200 ease ${
                                            hovered === i ? 'border-zinc-400 dark:border-white/20 bg-zinc-100 dark:bg-white/10 text-zinc-900 dark:text-slate-100' : ''
                                        }`}
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default TechStack