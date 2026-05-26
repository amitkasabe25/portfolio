import React from 'react'

interface HeadingProps {
    title: string
    subtitle: React.ReactNode
    description?: string
    className?: string
}

const Heading: React.FC<HeadingProps> = ({
    title,
    subtitle,
    description = `A focused stack spanning backend systems,
frontend engineering, cloud infrastructure,
security, and scalable production architectures.`,
    className = '',
}) => {
    return (
        <div className={className}>
            <div className="inline-flex items-center gap-2.5 text-[11px] font-medium tracking-[0.12em] uppercase text-[var(--text-muted)] mb-6">
                <span className="w-7 h-px bg-[var(--border-strong)]" />
                {title}
            </div>

            <h2 className="text-[clamp(42px,5vw,64px)] font-light leading-[0.95] tracking-[-0.05em] text-[var(--text)] m-0 mb-[18px]">
                {subtitle}
            </h2>

            <p className="text-[15px] text-[var(--text-muted)] leading-[1.7] max-w-[560px] m-0 font-light whitespace-pre-line">
                {description}
            </p>
        </div>
    )
}

export default Heading