'use client'

import React, { useEffect, useState } from 'react'

const Navbar = () => {
    const [activeLink, setActiveLink] = useState<string>('Home')
    const [mobileOpen, setMobileOpen] = useState<boolean>(false)
    const [darkMode, setDarkMode] = useState<boolean>(false)

    const links: { label: string; id: string }[] = [
        { label: 'Home', id: 'home' },
        { label: 'About', id: 'journey' },
        { label: 'Work', id: 'work' },
    ]

    // Detect system theme on first load
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme')

        if (savedTheme === 'dark') {
            setDarkMode(true)
            document.documentElement.classList.add('dark')
        } else if (savedTheme === 'light') {
            setDarkMode(false)
            document.documentElement.classList.remove('dark')
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

            setDarkMode(prefersDark)

            if (prefersDark) {
                document.documentElement.classList.add('dark')
            }
        }
    }, [])

    // Toggle dark mode
    const toggleTheme = () => {
        const newTheme = !darkMode

        setDarkMode(newTheme)

        if (newTheme) {
            document.documentElement.classList.add('dark')
            localStorage.setItem('theme', 'dark')
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.setItem('theme', 'light')
        }
    }

    // Active section observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.id
                        const found = links.find((l) => l.id === id)

                        if (found) {
                            setActiveLink(found.label)
                        }
                    }
                })
            },
            {
                root: null,
                rootMargin: '-40% 0px -40% 0px',
                threshold: 0,
            }
        )

        links.forEach((l) => {
            const el = document.getElementById(l.id)

            if (el) observer.observe(el)
        })

        return () => observer.disconnect()
    }, [])

    const scrollToSection = (id: string, label: string) => {
        setActiveLink(label)

        const el = document.getElementById(id)

        if (el) {
            el.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            })
        }
    }

    return (
        <>
            <nav
                className="
                    sticky top-0 z-50
                    h-16
                    flex items-center justify-between
                    px-5 md:px-10
                    border-b
                    border-zinc-200/70 dark:border-zinc-800/70
                    bg-white/80 dark:bg-black/70
                    backdrop-blur-xl
                    transition-all duration-300
                    font-['DM_Sans',sans-serif]
                "
            >
                {/* Logo */}
                <a
                    href="#"
                    className="flex items-center gap-3 no-underline group"
                >
                    <div
                        className="
                            w-10 h-10
                            rounded-xl
                            bg-zinc-900 dark:bg-white
                            text-white dark:text-black
                            flex items-center justify-center
                            font-bold text-sm
                            shadow-sm
                            transition-all duration-300
                            group-hover:scale-105 group-hover:-rotate-3
                        "
                    >
                        AK
                    </div>

                    <span
                        className="
                            font-['Playfair_Display',serif]
                            font-semibold
                            text-[18px]
                            tracking-tight
                            text-zinc-900 dark:text-zinc-100
                            transition-colors duration-300
                        "
                    >
                        Amit Kasabe
                    </span>
                </a>

                {/* Desktop Nav */}
                <ul className="hidden md:flex items-center gap-1 list-none m-0 p-0">
                    {links.map((link) => (
                        <li key={link.id}>
                            <a
                                href={`#${link.id}`}
                                onClick={(e) => {
                                    e.preventDefault()
                                    scrollToSection(link.id, link.label)
                                }}
                                className={`
                                    relative
                                    px-4 py-2
                                    rounded-xl
                                    text-sm font-medium
                                    no-underline
                                    transition-all duration-300
                                    ${
                                        activeLink === link.label
                                            ? `
                                                bg-zinc-900 dark:bg-white
                                                text-white dark:text-black
                                                shadow-sm
                                              `
                                            : `
                                                text-zinc-600 dark:text-zinc-400
                                                hover:text-zinc-900 dark:hover:text-white
                                                hover:bg-zinc-100 dark:hover:bg-zinc-900
                                              `
                                    }
                                `}
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Right Actions */}
                <div className="hidden md:flex items-center gap-3">
                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="
                            w-11 h-11
                            rounded-xl
                            border
                            border-zinc-200 dark:border-zinc-800
                            bg-white dark:bg-zinc-950
                            hover:bg-zinc-100 dark:hover:bg-zinc-900
                            text-lg
                            flex items-center justify-center
                            transition-all duration-300
                            text-zinc-800 dark:text-zinc-100
                        "
                    >
                        {darkMode ? '☀️' : '🌙'}
                    </button>

                    {/* Contact Button */}
                    <a
                        href="#contact"
                        onClick={(e) => {
                            e.preventDefault()
                            scrollToSection('contact', 'Contact')
                        }}
                        className="
                            px-5 py-2
                            rounded-xl
                            bg-zinc-900 dark:bg-white
                            text-white dark:text-black
                            text-sm font-medium
                            no-underline
                            shadow-sm
                            hover:scale-[1.03]
                            transition-all duration-300
                        "
                    >
                        Contact
                    </a>
                </div>

                {/* Mobile Controls */}
                <div className="md:hidden flex items-center gap-2">
                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="
                            w-10 h-10
                            rounded-xl
                            border
                            border-zinc-200 dark:border-zinc-800
                            bg-white dark:bg-zinc-950
                            flex items-center justify-center
                            text-zinc-800 dark:text-zinc-100
                            transition-all duration-300
                        "
                    >
                        {darkMode ? '☀️' : '🌙'}
                    </button>

                    {/* Menu Toggle */}
                    <button
                        className="
                            w-10 h-10
                            rounded-xl
                            border
                            border-zinc-200 dark:border-zinc-800
                            bg-white dark:bg-zinc-950
                            text-zinc-900 dark:text-white
                            flex items-center justify-center
                            transition-all duration-300
                        "
                        onClick={() => setMobileOpen((prev) => !prev)}
                    >
                        {mobileOpen ? '✕' : '☰'}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            {mobileOpen && (
                <nav
                    className="
                        md:hidden
                        px-5 py-4
                        flex flex-col gap-2
                        border-b
                        border-zinc-200 dark:border-zinc-800
                        bg-white dark:bg-black
                        transition-all duration-300
                    "
                >
                    {links.map((l) => (
                        <a
                            key={l.id}
                            href={`#${l.id}`}
                            onClick={(e) => {
                                e.preventDefault()

                                setMobileOpen(false)
                                scrollToSection(l.id, l.label)
                            }}
                            className={`
                                px-4 py-3
                                rounded-xl
                                text-sm font-medium
                                no-underline
                                transition-all duration-300
                                ${
                                    activeLink === l.label
                                        ? `
                                            bg-zinc-900 dark:bg-white
                                            text-white dark:text-black
                                          `
                                        : `
                                            text-zinc-600 dark:text-zinc-400
                                            hover:bg-zinc-100 dark:hover:bg-zinc-900
                                            hover:text-zinc-900 dark:hover:text-white
                                          `
                                }
                            `}
                        >
                            {l.label}
                        </a>
                    ))}

                    <div
                        className="
                            mt-2
                            flex items-center gap-2
                            px-4 py-3
                            rounded-xl
                            border
                            border-zinc-200 dark:border-zinc-800
                            text-sm font-medium
                            text-zinc-700 dark:text-zinc-300
                        "
                    >
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        Available for work
                    </div>
                </nav>
            )}
        </>
    )
}

export default Navbar