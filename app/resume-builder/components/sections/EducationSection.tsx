'use client'
import { Trash2, Plus } from 'lucide-react'
import { Input } from '@/components/ui/input'

type Props = {
    resumeData: any
    setResumeData: any
}

export default function EducationSection({
    resumeData,
    setResumeData,
}: Props) {
    const education = resumeData.education || []

    const addEducation = () => {
        const newEdu = {
            institution: '',
            degree: '',
            startYear: '',
            endYear: '',
        }
        setResumeData({
            ...resumeData,
            education: [...education, newEdu],
        })
    }

    const removeEducation = (index: number) => {
        setResumeData({
            ...resumeData,
            education: education.filter((_: any, i: number) => i !== index),
        })
    }

    const updateEducation = (index: number, field: string, value: any) => {
        const updated = [...education]
        updated[index] = { ...updated[index], [field]: value }
        setResumeData({
            ...resumeData,
            education: updated,
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
                Education
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
                Add your academic background.
            </p>

            <div className="mt-10 space-y-6">
                {education.map((edu: any, idx: number) => (
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
                                Education {idx + 1}
                            </h3>
                            <button
                                onClick={() => removeEducation(idx)}
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

                        {/* Institution Name */}
                        <div>
                            <label
                                className="
                                    text-sm
                                    font-medium
                                    text-zinc-700
                                    dark:text-zinc-300
                                "
                            >
                                Institution Name
                            </label>

                            <Input
                                type="text"
                                value={edu.institution}
                                onChange={(e) =>
                                    updateEducation(idx, 'institution', e.target.value)
                                }
                                placeholder="University or College Name"
                            />
                        </div>

                        {/* Degree */}
                        <div>
                            <label
                                className="
                                    text-sm
                                    font-medium
                                    text-zinc-700
                                    dark:text-zinc-300
                                "
                            >
                                Degree / Qualification
                            </label>

                            <Input
                                type="text"
                                value={edu.degree}
                                onChange={(e) =>
                                    updateEducation(idx, 'degree', e.target.value)
                                }
                                placeholder="e.g., Bachelor of Computer Applications"
                            />
                        </div>

                        {/* Years */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label
                                    className="
                                        text-sm
                                        font-medium
                                        text-zinc-700
                                        dark:text-zinc-300
                                    "
                                >
                                    Start Year
                                </label>

                                <Input
                                    type="text"
                                    value={edu.startYear}
                                    onChange={(e) =>
                                        updateEducation(idx, 'startYear', e.target.value)
                                    }
                                    placeholder="2021"
                                />
                            </div>

                            <div>
                                <label
                                    className="
                                        text-sm
                                        font-medium
                                        text-zinc-700
                                        dark:text-zinc-300
                                    "
                                >
                                    End Year
                                </label>

                                <Input
                                    type="text"
                                    value={edu.endYear}
                                    onChange={(e) =>
                                        updateEducation(idx, 'endYear', e.target.value)
                                    }
                                    placeholder="2024 or Present"
                                />
                            </div>
                        </div>
                    </div>
                ))}

                {/* Add Education Button */}
                <button
                    onClick={addEducation}
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
                    Add Education
                </button>
            </div>
        </div>
    )
}