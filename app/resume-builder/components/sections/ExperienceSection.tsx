'use client'
import {Input} from '@/components/ui/input'
import { Trash2, Plus } from 'lucide-react'

type Props = {
    resumeData: any
    setResumeData: any
}

export default function ExperienceSection({
    resumeData,
    setResumeData,
}: Props) {
    const experience = resumeData.experience || []

    const addExperience = () => {
        const newExp = {
            company: '',
            title: '',
            date: '',
            points: [],
        }
        setResumeData({
            ...resumeData,
            experience: [...experience, newExp],
        })
    }

    const removeExperience = (index: number) => {
        setResumeData({
            ...resumeData,
            experience: experience.filter((_: any, i: number) => i !== index),
        })
    }

    const updateExperience = (index: number, field: string, value: any) => {
        const updated = [...experience]
        updated[index] = { ...updated[index], [field]: value }
        setResumeData({
            ...resumeData,
            experience: updated,
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
                Experience
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
                Add your professional experience.
            </p>

            <div className="mt-10 space-y-6">
                {experience.map((exp: any, idx: number) => (
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
                                Experience {idx + 1}
                            </h3>
                            <button
                                onClick={() => removeExperience(idx)}
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

                        {/* Company Name */}
                        <div>
                            <label
                                className="
                                    text-sm
                                    font-medium
                                    text-zinc-700
                                    dark:text-zinc-300
                                "
                            >
                                Company Name
                            </label>

                            <Input
                                type="text"
                                value={exp.company}
                                onChange={(e) =>
                                    updateExperience(idx, 'company', e.target.value)
                                }
                                placeholder="Company Name"
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
                                "
                            />
                        </div>

                        {/* Job Title */}
                        <div>
                            <label
                                className="
                                    text-sm
                                    font-medium
                                    text-zinc-700
                                    dark:text-zinc-300
                                "
                            >
                                Job Title
                            </label>

                            <Input  
                                type="text"
                                value={exp.title}
                                onChange={(e) =>
                                    updateExperience(idx, 'title', e.target.value)
                                }
                                placeholder="Job Title"
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
                                "
                            />
                        </div>

                        {/* Date */}
                        <div>
                            <label
                                className="
                                    text-sm
                                    font-medium
                                    text-zinc-700
                                    dark:text-zinc-300
                                "
                            >
                                Duration
                            </label>

                            <Input
                                type="text"
                                value={exp.date}
                                onChange={(e) =>
                                    updateExperience(idx, 'date', e.target.value)
                                }
                                placeholder="e.g., 2022 – Present"
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
                                "
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
                                Description (comma-separated points)
                            </label>

                            <textarea
                                value={exp.points?.join('\n') || ''}
                                onChange={(e) =>
                                    updateExperience(idx, 'points', e.target.value.split('\n'))
                                }
                                placeholder="Describe your responsibilities and achievements..."
                                rows={5}
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
                    </div>
                ))}

                {/* Add Experience Button */}
                <button
                    onClick={addExperience}
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
                    Add Experience
                </button>
            </div>
        </div>
    )
}