import { useProgressCalculations } from '../hooks/useProgressCalculations'
import type { ProgressTrackerProps } from '../types/progress-tracker'

export default function ProgressStats(props: ProgressTrackerProps) {
	const { expectedOTJHours, remainingHours, hoursAheadOrBehind } =
		useProgressCalculations(props)
	const { actualOTJHours = 200, totalOTJHours = 400, hoursPerWeekExpected = 6, numberOfWeeksSinceStart = 40 } = props

	return (
		<article className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-6">
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
		</article>
	)
}
