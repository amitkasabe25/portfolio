'use client'
import { Trash2, Plus } from 'lucide-react'

type Props = {
    resumeData: any
    setResumeData: any
}

export default function SkillsSection({
    resumeData,
    setResumeData,
}: Props) {
    const skills = resumeData.skills || []

    const addSkill = () => {
        setResumeData({
            ...resumeData,
            skills: [...skills, ''],
        })
    }

    const removeSkill = (index: number) => {
        setResumeData({
            ...resumeData,
            skills: skills.filter((_: any, i: number) => i !== index),
        })
    }

    const updateSkill = (index: number, value: string) => {
        const updated = [...skills]
        updated[index] = value
        setResumeData({
            ...resumeData,
            skills: updated,
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
                Skills
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
                Add your technical and professional skills.
            </p>

            <div className="mt-10 space-y-4">
                {skills.map((skill: string, idx: number) => (
                    <div key={idx} className="flex gap-3 items-center">
                        <input
                            type="text"
                            value={skill}
                            onChange={(e) => updateSkill(idx, e.target.value)}
                            placeholder={`Skill ${idx + 1}`}
                            className="
                                flex-1
                                px-4 py-3
                                rounded-2xl
                                border
                                border-zinc-200
                                dark:border-zinc-800
                                bg-zinc-50
                                dark:bg-zinc-950
                                outline-none
                                text-sm
                                font-medium
                                text-zinc-700
                                dark:text-zinc-300
                            "
                        />
                        <button
                            onClick={() => removeSkill(idx)}
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
                ))}

                {/* Add Skill Button */}
                <button
                    onClick={addSkill}
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
                        mt-6
                    "
                >
                    <Plus size={20} />
                    Add Skill
                </button>
            </div>
        </div>
    )
}