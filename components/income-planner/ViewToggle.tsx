'use client'

import { useIncomePlannerStore } from '@/lib/store'

export default function ViewToggle() {
  const { viewMode, setViewMode } = useIncomePlannerStore()

  return (
    <div className="flex justify-center mb-8">
      <div className="inline-flex bg-background border border-muted-strong/20 rounded-lg p-1">
        <button
          onClick={() => setViewMode('snapshot')}
          className={`px-6 py-2 rounded-md font-semibold transition-all ${
            viewMode === 'snapshot'
              ? 'bg-accent text-white shadow-lg shadow-accent/20'
              : 'text-muted hover:text-foreground'
          }`}
        >
          Snapshot
        </button>
        <button
          onClick={() => setViewMode('forecast')}
          className={`px-6 py-2 rounded-md font-semibold transition-all ${
            viewMode === 'forecast'
              ? 'bg-accent text-white shadow-lg shadow-accent/20'
              : 'text-muted hover:text-foreground'
          }`}
        >
          Forecast
        </button>
      </div>
    </div>
  )
}
