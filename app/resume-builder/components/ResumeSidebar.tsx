type Props = {
    activeSection: string
    setActiveSection: (value: string) => void
    sidebarCollapsed: boolean
    setSidebarCollapsed: (value: boolean) => void
}

const sections = [
    {
        id: 'personal',
        label: 'Personal Info',
        short: 'P',
    },
    {
        id: 'summary',
        label: 'Summary',
        short: 'S',
    },
    {
        id: 'experience',
        label: 'Experience',
        short: 'X',
    },
    {
        id: 'education',
        label: 'Education',
        short: 'E',
    },
    {
        id: 'projects',
        label: 'Projects',
        short: 'O',
    },
    {
        id: 'skills',
        label: 'Skills',
        short: 'T',
    },
]

export default function ResumeSidebar({
    activeSection,
    setActiveSection,
    sidebarCollapsed,
    setSidebarCollapsed,
}: Props) {
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

                ${
                    sidebarCollapsed
                        ? 'w-[90px]'
                        : 'w-[260px]'
                }
            `}
        >
            {/* Toggle Button */}
            <button
                onClick={() =>
                    setSidebarCollapsed(
                        !sidebarCollapsed
                    )
                }
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
                {sidebarCollapsed ? '→' : '←'}
            </button>

            {/* Logo */}
            <div
                className={`
                    mb-10
                    ${
                        sidebarCollapsed
                            ? 'items-center'
                            : ''
                    }
                `}
            >
                <div
                    className="
                        w-11 h-11
                        rounded-2xl
                        bg-zinc-900
                        dark:bg-white
                        text-white
                        dark:text-black
                        flex
                        items-center
                        justify-center
                        font-bold
                        text-sm
                    "
                >
                    AK
                </div>

                {!sidebarCollapsed && (
                    <>
                        <h1
                            className="
                                mt-4
                                text-lg
                                font-semibold
                                text-zinc-900
                                dark:text-zinc-100
                            "
                        >
                            Resume Builder
                        </h1>

                        <p
                            className="
                                mt-1
                                text-sm
                                text-zinc-500
                            "
                        >
                            Build visually
                        </p>
                    </>
                )}
            </div>

            {/* Navigation */}
            <div className="space-y-2">
                {sections.map((section) => (
                    <button
                        key={section.id}
                        onClick={() =>
                            setActiveSection(section.id)
                        }
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

                            ${
                                sidebarCollapsed
                                    ? 'justify-center'
                                    : 'justify-start'
                            }

                            ${
                                activeSection === section.id
                                    ? `
                                        bg-zinc-900
                                        dark:bg-white
                                        text-white
                                        dark:text-black
                                      `
                                    : `
                                        text-zinc-600
                                        dark:text-zinc-400
                                        hover:bg-zinc-100
                                        dark:hover:bg-zinc-900
                                      `
                            }
                        `}
                    >
                        {sidebarCollapsed
                            ? section.short
                            : section.label}
                    </button>
                ))}
            </div>
        </aside>
    )
}