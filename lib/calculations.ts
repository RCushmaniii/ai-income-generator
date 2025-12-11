/**
 * Income Planner Calculation Utilities
 * 
 * Pure functions for calculating income based on hourly rate, hours per week,
 * vacation weeks, and tax rate. All functions are side-effect free and fully testable.
 */

export interface IncomeConfig {
  hourlyRate: number
  hoursPerWeek: number
  vacationWeeks: number
  taxRate: number
}

export interface IncomeResult {
  dailyGross: number
  dailyNet: number
  weeklyGross: number
  weeklyNet: number
  monthlyGross: number
  monthlyNet: number
  annualGross: number
  annualNet: number
}

export interface CalculationError {
  success: false
  error: string
}

/**
 * Calculate income at various intervals (daily, weekly, monthly, annual)
 * 
 * Formula:
 * - billableWeeks = 52 - vacationWeeks (minimum 1)
 * - annualGross = hourlyRate × hoursPerWeek × billableWeeks
 * - annualNet = annualGross × (1 - taxRate/100)
 * - Other intervals derived from annual
 * 
 * @param config - Income configuration with rate, hours, vacation, and tax
 * @returns Income result object or error
 */
export function calculateIncome(
  config: IncomeConfig
): IncomeResult | CalculationError {
  try {
    const { hourlyRate, hoursPerWeek, vacationWeeks, taxRate } = config

    // Validate inputs
    if (
      !Number.isFinite(hourlyRate) ||
      !Number.isFinite(hoursPerWeek) ||
      !Number.isFinite(vacationWeeks) ||
      !Number.isFinite(taxRate)
    ) {
      return {
        success: false,
        error: 'Invalid input values',
      }
    }

    // Calculate billable weeks (52 weeks - vacation, minimum 1)
    const billableWeeks = Math.max(1, 52 - vacationWeeks)

    // Calculate annual gross income
    const annualGross = hourlyRate * hoursPerWeek * billableWeeks

    // Calculate annual net income (after tax)
    const taxMultiplier = 1 - taxRate / 100
    const annualNet = annualGross * taxMultiplier

    // Derive other intervals
    const dailyGross = annualGross / 365
    const dailyNet = annualNet / 365

    const weeklyGross = annualGross / 52
    const weeklyNet = annualNet / 52

    const monthlyGross = annualGross / 12
    const monthlyNet = annualNet / 12

    return {
      dailyGross,
      dailyNet,
      weeklyGross,
      weeklyNet,
      monthlyGross,
      monthlyNet,
      annualGross,
      annualNet,
    }
  } catch (error) {
    return {
      success: false,
      error: 'Calculation failed',
    }
  }
}

/**
 * Calculate required hourly rate to achieve a target annual net income
 * 
 * Formula:
 * - requiredRate = targetAnnualNet / ((1 - taxRate/100) × hoursPerWeek × billableWeeks)
 * 
 * @param config - Income configuration
 * @param targetAnnualNet - Target annual net income
 * @returns Required hourly rate or error
 */
export function calculateRequiredRate(
  config: IncomeConfig,
  targetAnnualNet: number
): { requiredRate: number } | CalculationError {
  try {
    const { hoursPerWeek, vacationWeeks, taxRate } = config

    if (!Number.isFinite(targetAnnualNet) || targetAnnualNet <= 0) {
      return {
        success: false,
        error: 'Invalid target income',
      }
    }

    const billableWeeks = Math.max(1, 52 - vacationWeeks)
    const taxMultiplier = 1 - taxRate / 100

    // Prevent division by zero
    if (hoursPerWeek === 0 || billableWeeks === 0 || taxMultiplier === 0) {
      return {
        success: false,
        error: 'Cannot calculate with zero hours or 100% tax rate',
      }
    }

    const requiredRate = targetAnnualNet / (taxMultiplier * hoursPerWeek * billableWeeks)

    return { requiredRate }
  } catch (error) {
    return {
      success: false,
      error: 'Calculation failed',
    }
  }
}

/**
 * Calculate required hours per week to achieve a target annual net income
 * 
 * Formula:
 * - requiredHours = targetAnnualNet / ((1 - taxRate/100) × hourlyRate × billableWeeks)
 * 
 * @param config - Income configuration
 * @param targetAnnualNet - Target annual net income
 * @returns Required hours per week or error
 */
export function calculateRequiredHours(
  config: IncomeConfig,
  targetAnnualNet: number
): { requiredHours: number } | CalculationError {
  try {
    const { hourlyRate, vacationWeeks, taxRate } = config

    if (!Number.isFinite(targetAnnualNet) || targetAnnualNet <= 0) {
      return {
        success: false,
        error: 'Invalid target income',
      }
    }

    const billableWeeks = Math.max(1, 52 - vacationWeeks)
    const taxMultiplier = 1 - taxRate / 100

    // Prevent division by zero
    if (hourlyRate === 0 || billableWeeks === 0 || taxMultiplier === 0) {
      return {
        success: false,
        error: 'Cannot calculate with zero rate or 100% tax rate',
      }
    }

    const requiredHours = targetAnnualNet / (taxMultiplier * hourlyRate * billableWeeks)

    return { requiredHours }
  } catch (error) {
    return {
      success: false,
      error: 'Calculation failed',
    }
  }
}

/**
 * Clamp a numeric value within min and max bounds
 * 
 * @param value - Value to clamp
 * @param min - Minimum allowed value
 * @param max - Maximum allowed value
 * @returns Clamped value
 */
export function clampValue(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}

/**
 * Validate and clamp all input values
 * 
 * @param config - Income configuration
 * @returns Validated and clamped configuration
 */
export function validateAndClampConfig(config: Partial<IncomeConfig>): IncomeConfig {
  return {
    hourlyRate: clampValue(config.hourlyRate ?? 500, 50, 5000),
    hoursPerWeek: clampValue(config.hoursPerWeek ?? 40, 0, 60),
    vacationWeeks: clampValue(config.vacationWeeks ?? 2, 0, 12),
    taxRate: clampValue(config.taxRate ?? 25, 0, 50),
  }
}
