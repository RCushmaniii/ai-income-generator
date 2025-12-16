export type FxQuote = {
  base: string
  target: string
  rate: number
  timeLastUpdateUnix: number | null
  timeLastUpdateUtc: string | null
}

export async function fetchFxQuote(params: {
  base: string
  target: string
}): Promise<FxQuote> {
  const query = new URLSearchParams({
    base: params.base.toUpperCase(),
    target: params.target.toUpperCase(),
  })

  const res = await fetch(`/api/fx?${query.toString()}`)
  const data: any = await res.json().catch(() => null)

  if (!res.ok || !data?.success) {
    const msg = data?.error ?? 'Unable to fetch exchange rate'
    throw new Error(msg)
  }

  return {
    base: data.base,
    target: data.target,
    rate: data.rate,
    timeLastUpdateUnix: data.timeLastUpdateUnix ?? null,
    timeLastUpdateUtc: data.timeLastUpdateUtc ?? null,
  }
}

export function convertAmount(params: {
  amount: number
  from: string
  to: string
  rateBaseToTarget: number
}): number {
  const fromCode = params.from.toUpperCase()
  const toCode = params.to.toUpperCase()

  if (fromCode === toCode) return params.amount

  if (params.rateBaseToTarget <= 0 || !Number.isFinite(params.rateBaseToTarget)) {
    return params.amount
  }

  if (fromCode === 'MXN' && toCode === 'USD') {
    return params.amount * params.rateBaseToTarget
  }

  if (fromCode === 'USD' && toCode === 'MXN') {
    return params.amount / params.rateBaseToTarget
  }

  return params.amount
}
