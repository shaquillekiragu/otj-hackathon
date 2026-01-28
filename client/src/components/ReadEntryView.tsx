import TimesheetSection from './TimesheetSection'
import TagSection from './TagSection'
import { useTimesheetManagement } from '../hooks/useTimesheetManagement'
import { type JournalEntry } from '../utils/journalData'

interface ReadEntryViewProps {
  entryData: JournalEntry
}

const ReadEntryView = ({ entryData }: ReadEntryViewProps) => {
  const timesheetProps = useTimesheetManagement()

  const sections = [
    {
      title: 'What you were aiming to learn',
      content: entryData.learningAims
    },
    {
      title: 'How you learnt it',
      content: entryData.learningMethod
    },
    { title: 'What was the impact', content: entryData.impact }
  ]

  return (
    <>
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-2xl font-bold">{entryData.title}</h2>
        <p className="text-sm text-gray-600">
          Latest time sheet update: {entryData.lastTimesheetUpdate}
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

      <TagSection selectedTags={entryData.selectedTags} mode="read" />
    </>
  )
}

export default ReadEntryView
