'use client'

import { useIncomePlannerStore } from '@/lib/store'
import { generateMonthlyProjection, generateSeasonalProjection } from '@/lib/chartData'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { useState } from 'react'

export default function MonthlyProjectionChart() {
  const { scenarios, taxRate, currency } = useIncomePlannerStore()
  const [seasonalPattern, setSeasonalPattern] = useState<'steady' | 'q4-heavy' | 'summer-slow'>('steady')

  const data = generateSeasonalProjection(
    { ...scenarios.pessimistic, taxRate },
    { ...scenarios.realistic, taxRate },
    { ...scenarios.optimistic, taxRate },
    seasonalPattern
  )

  if (data.length === 0) {
    return (
      <div className="bg-background border border-muted-strong/20 rounded-xl p-6 text-center text-muted">
        Unable to generate chart data. Please check your inputs.
      </div>
    )
  }

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      notation: 'compact',
      compactDisplay: 'short',
    }).format(value)
  }

  return (
    <div className="bg-background border border-muted-strong/20 rounded-xl p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="font-heading text-2xl font-bold mb-4 md:mb-0">
          <span className="text-accent">Monthly</span> Income Projection
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
            Steady
          </button>
          <button
            onClick={() => setSeasonalPattern('q4-heavy')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              seasonalPattern === 'q4-heavy'
                ? 'bg-accent text-white'
                : 'bg-background border border-muted-strong/30 text-muted hover:text-foreground'
            }`}
          >
            Q4 Heavy
          </button>
          <button
            onClick={() => setSeasonalPattern('summer-slow')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              seasonalPattern === 'summer-slow'
                ? 'bg-accent text-white'
                : 'bg-background border border-muted-strong/30 text-muted hover:text-foreground'
            }`}
          >
            Summer Slow
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
            <XAxis
              dataKey="month"
              stroke="#888888"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              stroke="#888888"
              style={{ fontSize: '12px' }}
              tickFormatter={formatCurrency}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0A0A0A',
                border: '1px solid #2A2A2A',
                borderRadius: '8px',
                color: '#FFFFFF',
              }}
              formatter={(value: number) => formatCurrency(value)}
              labelStyle={{ color: '#AAAAAA' }}
            />
            <Legend
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="line"
            />
            <Line
              type="monotone"
              dataKey="pessimistic"
              stroke="#ef4444"
              strokeWidth={2}
              dot={{ fill: '#ef4444', r: 3 }}
              activeDot={{ r: 5 }}
              name="Pessimistic"
            />
            <Line
              type="monotone"
              dataKey="realistic"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: '#3b82f6', r: 3 }}
              activeDot={{ r: 5 }}
              name="Realistic"
            />
            <Line
              type="monotone"
              dataKey="optimistic"
              stroke="#22c55e"
              strokeWidth={2}
              dot={{ fill: '#22c55e', r: 3 }}
              activeDot={{ r: 5 }}
              name="Optimistic"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Pattern Description */}
      <div className="mt-6 p-4 bg-accent/5 border border-accent/20 rounded-lg">
        <p className="text-xs text-muted">
          {seasonalPattern === 'steady' && (
            <>
              <span className="font-semibold text-foreground">Steady:</span> Consistent income throughout the year with no seasonal variation.
            </>
          )}
          {seasonalPattern === 'q4-heavy' && (
            <>
              <span className="font-semibold text-foreground">Q4 Heavy:</span> Higher income in Q4 (Oct-Dec) due to year-end projects and budget spending. Common for consultants and B2B services.
            </>
          )}
          {seasonalPattern === 'summer-slow' && (
            <>
              <span className="font-semibold text-foreground">Summer Slow:</span> Reduced income in summer months (Jun-Aug) when clients take vacations. Common for many service businesses.
            </>
          )}
        </p>
      </div>
    </div>
  )
}
