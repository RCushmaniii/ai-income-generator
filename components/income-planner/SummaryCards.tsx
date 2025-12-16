'use client'

import { useIncomePlannerStore } from '@/lib/store'
import { calculateIncome } from '@/lib/calculations'
import { useTranslation } from '@/lib/i18n/translations'
import { formatCurrency } from '@/lib/formatters'

export default function SummaryCards() {
  const { hourlyRate, hoursPerWeek, vacationWeeks, taxRate, currency, language } =
    useIncomePlannerStore()

  const t = useTranslation(language)

  const result = calculateIncome({
    hourlyRate,
    hoursPerWeek,
    vacationWeeks,
    taxRate,
  })

  if ('error' in result) {
    return (
      <div>
        <h2 className="font-heading text-2xl font-bold mb-4">
          {t.summary.title}
        </h2>
        <div className="bg-background border border-muted-strong/20 rounded-xl p-6 text-center text-muted">
          {t.errors.unableToCalculateIncome}
        </div>
      </div>
    )
  }

  const formatMoney = (value: number): string => {
    return formatCurrency({ value, currency, language, maximumFractionDigits: 0 })
  }

  const summaryData = [
    {
      label: t.summary.perDay,
      gross: result.dailyGross,
      net: result.dailyNet,
    },
    {
      label: t.summary.perWeek,
      gross: result.weeklyGross,
      net: result.weeklyNet,
    },
    {
      label: t.summary.perMonth,
      gross: result.monthlyGross,
      net: result.monthlyNet,
    },
    {
      label: t.summary.perYear,
      gross: result.annualGross,
      net: result.annualNet,
    },
  ]

  // Calculate what-if: 10% rate increase
  const rateIncrease = calculateIncome({
    hourlyRate: hourlyRate * 1.1,
    hoursPerWeek,
    vacationWeeks,
    taxRate,
  })

  const whatIfIncrease =
    'error' in rateIncrease
      ? 0
      : rateIncrease.annualNet - result.annualNet

  const showWhatIf = false

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold mb-4">
        {t.summary.title}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {summaryData.map((item) => (
          <div
            key={item.label}
            className="bg-background border border-muted-strong/20 rounded-xl p-6 hover:border-accent hover:shadow-lg hover:shadow-accent/10 transition-all"
          >
            <h3 className="text-sm font-medium text-muted-strong mb-3">
              {item.label}
            </h3>

            <div className="space-y-2">
              <div>
                <p className="text-xs text-muted mb-1">{t.summary.gross}</p>
                <p className="font-heading text-2xl font-bold">
                  {formatMoney(item.gross)}
                </p>
              </div>

              <div>
                <p className="text-xs text-muted mb-1">{t.summary.netAfterTax}</p>
                <p className="font-heading text-2xl font-bold text-accent">
                  {formatMoney(item.net)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* What-if suggestion */}
      {showWhatIf && (
        <div className="mt-6 bg-accent/5 border border-accent/20 rounded-lg p-4">
          <p className="text-sm text-muted">
            💡{' '}
            <span className="font-medium text-foreground">{t.summary.whatIf}</span>{' '}
            {t.summary.whatIfText}{' '}
            <span className="text-accent font-semibold">
              +{formatMoney(whatIfIncrease)}
            </span>{' '}
            {t.summary.whatIfSuffix}
          </p>
        </div>
      )}
    </div>
  )
}
