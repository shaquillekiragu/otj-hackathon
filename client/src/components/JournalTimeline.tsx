import JournalListCard from './JournalListCard'

interface JournalEntry {
  id: number
  title: string
  description: string
  date: string
}

interface JournalTimelineProps {
  entries: JournalEntry[]
}

function JournalTimeline({ entries }: JournalTimelineProps) {
  return (
    <div className="flex flex-col w-full px-8">
      {entries.map((entry, index) => (
        <div key={entry.id} className="flex gap-12 mb-4 last:mb-0">
          {/* Timeline element */}
          <div className="flex flex-col items-center">
            {/* Circle with Date */}
            <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold shrink-0 text-center text-sm">
              {new Date(entry.date).toLocaleDateString('en-GB', {
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
          <div className="flex-1">
            <JournalListCard />
          </div>
        </div>
      ))}
    </div>
  )
}

export default JournalTimeline
