'use client'
import { Trash2, Plus } from 'lucide-react'
import { Input } from '@/components/ui/input'
type Props = {
    resumeData: any
    setResumeData: any
}

export default function ProjectsSection({
    resumeData,
    setResumeData,
}: Props) {
    const projects = resumeData.projects || []

    const addProject = () => {
        const newProject = {
            title: '',
            description: '',
            technologies: '',
            link: '',
        }
        setResumeData({
            ...resumeData,
            projects: [...projects, newProject],
        })
    }

    const removeProject = (index: number) => {
        setResumeData({
            ...resumeData,
            projects: projects.filter((_: any, i: number) => i !== index),
        })
    }

    const updateProject = (index: number, field: string, value: any) => {
        const updated = [...projects]
        updated[index] = { ...updated[index], [field]: value }
        setResumeData({
            ...resumeData,
            projects: updated,
        })
    }

    return (
        <div className="max-w-2xl">
            <h2
                className="
                    text-3xl
                    font-bold
                    tracking-tight
                    text-zinc-900
                    dark:text-zinc-100
                "
            >
                Projects
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
                Add your notable projects.
            </p>

            <div className="mt-10 space-y-6">
                {projects.map((project: any, idx: number) => (
                    <div
                        key={idx}
                        className="
                            p-6
                            rounded-3xl
                            border
                            border-zinc-200
                            dark:border-zinc-800
                            bg-zinc-50
                            dark:bg-zinc-950
                            space-y-6
                        "
                    >
                        {/* Header with delete button */}
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold">
                                Project {idx + 1}
                            </h3>
                            <button
                                onClick={() => removeProject(idx)}
                                className="
                                    p-2
                                    rounded-lg
                                    hover:bg-red-100
                                    dark:hover:bg-red-950
                                    text-red-600
                                    transition-colors
                                "
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>

                        {/* Project Title */}
                        <div>
                            <label
                                className="
                                    text-sm
                                    font-medium
                                    text-zinc-700
                                    dark:text-zinc-300
                                "
                            >
                                Project Title
                            </label>

                            <Input
                                type="text"
                                value={project.title}
                                onChange={(e) =>
                                    updateProject(idx, 'title', e.target.value)
                                }
                                placeholder="Project Name"
                                
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label
                                className="
                                    text-sm
                                    font-medium
                                    text-zinc-700
                                    dark:text-zinc-300
                                "
                            >
                                Description
                            </label>

                            <textarea
                                value={project.description}
                                onChange={(e) =>
                                    updateProject(idx, 'description', e.target.value)
                                }
                                placeholder="Describe what this project does..."
                                rows={4}
                                className="
                                    mt-2
                                    w-full
                                    px-4 py-3
                                    rounded-2xl
                                    border
                                    border-zinc-200
                                    dark:border-zinc-800
                                    bg-white
                                    dark:bg-black
                                    outline-none
                                    resize-none
                                "
                            />
                        </div>

                        {/* Technologies */}
                        <div>
                            <label
                                className="
                                    text-sm
                                    font-medium
                                    text-zinc-700
                                    dark:text-zinc-300
                                "
                            >
                                Technologies Used
                            </label>

                            <Input
                                type="text"
                                value={project.technologies}
                                onChange={(e) =>
                                    updateProject(idx, 'technologies', e.target.value)
                                }
                                placeholder="React, TypeScript, Tailwind..."
                               
                            />
                        </div>

                        {/* Link */}
                        <div>
                            <label
                                className="
                                    text-sm
                                    font-medium
                                    text-zinc-700
                                    dark:text-zinc-300
                                "
                            >
                                Project Link
                            </label>

                            <Input
                                type="url"
                                value={project.link}
                                onChange={(e) =>
                                    updateProject(idx, 'link', e.target.value)
                                }
                                placeholder="https://project.com"
                               
                            />
                        </div>
                    </div>
                ))}

                {/* Add Project Button */}
                <button
                    onClick={addProject}
                    className="
                        w-full
                        py-3
                        px-4
                        rounded-2xl
                        border-2
                        border-dashed
                        border-zinc-300
                        dark:border-zinc-700
                        bg-transparent
                        hover:bg-zinc-100
                        dark:hover:bg-zinc-900
                        transition-colors
                        flex
                        items-center
                        justify-center
                        gap-2
                        text-zinc-700
                        dark:text-zinc-300
                        font-medium
                    "
                >
                    <Plus size={20} />
                    Add Project
                </button>
            </div>
        </div>
    )
}