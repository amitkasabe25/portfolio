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
    <section id="contact" className="font-['DM_Sans','Helvetica_Neue',sans-serif] bg-white dark:bg-[#020617] text-zinc-900 dark:text-slate-100 py-[60px] px-7 pb-20 transition-colors duration-300">
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2.5 text-[11px] tracking-[.2em] uppercase text-zinc-500 dark:text-slate-400 font-semibold mb-2.5">
            <span className="w-6 h-px bg-zinc-300 dark:bg-white/15 inline-block" />
            Let's connect
          </div>
          <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-light tracking-[-.05em] leading-none text-zinc-900 dark:text-slate-100">
            Get in <em className="text-sky-600 dark:text-sky-400 not-italic">touch</em>
          </h2>
        </div>

        {/* 2-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-5 items-start">
          {/* LEFT – Info cards */}
          <div className="flex flex-col gap-3.5">
            {/* Contact info card */}
            <div className="border border-zinc-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl p-[22px] transition-all duration-200 hover:border-sky-400/50 dark:hover:border-sky-400/30">
              {infoItems.map((item, i) => (
                <div key={item.label} className={`flex gap-3.5 py-3.5 ${i !== infoItems.length - 1 ? 'border-b border-zinc-200 dark:border-white/10' : ''} ${i === 0 ? 'pt-0' : ''}`}>
                  <div className="w-[38px] h-[38px] rounded-xl bg-sky-100 dark:bg-sky-400/10 border border-sky-300 dark:border-sky-400/20 flex items-center justify-center text-sky-600 dark:text-sky-400 shrink-0 mt-0.5">
                    <item.Icon size={18} />
                  </div>
                  <div>
                    <div className="text-[10px] tracking-[.1em] uppercase text-zinc-500 dark:text-slate-400 font-semibold mb-0.5">{item.label}</div>
                    <div className="text-[13px] text-zinc-800 dark:text-slate-100 leading-relaxed">{item.value}</div>
                    {item.sub && <div className="text-[11px] text-zinc-500 dark:text-slate-400 mt-1">{item.sub}</div>}
                  </div>
                </div>
              ))}

              {/* Availability badge */}
              <div className="flex items-center gap-2.5 mt-3.5 p-3.5 rounded-xl bg-green-50 dark:bg-green-500/5 border border-green-200 dark:border-green-500/20">
                <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_6px_#22c55e]" />
                <div>
                  <div className="text-[12px] text-green-700 dark:text-green-400 font-semibold tracking-[.04em]">Available for new projects</div>
                  <div className="text-[11px] text-zinc-600 dark:text-slate-400 mt-0.5">Open to freelance & full-time roles</div>
                </div>
              </div>
            </div>

            {/* Socials card */}
            <div className="border border-zinc-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl p-[18px_22px] transition-all duration-200 hover:border-sky-400/50 dark:hover:border-sky-400/30">
              <div className="text-[10px] tracking-[.12em] uppercase text-zinc-500 dark:text-slate-400 font-semibold mb-3">Find me online</div>
              <div className="flex flex-wrap gap-2.5">
                {socials.map(s => (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-white/10 bg-white/50 dark:bg-white/5 text-zinc-600 dark:text-slate-400 text-[12px] font-semibold tracking-wide transition-all duration-200 hover:border-sky-400/50 dark:hover:border-sky-400/30 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-400/10"
                  >
                    <s.Icon size={16} />
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT – Form card */}
          <div className="border border-zinc-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl p-7 transition-all duration-200">
            {!submitted ? (
              <>
                <div className="text-[11px] tracking-[.12em] uppercase text-zinc-500 dark:text-slate-400 font-semibold mb-4">
                  What are you reaching out about?
                </div>

                {/* Contact type buttons */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3.5">
                  {contactTypes.map(t => (
                    <button
                      key={t.value}
                      onClick={() => setActiveType(t.value)}
                      className={`
                        px-2.5 py-2 rounded-xl text-[11px] font-semibold tracking-wide uppercase
                        border transition-all duration-200
                        ${activeType === t.value
                          ? 'bg-sky-100 dark:bg-sky-400/10 border-sky-300 dark:border-sky-400/30 text-sky-700 dark:text-sky-400'
                          : 'bg-white/50 dark:bg-white/5 border-zinc-200 dark:border-white/10 text-zinc-500 dark:text-slate-400 hover:border-sky-400/50 dark:hover:border-sky-400/30 hover:text-sky-600 dark:hover:text-sky-400'
                        }
                      `}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                <div className="h-px bg-zinc-200 dark:bg-white/10 my-4" />

                {/* Form fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-3.5">
                  <div className="flex flex-col gap-1.5">
                    <div className="text-[11px] tracking-[.1em] uppercase text-zinc-500 dark:text-slate-400 font-semibold">Full name</div>
                    <input
                      ref={nameRef}
                      type="text"
                      placeholder="Your name"
                      className="bg-white/50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-[13px] text-zinc-900 dark:text-slate-100 placeholder:text-zinc-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-sky-400/50 dark:focus:border-sky-400/30 focus:bg-white/80 dark:focus:bg-sky-400/5 transition-all duration-200"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="text-[11px] tracking-[.1em] uppercase text-zinc-500 dark:text-slate-400 font-semibold">Email address</div>
                    <input
                      ref={emailRef}
                      type="email"
                      placeholder="you@example.com"
                      className="bg-white/50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-[13px] text-zinc-900 dark:text-slate-100 placeholder:text-zinc-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-sky-400/50 dark:focus:border-sky-400/30 focus:bg-white/80 dark:focus:bg-sky-400/5 transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 mb-3.5">
                  <div className="text-[11px] tracking-[.1em] uppercase text-zinc-500 dark:text-slate-400 font-semibold">Subject</div>
                  <input
                    ref={subjectRef}
                    type="text"
                    placeholder="Brief topic of your message"
                    className="bg-white/50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-[13px] text-zinc-900 dark:text-slate-100 placeholder:text-zinc-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-sky-400/50 dark:focus:border-sky-400/30 focus:bg-white/80 dark:focus:bg-sky-400/5 transition-all duration-200"
                  />
                </div>

                <div className="flex flex-col gap-1.5 mb-3.5">
                  <div className="text-[11px] tracking-[.1em] uppercase text-zinc-500 dark:text-slate-400 font-semibold">Message</div>
                  <textarea
                    ref={msgRef}
                    maxLength={500}
                    rows={4}
                    placeholder="Tell me about your project, timeline, and what kind of help you're looking for..."
                    onChange={e => setCharCount(e.target.value.length)}
                    className="bg-white/50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-[13px] text-zinc-900 dark:text-slate-100 placeholder:text-zinc-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-sky-400/50 dark:focus:border-sky-400/30 focus:bg-white/80 dark:focus:bg-sky-400/5 transition-all duration-200 resize-none min-h-[110px]"
                  />
                  <div className="text-right text-[10px] text-zinc-400 dark:text-slate-500 mt-1">{charCount} / 500</div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="text-[11px] tracking-[.1em] uppercase text-zinc-500 dark:text-slate-400 font-semibold">
                    Budget range <span className="text-zinc-400 dark:text-slate-500 font-normal tracking-normal normal-case">(optional)</span>
                  </div>
                  <select
                    ref={budgetRef}
                    className="bg-white/50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-[13px] text-zinc-900 dark:text-slate-100 focus:outline-none focus:border-sky-400/50 dark:focus:border-sky-400/30 focus:bg-white/80 dark:focus:bg-sky-400/5 transition-all duration-200 cursor-pointer appearance-none"
                  >
                    <option value="">Select a range...</option>
                    <option>Under ₹50,000</option>
                    <option>₹50,000 – ₹2,00,000</option>
                    <option>₹2,00,000 – ₹5,00,000</option>
                    <option>₹5,00,000+</option>
                    <option>Open to discuss</option>
                  </select>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full mt-5 py-3.5 rounded-xl bg-sky-100 dark:bg-sky-400/10 border border-sky-300 dark:border-sky-400/30 text-sky-700 dark:text-sky-400 text-[13px] font-bold tracking-wide uppercase flex items-center justify-center gap-2 transition-all duration-200 hover:bg-sky-200 dark:hover:bg-sky-400/20 hover:border-sky-400 dark:hover:border-sky-400/50 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <Lucide.Send size={16} />
                  {loading ? 'Sending...' : 'Send message'}
                </button>
              </>
            ) : (
              /* Success state */
              <div className="flex flex-col items-center justify-center gap-3.5 py-10 px-5 text-center">
                <div className="w-14 h-14 rounded-xl bg-green-100 dark:bg-green-500/10 border border-green-300 dark:border-green-500/20 flex items-center justify-center text-green-600 dark:text-green-400">
                  <Lucide.Check size={26} />
                </div>
                <div className="text-lg font-medium text-zinc-900 dark:text-slate-100">Message sent!</div>
                <div className="text-[13px] text-zinc-600 dark:text-slate-400 leading-relaxed">
                  Thanks for reaching out. I'll get back to<br />you within 24 hours.
                </div>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-slate-400 text-[12px] font-semibold tracking-wide transition-all duration-200 hover:border-sky-400/50 dark:hover:border-sky-400/30 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-400/10 mt-2"
                >
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