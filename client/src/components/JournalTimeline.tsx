import JournalListCard from './JournalListCard'
import { useJournalEntries } from '../hooks/useJournalEntries'

interface JournalTimelineProps {
  handleClick: (id: string) => void
}

const JournalTimeline = ({ handleClick }: JournalTimelineProps) => {
  const { entries, loading, error } = useJournalEntries()

  if (error) {
    return (
      <div className="flex justify-center p-8 text-red-500">Error: {error}</div>
    )
  }

  if (loading) {
    return <div className="flex justify-center p-8">Loading entries...</div>
  }
  return (
    <div className="flex flex-col w-full px-8">
      {entries.map((entry, index) => {
        // Get the most recent timesheet entry date
        const latestDate =
          entry.timesheetEntries.length > 0
            ? entry.timesheetEntries[entry.timesheetEntries.length - 1].date
            : new Date().toISOString().split('T')[0]

        return (
          <div key={entry.id} className="flex gap-12 mb-4 last:mb-0">
            {/* Timeline element */}
            <div className="flex flex-col items-center">
              {/* Circle with Date */}
              <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold shrink-0 text-center text-sm">
                {new Date(latestDate).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })}
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
                description={entry.learningAims}
                tags={entry.selectedTags}
                lastUpdated={entry.lastTimesheetUpdate}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default JournalTimeline
