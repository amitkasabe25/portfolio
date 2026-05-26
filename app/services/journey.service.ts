import { createClient } from '../lib/supabase/server'

export async function getJourneys() {

  const supabase = await createClient()

  const { data, error } = await supabase
    .from('journeys')
    .select(`
      *,
      journey_technologies (
        technology
      )
    `)
    .order('year', { ascending: false })

  if (error) {
    console.error(error)
    return []
  }

  return data.map((journey: any) => ({

    id: journey.id,

    year: journey.year,

    company: journey.company,

    role: journey.role,

    date: journey.date_range,

    badge: journey.badge,

    description: journey.description,

    stack:
      journey.journey_technologies?.map(
        (tech: any) => tech.technology
      ) || []

  }))
}