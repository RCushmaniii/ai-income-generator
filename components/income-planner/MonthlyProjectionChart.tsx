'use client'

import { useIncomePlannerStore } from '@/lib/store'
import { useTranslation } from '@/lib/i18n/translations'
import { generateSeasonalProjection } from '@/lib/chartData'
import { formatCurrency } from '@/lib/formatters'
import {
  LineChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts'
import { useState } from 'react'

export default function MonthlyProjectionChart() {
  const { scenarios, taxRate, targetAnnualNet, currency, language } = useIncomePlannerStore()
  const t = useTranslation(language)
  const [seasonalPattern, setSeasonalPattern] = useState<'steady' | 'q4-heavy' | 'summer-slow'>('steady')

  const data = generateSeasonalProjection(
    { ...scenarios.pessimistic, taxRate },
    { ...scenarios.realistic, taxRate },
    { ...scenarios.optimistic, taxRate },
    seasonalPattern
  )

  const dataWithRange = data.map((d) => ({
    ...d,
    rangeBand: Math.max(0, d.optimistic - d.pessimistic),
  }))

  if (dataWithRange.length === 0) {
    return (
      <div className="bg-background border border-muted-strong/20 rounded-xl p-6 text-center text-muted">
        {t.errors.unableToGenerateChartData}
      </div>
    )
  }

  const formatMoneyCompact = (value: number): string => {
    return formatCurrency({
      value,
      currency,
      language,
      compact: true,
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    })
  }

  const formatMoney = (value: number): string => {
    return formatCurrency({ value, currency, language, maximumFractionDigits: 0, minimumFractionDigits: 0 })
  }

  const targetMonthly =
    typeof targetAnnualNet === 'number' && Number.isFinite(targetAnnualNet) && targetAnnualNet > 0
      ? targetAnnualNet / 12
      : null

  return (
    <div className="bg-background border border-muted-strong/20 rounded-xl p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="font-heading text-2xl font-bold mb-4 md:mb-0">
          {t.chart.title}
        </h2>

        {/* Seasonal Pattern Toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => setSeasonalPattern('steady')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              seasonalPattern === 'steady'
                ? 'bg-accent text-white'
                : 'bg-background border border-muted-strong/30 text-muted hover:text-foreground'
            }`}
          >
            {t.chart.steady}
          </button>
          <button
            onClick={() => setSeasonalPattern('q4-heavy')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              seasonalPattern === 'q4-heavy'
                ? 'bg-accent text-white'
                : 'bg-background border border-muted-strong/30 text-muted hover:text-foreground'
            }`}
          >
            {t.chart.q4Heavy}
          </button>
          <button
            onClick={() => setSeasonalPattern('summer-slow')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              seasonalPattern === 'summer-slow'
                ? 'bg-accent text-white'
                : 'bg-background border border-muted-strong/30 text-muted hover:text-foreground'
            }`}
          >
            {t.chart.summerSlow}
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={dataWithRange}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--muted-strong)" opacity={0.25} />
            <XAxis
              dataKey="month"
              stroke="var(--muted-strong)"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              stroke="var(--muted-strong)"
              style={{ fontSize: '12px' }}
              tickFormatter={formatMoneyCompact}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--background)',
                border: '1px solid var(--muted-strong)',
                borderRadius: '8px',
                color: 'var(--foreground)',
              }}
              formatter={(value, name) => {
                const n = typeof value === 'number' && Number.isFinite(value) ? value : 0

                if (name === 'rangeBand') {
                  return [formatMoney(n), t.chartLegend.rangeBand]
                }
                if (name === 'pessimistic') {
                  return [formatMoney(n), t.chartLegend.pessimistic]
                }
                if (name === 'realistic') {
                  return [formatMoney(n), t.chartLegend.realistic]
                }
                if (name === 'optimistic') {
                  return [formatMoney(n), t.chartLegend.optimistic]
                }
                return [formatMoney(n), name]
              }}
              labelStyle={{ color: 'var(--muted)' }}
            />
            <Legend
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="line"
            />

            <Area
              type="monotone"
              dataKey="pessimistic"
              stackId="range"
              stroke="transparent"
              fill="transparent"
              activeDot={false}
              name={t.chartLegend.pessimistic}
            />
            <Area
              type="monotone"
              dataKey="rangeBand"
              stackId="range"
              stroke="transparent"
              fill="var(--accent)"
              fillOpacity={0.12}
              activeDot={false}
              name={t.chartLegend.rangeBand}
            />

            {typeof targetMonthly === 'number' && (
              <ReferenceLine
                y={targetMonthly}
                stroke="var(--accent)"
                strokeDasharray="6 6"
                strokeWidth={2}
                ifOverflow="extendDomain"
                label={{
                  value: t.chartLegend.target,
                  position: 'insideTopRight',
                  fill: 'var(--accent)',
                  fontSize: 12,
                }}
              />
            )}

            <Line
              type="monotone"
              dataKey="realistic"
              stroke="var(--chart-realistic)"
              strokeWidth={2}
              dot={{ fill: 'var(--chart-realistic)', r: 3 }}
              activeDot={{ r: 5 }}
              name={t.chartLegend.realistic}
            />
            <Line
              type="monotone"
              dataKey="optimistic"
              stroke="var(--chart-optimistic)"
              strokeWidth={2}
              dot={{ fill: 'var(--chart-optimistic)', r: 3 }}
              activeDot={{ r: 5 }}
              name={t.chartLegend.optimistic}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Pattern Description */}
      <div className="mt-6 p-4 bg-accent/5 border border-accent/20 rounded-lg">
        <p className="text-xs text-muted">
          {seasonalPattern === 'steady' && t.chart.steadyDesc}
          {seasonalPattern === 'q4-heavy' && t.chart.q4HeavyDesc}
          {seasonalPattern === 'summer-slow' && t.chart.summerSlowDesc}
        </p>
      </div>
    </div>
  )
}
