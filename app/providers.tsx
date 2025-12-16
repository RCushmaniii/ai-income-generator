'use client'

import { Toaster } from 'react-hot-toast'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { useIncomePlannerStore } from '@/lib/store'
import { useEffect } from 'react'

function ThemeSync() {
  const theme = useIncomePlannerStore((s) => s.theme)

  useEffect(() => {
    const root = document.documentElement
    const isLight = theme === 'light'

    root.classList.toggle('light', isLight)
    root.classList.toggle('dark', !isLight)
    root.style.colorScheme = isLight ? 'light' : 'dark'
  }, [theme])

  return null
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <ThemeSync />
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'var(--background)',
            color: 'var(--foreground)',
            border: '1px solid var(--muted-strong)',
          },
          success: {
            iconTheme: {
              primary: 'var(--accent)',
              secondary: 'var(--foreground)',
            },
          },
        }}
      />
    </ErrorBoundary>
  )
}
