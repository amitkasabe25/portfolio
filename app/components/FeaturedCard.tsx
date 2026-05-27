'use client'

import { useEffect, useState } from 'react'
import { createClient } from '../lib/supabase/client'


export interface FeaturedCard {
  id: number
  badge: string
  title: string
  description: string
  display_order: number
  is_active: boolean
}

const FeaturedCards = () => {
  const [cards, setCards] = useState<FeaturedCard[]>([])

  useEffect(() => {
    const fetchCards = async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('featured_cards')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true })

      if (!error && data) setCards(data)
    }

    fetchCards()
  }, [])

  if (cards.length === 0) return null

  return (
    <div className="flex flex-wrap justify-center gap-2.5">
      {cards.map((card) => (
        <div
          key={card.id}
          className="flex items-center gap-3 py-2.5 px-4 rounded-xl bg-white/5 border border-white/10 hover:-translate-y-0.5 hover:border-sky-400/30 hover:bg-white/[0.07] transition-all duration-200 cursor-default"
        >
          <div className="w-9 h-9 rounded-xl bg-sky-400/10 border border-sky-400/20 flex items-center justify-center text-sky-300 font-bold text-xs shrink-0">
            {card.badge}
          </div>
          <div>
            <div className="text-[11px] tracking-wide uppercase font-semibold">
              {card.title}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              {card.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default FeaturedCards