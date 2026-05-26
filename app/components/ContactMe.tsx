'use client'
import React, { useState, useRef } from 'react'
import * as Lucide from 'lucide-react'
import { createContactMessage } from '../actions/contact.actions'

type ContactType = 'collaboration' | 'freelance' | 'fulltime' | 'consulting' | 'general' | 'other'

const contactTypes: { label: string; value: ContactType }[] = [
  { label: 'Collaboration', value: 'collaboration' },
  { label: 'Freelance', value: 'freelance' },
  { label: 'Full-time', value: 'fulltime' },
  { label: 'Consulting', value: 'consulting' },
  { label: 'General', value: 'general' },
  { label: 'Other', value: 'other' },
]

const infoItems = [
  {
    Icon: Lucide.MapPin,
    label: 'Location',
    value: 'Pune / New Delhi, India',
    sub: 'IST — UTC+5:30',
  },
  {
    Icon: Lucide.Mail,
    label: 'Email',
    value: 'amit.kasabe25@gmail.com',
    sub: null,
  },
  {
    Icon: Lucide.Phone,
    label: 'Phone',
    value: '+91 84829 91725',
    sub: 'WhatsApp available',
  },
  {
    Icon: Lucide.Clock,
    label: 'Response time',
    value: 'Usually within 24 hours',
    sub: 'Mon – Sat, 9am – 7pm IST',
  },
]

const socials = [
  { Icon: Lucide.Link, label: 'LinkedIn', url: 'https://www.linkedin.com/in/amit-kasabe' },
  { Icon: Lucide.Code, label: 'GitHub', url: 'https://github.com/amitkasabe' },
  { Icon: Lucide.Globe, label: 'Twitter', url: 'https://twitter.com/amitkasabe' },
]

const ContactMe = () => {
  const [activeType, setActiveType] = useState<ContactType>('collaboration')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [charCount, setCharCount] = useState(0)

  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const subjectRef = useRef<HTMLInputElement>(null)
  const msgRef = useRef<HTMLTextAreaElement>(null)
  const budgetRef = useRef<HTMLSelectElement>(null)

  const highlight = (el: HTMLElement | null) => {
    if (!el) return
    el.style.borderColor = 'rgba(239,68,68,0.5)'
    setTimeout(() => { if (el) el.style.borderColor = '' }, 2000)
  }

  const handleSubmit = async () => {

    const name = nameRef.current?.value.trim()
    const email = emailRef.current?.value.trim()
    const subject = subjectRef.current?.value.trim()
    const message = msgRef.current?.value.trim()
    const budget = budgetRef.current?.value

    if (!name) highlight(nameRef.current)
    if (!email) highlight(emailRef.current)
    if (!message) highlight(msgRef.current)

    if (!name || !email || !message) return
    setLoading(true)
    const result = await createContactMessage({
      inquiry_type: activeType,
      full_name: name,
      email,
      subject: subject || 'New Contact Message',
      message,
      budget_range: budget || '',
    })

    console.log(result)

    setLoading(false)

    if (result.success) {
      setSubmitted(true)
    } else {
      alert(result.error)
    }
  }

  const handleReset = () => {
    setSubmitted(false)
    setCharCount(0)
    setActiveType('collaboration')
    if (nameRef.current) nameRef.current.value = ''
    if (emailRef.current) emailRef.current.value = ''
    if (subjectRef.current) subjectRef.current.value = ''
    if (msgRef.current) msgRef.current.value = ''
    if (budgetRef.current) budgetRef.current.value = ''
  }

  return (
    <section id="contact"
      style={{
        fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
        background: 'var(--bg, #020617)',
        color: '#f8fafc',
        padding: '60px 28px 80px',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        :root {
          --bg: #020617;
          --bg2: #0f172a;
          --card: rgba(15,23,42,0.82);
          --border: rgba(255,255,255,0.08);
          --bstrong: rgba(255,255,255,0.14);
          --accent: #38bdf8;
          --asoft: rgba(56,189,248,0.1);
          --muted: #94a3b8;
        }

        .cm-wrap { max-width: 1280px; margin: 0 auto; }

        .cm-grid {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 20px;
          align-items: start;
        }

        .cm-card {
          border: 1px solid var(--border);
          background: var(--card);
          backdrop-filter: blur(12px);
          border-radius: 20px;
          padding: 22px;
          transition: border-color .25s;
        }
        .cm-card:hover { border-color: rgba(56,189,248,.22); }

        .cm-info-row {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 14px 0;
          border-bottom: 1px solid var(--border);
        }
        .cm-info-row:last-child { border-bottom: none; padding-bottom: 0; }

        .cm-icon {
          width: 38px; height: 38px; border-radius: 11px;
          background: var(--asoft);
          border: 1px solid rgba(56,189,248,.15);
          display: flex; align-items: center; justify-content: center;
          color: var(--accent); font-size: 17px; flex-shrink: 0; margin-top: 1px;
        }

        .cm-avail {
          display: flex; align-items: center; gap: 10px;
          padding: 14px 16px; border-radius: 13px;
          background: rgba(34,197,94,0.06);
          border: 1px solid rgba(34,197,94,0.18);
          margin-top: 14px;
        }
        .cm-avail-dot { width: 8px; height: 8px; border-radius: 50%; background: #22c55e; flex-shrink: 0; }

        .cm-social-btn {
          display: flex; align-items: center; gap: 8px;
          padding: 9px 14px; border-radius: 12px;
          border: 1px solid var(--border);
          background: rgba(255,255,255,0.02);
          color: var(--muted); font-size: 12px; font-weight: 600;
          letter-spacing: .04em; cursor: pointer;
          transition: all .2s; font-family: inherit;
        }
        .cm-social-btn:hover { border-color: rgba(56,189,248,.28); color: var(--accent); background: var(--asoft); }
        .cm-social-btn i { font-size: 16px; }

        .cm-form-card {
          border: 1px solid var(--border);
          background: var(--card);
          backdrop-filter: blur(12px);
          border-radius: 20px;
          padding: 28px;
        }

        .cm-type-grid {
          display: grid;
          grid-template-columns: repeat(3,1fr);
          gap: 8px;
          margin-bottom: 14px;
        }
        .cm-type-btn {
          padding: 9px 10px; border-radius: 11px;
          border: 1px solid var(--border);
          background: rgba(255,255,255,0.02);
          color: var(--muted); font-size: 11px; font-weight: 600;
          letter-spacing: .06em; text-transform: uppercase;
          cursor: pointer; text-align: center;
          transition: all .2s; font-family: inherit;
        }
        .cm-type-btn:hover, .cm-type-btn.active {
          background: var(--asoft);
          border-color: rgba(56,189,248,.3);
          color: var(--accent);
        }

        .cm-field { display: flex; flex-direction: column; gap: 7px; margin-bottom: 14px; }
        .cm-field-label { font-size: 11px; letter-spacing: .1em; text-transform: uppercase; color: var(--muted); font-weight: 600; }
        .cm-field input, .cm-field textarea, .cm-field select {
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--border);
          border-radius: 12px;
          color: #f8fafc;
          font-family: inherit;
          font-size: 13px;
          padding: 11px 14px;
          outline: none;
          transition: border-color .2s, background .2s;
          width: 100%;
          resize: none;
        }
        .cm-field input::placeholder, .cm-field textarea::placeholder { color: rgba(148,163,184,0.45); }
        .cm-field input:focus, .cm-field textarea:focus, .cm-field select:focus {
          border-color: rgba(56,189,248,.4);
          background: rgba(56,189,248,0.04);
        }
        .cm-field textarea { min-height: 110px; line-height: 1.7; }
        .cm-field select { appearance: none; cursor: pointer; }
        .cm-field select option { background: #0f172a; color: #f8fafc; }

        .cm-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }

        .cm-submit {
          width: 100%; padding: 14px; border-radius: 13px;
          border: 1px solid rgba(56,189,248,.35);
          background: var(--asoft); color: var(--accent);
          font-size: 13px; font-weight: 700; letter-spacing: .08em;
          text-transform: uppercase; cursor: pointer;
          transition: all .25s; font-family: inherit;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          margin-top: 20px;
        }
        .cm-submit:hover { background: rgba(56,189,248,.18); border-color: rgba(56,189,248,.5); }
        .cm-submit:active { transform: scale(.98); }
        .cm-submit i { font-size: 17px; }

        .cm-success {
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 14px; padding: 40px 20px; text-align: center;
        }
        .cm-success-icon {
          width: 56px; height: 56px; border-radius: 18px;
          background: rgba(34,197,94,.1);
          border: 1px solid rgba(34,197,94,.22);
          display: flex; align-items: center; justify-content: center;
          color: #22c55e; font-size: 26px;
        }

        .cm-divider { height: 1px; background: var(--border); margin: 18px 0; }
        .cm-char-count { font-size: 10px; color: var(--muted); text-align: right; margin-top: 4px; }

        @media (max-width: 860px) {
          .cm-grid { grid-template-columns: 1fr; }
          .cm-form-row { grid-template-columns: 1fr; }
          .cm-type-grid { grid-template-columns: repeat(2,1fr); }
        }
      `}</style>

      <div className="cm-wrap">

        <div style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 600, marginBottom: 10 }}>
            <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.14)', display: 'inline-block' }} />
            Let's connect
          </div>
          <h2 style={{ fontSize: 'clamp(2rem,4vw,3.2rem)', fontWeight: 300, letterSpacing: '-.05em', lineHeight: 1, color: '#f8fafc' }}>
            Get in <em style={{ color: '#38bdf8', fontStyle: 'italic' }}>touch</em>
          </h2>
        </div>

        <div className="cm-grid">

          {/* LEFT — Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

            <div className="cm-card">
              {infoItems.map((item, i) => (
                <div key={item.label} className="cm-info-row" style={i === 0 ? { paddingTop: 0 } : {}}>
                  <div className="cm-icon">
                    <item.Icon size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 600, marginBottom: 3 }}>{item.label}</div>
                    <div style={{ fontSize: 13, color: '#f8fafc', lineHeight: 1.5 }}>{item.value}</div>
                    {item.sub && <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>{item.sub}</div>}
                  </div>
                </div>
              ))}

              <div className="cm-avail">
                <div className="cm-avail-dot" />
                <div>
                  <div style={{ fontSize: 12, color: '#22c55e', fontWeight: 600, letterSpacing: '.04em' }}>Available for new projects</div>
                  <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 1 }}>Open to freelance & full-time roles</div>
                </div>
              </div>
            </div>

            <div className="cm-card" style={{ padding: '18px 22px' }}>
              <div style={{ fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 600, marginBottom: 12 }}>Find me online</div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {socials.map(s => (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cm-social-btn"
                    aria-label={s.label}
                  >
                    <s.Icon size={16} />
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — Form */}
          <div className="cm-form-card">
            {!submitted ? (
              <>
                <div style={{ fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 600, marginBottom: 16 }}>
                  What are you reaching out about?
                </div>

                <div className="cm-type-grid">
                  {contactTypes.map(t => (
                    <button
                      key={t.value}
                      className={`cm-type-btn${activeType === t.value ? ' active' : ''}`}
                      onClick={() => setActiveType(t.value)}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                <div className="cm-divider" />

                <div className="cm-form-row" style={{ marginBottom: 14 }}>
                  <div className="cm-field" style={{ marginBottom: 0 }}>
                    <div className="cm-field-label">Full name</div>
                    <input ref={nameRef} type="text" placeholder="Your name" />
                  </div>
                  <div className="cm-field" style={{ marginBottom: 0 }}>
                    <div className="cm-field-label">Email address</div>
                    <input ref={emailRef} type="email" placeholder="you@example.com" />
                  </div>
                </div>

                <div className="cm-field">
                  <div className="cm-field-label">Subject</div>
                  <input ref={subjectRef} type="text" placeholder="Brief topic of your message" />
                </div>

                <div className="cm-field">
                  <div className="cm-field-label">Message</div>
                  <textarea
                    ref={msgRef}
                    maxLength={500}
                    placeholder="Tell me about your project, timeline, and what kind of help you're looking for..."
                    onChange={e => setCharCount(e.target.value.length)}
                  />
                  <div className="cm-char-count">{charCount} / 500</div>
                </div>

                <div className="cm-field" style={{ marginBottom: 0 }}>
                  <div className="cm-field-label">
                    Budget range{' '}
                    <span style={{ color: 'rgba(148,163,184,0.4)', fontWeight: 400, letterSpacing: 0, textTransform: 'none' }}>(optional)</span>
                  </div>
                  <select ref={budgetRef}>
                    <option value="">Select a range...</option>
                    <option>Under ₹50,000</option>
                    <option>₹50,000 – ₹2,00,000</option>
                    <option>₹2,00,000 – ₹5,00,000</option>
                    <option>₹5,00,000+</option>
                    <option>Open to discuss</option>
                  </select>
                </div>

                <button
                  className="cm-submit"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  <Lucide.Send size={16} />

                  {loading ? 'Sending...' : 'Send message'}
                </button>
              </>
            ) : (
              <div className="cm-success">
                <div className="cm-success-icon">
                  <Lucide.Check size={22} />
                </div>
                <div style={{ fontSize: 18, fontWeight: 500, color: '#f8fafc' }}>Message sent!</div>
                <div style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.7 }}>
                  Thanks for reaching out. I'll get back to<br />you within 24 hours.
                </div>
                <button className="cm-social-btn" onClick={handleReset} style={{ marginTop: 8 }}>
                  <Lucide.ArrowLeft size={16} />
                  Send another
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactMe