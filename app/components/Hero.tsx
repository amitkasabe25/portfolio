 'use client'

import React from 'react'
import FadeImage from './FadeImage'

import {
    User,
    BookUser,
    BarChart3,
    Wrench,
    MapPin,
    Mail,
    Phone,
    Calendar,
    Zap,
    Server,
    Braces,
} from 'lucide-react'

const PHOTO_URL = '/1767367971817.png'

const stats = [
    {
        label: 'Years of Experience',
        value: '5+',
        icon: Calendar,
        sub: 'Active since 2019',
        trend: 'up',
    },
    {
        label: 'APIs Shipped',
        value: '50+',
        icon: Braces,
        sub: 'REST & GraphQL endpoints',
    },
]

const highlights = [
    {
        badge: 'DL',
        title: 'DigiLocker',
        desc: 'Gov-scale infra APIs',
    },
    {
        badge: 'UM',
        title: 'UMANG',
        desc: 'Citizen platform APIs',
    },
    {
        badge: 'OA',
        title: 'Online Gaming',
        desc: 'Regulatory authority',
    },
    {
        badge: 'ZT',
        title: 'Zero Trust',
        desc: 'Security architecture',
    },
    {
        badge: 'CI',
        title: 'CI/CD',
        desc: 'Pipeline automation',
    },
]

const skills = [
    { name: 'REST APIs', width: '96%' },
    { name: 'OAuth 2.0 / JWT', width: '90%' },
    { name: 'Redis Optimisation', width: '85%' },
    { name: 'CI/CD Automation', width: '88%' },
    { name: 'Microservices', width: '82%' },
]

const tools = [
    'Laravel',
    'Node.js',
    'Python',
    'React.js',
    'PostgreSQL',
    'Redis',
    'Docker',
    'AWS',
    'Kafka',
    'Swagger',
    'OAuth',
    'JWT',
]

const Hero = () => {
    return (
        <section id="home" className="hero-section">
            <div className="hero-bg-glow hero-glow-one" />
            <div className="hero-bg-glow hero-glow-two" />

            <div className="hero-wrap">

                {/* TOPBAR */}
                <div className="hero-topbar">
                    <div className="hero-brand">
                        Amit Kasabe • Senior API Engineer
                    </div>

                    <div className="hero-status">
                        <span className="hero-dot" />
                        Available for engineering collaborations
                    </div>
                </div>

                {/* MAIN GRID */}
                <div className="hero-main">

                    {/* LEFT */}
                    <div className="hero-left">                    

                        {/* CONTACT */}
                        <div className="hero-card">
                            <div className="hero-card-label">
                                <BookUser size={14} weight="bold" />
                                Contact
                            </div>

                            <div className="hero-contact-row">
                                <MapPin size={15} />
                                <span>Base</span>
                                Pune / New Delhi, India
                            </div>

                            <div className="hero-contact-row">
                                <Mail size={15} />
                                <span>Email</span>
                                amit.kasabe25@gmail.com
                            </div>

                            <div className="hero-contact-row">
                                <Phone size={15} />
                                <span>Phone</span>
                                +91 8482991725
                            </div>
                        </div>

                       

                        {/* TECH STACK */}
                        <div className="hero-card">
                            <div className="hero-card-label">
                                <Wrench size={14} weight="bold" />
                                Tech stack
                            </div>

                            <div className="hero-tools-grid">
                                {tools.map((tool) => (
                                    <span
                                        key={tool}
                                        className="hero-tool-tag"
                                    >
                                        {tool}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* CENTER */}
                    <div className="hero-center">

                        <div
                            className="hero-watermark"
                            aria-hidden="true"
                        >
                            AK
                        </div>

                        <div className="hero-photo-wrap">
                            <div className="hero-photo-inner">
                                <FadeImage src={PHOTO_URL} alt="Amit Kasabe" />
                            </div>
                        </div>

                        <h1 className="hero-heading">
                            Amit Kasabe
                            <br />
                            <em>API Engineer</em>
                            <br />
                            & System Builder
                        </h1>

                        <p className="hero-subtitle">
                            Engineering scalable backend systems,
                            secure citizen-scale APIs,
                            and high-performance digital infrastructure
                            powering real-world platforms.
                        </p>
                    </div>

                    {/* RIGHT */}
                    <div className="hero-right">
                        {stats.map((stat) => {
                            const Icon = stat.icon

                            return (
                                <div
                                    key={stat.label}
                                    className="hero-stat-card"
                                >
                                    <div className="hero-stat-top">
                                        <div className="hero-stat-label">
                                            {stat.label}
                                        </div>

                                        <Icon
                                            size={18}
                                            className="hero-stat-icon"
                                        />
                                    </div>

                                    <div className="hero-stat-value">
                                        {stat.value}
                                    </div>

                                    <div className="hero-stat-sub">
                                        {stat.trend === 'up' && (
                                            <span className="hero-trend hero-trend-up">
                                                ↑
                                            </span>
                                        )}

                                        {stat.trend === 'info' && (
                                            <span className="hero-trend hero-trend-info">
                                                ●
                                            </span>
                                        )}

                                        {stat.sub}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* FOOTER */}
                <div className="hero-footer">
                    <div className="hero-highlights">
                        {highlights.map((item) => (
                            <div
                                key={item.title}
                                className="hero-highlight"
                            >
                                <div className="hero-highlight-badge">
                                    {item.badge}
                                </div>

                                <div>
                                    <div className="hero-highlight-title">
                                        {item.title}
                                    </div>

                                    <div className="hero-highlight-desc">
                                        {item.desc}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .hero-section {
                    position: relative;
                    overflow: hidden;
                    background: #020617;
                    min-height: 100vh;
                    color: #f8fafc;
                    font-family: 'Inter', sans-serif;
                }

                .hero-bg-glow {
                    position: absolute;
                    width: 600px;
                    height: 600px;
                    border-radius: 50%;
                    filter: blur(120px);
                    opacity: 0.15;
                    z-index: 0;
                }

                .hero-glow-one {
                    top: -180px;
                    left: -180px;
                    background: #38bdf8;
                }

                .hero-glow-two {
                    bottom: -180px;
                    right: -180px;
                    background: #2563eb;
                }

                .hero-wrap {
                    position: relative;
                    z-index: 2;
                    max-width: 1280px;
                    margin: 0 auto;
                    padding: 28px 28px 60px;
                }

                .hero-topbar {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 36px;
                }

                .hero-brand {
                    font-size: 11px;
                    letter-spacing: 0.22em;
                    text-transform: uppercase;
                    color: #94a3b8;
                    font-weight: 600;
                }

                .hero-status {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 11px;
                    color: #94a3b8;
                    border: 1px solid rgba(255,255,255,0.08);
                    padding: 8px 14px;
                    border-radius: 999px;
                    background: rgba(255,255,255,0.03);
                    backdrop-filter: blur(12px);
                }

                .hero-dot {
                    width: 7px;
                    height: 7px;
                    border-radius: 999px;
                    background: #22c55e;
                    box-shadow: 0 0 10px #22c55e;
                }

                .hero-main {
                    display: grid;
                    grid-template-columns: 260px 1fr 200px;
                    gap: 20px;
                    align-items: start;
                }

                .hero-left {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }

                .hero-card {
                    border: 1px solid rgba(255,255,255,0.08);
                    background: rgba(15,23,42,0.8);
                    backdrop-filter: blur(12px);
                    border-radius: 18px;
                    padding: 16px 18px;
                    transition: all 0.25s ease;
                }

                .hero-card:hover {
                    border-color: rgba(56,189,248,.25);
                    box-shadow: 0 20px 40px -16px rgba(56,189,248,.22);
                    transform: translateY(-2px);
                }

                .hero-card-label {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 10px;
                    letter-spacing: 0.14em;
                    text-transform: uppercase;
                    color: #94a3b8;
                    margin-bottom: 12px;
                    font-weight: 600;
                }

                .hero-about-text {
                    font-size: 13px;
                    line-height: 1.7;
                    color: #f8fafc;
                    font-weight: 300;
                }

                .hero-contact-row {
                    display: flex;
                    align-items: center;
                    gap: 9px;
                    padding: 5px 0;
                    border-bottom: 1px solid rgba(255,255,255,0.08);
                    font-size: 12px;
                    color: #f8fafc;
                }

                .hero-contact-row:last-child {
                    border-bottom: none;
                }

                .hero-contact-row span {
                    color: #94a3b8;
                    font-size: 11px;
                }

                .hero-skill-row {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 5px 0;
                    border-bottom: 1px solid rgba(255,255,255,0.08);
                }

                .hero-skill-row:last-child {
                    border-bottom: none;
                }

                .hero-skill-name {
                    font-size: 12px;
                }

                .hero-skill-wrap {
                    width: 70px;
                    height: 4px;
                    border-radius: 999px;
                    background: rgba(255,255,255,0.08);
                    overflow: hidden;
                }

                .hero-skill-bar {
                    height: 100%;
                    border-radius: 999px;
                    background: #38bdf8;
                }

                .hero-tools-grid {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 6px;
                }

                .hero-tool-tag {
                    font-size: 10px;
                    padding: 4px 10px;
                    border-radius: 999px;
                    background: rgba(56,189,248,.1);
                    border: 1px solid rgba(56,189,248,.15);
                    color: #38bdf8;
                    font-weight: 500;
                    letter-spacing: 0.04em;
                }

                .hero-center {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    position: relative;
                }

                .hero-watermark {
                    position: absolute;
                    top: -10px;
                    font-size: min(18vw,160px);
                    font-weight: 700;
                    letter-spacing: -0.08em;
                    color: rgba(255,255,255,0.03);
                    pointer-events: none;
                    user-select: none;
                    z-index: 0;
                }

                .hero-photo-wrap {
                    position: relative;
                    width: clamp(220px,22vw,300px);
                    aspect-ratio: 3/4;
                    margin-bottom: 20px;
                    z-index: 2;
                }

                .hero-photo-inner {
                    position: absolute;
                    inset: 0;
                    border-radius: 0;
                    overflow: hidden;
                    border: none;
                    background: transparent;
                }

                .hero-image {
                    object-fit: cover;
                    object-position: center top;
                }

                .hero-heading {
                    font-size: clamp(2.4rem,5.5vw,5rem);
                    line-height: 0.9;
                    letter-spacing: -0.07em;
                    font-weight: 300;
                    margin-bottom: 14px;
                    text-align: center;
                    z-index: 2;
                }

                .hero-heading em {
                    color: #38bdf8;
                    font-style: italic;
                    font-weight: 300;
                }

                .hero-subtitle {
                    max-width: 600px;
                    text-align: center;
                    font-size: 14px;
                    line-height: 1.75;
                    color: #94a3b8;
                }

                .hero-right {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }

                .hero-stat-card {
                    border: 1px solid rgba(255,255,255,0.08);
                    background: rgba(15,23,42,0.8);
                    backdrop-filter: blur(12px);
                    border-radius: 18px;
                    padding: 16px 18px;
                }

                .hero-stat-top {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 8px;
                }

                .hero-stat-label {
                    font-size: 10px;
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    color: #94a3b8;
                    line-height: 1.5;
                }

                .hero-stat-icon {
                    color: #38bdf8;
                    opacity: 0.7;
                }

                .hero-stat-value {
                    font-size: 2.2rem;
                    font-weight: 600;
                    letter-spacing: -0.05em;
                }

                .hero-stat-sub {
                    font-size: 10px;
                    color: #94a3b8;
                    margin-top: 4px;
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }

                .hero-trend-up {
                    color: #22c55e;
                }

                .hero-trend-info {
                    color: #38bdf8;
                }

                .hero-footer {
                    margin-top: 24px;
                    padding-top: 24px;
                    border-top: 1px solid rgba(255,255,255,0.08);
                }

                .hero-highlights {
                    display: flex;
                    justify-content: center;
                    flex-wrap: wrap;
                    gap: 10px;
                }

                .hero-highlight {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 10px 16px;
                    border-radius: 14px;
                    background: rgba(255,255,255,0.02);
                    border: 1px solid rgba(255,255,255,0.08);
                    transition: all 0.25s ease;
                }

                .hero-highlight:hover {
                    transform: translateY(-2px);
                    border-color: rgba(56,189,248,.25);
                }

                .hero-highlight-badge {
                    width: 36px;
                    height: 36px;
                    border-radius: 11px;
                    background: rgba(56,189,248,.1);
                    border: 1px solid rgba(56,189,248,.15);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #38bdf8;
                    font-weight: 700;
                    font-size: 12px;
                    flex-shrink: 0;
                }

                .hero-highlight-title {
                    font-size: 11px;
                    letter-spacing: 0.06em;
                    text-transform: uppercase;
                    font-weight: 600;
                }

                .hero-highlight-desc {
                    font-size: 10px;
                    color: #94a3b8;
                    margin-top: 2px;
                }

                @media (max-width: 1100px) {

                    .hero-main {
                        grid-template-columns: 1fr;
                    }

                    .hero-left,
                    .hero-right {
                        width: 100%;
                    }
                }

                @media (max-width: 768px) {

                    .hero-wrap {
                        padding: 24px 20px 50px;
                    }

                    .hero-topbar {
                        flex-direction: column;
                        gap: 14px;
                    }

                    .hero-heading {
                        font-size: 52px;
                    }
                }
            `}</style>
        </section>
    )
}

export default Hero