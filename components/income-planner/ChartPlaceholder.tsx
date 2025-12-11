export default function ChartPlaceholder() {
  return (
    <div className="bg-background border border-muted-strong/20 rounded-xl p-6 md:p-8">
      <h3 className="font-heading text-xl font-bold mb-4">
        <span className="text-accent">Income</span> Breakdown
      </h3>
      
      <div className="aspect-video flex items-center justify-center border-2 border-dashed border-muted-strong/30 rounded-lg">
        <div className="text-center">
          <svg
            className="w-16 h-16 mx-auto mb-3 text-muted-strong"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          <p className="text-sm text-muted-strong">
            Income chart coming soon
          </p>
        </div>
      </div>
    </div>
  )
}
