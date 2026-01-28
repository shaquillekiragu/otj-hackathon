import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons/faTrashCan'
import { faPencil } from '@fortawesome/free-solid-svg-icons/faPencil'
import {
  calculateDuration,
  parseDateForInput,
  formatDateForDisplay
} from '../utils/timeCalculations'

interface TimesheetEntryCardProps {
  id: string
  date: string
  timeStarted: string
  timeFinished: string
  duration: string
  onDelete: (id: string) => void
  onEdit: (
    id: string,
    updatedEntry: {
      date: string
      timeStarted: string
      timeFinished: string
      duration: string
    }
  ) => void
}

const TimesheetEntryCard = ({
  id,
  date,
  timeStarted,
  timeFinished,
  duration,
  onDelete,
  onEdit
}: TimesheetEntryCardProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedDate, setEditedDate] = useState(parseDateForInput(date))
  const [editedTimeStarted, setEditedTimeStarted] = useState(timeStarted)
  const [editedTimeFinished, setEditedTimeFinished] = useState(timeFinished)

  const handleSave = () => {
    const newDuration = calculateDuration(editedTimeStarted, editedTimeFinished)
    onEdit(id, {
      date: formatDateForDisplay(editedDate),
      timeStarted: editedTimeStarted,
      timeFinished: editedTimeFinished,
      duration: newDuration
    })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedDate(parseDateForInput(date))
    setEditedTimeStarted(timeStarted)
    setEditedTimeFinished(timeFinished)
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <div className="border border-blue-300 rounded-lg px-4 py-3 bg-blue-50">
        <div className="flex items-center gap-4">
          <div className="flex flex-col gap-1 flex-1">
            <label className="text-xs text-gray-500 font-medium">Date:</label>
            <input
              type="date"
              value={editedDate}
              onChange={(e) => setEditedDate(e.target.value)}
              className="text-sm px-2 py-1 border border-gray-300 rounded"
            />
          </div>
          <div className="flex flex-col gap-1 flex-1">
            <label className="text-xs text-gray-500 font-medium">
              Started:
            </label>
            <input
              type="time"
              value={editedTimeStarted}
              onChange={(e) => setEditedTimeStarted(e.target.value)}
              className="text-sm px-2 py-1 border border-gray-300 rounded"
            />
          </div>
          <div className="flex flex-col gap-1 flex-1">
            <label className="text-xs text-gray-500 font-medium">
              Finished:
            </label>
            <input
              type="time"
              value={editedTimeFinished}
              onChange={(e) => setEditedTimeFinished(e.target.value)}
              className="text-sm px-2 py-1 border border-gray-300 rounded"
            />
          </div>
          <div className="flex flex-col gap-1 flex-1">
            <label className="text-xs text-gray-500 font-medium">
              Duration:
            </label>
            <div className="text-sm px-2 py-1 font-semibold">
              {calculateDuration(editedTimeStarted, editedTimeFinished) || '-'}
            </div>
          </div>
          <div className="flex gap-2 items-end">
            <button
              onClick={handleSave}
              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  }

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
        <div className="flex gap-2 items-center ml-2">
          <button
            onClick={() => setIsEditing(true)}
            className="p-1.5 text-blue-600 hover:bg-blue-100 rounded transition-colors"
            title="Edit entry"
          >
            <FontAwesomeIcon icon={faPencil} className="text-sm" />
          </button>
          <button
            onClick={() => onDelete(id)}
            className="p-1.5 text-red-600 hover:bg-red-100 rounded transition-colors"
            title="Delete entry"
          >
            <FontAwesomeIcon icon={faTrashCan} className="text-sm" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default TimesheetEntryCard
