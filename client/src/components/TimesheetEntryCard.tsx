import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons/faTrashCan';
import { faPencil } from '@fortawesome/free-solid-svg-icons/faPencil';
import {
  calculateDuration,
  formatDuration,
  formatDate,
  formatTime,
} from '../utils/timeCalculations';
import type { TimesheetEntry } from '../types/timesheet';

interface TimesheetEntryCardProps extends TimesheetEntry {
  onDelete: (entry: TimesheetEntry) => void;
  onEdit: (updatedEntry: TimesheetEntry) => void;
}

const TimesheetEntryCard = ({
  id,
  date,
  startTime,
  endTime,
  duration,
  onDelete,
  onEdit,
}: TimesheetEntryCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDate, setEditedDate] = useState(date);
  const [editedStartTime, setEditedStartTime] = useState(startTime);
  const [editedEndTime, setEditedEndTime] = useState(endTime);

  const handleSave = () => {
    const newDuration = calculateDuration(editedStartTime, editedEndTime);
    onEdit({
      id,
      date: editedDate,
      startTime: editedStartTime,
      endTime: editedEndTime,
      duration: newDuration,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedDate(date);
    setEditedStartTime(startTime);
    setEditedEndTime(endTime);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <article className="border-2 border-blue-400 rounded-xl px-5 py-4 bg-blue-50 shadow-md">
        <div className="flex items-center gap-4">
          <div className="flex flex-col gap-1 flex-1">
            <label className="text-xs text-gray-500 font-medium">Date:</label>
            <input
              type="date"
              value={editedDate}
              onChange={(e) => setEditedDate(e.target.value)}
              className="text-sm px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1 flex-1">
            <label className="text-xs text-gray-600 font-semibold">
              Started:
            </label>
            <input
              type="time"
              value={editedStartTime}
              onChange={(e) => setEditedStartTime(e.target.value)}
              className="text-sm px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1 flex-1">
            <label className="text-xs text-gray-600 font-semibold">
              Finished:
            </label>
            <input
              type="time"
              value={editedEndTime}
              onChange={(e) => setEditedEndTime(e.target.value)}
              className="text-sm px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1 flex-1">
            <label className="text-xs text-gray-500 font-medium">
              Duration:
            </label>
            <div className="text-sm px-2 py-1 font-semibold">
              {formatDuration(
                calculateDuration(editedStartTime, editedEndTime),
              ) || '-'}
            </div>
          </div>
          <div className="flex gap-2 items-end">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm font-semibold transition-all duration-200 hover:shadow-md"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 text-sm font-semibold transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="border-2 border-gray-200 rounded-xl px-5 py-3 bg-white hover:border-gray-300 hover:shadow-md transition-all duration-200 hover:bg-gray-50">
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-600 font-semibold uppercase tracking-wide">
            Date:
          </span>
          <span className="text-sm font-medium text-gray-900">
            {formatDate(date)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-600 font-semibold uppercase tracking-wide">
            Start:
          </span>
          <span className="text-sm font-medium text-gray-900">
            {formatTime(startTime)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-600 font-semibold uppercase tracking-wide">
            End:
          </span>
          <span className="text-sm font-medium text-gray-900">
            {formatTime(endTime)}
          </span>
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-xs text-gray-600 font-semibold uppercase tracking-wide">
            Duration:
          </span>
          <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">
            {formatDuration(duration)}
          </span>
        </div>
        <div className="flex gap-2 items-center ml-2 border-l border-gray-200 pl-4">
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-all duration-200 hover:shadow-sm"
            title="Edit entry"
          >
            <FontAwesomeIcon icon={faPencil} className="text-sm" />
          </button>
          <button
            onClick={() => onDelete({ id, date, startTime, endTime, duration })}
            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-all duration-200 hover:shadow-sm"
            title="Delete entry"
          >
            <FontAwesomeIcon icon={faTrashCan} className="text-sm" />
          </button>
        </div>
      </div>
    </article>
  );
};

export default TimesheetEntryCard;
