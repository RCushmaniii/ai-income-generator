'use client'

import { useIncomePlannerStore } from '@/lib/store'
import ScenarioBuilder from './ScenarioBuilder'
import RangeVisualization from './RangeVisualization'
import ForecastInsights from './ForecastInsights'

export default function ForecastView() {
  const { viewMode } = useIncomePlannerStore()

  if (viewMode !== 'forecast') return null

  return (
    <div className="space-y-8">
      <ScenarioBuilder />
      <RangeVisualization />
      <ForecastInsights />
    </div>
  )
}
