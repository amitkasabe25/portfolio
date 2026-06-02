import PersonalInfoSection from './sections/PersonalInfoSection'
import SummarySection from './sections/SummarySection'
import EducationSection from './sections/EducationSection'
import ExperienceSection from './sections/ExperienceSection'
import ProjectsSection from './sections/ProjectsSection'
import SkillsSection from './sections/SkillsSection'

type Props = {
    activeSection: string
    resumeData: any
    setResumeData: any
}

export default function ResumeEditor({
    activeSection,
    resumeData,
    setResumeData,
}: Props) {
    return (
        <section
            className="
                w-[40%]
                overflow-y-auto
                border-r
                border-zinc-200
                dark:border-zinc-800
                bg-white
                dark:bg-black
                p-8
            "
        >
            {/* Personal Info */}
            {activeSection === 'personal' && (
                <PersonalInfoSection
                    resumeData={resumeData}
                    setResumeData={setResumeData}
                />
            )}

            {/* Summary */}
            {activeSection === 'summary' && (
                <SummarySection
                    resumeData={resumeData}
                    setResumeData={setResumeData}
                />
            )}

            {/* Experience */}
            {activeSection === 'experience' && (
                <ExperienceSection
                    resumeData={resumeData}
                    setResumeData={setResumeData}
                />
            )}

            {/* Education */}
            {activeSection === 'education' && (
                <EducationSection
                    resumeData={resumeData}
                    setResumeData={setResumeData}
                />
            )}

            {/* Projects */}
            {activeSection === 'projects' && (
                <ProjectsSection
                    resumeData={resumeData}
                    setResumeData={setResumeData}
                />
            )}

            {/* Skills */}
            {activeSection === 'skills' && (
                <SkillsSection
                    resumeData={resumeData}
                    setResumeData={setResumeData}
                />
            )}
        </section>
    )
}