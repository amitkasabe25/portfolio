import { getJourneys } from '../services/journey.service'
import JourneyClient from './JourneyClient'

const Journey = async () => {

  const journeys = await getJourneys()

  return (
    <JourneyClient journeys={journeys} />
  )
}

export default Journey