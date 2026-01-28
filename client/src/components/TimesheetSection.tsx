import TimesheetEntryCard from './TimesheetEntryCard'
import TimesheetCreationCard from './TimesheetCreationCard'
import type { TimesheetEntry, NewTimesheetEntry } from '../types/timesheet'

interface TimesheetSectionProps {
  currentPage: number
  isAddingTimesheet: boolean
  newEntry: NewTimesheetEntry
  timesheetEntries: TimesheetEntry[][]
  setIsAddingTimesheet: (value: boolean) => void
  setNewEntry: (entry: NewTimesheetEntry) => void
  handleSaveTimesheet: () => void
  handleDeleteTimesheet: (id: string) => void
  handleEditTimesheet: (
    id: string,
    updatedEntry: Omit<TimesheetEntry, 'id'>
  ) => void
  closeTimesheetForm: () => void
  goToPreviousPage: () => void
  goToNextPage: () => void
}

const TimesheetSection = ({
  currentPage,
  isAddingTimesheet,
  newEntry,
  timesheetEntries,
  setIsAddingTimesheet,
  setNewEntry,
  handleSaveTimesheet,
  handleDeleteTimesheet,
  handleEditTimesheet,
  closeTimesheetForm,
  goToPreviousPage,
  goToNextPage
}: TimesheetSectionProps) => {
  const paginationButtonClass =
    'px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed'

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-semibold text-gray-600">
          Timesheet Entries
        </h3>
        <button
          onClick={() => setIsAddingTimesheet(true)}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
        >
          Add timesheet
        </button>
      </div>
      <div className="space-y-2">
        {isAddingTimesheet && (
          <TimesheetCreationCard
            date={newEntry.date}
            timeStarted={newEntry.timeStarted}
            timeFinished={newEntry.timeFinished}
            onDateChange={(date) => setNewEntry({ ...newEntry, date })}
            onTimeStartedChange={(timeStarted) =>
              setNewEntry({ ...newEntry, timeStarted })
            }
            onTimeFinishedChange={(timeFinished) =>
              setNewEntry({ ...newEntry, timeFinished })
            }
            onSave={handleSaveTimesheet}
            onCancel={closeTimesheetForm}
          />
        )}
        {!isAddingTimesheet && timesheetEntries.length === 0 ? (
          <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border border-gray-200">
            <p className="mb-2">No timesheet entries yet</p>
            <p className="text-sm">
              Click "Add timesheet" to create your first entry
            </p>
          </div>
        ) : (
          timesheetEntries[currentPage]?.map((entry) => (
            <TimesheetEntryCard
              key={entry.id}
              id={entry.id}
              date={entry.date}
              timeStarted={entry.timeStarted}
              timeFinished={entry.timeFinished}
              duration={entry.duration}
              onDelete={handleDeleteTimesheet}
              onEdit={handleEditTimesheet}
            />
          ))
        )}
      </div>
      {timesheetEntries.length > 0 && (
        <div className="flex justify-center items-center gap-4 mt-3">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 0}
            className={paginationButtonClass}
          >
            ←
          </button>
          <span className="text-sm text-gray-600">
            {currentPage + 1}/{timesheetEntries.length}
          </span>
          <button
            onClick={goToNextPage}
            disabled={currentPage === timesheetEntries.length - 1}
            className={paginationButtonClass}
          >
            →
          </button>
        </div>
      )}
    </div>
  )
}

export default TimesheetSection
