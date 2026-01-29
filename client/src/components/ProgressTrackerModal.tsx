import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark'
import ProgressDiagram from './ProgressDiagram'
import ProgressStats from './ProgressStats'
import type { ProgressTrackerProps } from '../types/progress-tracker'

interface ProgressTrackerModalProps extends ProgressTrackerProps {
	onClose: () => void
}

export default function ProgressTrackerModal({
	onClose,
	...progressTrackerProps
}: ProgressTrackerModalProps) {
	useEffect(() => {
		document.body.style.overflow = 'hidden'
		return () => {
			document.body.style.overflow = 'unset'
		}
	}, [])

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-transparent bg-opacity-50 p-4"
			onClick={onClose}
		>
			<div
				className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
				onClick={(e) => e.stopPropagation()}
			>
				{/* Close Button */}
				<button
					onClick={onClose}
					className="absolute top-4 right-4 z-10 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
					aria-label="Close modal"
				>
					<FontAwesomeIcon icon={faXmark} className="w-5 h-5" />
				</button>

				{/* Content */}
				<div className="p-6">
					<h2 className="text-2xl font-bold text-gray-900 mb-6">Progress Tracker</h2>
					<section className="w-full flex flex-col items-center gap-8 py-8 px-4">
						<ProgressDiagram {...progressTrackerProps} size="large" />
						<ProgressStats {...progressTrackerProps} />
					</section>
				</div>
			</div>
		</div>
	)
}
