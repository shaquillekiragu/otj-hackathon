import { useState } from 'react'
import TimesheetSection from './TimesheetSection'
import TagSection from './TagSection'
import { useTimesheetManagement } from '../hooks/useTimesheetManagement'
import { type Tag } from '../types/journal'
import { type JournalEntry } from '../utils/journalData'
import { type TimesheetEntry } from '../types/timesheet'

interface EditEntryViewProps {
  entryData: JournalEntry | null
  onUpdate: (updates: Partial<JournalEntry>) => void
  onTagsUpdate: (tags: Tag[]) => void
  timesheetEntries: TimesheetEntry[]
  fetchTimesheets: (page: number) => Promise<void>
  totalPages: number
  currentPage: number
}

const EditEntryView = ({
  entryData,
  onUpdate,
  onTagsUpdate,
  timesheetEntries,
  fetchTimesheets,
  totalPages,
  currentPage
}: EditEntryViewProps) => {
  const timesheetProps = useTimesheetManagement({
    initialEntries: timesheetEntries,
    fetchTimesheets,
    totalPages,
    currentPage
  })

  // Local state for form fields
  const [localData, setLocalData] = useState({
    title: entryData?.title || '',
    category: entryData?.category || '',
    intend: entryData?.description.intend || '',
    implementation: entryData?.description.implementation || '',
    impact: entryData?.description.impact || ''
  })

  const [selectedTags, setSelectedTags] = useState<Tag[]>(entryData?.tags || [])

  const [showCategoryTooltip, setShowCategoryTooltip] = useState(false)

  const handleFieldChange = (field: keyof typeof localData, value: string) => {
    const updated = { ...localData, [field]: value }
    setLocalData(updated)

    // Update with proper description object structure
    if (
      field === 'intend' ||
      field === 'implementation' ||
      field === 'impact'
    ) {
      onUpdate({
        description: {
          intend: field === 'intend' ? value : localData.intend,
          implementation:
            field === 'implementation' ? value : localData.implementation,
          impact: field === 'impact' ? value : localData.impact
        }
      })
    } else {
      onUpdate({ [field]: value })
    }
  }

  const addTag = (tag: Tag) => {
    if (!selectedTags.find((t) => t.id === tag.id)) {
      const updatedTags = [...selectedTags, tag]
      setSelectedTags(updatedTags)
      onTagsUpdate(updatedTags)
    }
  }

  const removeTag = (tagId: string) => {
    const updatedTags = selectedTags.filter((t) => t.id !== tagId)
    setSelectedTags(updatedTags)
    onTagsUpdate(updatedTags)
  }

  const sections = [
    {
      title: 'What you were aiming to learn',
      field: 'intend' as keyof typeof localData
    },
    {
      title: 'How you learnt it',
      field: 'implementation' as keyof typeof localData
    },
    { title: 'What was the impact', field: 'impact' as keyof typeof localData }
  ]

  return (
    <>
      <div className="flex justify-between items-start mb-2">
        <input
          type="text"
          value={localData.title}
          onChange={(e) => handleFieldChange('title', e.target.value)}
          placeholder="Title..."
          className="text-2xl font-bold border border-gray-300 rounded px-2 py-1 w-2/3"
        />
        <p className="text-sm text-gray-600">
          Latest time sheet update:{' '}
          {entryData
            ? new Date(entryData.updatedAt).toLocaleDateString('en-GB')
            : 'N/A'}
        </p>
      </div>

      <div className="mb-4 flex items-center gap-2 relative">
        <select
          value={localData.category}
          onChange={(e) => handleFieldChange('category', e.target.value)}
          className="flex-1 border border-gray-300 rounded px-2 py-1"
        >
          <option value="">Select a category...</option>
          <option value="Technical Skills">Technical Skills</option>
          <option value="Professional Development">
            Professional Development
          </option>
          <option value="Project Work">Project Work</option>
          <option value="Team Collaboration">Team Collaboration</option>
        </select>
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowCategoryTooltip(!showCategoryTooltip)}
            className="w-5 h-5 rounded-full !border-2 !border-blue-500 !bg-white !text-blue-500 flex items-center justify-center text-xs font-bold hover:!border-blue-600 hover:!text-blue-600 cursor-help flex-shrink-0"
          >
            ?
          </button>
          {showCategoryTooltip && (
            <div className="absolute right-0 top-full mt-1 bg-gray-800 text-white text-sm rounded-lg p-3 shadow-lg z-10 w-80">
              <p className="mb-2">
                Categories help you organize your learning activities into key
                areas of development.
              </p>
              <p className="text-xs text-gray-300">
                View the{' '}
                <a href="#" className="underline hover:text-blue-300">
                  category guide image
                </a>{' '}
                for detailed explanations of each category.
              </p>
            </div>
          )}
        </div>
      </div>

      {sections.map((section, index) => (
        <div
          key={index}
          className={index === sections.length - 1 ? 'mb-6' : 'mb-4'}
        >
          <h3 className="text-sm font-semibold text-gray-600 mb-1">
            {section.title}
          </h3>
          <textarea
            value={localData[section.field]}
            onChange={(e) => handleFieldChange(section.field, e.target.value)}
            className="w-full border border-gray-300 rounded px-2 py-1 min-h-20"
          />
        </div>
      ))}

      <TimesheetSection {...timesheetProps} />

      <TagSection
        selectedTags={selectedTags}
        mode="edit"
        onAddTag={addTag}
        onRemoveTag={removeTag}
      />
    </>
  )
}

export default EditEntryView
