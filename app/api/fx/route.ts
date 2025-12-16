import { NextResponse } from 'next/server'

function isCurrencyCode(value: string): boolean {
  return /^[A-Z]{3}$/.test(value)
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const baseParam = url.searchParams.get('base') ?? 'MXN'
    const targetParam = url.searchParams.get('target') ?? 'USD'

    const base = baseParam.toUpperCase()
    const target = targetParam.toUpperCase()

    if (!isCurrencyCode(base) || !isCurrencyCode(target)) {
      return NextResponse.json(
        { success: false, error: 'Invalid currency code' },
        { status: 400 }
      )
    }

    const apiKey = process.env.EXCHANGE_RATE_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: 'Missing EXCHANGE_RATE_API_KEY' },
        { status: 500 }
      )
    }

    const endpoint = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${base}`

    const res = await fetch(endpoint, {
      headers: {
        Accept: 'application/json',
      },
      next: {
        revalidate: 60 * 60,
      },
    })

    if (!res.ok) {
      return NextResponse.json(
        { success: false, error: `ExchangeRate API error: ${res.status}` },
        { status: 502 }
      )
    }

    const data: any = await res.json()

    if (data?.result !== 'success') {
      return NextResponse.json(
        { success: false, error: data?.['error-type'] ?? 'Unknown error' },
        { status: 502 }
      )
    }

    const rate = data?.conversion_rates?.[target]
    if (typeof rate !== 'number' || !Number.isFinite(rate) || rate <= 0) {
      return NextResponse.json(
        { success: false, error: 'Missing conversion rate' },
        { status: 502 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        base,
        target,
        rate,
        timeLastUpdateUnix: data?.time_last_update_unix ?? null,
        timeLastUpdateUtc: data?.time_last_update_utc ?? null,
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      }
    )
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch exchange rate' },
      { status: 500 }
    )
  }
}
