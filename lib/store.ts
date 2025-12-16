'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { validateAndClampConfig, IncomeConfig } from './calculations'

export type Currency = 'MXN' | 'USD'
export type Language = 'en' | 'es'
export type ViewMode = 'snapshot' | 'forecast'
export type Theme = 'light' | 'dark'
export type FxStatus = 'idle' | 'loading' | 'ready' | 'error'

function getInitialTheme(): Theme {
  try {
    if (typeof window === 'undefined') return 'dark'
    if (typeof window.matchMedia !== 'function') return 'dark'
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  } catch {
    return 'dark'
  }
}

export interface ScenarioInputs {
  hourlyRate: number
  hoursPerWeek: number
  vacationWeeks: number
}

export interface IncomePlannerState {
  // View mode
  viewMode: ViewMode

  // Snapshot mode - single scenario (current inputs)
  hourlyRate: number
  hoursPerWeek: number
  vacationWeeks: number
  taxRate: number
  targetAnnualNet: number | null
  currency: Currency
  language: Language

  // UI
  theme: Theme

  // FX
  mxnToUsdRate: number | null
  mxnToUsdRateUpdatedAt: number | null
  fxStatus: FxStatus

  // Forecast mode - three scenarios
  scenarios: {
    pessimistic: ScenarioInputs
    realistic: ScenarioInputs
    optimistic: ScenarioInputs
  }

  // Actions
  setViewMode: (mode: ViewMode) => void
  setHourlyRate: (value: number) => void
  setHoursPerWeek: (value: number) => void
  setVacationWeeks: (value: number) => void
  setTaxRate: (value: number) => void
  setTargetAnnualNet: (value: number | null) => void
  setCurrency: (currency: Currency) => void
  switchCurrency: (nextCurrency: Currency, mxnToUsdRate: number | null) => void
  setLanguage: (language: Language) => void
  setTheme: (theme: Theme) => void
  setFxStatus: (status: FxStatus) => void
  setMxnToUsdRate: (rate: number | null, updatedAt: number | null) => void
  setScenario: (
    scenario: 'pessimistic' | 'realistic' | 'optimistic',
    inputs: Partial<ScenarioInputs>
  ) => void
  resetToDefaults: () => void
  getConfig: () => IncomeConfig
}

const DEFAULT_CONFIG: IncomeConfig = {
  hourlyRate: 500,
  hoursPerWeek: 40,
  vacationWeeks: 2,
  taxRate: 25,
}

/**
 * Zustand store for Income Planner state
 *
 * Manages:
 * - Input values (rate, hours, vacation, tax)
 * - Target annual net income
 * - Currency and language preferences
 *
 * All numeric inputs are validated and clamped on set.
 */
export const useIncomePlannerStore = create<IncomePlannerState>()(
  persist(
    (set, get) => ({
      // Initial state
      viewMode: 'snapshot',
      hourlyRate: DEFAULT_CONFIG.hourlyRate,
      hoursPerWeek: DEFAULT_CONFIG.hoursPerWeek,
      vacationWeeks: DEFAULT_CONFIG.vacationWeeks,
      taxRate: DEFAULT_CONFIG.taxRate,
      targetAnnualNet: null,
      currency: 'MXN',
      language: 'en',

      // UI
      theme: getInitialTheme(),

      // FX
      mxnToUsdRate: null,
      mxnToUsdRateUpdatedAt: null,
      fxStatus: 'idle',

      // Forecast scenarios with smart defaults
      scenarios: {
        pessimistic: {
          hourlyRate: DEFAULT_CONFIG.hourlyRate * 0.8,
          hoursPerWeek: 25,
          vacationWeeks: 6,
        },
        realistic: {
          hourlyRate: DEFAULT_CONFIG.hourlyRate,
          hoursPerWeek: DEFAULT_CONFIG.hoursPerWeek,
          vacationWeeks: DEFAULT_CONFIG.vacationWeeks,
        },
        optimistic: {
          hourlyRate: DEFAULT_CONFIG.hourlyRate * 1.2,
          hoursPerWeek: 45,
          vacationWeeks: 1,
        },
      },

      // Actions with validation
      setViewMode: (mode: ViewMode) => {
        set({ viewMode: mode })
      },

      setHourlyRate: (value: number) => {
        const validated = validateAndClampConfig({ hourlyRate: value })
        set({ hourlyRate: validated.hourlyRate })
      },

      setHoursPerWeek: (value: number) => {
        const validated = validateAndClampConfig({ hoursPerWeek: value })
        set({ hoursPerWeek: validated.hoursPerWeek })
      },

      setVacationWeeks: (value: number) => {
        const validated = validateAndClampConfig({ vacationWeeks: value })
        set({ vacationWeeks: validated.vacationWeeks })
      },

      setTaxRate: (value: number) => {
        const validated = validateAndClampConfig({ taxRate: value })
        set({ taxRate: validated.taxRate })
      },

      setTargetAnnualNet: (value: number | null) => {
        set({ targetAnnualNet: value })
      },

      setCurrency: (currency: Currency) => {
        set({ currency })
      },

      switchCurrency: (nextCurrency: Currency, mxnToUsdRate: number | null) => {
        const state = get()
        const currentCurrency = state.currency
        if (nextCurrency === currentCurrency) return

        const rate = mxnToUsdRate
        const canConvert =
          typeof rate === 'number' && Number.isFinite(rate) && rate > 0

        const convert = (amount: number): number => {
          if (!canConvert) return amount
          if (currentCurrency === 'MXN' && nextCurrency === 'USD') return amount * rate
          if (currentCurrency === 'USD' && nextCurrency === 'MXN') return amount / rate
          return amount
        }

        const nextSnapshot = validateAndClampConfig({
          hourlyRate: convert(state.hourlyRate),
          hoursPerWeek: state.hoursPerWeek,
          vacationWeeks: state.vacationWeeks,
          taxRate: state.taxRate,
        })

        const nextPessimistic = validateAndClampConfig({
          hourlyRate: convert(state.scenarios.pessimistic.hourlyRate),
          hoursPerWeek: state.scenarios.pessimistic.hoursPerWeek,
          vacationWeeks: state.scenarios.pessimistic.vacationWeeks,
          taxRate: state.taxRate,
        })

        const nextRealistic = validateAndClampConfig({
          hourlyRate: convert(state.scenarios.realistic.hourlyRate),
          hoursPerWeek: state.scenarios.realistic.hoursPerWeek,
          vacationWeeks: state.scenarios.realistic.vacationWeeks,
          taxRate: state.taxRate,
        })

        const nextOptimistic = validateAndClampConfig({
          hourlyRate: convert(state.scenarios.optimistic.hourlyRate),
          hoursPerWeek: state.scenarios.optimistic.hoursPerWeek,
          vacationWeeks: state.scenarios.optimistic.vacationWeeks,
          taxRate: state.taxRate,
        })

        set({
          currency: nextCurrency,
          hourlyRate: nextSnapshot.hourlyRate,
          hoursPerWeek: nextSnapshot.hoursPerWeek,
          vacationWeeks: nextSnapshot.vacationWeeks,
          taxRate: nextSnapshot.taxRate,
          targetAnnualNet:
            state.targetAnnualNet === null
              ? null
              : Math.round(convert(state.targetAnnualNet)),
          scenarios: {
            pessimistic: {
              hourlyRate: nextPessimistic.hourlyRate,
              hoursPerWeek: nextPessimistic.hoursPerWeek,
              vacationWeeks: nextPessimistic.vacationWeeks,
            },
            realistic: {
              hourlyRate: nextRealistic.hourlyRate,
              hoursPerWeek: nextRealistic.hoursPerWeek,
              vacationWeeks: nextRealistic.vacationWeeks,
            },
            optimistic: {
              hourlyRate: nextOptimistic.hourlyRate,
              hoursPerWeek: nextOptimistic.hoursPerWeek,
              vacationWeeks: nextOptimistic.vacationWeeks,
            },
          },
        })
      },

      setLanguage: (language: Language) => {
        set({ language })
      },

      setTheme: (theme: Theme) => {
        set({ theme })
      },

      setFxStatus: (status: FxStatus) => {
        set({ fxStatus: status })
      },

      setMxnToUsdRate: (rate: number | null, updatedAt: number | null) => {
        set({ mxnToUsdRate: rate, mxnToUsdRateUpdatedAt: updatedAt })
      },

      setScenario: (
        scenario: 'pessimistic' | 'realistic' | 'optimistic',
        inputs: Partial<ScenarioInputs>
      ) => {
        const state = get()
        const validated = validateAndClampConfig({
          hourlyRate: inputs.hourlyRate ?? state.scenarios[scenario].hourlyRate,
          hoursPerWeek:
            inputs.hoursPerWeek ?? state.scenarios[scenario].hoursPerWeek,
          vacationWeeks:
            inputs.vacationWeeks ?? state.scenarios[scenario].vacationWeeks,
          taxRate: state.taxRate,
        })

        set({
          scenarios: {
            ...state.scenarios,
            [scenario]: {
              hourlyRate: validated.hourlyRate,
              hoursPerWeek: validated.hoursPerWeek,
              vacationWeeks: validated.vacationWeeks,
            },
          },
        })
      },

      resetToDefaults: () => {
        set({
          hourlyRate: DEFAULT_CONFIG.hourlyRate,
          hoursPerWeek: DEFAULT_CONFIG.hoursPerWeek,
          vacationWeeks: DEFAULT_CONFIG.vacationWeeks,
          taxRate: DEFAULT_CONFIG.taxRate,
          targetAnnualNet: null,
        })
      },

      getConfig: () => {
        const state = get()
        return {
          hourlyRate: state.hourlyRate,
          hoursPerWeek: state.hoursPerWeek,
          vacationWeeks: state.vacationWeeks,
          taxRate: state.taxRate,
        }
      },
    }),
    {
      name: 'income-planner-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        hourlyRate: state.hourlyRate,
        hoursPerWeek: state.hoursPerWeek,
        vacationWeeks: state.vacationWeeks,
        taxRate: state.taxRate,
        currency: state.currency,
        language: state.language,
        scenarios: state.scenarios,
        viewMode: state.viewMode,
        theme: state.theme,
        mxnToUsdRate: state.mxnToUsdRate,
        mxnToUsdRateUpdatedAt: state.mxnToUsdRateUpdatedAt,
      }),
    }
  )
)
