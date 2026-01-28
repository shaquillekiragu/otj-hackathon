import { calculateDuration, formatDuration } from '../utils/timeCalculations'

interface TimesheetCreationCardProps {
  date: string
  startTime: string
  endTime: string
  onDateChange: (date: string) => void
  onStartTimeChange: (time: string) => void
  onEndTimeChange: (time: string) => void
  onSave: () => void
  onCancel: () => void
}

const TimesheetCreationCard = ({
  date,
  startTime,
  endTime,
  onDateChange,
  onStartTimeChange,
  onEndTimeChange,
  onSave,
  onCancel
}: TimesheetCreationCardProps) => {
  const calculatedDuration = calculateDuration(startTime, endTime)

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
            value={startTime}
            onChange={(e) => onStartTimeChange(e.target.value)}
            className="text-sm px-2 py-1 border border-gray-300 rounded"
          />
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <label className="text-xs text-gray-500 font-medium">Finished:</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => onEndTimeChange(e.target.value)}
            className="text-sm px-2 py-1 border border-gray-300 rounded"
          />
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <label className="text-xs text-gray-500 font-medium">Duration:</label>
          <div className="text-sm px-2 py-1 font-semibold">
            {formatDuration(calculatedDuration) || '-'}
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
