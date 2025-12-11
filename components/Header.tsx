import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b border-muted-strong/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-heading text-xl font-bold hover:text-accent transition-colors">
            CushLabs.ai
          </Link>
          <nav className="flex gap-6">
            <Link href="/income-planner" className="text-sm text-muted hover:text-foreground transition-colors">
              Income Planner
            </Link>
            <Link href="#" className="text-sm text-muted hover:text-foreground transition-colors">
              Projects
            </Link>
            <Link href="#" className="text-sm text-muted hover:text-foreground transition-colors">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
