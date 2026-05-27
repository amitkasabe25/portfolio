'use client'
import React from 'react'
import Heading from './Heading'
import { Badge } from '@/components/ui/badge'

type Journey = {
    year?: string | number
    badge?: string
    company?: string
    role?: string
    date?: string
    description?: string
    stack?: string[]
}

const JourneyClient = ({ journeys }: { journeys: Journey[] }) => {
    return (
        <section id="journey" className="relative overflow-hidden py-5 px-6 bg-white dark:bg-[#050816] text-zinc-900 dark:text-white transition-colors duration-300">
            {/* subtle gradient backdrop */}
            <div className="absolute inset-0 pointer-events-none -z-10 bg-gradient-to-r from-zinc-100 dark:from-[#071026] via-zinc-50 dark:via-[#071433] to-white dark:to-[#050816] opacity-60 dark:opacity-100" />
            
            {/* Gradient Glow from Top Right - only visible in dark mode */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-sky-500/15 via-blue-500/8 to-transparent blur-[120px] opacity-0 dark:opacity-100 -z-0 transition-opacity duration-300" />
            
            {/* Secondary subtle glow - only dark */}
            <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-gradient-to-bl from-indigo-500/10 to-transparent blur-[100px] opacity-0 dark:opacity-100 -z-0 transition-opacity duration-300" />

            {/* Grid pattern overlay - lighter in light mode, subtle in dark */}
            <div 
                className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none -z-0"
                style={{
                    maskImage: 'radial-gradient(circle at center, black, transparent 85%)',
                    WebkitMaskImage: 'radial-gradient(circle at center, black, transparent 85%)'
                }}
            />

            <div className="max-w-[1200px] mx-auto relative z-[2]">
                <Heading
                    title="My Journey"
                    subtitle={
                        <>
                            My Software Development <em className="text-sky-600 dark:text-sky-400 italic">Career</em>
                            <br />
                            Journey
                        </>
                    }
                />

                <div className="relative mt-[60px] before:content-[''] before:absolute before:left-1/2 before:top-0 before:w-px before:h-full before:bg-gradient-to-b before:from-transparent before:via-sky-400/30 before:via-sky-400/40 before:to-transparent before:-translate-x-1/2 md:before:block before:hidden">
                    {journeys.map((item, index) => (
                        <div
                            key={index}
                            className={`
                                relative w-full md:w-1/2 px-0 md:px-10 mb-[70px] 
                                animate-[fadeSlideUp_0.6s_ease_forwards] opacity-0
                                ${index % 2 === 0 ? 'md:left-0 md:pr-[60px]' : 'md:left-1/2 md:pl-[60px]'}
                                ${index === 0 ? 'delay-[0.1s]' : index === 1 ? 'delay-[0.2s]' : index === 2 ? 'delay-[0.3s]' : index === 3 ? 'delay-[0.4s]' : 'delay-[0.5s]'}
                            `}
                        >
                            {/* Timeline dot - adaptive color */}
                            <div className={`
                                absolute top-8 w-3.5 h-3.5 bg-sky-500 dark:bg-sky-400 rounded-full 
                                shadow-[0_0_0_4px_rgba(14,165,233,0.2),0_0_0_8px_rgba(14,165,233,0.08)] dark:shadow-[0_0_0_4px_rgba(56,189,248,0.12),0_0_0_8px_rgba(56,189,248,0.04)] z-[2]
                                ${index % 2 === 0 ? 'md:-right-[7px]' : 'md:-left-[7px]'}
                                left-[17px] md:left-auto
                            `} />

                            {/* Card */}
                            <div className="relative z-10 bg-white/90 dark:bg-[#0f172a]/80 border border-zinc-200 dark:border-white/10 rounded-2xl p-[28px_32px] transition-all duration-350 ease backdrop-blur-sm
                                            hover:-translate-y-2 hover:border-sky-400/50 dark:hover:border-sky-400/35 hover:shadow-[0_25px_60px_-20px_rgba(14,165,233,0.3)] dark:hover:shadow-[0_25px_60px_-20px_rgba(56,189,248,0.35)] hover:bg-white dark:hover:bg-[#131d36]/90">
                                
                                {/* Connecting line from dot to card (desktop) */}
                                <div className={`hidden md:block absolute top-8 w-[30px] h-px bg-gradient-to-r from-sky-500 dark:from-sky-400 to-transparent opacity-40
                                                ${index % 2 === 0 ? 'right-[-31px]' : 'left-[-31px] rotate-180'}`} />

                                {/* Large background year number - lighter in light mode */}
                                <div className="absolute bottom-4 right-6 text-[72px] md:text-[96px] font-extrabold bg-gradient-to-br from-sky-400 to-sky-600 dark:from-sky-400 dark:to-sky-600 bg-clip-text text-transparent leading-[0.8] pointer-events-none tracking-[-0.03em] tabular-nums md:right-6 opacity-10 dark:opacity-20 z-0 select-none">
                                    {item.year}
                                </div>

                                {/* Badge - shadcn Badge with theme overrides */}
                                <Badge 
                                    className="mb-[18px] px-3.5 py-1.5 rounded-full bg-sky-100 dark:bg-sky-400/10 text-sky-700 dark:text-sky-400 text-[11px] font-semibold tracking-[0.08em] uppercase border border-sky-300 dark:border-sky-400/20 hover:bg-sky-200 dark:hover:bg-sky-400/10"
                                >
                                    {item.badge}
                                </Badge>

                                <div className="text-2xl md:text-[26px] font-bold mb-2 relative z-[2] leading-[1.3] pr-[80px] text-zinc-900 dark:text-white">
                                    {item.company}
                                </div>

                                <div className="text-sky-600 dark:text-sky-400 font-semibold mb-2 text-sm">
                                    {item.role}
                                </div>

                                <div className="text-zinc-500 dark:text-gray-400 text-[13px] mb-5 tracking-[0.02em]">
                                    {item.date}
                                </div>

                                <div className="text-zinc-700 dark:text-gray-300 leading-[1.7] text-sm mb-[22px]">
                                    {item.description}
                                </div>

                                <div className="flex flex-wrap gap-2.5">
                                    {item.stack?.map((tech: string, idx: number) => (
                                        <div
                                            key={idx}
                                            className="px-3.5 py-2 rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-300 dark:border-white/10 text-zinc-700 dark:text-gray-300 text-xs font-medium transition-all duration-250 ease cursor-default
                                                       hover:border-sky-400/60 dark:hover:border-sky-400/40 hover:text-sky-700 dark:hover:text-white hover:-translate-y-0.5 hover:bg-sky-50 dark:hover:bg-sky-400/10"
                                        >
                                            {tech}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Keyframes for fadeSlideUp animation */}
            <style>{`
                @keyframes fadeSlideUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </section>
    )
}

export default JourneyClient