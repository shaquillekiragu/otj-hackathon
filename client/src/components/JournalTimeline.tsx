import JournalListCard from './JournalListCard';
import { formatDate } from '../utils/timeCalculations';
import type { JournalEntry } from '../utils/journalData';

interface JournalTimelineProps {
  handleClick: (id: string) => void;
  entries: JournalEntry[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
}

const JournalTimeline = ({
  handleClick,
  entries,
  loading,
  error,
  currentPage,
  totalPages,
  onNextPage,
  onPreviousPage,
}: JournalTimelineProps) => {
  const paginationButtonClass =
    'px-4 py-2 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:border-blue-500 hover:text-blue-600 hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-300 disabled:hover:shadow-none font-medium text-sm';

  if (error) {
    return (
      <div className="flex justify-center p-8 text-red-500">Error: {error}</div>
    );
  }

  if (loading) {
    return <div className="flex justify-center p-8">Loading entries...</div>;
  }

  if (entries.length === 0) {
    return (
      <section className="flex items-center justify-center p-16">
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-700 mb-2">
            No journal entries found
          </p>
          <p className="text-sm text-gray-500">
            Try adjusting your search or create a new journal entry to get
            started
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col w-full px-8">
      {entries.map((entry, index) => {
        // Get the most recent timesheet entry date for the card
        const latestTimesheetDate =
          entry.timeSheets && entry.timeSheets.length > 0
            ? entry.timeSheets[entry.timeSheets.length - 1].date
            : null;

        return (
          <div key={entry.id} className="flex gap-12 mb-4 last:mb-0">
            {/* Timeline element */}
            <div className="flex flex-col items-center">
              {/* Circle with Date - shows journal entry creation date */}
              <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold shrink-0 text-center text-sm">
                {formatDate(entry.createdAt || entry.updatedAt)}
              </div>
              {/* Connecting line (except for last item) */}
              {index < entries.length - 1 && (
                <div className="w-0.5 flex-1 bg-blue-500 -mb-4"></div>
              )}
            </div>
            {/* Card */}
            <div className="flex-1" onClick={() => handleClick(entry.id)}>
              {/* CLICKING A JOURNAL CARD SHOULD OPEN THE VIEW MODAL WITH THE ID PASSED AS A PROP */}
              <JournalListCard
                title={entry.title}
                category={entry.category}
                description={entry.description.intend}
                tags={entry.tags || []}
                lastUpdated={
                  latestTimesheetDate
                    ? formatDate(latestTimesheetDate)
                    : 'No timesheets'
                }
              />
            </div>
          </div>
        );
      })}
      {entries.length > 0 && (
        <div className="flex justify-center items-center gap-6 mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={onPreviousPage}
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
            onClick={onNextPage}
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

export default JournalTimeline;
