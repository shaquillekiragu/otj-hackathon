export default function ProgressTracker(){
	const totalOTJHours = 400;
	const actualOTJHours = 200;

	const numberOfWeeksSinceStart = 40
	const expectedOTJHours = numberOfWeeksSinceStart * 6

	const percentageOfTotal = Math.round(actualOTJHours / totalOTJHours * 100)
	const percentageOfExpected = Math.round(actualOTJHours / expectedOTJHours * 100)
	
	const percentageOfTotalGradient = `conic-gradient(from 0deg, #2b6cb0 0%, #2b6cb0 ${percentageOfTotal}%, #d1d5db ${percentageOfTotal}%, #d1d5db 100%)`;
	const percentageOfExpectedGradient = `conic-gradient(from 0deg, #2f855a 0%, #2f855a ${percentageOfExpected}%, #d1d5db ${percentageOfExpected}%, #d1d5db 100%)`;
	
	return (
		<>
			<div className="w-full h-75 flex justify-center gap-10 my-15">
				<div className="w-75 h-75 rounded-full bg-gray-300">
					<div 
						className="w-75 h-75 rounded-full flex justify-center items-center border border-gray-500"
						style={{ background: percentageOfTotalGradient }}
					>
						<div 
							className="w-60 h-60 rounded-full flex justify-center items-center border border-gray-600"
							style={{ background: percentageOfExpectedGradient }}
						>
							<div className="w-45 h-45 rounded-full flex flex-col justify-center items-center gap-3 bg-white border border-gray-500">
								<p className="text-4xl font-bold">{percentageOfTotal}%</p>
								<p className="text-4xl font-bold">{percentageOfExpected}%</p>
							</div>
						</div>
					</div>
				</div>
				<div className="h-full flex flex-col justify-center gap-5">
					<div className="flex items-center gap-2">
						<div className="w-5 h-5 border bg-blue-700"></div>
						<p> = Percentage of Total OTJ</p>
					</div>
					<div className="flex items-center gap-2">
						<div className="w-5 h-5 border bg-green-700"></div>
						<p> = Percentage of Expected OTJ</p>
					</div>
				</div>
			</div>
		</>
	)
}