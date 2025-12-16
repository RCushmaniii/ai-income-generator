'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useIncomePlannerStore } from '@/lib/store'
import { useTranslation } from '@/lib/i18n/translations'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  const { language } = useIncomePlannerStore()
  const t = useTranslation(language)
  const pathname = usePathname()

  const linkClass = (href: string): string => {
    const isActive = pathname === href
    return `text-sm transition-colors ${
      isActive
        ? 'text-foreground'
        : 'text-muted hover:text-foreground'
    }`
  }

  return (
    <header className="border-b border-muted-strong/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 font-heading text-xl font-bold hover:text-accent transition-colors">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
            <span>{t.header.title}</span>
          </Link>
          <div className="flex items-center gap-6">
            <nav className="flex gap-6">
              <Link href="/" className={linkClass('/')}
              >
                {t.header.home}
              </Link>
              <Link href="/income-planner" className={linkClass('/income-planner')}>
                {t.header.incomePlanner}
              </Link>
              <Link href="/about" className={linkClass('/about')}>
                {t.header.about}
              </Link>
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
