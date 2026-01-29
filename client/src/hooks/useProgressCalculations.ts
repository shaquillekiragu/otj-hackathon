import { useMemo } from 'react'
import type { ProgressTrackerProps } from '../types/progress-tracker'

export interface ProgressCalculations {
	percentageOfTotal: number
	percentageOfExpected: number
	expectedOTJHours: number
	remainingHours: number
	hoursAheadOrBehind: number
	percentageOfTotalGradient: string
	percentageOfExpectedGradient: string
}

export function useProgressCalculations({
	totalOTJHours = 400,
	actualOTJHours = 200,
	numberOfWeeksSinceStart = 40,
	hoursPerWeekExpected = 6
}: ProgressTrackerProps): ProgressCalculations {
	const { percentageOfTotal, percentageOfExpected, expectedOTJHours } = useMemo(() => {
		const expected = numberOfWeeksSinceStart * hoursPerWeekExpected
		const totalPercent = totalOTJHours > 0
			? Math.min(100, Math.round((actualOTJHours / totalOTJHours) * 100))
			: 0
		const expectedPercent = expected > 0
			? Math.min(100, Math.round((actualOTJHours / expected) * 100))
			: 0

		return {
			percentageOfTotal: totalPercent,
			percentageOfExpected: expectedPercent,
			expectedOTJHours: expected
		}
	}, [totalOTJHours, actualOTJHours, numberOfWeeksSinceStart, hoursPerWeekExpected])

	const percentageOfTotalGradient = useMemo(
		() => `conic-gradient(from 0deg, #2563eb 0%, #2563eb ${percentageOfTotal}%, #e5e7eb ${percentageOfTotal}%, #e5e7eb 100%)`,
		[percentageOfTotal]
	)

	const percentageOfExpectedGradient = useMemo(
		() => `conic-gradient(from 0deg, #10b981 0%, #10b981 ${percentageOfExpected}%, #e5e7eb ${percentageOfExpected}%, #e5e7eb 100%)`,
		[percentageOfExpected]
	)

	const remainingHours = Math.max(0, totalOTJHours - actualOTJHours)
	const hoursAheadOrBehind = actualOTJHours - expectedOTJHours

	return {
		percentageOfTotal,
		percentageOfExpected,
		expectedOTJHours,
		remainingHours,
		hoursAheadOrBehind,
		percentageOfTotalGradient,
		percentageOfExpectedGradient
	}
}
