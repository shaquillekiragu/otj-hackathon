import TimesheetSection from './TimesheetSection'
import { useTimesheetManagement } from '../hooks/useTimesheetManagement'

function ReadEntryView() {
  const timesheetProps = useTimesheetManagement()

  const sections = [
    {
      title: 'What you were aiming to learn',
      content: 'Placeholder text for learning aims'
    },
    {
      title: 'How you learnt it',
      content: 'Placeholder text for learning method'
    },
    { title: 'What was the impact', content: 'Placeholder text for impact' }
  ]

  return (
    <>
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-2xl font-bold">Entry Title</h2>
        <p className="text-sm text-gray-600">
          Latest time sheet update: 17/01/26
        </p>
      </div>

      <p className="mb-4">Category Name</p>

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
    </>
  )
}

export default ReadEntryView
