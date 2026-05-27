'use client'

import React from 'react'
import FadeImage from './FadeImage'
import FeaturedCards from './FeaturedCard'
import {
    BookUser,
    MapPin,
    Mail,
    Phone,
    Calendar,
    Braces,
} from 'lucide-react'

const PHOTO_URL = '/1767367971817.png'

const stats = [
    {
        label: 'Years of Experience',
        value: '5+',
        icon: Calendar,
        sub: 'Active since 2019',
        trend: 'up',
    },
    {
        label: 'APIs Shipped',
        value: '50+',
        icon: Braces,
        sub: 'REST & GraphQL endpoints',
    },
]

const highlights = [
    { badge: 'DL', title: 'DigiLocker', desc: 'Gov-scale infra APIs' },
    { badge: 'UM', title: 'UMANG', desc: 'Citizen platform APIs' },
    { badge: 'OA', title: 'Online Gaming', desc: 'Regulatory authority' },
    { badge: 'ZT', title: 'Zero Trust', desc: 'Security architecture' },
    { badge: 'CI', title: 'CI/CD', desc: 'Pipeline automation' },
]

const tools = [
    'Laravel', 'Node.js', 'Python', 'React.js',
    'PostgreSQL', 'Redis', 'Docker', 'AWS',
    'Kafka', 'Swagger', 'OAuth', 'JWT',
]

const Hero = () => {
    return (
        <section className="relative overflow-hidden bg-white dark:bg-[#020617] min-h-screen text-zinc-900 dark:text-slate-100 font-sans transition-colors duration-300">
            {/* Glow orbs - only visible in dark mode */}
            <div className="pointer-events-none absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-0 dark:opacity-15 bg-sky-400 -top-48 -left-48 z-0 transition-opacity duration-300" />
            <div className="pointer-events-none absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-0 dark:opacity-15 bg-blue-600 -bottom-48 -right-48 z-0 transition-opacity duration-300" />

            <div className="relative z-10 max-w-[1400px] mx-auto px-5 py-7 pb-16">

                {/* Top bar */}
                <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
                    <div className="text-[11px] tracking-[0.22em] uppercase text-zinc-500 dark:text-slate-400 font-semibold">
                        Amit Kasabe • Senior API Engineer
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-zinc-600 dark:text-slate-400 border border-zinc-200 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-md rounded-full px-3.5 py-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
                        Available for engineering collaborations
                    </div>
                </div>

                {/* Main 3-column grid */}
                <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_220px] xl:grid-cols-[300px_1fr_240px] gap-5 items-start w-full">

                    {/* LEFT COLUMN */}
                    <div className="flex flex-col gap-3 min-w-0">

                        {/* Contact card */}
                        <div className="border border-zinc-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl p-4 hover:border-sky-400/50 dark:hover:border-sky-400/30 hover:shadow-lg hover:shadow-sky-400/10 hover:-translate-y-0.5 transition-all duration-200">
                            <div className="flex items-center gap-2 text-[10px] tracking-[0.14em] uppercase text-zinc-500 dark:text-slate-400 font-semibold mb-3">
                                <BookUser size={13} strokeWidth={2.5} /> Contact
                            </div>
                            <div className="flex flex-col">
                                {[
                                    { icon: MapPin, label: 'Base', value: 'Pune / New Delhi, India' },
                                    { icon: Mail, label: 'Email', value: 'amit.kasabe25@gmail.com' },
                                    { icon: Phone, label: 'Phone', value: '+91 8482991725' },
                                ].map(({ icon: Icon, label, value }, i, arr) => (
                                    <div
                                        key={label}
                                        className={`grid items-center gap-2 py-2 ${i < arr.length - 1 ? 'border-b border-zinc-200 dark:border-white/10' : ''
                                            }`}
                                        style={{ gridTemplateColumns: '16px 52px 1fr' }}
                                    >
                                        <Icon size={14} className="text-zinc-400 dark:text-slate-400" />
                                        <span className="text-[10px] uppercase tracking-wide text-zinc-400 dark:text-slate-500">
                                            {label}
                                        </span>
                                        <span className="text-[12px] text-zinc-800 dark:text-slate-100 truncate">
                                            {value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Availability card (moved from right column) */}
                        <div className="border border-zinc-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl p-4 hover:border-sky-400/50 dark:hover:border-sky-400/30 transition-all duration-200">
                            <div className="text-[10px] tracking-[0.12em] uppercase text-zinc-500 dark:text-slate-400 mb-3">Availability</div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
                                <span className="text-sm font-medium text-green-600 dark:text-green-400">Open to work</span>
                            </div>
                            <p className="text-[11px] text-zinc-500 dark:text-slate-500 leading-relaxed">
                                Available for full-time roles, consulting, and API architecture contracts.
                            </p>
                        </div>
                    </div>

                    {/* CENTER COLUMN */}
                    <div className="flex flex-col items-center justify-start relative text-center min-w-0 overflow-hidden">
                        {/* Giant watermark */}
                        <div
                            aria-hidden
                            className="absolute top-0 left-1/2 -translate-x-1/2 text-[clamp(5rem,15vw,11rem)] font-black tracking-tighter text-black/5 dark:text-white/[0.04] pointer-events-none select-none leading-none z-0 whitespace-nowrap"
                        >
                            AK
                        </div>

                        {/* Photo */}
                        <div className="relative z-10 mb-5" style={{ width: 'clamp(260px, 35%, 440px)' }}>
                            <div className="w-full aspect-[3/4] overflow-hidden rounded-2xl  ">
                                <FadeImage
                                    src={PHOTO_URL}
                                    alt="Amit Kasabe"
                                    className="w-full h-full object-cover object-top"
                                />
                            </div>
                            {/* subtle bottom fade on photo */}
                            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white dark:from-[#020617] to-transparent rounded-b-2xl pointer-events-none" />
                        </div>

                        {/* Name + title */}
                        <h1 className="relative z-10 text-[clamp(2.2rem,4.5vw,4.5rem)] leading-[0.92] tracking-tighter font-light mb-4 text-zinc-900 dark:text-slate-100">
                            Amit Kasabe
                            <br />
                            <em className="not-italic font-light text-sky-600 dark:text-sky-400">API Engineer</em>
                            <br />
                            <span className="font-light">& System Builder</span>
                        </h1>

                        <p className="relative z-10 max-w-[520px] text-[13px] leading-relaxed text-zinc-600 dark:text-slate-400">
                            Engineering scalable backend systems, secure citizen-scale APIs, and high-performance digital infrastructure powering real-world platforms.
                        </p>

                        {/* Divider */}
                        <div className="relative z-10 mt-6 w-12 h-px bg-sky-400/60 dark:bg-sky-400/40" />
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="flex flex-col gap-3 min-w-0">
                        {stats.map((stat) => {
                            const Icon = stat.icon
                            return (
                                <div
                                    key={stat.label}
                                    className="border border-zinc-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl p-4 hover:border-sky-400/50 dark:hover:border-sky-400/30 hover:shadow-lg hover:shadow-sky-400/10 hover:-translate-y-0.5 transition-all duration-200"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="text-[10px] tracking-[0.12em] uppercase text-zinc-500 dark:text-slate-400 leading-snug pr-2">
                                            {stat.label}
                                        </div>
                                        <Icon size={16} className="text-sky-500 dark:text-sky-400/70 shrink-0 mt-0.5" />
                                    </div>
                                    <div className="text-[2.4rem] font-semibold tracking-tighter leading-none my-2 text-zinc-900 dark:text-slate-100">
                                        {stat.value}
                                    </div>
                                    <div className="flex items-center gap-1 text-[10px] text-zinc-500 dark:text-slate-400">
                                        {stat.trend === 'up' && <span className="text-green-600 dark:text-green-400">↑</span>}
                                        {stat.sub}
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                </div>

                 <FeaturedCards />

            </div>
        </section>
    )
}

export default Hero