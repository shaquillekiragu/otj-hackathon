import TimesheetSection from './TimesheetSection'
import TagSection from './TagSection'
import { useTimesheetManagement } from '../hooks/useTimesheetManagement'
import { type JournalEntry } from '../utils/journalData'
import { type TimesheetEntry } from '../types/timesheet'

interface ReadEntryViewProps {
  entryData: JournalEntry
  timesheetEntries: TimesheetEntry[]
  fetchTimesheets: (page: number) => Promise<void>
  totalPages: number
  currentPage: number
}

const ReadEntryView = ({
  entryData,
  timesheetEntries,
  fetchTimesheets,
  totalPages,
  currentPage
}: ReadEntryViewProps) => {
  const timesheetProps = useTimesheetManagement({
    initialEntries: timesheetEntries,
    fetchTimesheets,
    totalPages,
    currentPage
  })

  const sections = [
    {
      title: 'What you were aiming to learn',
      content: entryData.description.intend
    },
    {
      title: 'How you learnt it',
      content: entryData.description.implementation
    },
    { title: 'What was the impact', content: entryData.description.impact }
  ]

  return (
    <>
      <div className="flex justify-between mb-2">
        <h2 className="text-2xl font-bold">{entryData.title}</h2>
        <p className="text-sm text-gray-600">
          Latest time sheet update:{' '}
          {new Date(entryData.updatedAt).toLocaleDateString('en-GB')}
        </p>
      </div>

      <p className="mb-4">{entryData.category}</p>

      {sections.map((section, index) => (
        <div
          key={index}
          className={index === sections.length - 1 ? 'mb-6' : 'mb-4'}
        >
          <h3 className="text-sm font-semibold text-gray-600 mb-1">
            {section.title}
          </h3>
          <p>{section.content}</p>
        </div>
      ))}

      <TimesheetSection {...timesheetProps} />

      <TagSection selectedTags={entryData.tags || []} mode="read" />
    </>
  )
}

export default ReadEntryView
