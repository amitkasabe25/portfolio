import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function ResumeBuilderLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div
            className="
                min-h-screen
                bg-white dark:bg-black
                text-zinc-900 dark:text-zinc-100
                flex flex-col
            "
        >
            <Navbar />

            <main className="flex-1">
                {children}
            </main>

            <Footer />
        </div>
    )
}