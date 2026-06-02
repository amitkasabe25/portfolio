'use client'

import { Mail, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

const Footer = () => {
    const navLinks = [
        { title: 'Resume Builder', href: '/resume-builder' },
        { title: 'Source Code', href: '#demo' },
    ]

    const socialLinks = [
        { name: 'Email', href: 'mailto:amit@example.com', icon: Mail },
    ]

    return (
        <footer
            className="
                relative
                border-t border-zinc-200/70 dark:border-zinc-800/70
                bg-white dark:bg-black
                overflow-hidden
                font-['DM_Sans',sans-serif]
            "
        >
            {/* Ambient Glow */}
            <div
                className="
                    absolute top-0 left-1/2 -translate-x-1/2
                    w-[400px] h-[300px]
                    bg-zinc-200/20 dark:bg-zinc-800/20
                    blur-3xl rounded-full pointer-events-none
                "
            />

            <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-12">

                {/* Top Section */}
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">

                    {/* Left — identity + tagline */}
                    <div className="max-w-xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div
                                className="
                                    w-10 h-10 rounded-xl
                                    bg-zinc-900 dark:bg-white
                                    text-white dark:text-black
                                    flex items-center justify-center
                                    font-bold text-xs shadow-sm shrink-0
                                "
                            >
                                AK
                            </div>
                            <div>
                                <h2
                                    className="
                                        text-base font-semibold tracking-tight
                                        text-zinc-900 dark:text-zinc-100
                                        font-['Playfair_Display',serif]
                                    "
                                >
                                    Amit Kasabe
                                </h2>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                    Developer • Designer • Builder
                                </p>
                            </div>
                        </div>

                        <h3
                            className="
                                text-2xl md:text-4xl leading-tight tracking-tight
                                font-semibold text-zinc-900 dark:text-zinc-100
                            "
                        >
                            Building digital experiences
                            that feel sharp, calm & human.
                        </h3>

                        <p className="mt-3 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 max-w-md">
                            I craft modern web experiences with thoughtful UI systems,
                            smooth interactions, and scalable engineering.
                        </p>
                    </div>

                    {/* Right — nav + social stacked neatly */}
                    <div className="flex flex-col gap-3 lg:items-end shrink-0">

                        {/* Nav links */}
                        <div className="flex flex-wrap gap-2">
                            {navLinks.map((item) => (
                                <Link
                                    key={item.title}
                                    href={item.href}
                                    className="
                                        group flex items-center gap-2
                                        px-4 py-2 rounded-xl
                                        border border-zinc-200 dark:border-zinc-800
                                        bg-white/60 dark:bg-zinc-950/60
                                        backdrop-blur-xl text-sm font-medium
                                        text-zinc-700 dark:text-zinc-300
                                        transition-all duration-300
                                        hover:border-zinc-400 dark:hover:border-zinc-600
                                        hover:text-zinc-900 dark:hover:text-white
                                        hover:-translate-y-0.5
                                    "
                                >
                                    <span className="text-zinc-400 text-xs transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                                        ↗
                                    </span>
                                    {item.title}
                                </Link>
                            ))}
                        </div>

                        {/* Social links */}
                        {socialLinks.map((item) => {
                            const Icon = item.icon
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="
                                        group flex items-center justify-between
                                        w-full lg:w-48
                                        px-4 py-3 rounded-xl
                                        border border-zinc-200 dark:border-zinc-800
                                        bg-white/50 dark:bg-zinc-950/50
                                        backdrop-blur-sm
                                        hover:bg-zinc-100 dark:hover:bg-zinc-900
                                        transition-all duration-300
                                    "
                                >
                                    <div className="flex items-center gap-2.5">
                                        <Icon size={16} className="text-zinc-700 dark:text-zinc-300" />
                                        <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                                            {item.name}
                                        </span>
                                    </div>
                                    <ArrowUpRight
                                        size={14}
                                        className="text-zinc-400 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                                    />
                                </Link>
                            )
                        })}
                    </div>
                </div>

                {/* Divider */}
                <div
                    className="
                        my-8 h-px
                        bg-gradient-to-r from-transparent via-zinc-300 dark:via-zinc-700 to-transparent
                    "
                />

                {/* Bottom */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        © 2026 Amit Kasabe. Crafted with precision.
                    </p>
                    <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        Available for freelance & collaborations
                    </div>
                </div>

            </div>
        </footer>
    )
}

export default Footer