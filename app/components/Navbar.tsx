'use client'

import React, { useEffect, useState } from 'react'

const Navbar = () => {
    const [activeLink, setActiveLink] = useState<string>('Home')
    const [mobileOpen, setMobileOpen] = useState<boolean>(false)

    const links: { label: string; id: string }[] = [
        { label: 'Home', id: 'home' },
        { label: 'About', id: 'journey' },
        { label: 'Work', id: 'work' },
        { label: 'Contact', id: 'contact' },
    ]

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.id
                        const found = links.find((l) => l.id === id)
                        if (found) setActiveLink(found.label)
                    }
                })
            },
            { root: null, rootMargin: '-40% 0px -40% 0px', threshold: 0 }
        )

        links.forEach((l) => {
            const el = document.getElementById(l.id)
            if (el) observer.observe(el)
        })

        return () => observer.disconnect()
    }, [])

    return (
        <>
            <nav className="sticky top-0 z-50 flex items-center justify-between px-10 h-16 border-b border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-black/90 backdrop-blur-sm font-['DM_Sans',sans-serif] transition-colors duration-300">

                <a href="#" className="flex items-center gap-2.5 group no-underline">
                    <div className="w-9 h-9 rounded-lg bg-gray-900 dark:bg-white flex items-center justify-center text-white dark:text-black font-bold text-sm font-serif transition-transform group-hover:-rotate-3 group-hover:scale-105">
                        AK
                    </div>

                    <span className="font-['Playfair_Display',serif] font-bold text-[17px] text-gray-900 dark:text-white">
                        Amit Kasabe
                    </span>
                </a>

                <ul className="hidden md:flex items-center gap-0.5 list-none m-0 p-0">
                    {links.map((link) => (
                        <li key={link.id}>
                            <a
                                href={`#${link.id}`}
                                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                                    e.preventDefault()
                                    setActiveLink(link.label)
                                    const el = document.getElementById(link.id)
                                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                                }}
                                className={`relative px-3.5 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 no-underline
                ${activeLink === link.label
                                        ? 'text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-900'
                                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-900'
                                    }`}
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="hidden md:flex items-center gap-2.5">
                    <a
                        href="#"
                        className="flex items-center gap-1.5 px-4 py-1.5 text-[13px] font-medium border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-all no-underline text-gray-800 dark:text-gray-200"
                    >
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        Available for work
                    </a>

                    <a
                        href="#contact"
                        onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                            e.preventDefault()
                            setActiveLink('Contact')
                            const el = document.getElementById('contact')
                            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                        }}
                        className="flex items-center gap-1.5 px-4 py-1.5 text-[13px] font-medium border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-all no-underline text-gray-800 dark:text-gray-200"
                    >
                        Contact
                    </a>
                </div>

                <button
                    className="md:hidden border border-gray-200 dark:border-gray-700 rounded-lg p-1.5 text-gray-900 dark:text-white"
                    onClick={() => setMobileOpen((prev: boolean) => !prev)}
                >
                    {mobileOpen ? '✕' : '☰'}
                </button>
            </nav>

            {mobileOpen && (
                <nav className="md:hidden flex flex-col bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 px-6 py-3 gap-1 transition-colors duration-300">
                    {links.map((l) => (
                        <a
                            key={l.id}
                            href={`#${l.id}`}
                            onClick={(e) => {
                                e.preventDefault()
                                setMobileOpen(false)
                                setActiveLink(l.label)
                                const el = document.getElementById(l.id)
                                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                            }}
                            className="py-2 px-2.5 text-[15px] font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg no-underline transition-all"
                        >
                            {l.label}
                        </a>
                    ))}
                </nav>
            )}
        </>
    )
}

export default Navbar