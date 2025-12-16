'use client'

import { useIncomePlannerStore } from '@/lib/store'
import { useTranslation } from '@/lib/i18n/translations'

export default function AboutPage() {
  const { language } = useIncomePlannerStore()
  const t = useTranslation(language)

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="mb-10">
        <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight">
          {t.about.title}
        </h1>
        <p className="mt-4 text-lg text-muted leading-relaxed">
          {t.about.subtitle}
        </p>
      </div>

      <div className="space-y-8">
        <section className="bg-background border border-muted-strong/20 rounded-xl p-6 md:p-8">
          <h2 className="font-heading text-2xl font-bold mb-3">
            {t.about.whatIsTitle}
          </h2>
          <p className="text-muted leading-relaxed">
            {t.about.whatIsBody}
          </p>
        </section>

        <section className="bg-background border border-muted-strong/20 rounded-xl p-6 md:p-8">
          <h2 className="font-heading text-2xl font-bold mb-3">
            {t.about.whoIsForTitle}
          </h2>
          <p className="text-muted leading-relaxed">
            {t.about.whoIsForBody}
          </p>
        </section>

        <section className="bg-background border border-muted-strong/20 rounded-xl p-6 md:p-8">
          <h2 className="font-heading text-2xl font-bold mb-3">
            {t.about.howToUseTitle}
          </h2>
          <p className="text-muted leading-relaxed">
            {t.about.howToUseBody}
          </p>
        </section>

        <section className="bg-background border border-muted-strong/20 rounded-xl p-6 md:p-8">
          <h2 className="font-heading text-2xl font-bold mb-3">
            {t.about.privacyTitle}
          </h2>
          <p className="text-muted leading-relaxed">
            {t.about.privacyBody}
          </p>
        </section>
      </div>
    </div>
  )
}
