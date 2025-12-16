export function getLocale(language: 'en' | 'es'): string {
  return language === 'es' ? 'es-MX' : 'en-US'
}

export function formatCurrency(params: {
  value: number
  currency: string
  language: 'en' | 'es'
  compact?: boolean
  maximumFractionDigits?: number
  minimumFractionDigits?: number
}): string {
  const {
    value,
    currency,
    language,
    compact = false,
    maximumFractionDigits = 0,
    minimumFractionDigits = 0,
  } = params

  const safeValue = Number.isFinite(value) ? value : 0

  try {
    return new Intl.NumberFormat(getLocale(language), {
      style: 'currency',
      currency,
      minimumFractionDigits,
      maximumFractionDigits,
      ...(compact
        ? {
            notation: 'compact' as const,
            compactDisplay: 'short' as const,
          }
        : {}),
    }).format(safeValue)
  } catch {
    return `${currency} ${Math.round(safeValue)}`
  }
}
