interface TimesheetEntryCardProps {
  date: string
  timeStarted: string
  timeFinished: string
  duration: string
}

function TimesheetEntryCard({
  date,
  timeStarted,
  timeFinished,
  duration
}: TimesheetEntryCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg px-4 py-2 bg-gray-50 hover:bg-gray-100 transition-colors">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-500 font-medium">Date:</span>
          <span className="text-sm">{date}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-500 font-medium">Started:</span>
          <span className="text-sm">{timeStarted}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-500 font-medium">Finished:</span>
          <span className="text-sm">{timeFinished}</span>
        </div>
        <div className="flex items-center gap-1 ml-auto">
          <span className="text-xs text-gray-500 font-medium">Duration:</span>
          <span className="text-sm font-semibold">{duration}</span>
        </div>
      </div>
    </div>
  )
}

export default TimesheetEntryCard
