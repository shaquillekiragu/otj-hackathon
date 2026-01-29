import TimesheetEntryCard from './TimesheetEntryCard';
import TimesheetCreationCard from './TimesheetCreationCard';
import type { TimesheetEntry, NewTimesheetEntry } from '../types/timesheet';

interface TimesheetSectionProps {
  currentPage: number;
  totalPages: number;
  isAddingTimesheet: boolean;
  newEntry: NewTimesheetEntry;
  timesheetEntries: TimesheetEntry[];
  setIsAddingTimesheet: (value: boolean) => void;
  setNewEntry: (entry: NewTimesheetEntry) => void;
  handleSaveTimesheet: () => void;
  handleDeleteTimesheet: (entry: TimesheetEntry) => void;
  handleEditTimesheet: (updatedEntry: TimesheetEntry) => void;
  closeTimesheetForm: () => void;
  goToPreviousPage: () => void;
  goToNextPage: () => void;
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
  goToNextPage,
}: TimesheetSectionProps) => {
  const paginationButtonClass =
    'px-4 py-2 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:border-blue-500 hover:text-blue-600 hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-300 disabled:hover:shadow-none font-medium text-sm';

  return (
    <section className="mb-6">
      <div className="flex justify-between items-center mb-5 pb-4 border-b-2 border-gray-200">
        <h3 className="text-lg font-bold text-gray-800">Timesheet Entries</h3>
        <button
          onClick={() => setIsAddingTimesheet(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm font-semibold transition-all duration-200 hover:shadow-md hover:translate-y-[-2px]"
        >
          + Add timesheet
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
          <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-xl border-2 border-gray-200">
            <p className="mb-2 text-lg font-semibold text-gray-600">
              No timesheet entries yet
            </p>
            <p className="text-sm text-gray-500">
              Click "Add timesheet" to create your first entry
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {timesheetEntries.map((entry, index) => (
              <TimesheetEntryCard
                key={entry.id || `${entry.date}-${entry.startTime}-${index}`}
                id={entry.id}
                date={entry.date}
                startTime={entry.startTime}
                endTime={entry.endTime}
                duration={entry.duration}
                onDelete={handleDeleteTimesheet}
                onEdit={handleEditTimesheet}
              />
            ))}
          </div>
        )}
      </div>
      {timesheetEntries.length > 0 && (
        <div className="flex justify-center items-center gap-6 mt-6 pt-6 border-t-2 border-gray-200">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className={paginationButtonClass}
          >
            ← Previous
          </button>
          <div className="px-6 py-2 bg-gray-50 rounded-lg border border-gray-200">
            <span className="text-sm font-semibold text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
          </div>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={paginationButtonClass}
          >
            Next →
          </button>
        </div>
      )}
    </section>
  );
};

export default TimesheetSection;
