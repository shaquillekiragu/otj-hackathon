import { useProgressCalculations } from '../hooks/useProgressCalculations'
import type { ProgressTrackerProps } from '../types/progress-tracker'

interface ProgressDiagramProps extends ProgressTrackerProps {
	onClick?: () => void
	size?: 'small' | 'medium' | 'large'
}

export default function ProgressDiagram({
	onClick,
	size = 'medium',
	...progressProps
}: ProgressDiagramProps) {
	const { percentageOfTotal, percentageOfExpected, percentageOfTotalGradient, percentageOfExpectedGradient } =
		useProgressCalculations(progressProps)

	const sizeClasses = {
		small: 'w-48 h-48',
		medium: 'w-56 h-56 sm:w-64 sm:h-64',
		large: 'w-64 h-64 sm:w-80 sm:h-80'
	}

	const textSizeClasses = {
		small: 'text-2xl sm:text-3xl',
		medium: 'text-2xl sm:text-3xl',
		large: 'text-3xl sm:text-4xl'
	}

	const diagramContent = (
		<div className={`relative ${sizeClasses[size]}`}>
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
								<p className={`${textSizeClasses[size]} font-bold text-blue-600`}>
									{percentageOfTotal}%
								</p>
								<p className="text-xs text-gray-500 font-medium">
									of Total
								</p>
							</div>
							<div className="h-px w-12 bg-gray-200" />
							<div className="text-center">
								<p className={`${textSizeClasses[size]} font-bold text-green-600`}>
									{percentageOfExpected}%
								</p>
								<p className="text-xs text-gray-500 font-medium">
									of Expected
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)

	if (onClick) {
		return (
			<div
				className="relative flex items-center justify-center cursor-pointer transition-transform hover:scale-105 active:scale-95"
				onClick={onClick}
				role="button"
				tabIndex={0}
				onKeyDown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						e.preventDefault()
						onClick()
					}
				}}
				aria-label="View detailed progress tracker"
			>
				{diagramContent}
			</div>
		)
	}

	return <div className="relative flex items-center justify-center">{diagramContent}</div>
}
