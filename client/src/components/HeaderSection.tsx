import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons/faUpRightFromSquare'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons/faCircleCheck'
import otjRequirements from '../assets/img/otj-requirements.png'

export default function HeaderSection() {
	return (
		<section className="w-full">
			<div className="mb-6">
				<div className="mb-6">
					<h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 mb-3 tracking-tight leading-tight">
						Log Off-the-Job Activities
					</h1>
					<div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
				</div>

				<div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 sm:p-8 border border-blue-100 shadow-sm mb-4">
					<p className="text-base sm:text-lg text-gray-700 leading-relaxed">
						Off-the-Job (OTJ) training refers to learning activities that take
						place during your paid working hours, but that are not part of your
						day-to-day duties. You can see more information on what counts as
						OTJ training{' '}
						<a
							href={otjRequirements}
							target="_blank"
							rel="noopener noreferrer"
							className="text-blue-600 hover:text-blue-700 font-semibold underline decoration-2 underline-offset-2 transition-colors duration-200 inline-flex items-center gap-1"
						>
							here
							<FontAwesomeIcon icon={faUpRightFromSquare} className="!w-3.5 !h-3.5 inline-block ml-0.5" />
						</a>
						.
					</p>
				</div>

				<div className="inline-flex items-center gap-3 bg-green-50 border border-green-200 rounded-lg px-4 py-3 shadow-sm">
					<div className="shrink-0">
						<FontAwesomeIcon icon={faCircleCheck} className="w-5 h-5 text-green-600" />
					</div>
					<div>
						<p className="text-sm font-medium text-green-800">
							You are currently{' '}
							<span className="font-bold text-green-900">3 hours ahead</span>{' '}
							of expectations
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}
