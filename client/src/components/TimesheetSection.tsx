import TimesheetEntryCard from './TimesheetEntryCard'
import TimesheetCreationCard from './TimesheetCreationCard'
import type { TimesheetEntry, NewTimesheetEntry } from '../types/timesheet'

interface TimesheetSectionProps {
  currentPage: number
  totalPages: number
  isAddingTimesheet: boolean
  newEntry: NewTimesheetEntry
  timesheetEntries: TimesheetEntry[]
  setIsAddingTimesheet: (value: boolean) => void
  setNewEntry: (entry: NewTimesheetEntry) => void
  handleSaveTimesheet: () => void
  handleDeleteTimesheet: (entry: TimesheetEntry) => void
  handleEditTimesheet: (updatedEntry: TimesheetEntry) => void
  closeTimesheetForm: () => void
  goToPreviousPage: () => void
  goToNextPage: () => void
}

const TimesheetSection = ({
  currentPage,
  totalPages,
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
    <section className="mb-6">
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
            startTime={newEntry.startTime}
            endTime={newEntry.endTime}
            onDateChange={(date) => setNewEntry({ ...newEntry, date })}
            onStartTimeChange={(startTime) =>
              setNewEntry({ ...newEntry, startTime })
            }
            onEndTimeChange={(endTime) => setNewEntry({ ...newEntry, endTime })}
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
          timesheetEntries.map((entry, index) => (
            <TimesheetEntryCard
              key={`${entry.date}-${entry.startTime}-${index}`}
              date={entry.date}
              startTime={entry.startTime}
              endTime={entry.endTime}
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
            disabled={currentPage === 1}
            className={paginationButtonClass}
          >
            ←
          </button>
          <span className="text-sm text-gray-600">
            {currentPage}/{totalPages}
          </span>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={paginationButtonClass}
          >
            →
          </button>
        </div>
      )}
    </section>
  )
}

export default TimesheetSection
