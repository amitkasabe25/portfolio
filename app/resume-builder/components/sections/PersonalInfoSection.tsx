'use client'
import { Input } from '@/components/ui/input'


type Props = {
    resumeData: any
    setResumeData: any
}

export default function PersonalInfoSection({
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
                Personal Information
            </h2>

            <p
                className="
                    mt-2
                    text-sm
                    text-zinc-500
                "
            >
                Update your personal details.
            </p>

            <div className="mt-10 space-y-6">
                {/* Full Name */}
                <div>
                    <label
                        className="
                            text-sm
                            font-medium
                            text-zinc-700
                            dark:text-zinc-300
                        "
                    >
                        Full Name
                    </label>

                        <Input
                            type="text"
                            value={resumeData.personal.fullName}
                            onChange={(e) =>
                                setResumeData({
                                    ...resumeData,
                                    personal: {
                                        ...resumeData.personal,
                                        fullName: e.target.value,
                                    },
                                })
                            }
                        />
                </div>

                {/* Email */}
                <div>
                    <label
                        className="
                            text-sm
                            font-medium
                            text-zinc-700
                            dark:text-zinc-300
                        "
                    >
                        Email
                    </label>

                        <Input
                            type="email"
                            value={resumeData.personal.email}
                            onChange={(e) =>
                                setResumeData({
                                    ...resumeData,
                                    personal: {
                                        ...resumeData.personal,
                                        email: e.target.value,
                                    },
                                })
                            }
                        />
                </div>

                {/* Phone */}
                <div>
                    <label
                        className="
                            text-sm
                            font-medium
                            text-zinc-700
                            dark:text-zinc-300
                        "
                    >
                        Mobile Number
                    </label>

                        <Input
                            type="text"
                            value={resumeData.personal.phone}
                            onChange={(e) =>
                                setResumeData({
                                    ...resumeData,
                                    personal: {
                                        ...resumeData.personal,
                                        phone: e.target.value,
                                    },
                                })
                            }
                        />
                </div>
            </div>
        </div>
    )
}