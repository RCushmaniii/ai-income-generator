import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center">
      <div className="container mx-auto px-4 py-16 max-w-5xl text-center">
        {/* CushLabs branding dot */}
        <div className="flex items-center justify-center gap-2 mb-12">
          <div className="w-2 h-2 rounded-full bg-accent"></div>
          <span className="text-xs font-semibold tracking-widest text-muted-strong">
            CUSHLABS.AI
          </span>
        </div>

        {/* Main headline */}
        <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight">
          <span className="text-accent">AI Integration</span> &{' '}
          <span className="text-foreground">Modern Software Development</span>{' '}
          <span className="text-foreground">for SMBs</span>
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-muted max-w-3xl mx-auto mb-12 leading-relaxed">
          I help businesses leverage AI, automate workflows, and build modern
          tools that are ready for real-world use.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link
            href="/income-planner"
            className="bg-accent hover:bg-accent/90 text-white font-semibold px-8 py-4 rounded-lg transition-all shadow-lg shadow-accent/20 inline-block"
          >
            Try Income Planner
          </Link>
          <a
            href="#projects"
            className="bg-background border border-muted-strong/30 text-foreground hover:border-accent/50 font-semibold px-8 py-4 rounded-lg transition-all inline-block"
          >
            View Projects
          </a>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-background border border-muted-strong/20 rounded-xl p-6 hover:border-accent/30 transition-colors">
            <div className="text-accent text-3xl mb-3">⚡</div>
            <h3 className="font-heading text-lg font-bold mb-2">
              Fast Delivery
            </h3>
            <p className="text-sm text-muted">
              Production-ready systems in weeks, not months. Direct access, no
              handoffs.
            </p>
          </div>

          <div className="bg-background border border-muted-strong/20 rounded-xl p-6 hover:border-accent/30 transition-colors">
            <div className="text-accent text-3xl mb-3">🎯</div>
            <h3 className="font-heading text-lg font-bold mb-2">
              Built for Real Use
            </h3>
            <p className="text-sm text-muted">
              Clean code, proper testing, and documentation. No shortcuts or
              prototypes.
            </p>
          </div>

          <div className="bg-background border border-muted-strong/20 rounded-xl p-6 hover:border-accent/30 transition-colors">
            <div className="text-accent text-3xl mb-3">🤝</div>
            <h3 className="font-heading text-lg font-bold mb-2">
              Personal & Direct
            </h3>
            <p className="text-sm text-muted">
              One experienced builder. 25+ years of enterprise depth. You work
              directly with me.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
