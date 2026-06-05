'use client'

import { useEffect, useState } from 'react'
import { defaultResumeData } from './data/defaultResumeData'

import ResumeSidebar from './components/ResumeSidebar'
import ResumeEditor from './components/ResumeEditor'
import ResumePreview from './components/ResumePreview'

export default function ResumeBuilderPage() {
    const [activeSection, setActiveSection] =
        useState('personal')

    const [sidebarCollapsed, setSidebarCollapsed] =
        useState(true)

    const [resumeData, setResumeData] =
        useState(defaultResumeData)

    const [isLoaded, setIsLoaded] =
        useState(false)

    // Load localStorage AFTER component mounts
    useEffect(() => {
        const savedData =
            localStorage.getItem('resumeData')

        if (savedData) {
            setResumeData(JSON.parse(savedData))
        }

        setIsLoaded(true)
    }, [])

    // Save whenever data changes
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem(
                'resumeData',
                JSON.stringify(resumeData)
            )
        }
    }, [resumeData, isLoaded])

    // Prevent hydration mismatch
    if (!isLoaded) {
        return null
    }

    return (
        <div
            className="
                h-screen
                overflow-hidden
                bg-zinc-50
                dark:bg-black
                flex
            "
        >
            {/* Sidebar */}
            <ResumeSidebar
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                sidebarCollapsed={sidebarCollapsed}
                setSidebarCollapsed={setSidebarCollapsed}
            />

            {/* Editor */}
            <ResumeEditor
                activeSection={activeSection}
                resumeData={resumeData}
                setResumeData={setResumeData}
            />

            {/* Preview */}
            <ResumePreview
                resumeData={resumeData}
            />
        </div>
    )
}