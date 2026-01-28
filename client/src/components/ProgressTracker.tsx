import { useMemo } from 'react'
import type { ProgressTrackerProps } from '../types/progress-tracker'

export default function ProgressTracker({
	totalOTJHours = 400,
	actualOTJHours = 200,
	numberOfWeeksSinceStart = 40,
	hoursPerWeekExpected = 6
}: ProgressTrackerProps) {
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

	return (
		<section className="w-full flex flex-col items-center gap-8 py-8 px-4">
			<div className="relative flex items-center justify-center">
				<div className="relative w-64 h-64 sm:w-80 sm:h-80">
					<div className="absolute inset-0 rounded-full bg-gray-100 shadow-inner" />

					<div
						className="absolute inset-0 rounded-full transition-all duration-1000 ease-out"
						style={{ background: percentageOfTotalGradient }}
						role="progressbar"
						aria-valuenow={percentageOfTotal}
						aria-valuemin={0}
						aria-valuemax={100}
						aria-label={`${percentageOfTotal}% of total OTJ hours completed`}
					>
						<div className="absolute inset-4 sm:inset-5 rounded-full flex items-center justify-center">
							<div
								className="w-full h-full rounded-full transition-all duration-1000 ease-out delay-300"
								style={{ background: percentageOfExpectedGradient }}
								role="progressbar"
								aria-valuenow={percentageOfExpected}
								aria-valuemin={0}
								aria-valuemax={100}
								aria-label={`${percentageOfExpected}% of expected OTJ hours completed`}
							>
								<div className="absolute inset-4 sm:inset-5 rounded-full bg-white shadow-lg flex flex-col items-center justify-center gap-2 border-2 border-gray-200">
									<div className="text-center">
										<p className="text-3xl sm:text-4xl font-bold text-blue-600">
											{percentageOfTotal}%
										</p>
										<p className="text-xs sm:text-sm text-gray-500 font-medium">
											of Total
										</p>
									</div>
									<div className="h-px w-16 bg-gray-200" />
									<div className="text-center">
										<p className="text-3xl sm:text-4xl font-bold text-green-600">
											{percentageOfExpected}%
										</p>
										<p className="text-xs sm:text-sm text-gray-500 font-medium">
											of Expected
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-6">
				<div className="flex flex-col gap-4 p-4 bg-gray-50 rounded-lg">
					<h3 className="text-lg font-semibold text-gray-800 mb-2">Progress Indicators</h3>
					<div className="flex flex-col gap-3">
						<div className="flex items-center gap-3">
							<div className="w-5 h-5 rounded-full bg-blue-600 shadow-sm shrink-0" />
							<div className="flex-1">
								<p className="font-medium text-gray-800">Total OTJ Progress</p>
								<p className="text-sm text-gray-600">
									{actualOTJHours} / {totalOTJHours} hours
								</p>
							</div>
						</div>
						<div className="flex items-center gap-3">
							<div className="w-5 h-5 rounded-full bg-green-600 shadow-sm shrink-0" />
							<div className="flex-1">
								<p className="font-medium text-gray-800">Expected OTJ Progress</p>
								<p className="text-sm text-gray-600">
									{actualOTJHours} / {expectedOTJHours} hours ({hoursPerWeekExpected}h/week)
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className="flex flex-col gap-4 p-4 bg-gray-50 rounded-lg">
					<h3 className="text-lg font-semibold text-gray-800 mb-2">Summary</h3>
					<div className="flex flex-col gap-3">
						<div className="flex justify-between items-center">
							<span className="text-gray-600">Hours Completed:</span>
							<span className="font-semibold text-gray-800">{actualOTJHours}h</span>
						</div>
						<div className="flex justify-between items-center">
							<span className="text-gray-600">Hours Remaining:</span>
							<span className="font-semibold text-gray-800">{remainingHours}h</span>
						</div>
						<div className="flex justify-between items-center">
							<span className="text-gray-600">Weeks Since Start:</span>
							<span className="font-semibold text-gray-800">{numberOfWeeksSinceStart}</span>
						</div>
						<div className="pt-2 border-t border-gray-200">
							<div className="flex justify-between items-center">
								<span className="text-gray-600">Status:</span>
								<span
									className={`font-semibold ${hoursAheadOrBehind >= 0
										? 'text-green-600'
										: 'text-orange-600'
										}`}
								>
									{hoursAheadOrBehind >= 0 ? '+' : ''}
									{hoursAheadOrBehind.toFixed(1)}h{' '}
									{hoursAheadOrBehind >= 0 ? 'ahead' : 'behind'}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}