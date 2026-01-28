import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons/faTrashCan'
import { faPencil } from '@fortawesome/free-solid-svg-icons/faPencil'
import {
  calculateDuration,
  formatDuration,
  formatDate,
  formatTime
} from '../utils/timeCalculations'
import type { TimesheetEntry } from '../types/timesheet'

interface TimesheetEntryCardProps extends TimesheetEntry {
  onDelete: (entry: TimesheetEntry) => void
  onEdit: (updatedEntry: TimesheetEntry) => void
}

const TimesheetEntryCard = ({
  date,
  startTime,
  endTime,
  duration,
  onDelete,
  onEdit
}: TimesheetEntryCardProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedDate, setEditedDate] = useState(date)
  const [editedStartTime, setEditedStartTime] = useState(startTime)
  const [editedEndTime, setEditedEndTime] = useState(endTime)

  const handleSave = () => {
    const newDuration = calculateDuration(editedStartTime, editedEndTime)
    onEdit({
      date: editedDate,
      startTime: editedStartTime,
      endTime: editedEndTime,
      duration: newDuration
    })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedDate(date)
    setEditedStartTime(startTime)
    setEditedEndTime(endTime)
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
              value={editedStartTime}
              onChange={(e) => setEditedStartTime(e.target.value)}
              className="text-sm px-2 py-1 border border-gray-300 rounded"
            />
          </div>
          <div className="flex flex-col gap-1 flex-1">
            <label className="text-xs text-gray-500 font-medium">
              Finished:
            </label>
            <input
              type="time"
              value={editedEndTime}
              onChange={(e) => setEditedEndTime(e.target.value)}
              className="text-sm px-2 py-1 border border-gray-300 rounded"
            />
          </div>
          <div className="flex flex-col gap-1 flex-1">
            <label className="text-xs text-gray-500 font-medium">
              Duration:
            </label>
            <div className="text-sm px-2 py-1 font-semibold">
              {formatDuration(
                calculateDuration(editedStartTime, editedEndTime)
              ) || '-'}
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
          <span className="text-sm">{formatDate(date)}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-500 font-medium">Started:</span>
          <span className="text-sm">{formatTime(startTime)}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-500 font-medium">Finished:</span>
          <span className="text-sm">{formatTime(endTime)}</span>
        </div>
        <div className="flex items-center gap-1 ml-auto">
          <span className="text-xs text-gray-500 font-medium">Duration:</span>
          <span className="text-sm font-semibold">
            {formatDuration(duration)}
          </span>
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
            onClick={() => onDelete({ date, startTime, endTime, duration })}
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
