'use client'

import { useState } from 'react'
import { defaultResumeData } from './data/defaultResumeData'

import ResumeSidebar from './components/ResumeSidebar'
import ResumeEditor from './components/ResumeEditor'
import ResumePreview from './components/ResumePreview'

export default function ResumeBuilderPage() {
    const [activeSection, setActiveSection] =
        useState('personal')
    const [sidebarCollapsed, setSidebarCollapsed] =
    useState(false)
    const [resumeData, setResumeData] = useState(defaultResumeData)

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