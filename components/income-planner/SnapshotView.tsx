'use client'

import { useIncomePlannerStore } from '@/lib/store'
import InputPanel from './InputPanel'
import SummaryCards from './SummaryCards'
import ChartPlaceholder from './ChartPlaceholder'

export default function SnapshotView() {
  const { viewMode } = useIncomePlannerStore()

  if (viewMode !== 'snapshot') return null

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <InputPanel />
      </div>
      
      <div className="space-y-8">
        <SummaryCards />
        <ChartPlaceholder />
      </div>
    </div>
  )
}
