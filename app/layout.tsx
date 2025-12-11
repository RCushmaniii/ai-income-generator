import type { Metadata } from 'next'
import { Space_Grotesk, Source_Serif_4 } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import Header from '@/components/Header'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-source-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'CushLabs Income Planner',
  description: 'Plan your income like a pro. Adjust your rate, hours, and taxes to see what you can realistically earn per year.',
  keywords: ['income planner', 'freelance calculator', 'hourly rate calculator', 'tax calculator'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${sourceSerif.variable}`}>
      <body>
        <Providers>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
