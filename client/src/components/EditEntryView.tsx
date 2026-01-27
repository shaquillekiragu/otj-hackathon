import { useState } from 'react'
import TimesheetSection from './TimesheetSection'
import { useTimesheetManagement } from '../hooks/useTimesheetManagement'

function EditEntryView() {
  const timesheetProps = useTimesheetManagement()

  const [entryData, setEntryData] = useState({
    title: 'Entry Title',
    category: 'Category Name',
    learningAims: 'Placeholder text for learning aims',
    learningMethod: 'Placeholder text for learning method',
    impact: 'Placeholder text for impact'
  })

  const sections = [
    {
      title: 'What you were aiming to learn',
      field: 'learningAims' as keyof typeof entryData
    },
    {
      title: 'How you learnt it',
      field: 'learningMethod' as keyof typeof entryData
    },
    { title: 'What was the impact', field: 'impact' as keyof typeof entryData }
  ]

  return (
    <>
      <div className="flex justify-between items-start mb-2">
        <input
          type="text"
          value={entryData.title}
          onChange={(e) =>
            setEntryData({ ...entryData, title: e.target.value })
          }
          className="text-2xl font-bold border border-gray-300 rounded px-2 py-1 w-2/3"
        />
        <p className="text-sm text-gray-600">
          Latest time sheet update: 17/01/26
        </p>
      </div>

      <input
        type="text"
        value={entryData.category}
        onChange={(e) =>
          setEntryData({ ...entryData, category: e.target.value })
        }
        className="mb-4 border border-gray-300 rounded px-2 py-1 w-full"
      />

      {sections.map((section, index) => (
        <div
          key={index}
          className={index === sections.length - 1 ? 'mb-6' : 'mb-4'}
        >
          <h3 className="text-sm font-semibold text-gray-600 mb-1">
            {section.title}
          </h3>
          <textarea
            value={entryData[section.field]}
            onChange={(e) =>
              setEntryData({ ...entryData, [section.field]: e.target.value })
            }
            className="w-full border border-gray-300 rounded px-2 py-1 min-h-20"
          />
        </div>
      ))}

      <TimesheetSection {...timesheetProps} />
    </>
  )
}

export default EditEntryView
