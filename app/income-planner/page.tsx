import Hero from '@/components/income-planner/Hero'
import ViewToggle from '@/components/income-planner/ViewToggle'
import SnapshotView from '@/components/income-planner/SnapshotView'
import ForecastView from '@/components/income-planner/ForecastView'

export const metadata = {
  title: 'Income Planner | CushLabs.ai',
  description: 'Plan your income like a pro. Adjust your rate, hours, and taxes to see what you can realistically earn per year — in MXN or USD.',
}

export default function IncomePlannerPage() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <ViewToggle />
        <SnapshotView />
        <ForecastView />
      </div>
    </div>
  )
}
