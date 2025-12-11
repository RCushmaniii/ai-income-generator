'use client'

import { useIncomePlannerStore } from '@/lib/store'
import { calculateIncome } from '@/lib/calculations'

export default function SummaryCards() {
  const { hourlyRate, hoursPerWeek, vacationWeeks, taxRate, currency } =
    useIncomePlannerStore()

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
          <span className="text-accent">Your</span> Income
        </h2>
        <div className="bg-background border border-muted-strong/20 rounded-xl p-6 text-center text-muted">
          Unable to calculate income. Please check your inputs.
        </div>
      </div>
    )
  }

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const summaryData = [
    {
      label: 'Per Day',
      gross: result.dailyGross,
      net: result.dailyNet,
    },
    {
      label: 'Per Week',
      gross: result.weeklyGross,
      net: result.weeklyNet,
    },
    {
      label: 'Per Month',
      gross: result.monthlyGross,
      net: result.monthlyNet,
    },
    {
      label: 'Per Year',
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

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold mb-4">
        <span className="text-accent">Your</span> Income
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
                <p className="text-xs text-muted mb-1">Gross</p>
                <p className="font-heading text-2xl font-bold">
                  {formatCurrency(item.gross)}
                </p>
              </div>

              <div>
                <p className="text-xs text-muted mb-1">Net (after tax)</p>
                <p className="font-heading text-2xl font-bold text-accent">
                  {formatCurrency(item.net)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* What-if suggestion */}
      <div className="mt-6 bg-accent/5 border border-accent/20 rounded-lg p-4">
        <p className="text-sm text-muted">
          💡{' '}
          <span className="font-medium text-foreground">What if:</span> If you
          increased your hourly rate by 10%, you&apos;d earn{' '}
          <span className="text-accent font-semibold">
            +{formatCurrency(whatIfIncrease)}
          </span>{' '}
          per year.
        </p>
      </div>
    </div>
  )
}
