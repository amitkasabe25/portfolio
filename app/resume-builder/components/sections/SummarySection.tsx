'use client'

type Props = {
    resumeData: any
    setResumeData: any
}

export default function SummarySection({
    resumeData,
    setResumeData,
}: Props) {
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
                Professional Summary
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
                Write a brief professional summary about yourself.
            </p>

            <div className="mt-10">
                <label
                    className="
                        text-sm
                        font-medium
                        text-zinc-700
                        dark:text-zinc-300
                    "
                >
                    Summary
                </label>

                <textarea
                    value={resumeData.summary || ''}
                    onChange={(e) =>
                        setResumeData({
                            ...resumeData,
                            summary: e.target.value,
                        })
                    }
                    placeholder="Write a compelling summary of your professional experience, skills, and career objectives..."
                    rows={8}
                    className="
                        mt-4
                        w-full
                        px-4 py-3
                        rounded-2xl
                        border
                        border-zinc-200
                        dark:border-zinc-800
                        bg-zinc-50
                        dark:bg-zinc-950
                        outline-none
                        resize-none
                        text-sm
                        leading-relaxed
                    "
                />
            </div>
        </div>
    )
}
