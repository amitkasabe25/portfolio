"use client";

import {
    User,
    FileText,
    Briefcase,
    GraduationCap,
    FolderKanban,
    Code2,
    LayoutTemplate,
} from "lucide-react";
import { useResumeStore } from "../store/useResumeStore";

type Props = {
    activeSection: string;
    setActiveSection: (value: string) => void;
    sidebarCollapsed: boolean;
    setSidebarCollapsed: (value: boolean) => void;
};

const sections = [
    {
        id: "personal",
        label: "Personal Info",
        icon: User,
    },
    {
        id: "summary",
        label: "Summary",
        icon: FileText,
    },
    {
        id: "experience",
        label: "Experience",
        icon: Briefcase,
    },
    {
        id: "education",
        label: "Education",
        icon: GraduationCap,
    },
    {
        id: "projects",
        label: "Projects",
        icon: FolderKanban,
    },
    {
        id: "skills",
        label: "Skills",
        icon: Code2,
    },
];

const templates = [
    {
        id: "modern",
        label: "Modern",
    },
    {
        id: "minimal",
        label: "Minimal",
    },
    {
        id: "classic",
        label: "Classic",
    },
];

export default function ResumeSidebar({
    activeSection,
    setActiveSection,
    sidebarCollapsed,
    setSidebarCollapsed,
}: Props) {
    const { selectedTemplate, setSelectedTemplate } = useResumeStore();

    return (
        <aside
            className={`
        relative
        border-r
        border-zinc-200
        dark:border-zinc-800
        bg-white
        dark:bg-zinc-950
        p-5
        flex
        flex-col
        transition-all
        duration-300
        ${sidebarCollapsed ? "w-[90px]" : "w-[260px]"}
      `}
        >
            {/* Toggle Button */}
            <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="
          absolute
          top-5
          right-[-12px]
          w-6
          h-6
          rounded-full
          border
          border-zinc-200
          dark:border-zinc-700
          bg-white
          dark:bg-zinc-900
          flex
          items-center
          justify-center
          text-xs
          shadow-md
          z-10
        "
            >
                {sidebarCollapsed ? "→" : "←"}
            </button>

            {/* Logo */}
            <div className={`mb-10 ${sidebarCollapsed ? "items-center" : ""}`}>

                {!sidebarCollapsed && (
                    <>
                        <h1 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                            Resume Builder
                        </h1>
                        <p className="mt-1 text-sm text-zinc-500">Build visually</p>
                    </>
                )}
            </div>

            {/* Navigation */}
            <div className="space-y-2">
                {sections.map((section) => {
                    const Icon = section.icon;
                    return (
                        <button
                            key={section.id}
                            onClick={() => setActiveSection(section.id)}
                            title={sidebarCollapsed ? section.label : undefined} // Tooltip when collapsed
                            className={`
                w-full
                px-4 py-3
                rounded-2xl
                text-sm
                font-medium
                transition-all
                duration-300
                flex
                items-center
                gap-3
                ${sidebarCollapsed ? "justify-center" : "justify-start"}
                ${activeSection === section.id
                                    ? "bg-zinc-900 dark:bg-white text-white dark:text-black"
                                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                                }
              `}
                        >
                            <Icon size={20} strokeWidth={1.5} />
                            {!sidebarCollapsed && section.label}
                        </button>
                    );
                })}
            </div>

            {/* Template Section - Compact for collapsed mode */}
            <div className="mt-10">
                {!sidebarCollapsed ? (
                    <>
                        <h2 className="text-xs uppercase tracking-wider text-zinc-500 mb-4">
                            Templates
                        </h2>
                        <div className="space-y-2">
                            {templates.map((template) => (
                                <button
                                    key={template.id}
                                    onClick={() => setSelectedTemplate(template.id)}
                                    className={`w-full px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-300 text-left ${selectedTemplate === template.id
                                            ? "bg-primary text-white"
                                            : "border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                                        }`}
                                >
                                    {template.label}
                                </button>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center gap-2">
                        {templates.map((template) => (
                            <button
                                key={template.id}
                                onClick={() => setSelectedTemplate(template.id)}
                                title={template.label}
                                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${selectedTemplate === template.id
                                        ? "bg-primary text-white"
                                        : "border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                                    }`}
                            >
                                <LayoutTemplate size={18} />
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </aside>
    );
}