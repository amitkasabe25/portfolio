"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

type FilterType = 'All' | 'Government' | 'APIs' | 'Security' | 'Infrastructure'

const filters: FilterType[] = ['All', 'Government', 'APIs', 'Security', 'Infrastructure']

type BadgeType = 'gov' | 'live' | 'security' | 'infra'

interface BadgeItem {
  label: string
  type: BadgeType
}

interface Metric {
  val: string
  label: string
}

interface Project {
  name: string
  org: string
  orgIcon: string
  icon: string
  desc: string
  filters: FilterType[]
  badges?: BadgeItem[]
  metrics?: Metric[]
  tags?: string[]
  year: string
  role: string
}

interface SideProject {
  name: string
  desc: string
  icon: string
  tags?: string[]
}

const badgeClassMap: Record<BadgeType, string> = {
  gov: 'bg-violet-500/20 text-violet-400 border-violet-500/30',
  live: 'bg-green-500/20 text-green-400 border-green-500/30',
  security: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  infra: 'bg-sky-500/20 text-sky-400 border-sky-500/30',
}

const MyWorkClient = ({ projects, sideProjects = [] }: { projects: Project[]; sideProjects?: SideProject[] }) => {
  const [active, setActive] = useState<FilterType>('All')

  const visible = projects.filter(
    p => active === 'All' || p.filters.includes(active)
  )

  return (
    <div className="bg-slate-950 py-8 px-4 md:px-6 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header Row */}
        <div className="flex justify-between items-end mb-6">
          <div>
            <div className="flex items-center gap-2 text-[11px] tracking-[.18em] uppercase text-slate-400 font-semibold mb-2.5">
              <span className="w-5 h-px bg-white/10 inline-block" />
              Portfolio
            </div>
            <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-light tracking-tighter text-slate-100 leading-tight">
              My <em className="text-sky-400 not-italic">work</em>
            </h2>
          </div>
          <span className="text-[11px] text-slate-600 uppercase tracking-wide">
            {visible.length} project{visible.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Filters */}
        <div className="flex gap-1.5 flex-wrap mb-7">
          {filters.map(f => (
            <Button
              key={f}
              variant="outline"
              size="sm"
              onClick={() => setActive(f)}
              className={`
                rounded-full px-3.5 py-1.5 h-auto text-xs font-medium
                transition-all duration-150
                ${active === f 
                  ? 'bg-white text-slate-900 border-white hover:bg-white/90' 
                  : 'bg-transparent border-white/10 text-slate-400 hover:bg-white/10 hover:text-slate-100'
                }
              `}
            >
              {f}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {visible.map(proj => (
            <div
              key={proj.name}
              className="bg-white/5 border border-white/10 rounded-xl flex flex-col overflow-hidden transition-all duration-150 hover:bg-white/10 hover:border-white/20"
            >
              <div className="p-5 pb-0 flex-1">
                {/* Card Top: Icon + Badges */}
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-lg bg-sky-400/10 border border-sky-400/20 flex items-center justify-center text-sky-400 text-lg shrink-0">
                    <i className={`ti ${proj.icon}`} aria-hidden="true" />
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {proj.badges?.map(b => (
                      <Badge
                        key={b.label}
                        className={`rounded-full text-[10px] font-medium px-2 py-0.5 border ${badgeClassMap[b.type]}`}
                      >
                        {b.label}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Project Info */}
                <div className="text-base font-medium text-slate-100 tracking-tight mb-1">
                  {proj.name}
                </div>
                <div className="text-xs text-slate-600 flex items-center gap-1.5 mb-2.5">
                  <i className={`ti ${proj.orgIcon}`} aria-hidden="true" />
                  {proj.org}
                </div>
                <div className="text-[12.5px] leading-relaxed text-slate-500 mb-3.5">
                  {proj.desc}
                </div>

                {/* Metrics */}
                {proj.metrics && proj.metrics.length > 0 && (
                  <div className="flex gap-2 mb-1">
                    {proj.metrics.map(m => (
                      <div key={m.label} className="bg-white/5 rounded-lg px-3 py-2.5 flex-1">
                        <div className="text-lg font-semibold text-slate-100 tracking-tighter leading-tight">
                          {m.val}
                        </div>
                        <div className="text-[10px] uppercase tracking-wide text-slate-600 mt-1">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Card Footer */}
              <div className="p-4 pt-3 pb-4 mt-auto">
                <div className="h-px bg-white/10 my-3" />
                <div className="flex flex-wrap gap-1 mb-3">
                  {proj.tags?.map(t => (
                    <span
                      key={t}
                      className="text-[11px] px-2 py-0.5 rounded-md border border-white/10 text-slate-500 bg-white/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-600 tracking-wide">{proj.year}</span>
                  <span className="text-[11px] text-sky-400 font-semibold uppercase tracking-wide">
                    {proj.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Side Projects Section */}
        {sideProjects.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center gap-2.5 text-[11px] tracking-wide uppercase text-slate-600 font-semibold mb-4">
              <span className="w-4 h-px bg-white/10 inline-block" />
              Smaller projects &amp; tooling
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {sideProjects.map(sp => (
                <div
                  key={sp.name}
                  className="flex gap-3.5 p-3.5 bg-white/5 border border-white/10 rounded-xl transition-all duration-150 hover:border-white/20"
                >
                  <div className="w-8 h-8 rounded-lg bg-sky-400/10 border border-sky-400/20 flex items-center justify-center text-sky-400 text-sm shrink-0">
                    <i className={`ti ${sp.icon}`} aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-100 mb-1 tracking-tight">
                      {sp.name}
                    </div>
                    <div className="text-xs text-slate-500 leading-relaxed mb-2">
                      {sp.desc}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {sp.tags?.map(t => (
                        <span
                          key={t}
                          className="text-[10px] px-1.5 py-0.5 rounded border border-white/10 text-slate-500 bg-white/5"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MyWorkClient