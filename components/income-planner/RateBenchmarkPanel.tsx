'use client'

import { useIncomePlannerStore } from '@/lib/store'
import { useTranslation } from '@/lib/i18n/translations'
import { calculateIncome } from '@/lib/calculations'
import { formatCurrency } from '@/lib/formatters'
import { convertAmount } from '@/lib/fx'

type Currency = 'MXN' | 'USD'

type MoneyByCurrency = Record<Currency, number>

type BenchmarkBand = {
  key: 'international' | 'universities' | 'private' | 'public' | 'language'
  minMonthly: MoneyByCurrency
  maxMonthly: MoneyByCurrency
}

const benchmarkBands: BenchmarkBand[] = [
  {
    key: 'international',
    minMonthly: { MXN: 35000, USD: 1925 },
    maxMonthly: { MXN: 50000, USD: 2750 },
  },
  {
    key: 'universities',
    minMonthly: { MXN: 20000, USD: 1100 },
    maxMonthly: { MXN: 40000, USD: 2200 },
  },
  {
    key: 'private',
    minMonthly: { MXN: 15000, USD: 825 },
    maxMonthly: { MXN: 30000, USD: 1650 },
  },
  {
    key: 'public',
    minMonthly: { MXN: 10000, USD: 550 },
    maxMonthly: { MXN: 20000, USD: 1100 },
  },
  {
    key: 'language',
    minMonthly: { MXN: 10000, USD: 550 },
    maxMonthly: { MXN: 25000, USD: 1375 },
  },
]

function clamp(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min
  if (value < min) return min
  if (value > max) return max
  return value
}

export default function RateBenchmarkPanel() {
  const { hourlyRate, hoursPerWeek, vacationWeeks, taxRate, currency, language, mxnToUsdRate } =
    useIncomePlannerStore()

  const t = useTranslation(language)

  const income = calculateIncome({
    hourlyRate,
    hoursPerWeek,
    vacationWeeks,
    taxRate,
  })

  const currencyCode = currency as Currency

  const formatMoney = (value: number): string => {
    return formatCurrency({ value, currency: currencyCode, language, maximumFractionDigits: 0 })
  }

  const youMonthlyNet = 'error' in income ? null : income.monthlyNet

  const tutoringMinMxn = 200
  const tutoringMaxMxn = 500

  const fxReady =
    typeof mxnToUsdRate === 'number' && Number.isFinite(mxnToUsdRate) && mxnToUsdRate > 0

  const tutoringMin =
    currencyCode === 'USD' && fxReady
      ? convertAmount({
          amount: tutoringMinMxn,
          from: 'MXN',
          to: 'USD',
          rateBaseToTarget: mxnToUsdRate,
        })
      : tutoringMinMxn

  const tutoringMax =
    currencyCode === 'USD' && fxReady
      ? convertAmount({
          amount: tutoringMaxMxn,
          from: 'MXN',
          to: 'USD',
          rateBaseToTarget: mxnToUsdRate,
        })
      : tutoringMaxMxn

  const mins = benchmarkBands.map((b) => b.minMonthly[currencyCode])
  const maxs = benchmarkBands.map((b) => b.maxMonthly[currencyCode])

  const globalMin = Math.min(...mins)
  const globalMax = Math.max(...maxs)
  const denom = Math.max(1, globalMax - globalMin)

  const youPos =
    typeof youMonthlyNet === 'number'
      ? ((clamp(youMonthlyNet, globalMin, globalMax) - globalMin) / denom) * 100
      : null

  return (
    <section className="bg-background border border-muted-strong/20 rounded-xl p-6 md:p-8">
      <header className="mb-6">
        <h3 className="font-heading text-xl font-bold">{t.rateBenchmark.title}</h3>
        <p className="text-sm text-muted mt-2">{t.rateBenchmark.subtitle}</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between gap-4 mb-3">
            <h4 className="font-heading text-sm font-semibold text-foreground">
              {t.rateBenchmark.monthlyRangesTitle}
            </h4>
            {typeof youMonthlyNet === 'number' && (
              <p className="text-xs text-muted">
                <span className="font-semibold text-foreground">{t.rateBenchmark.you}</span>{' '}
                {formatMoney(youMonthlyNet)} {t.rateBenchmark.perMonthNet}
              </p>
            )}
          </div>

          <div className="space-y-4">
            {benchmarkBands.map((band) => {
              const min = band.minMonthly[currencyCode]
              const max = band.maxMonthly[currencyCode]

              const leftPct = ((min - globalMin) / denom) * 100
              const widthPct = ((max - min) / denom) * 100

              return (
                <div key={band.key} className="space-y-2">
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="text-sm font-semibold text-foreground">
                      {t.rateBenchmark.institutions[band.key]}
                    </p>
                    <p className="text-sm text-muted">
                      {formatMoney(min)}–{formatMoney(max)}
                    </p>
                  </div>

                  <div className="relative h-3 rounded-full bg-muted-strong/15 overflow-hidden">
                    <div
                      className="absolute top-0 h-full rounded-full bg-accent/40"
                      style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
                    />
                    {typeof youPos === 'number' && (
                      <div
                        className="absolute top-0 h-full w-0.5 bg-accent"
                        style={{ left: `${youPos}%` }}
                        aria-label={t.rateBenchmark.youMarker}
                      />
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          <p className="text-xs text-muted mt-5">{t.rateBenchmark.disclaimer}</p>
        </div>

        <aside className="space-y-4">
          <div className="border border-muted-strong/20 rounded-lg p-4">
            <h4 className="font-heading text-sm font-semibold text-foreground mb-2">
              {t.rateBenchmark.tutoringTitle}
            </h4>
            <p className="text-sm text-muted">
              {t.rateBenchmark.tutoringPrivateLessons}{' '}
              <span className="font-semibold text-foreground">
                {formatMoney(tutoringMin)}–{formatMoney(tutoringMax)}
              </span>{' '}
              {t.rateBenchmark.perHour}
            </p>
            {currencyCode === 'USD' && !fxReady && (
              <p className="text-xs text-muted mt-2">{t.rateBenchmark.fxUnavailable}</p>
            )}
            <p className="text-xs text-muted mt-2">{t.rateBenchmark.tutoringNote}</p>
          </div>

          <div className="border border-muted-strong/20 rounded-lg p-4">
            <h4 className="font-heading text-sm font-semibold text-foreground mb-2">
              {t.rateBenchmark.factorsTitle}
            </h4>
            <ul className="text-sm text-muted space-y-2">
              <li>{t.rateBenchmark.factors.experience}</li>
              <li>{t.rateBenchmark.factors.schoolType}</li>
              <li>{t.rateBenchmark.factors.hours}</li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  )
}
