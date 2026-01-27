import { calculateDuration } from '../utils/timeCalculations'

interface TimesheetCreationCardProps {
  date: string
  timeStarted: string
  timeFinished: string
  onDateChange: (date: string) => void
  onTimeStartedChange: (time: string) => void
  onTimeFinishedChange: (time: string) => void
  onSave: () => void
  onCancel: () => void
}

function TimesheetCreationCard({
  date,
  timeStarted,
  timeFinished,
  onDateChange,
  onTimeStartedChange,
  onTimeFinishedChange,
  onSave,
  onCancel
}: TimesheetCreationCardProps) {
  const calculatedDuration = calculateDuration(timeStarted, timeFinished)

  return (
    <div className="border border-blue-300 rounded-lg px-4 py-3 bg-blue-50">
      <div className="flex items-center gap-4">
        <div className="flex flex-col gap-1 flex-1">
          <label className="text-xs text-gray-500 font-medium">Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => onDateChange(e.target.value)}
            className="text-sm px-2 py-1 border border-gray-300 rounded"
          />
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <label className="text-xs text-gray-500 font-medium">Started:</label>
          <input
            type="time"
            value={timeStarted}
            onChange={(e) => onTimeStartedChange(e.target.value)}
            className="text-sm px-2 py-1 border border-gray-300 rounded"
          />
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <label className="text-xs text-gray-500 font-medium">Finished:</label>
          <input
            type="time"
            value={timeFinished}
            onChange={(e) => onTimeFinishedChange(e.target.value)}
            className="text-sm px-2 py-1 border border-gray-300 rounded"
          />
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <label className="text-xs text-gray-500 font-medium">Duration:</label>
          <div className="text-sm px-2 py-1 font-semibold">
            {calculatedDuration || '-'}
          </div>
        </div>
        <div className="flex gap-2 items-end">
          <button
            onClick={onSave}
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
          >
            Save
          </button>
          <button
            onClick={onCancel}
            className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default TimesheetCreationCard
