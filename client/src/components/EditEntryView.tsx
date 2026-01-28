import { useState } from 'react'
import TimesheetSection from './TimesheetSection'
import TagSection from './TagSection'
import { useTimesheetManagement } from '../hooks/useTimesheetManagement'
import { type Tag } from '../types/journal'
import { type JournalEntry } from '../utils/journalData'

interface EditEntryViewProps {
  entryData: JournalEntry | null
  onUpdate: (updates: Partial<JournalEntry>) => void
  onTagsUpdate: (tags: Tag[]) => void
}

const EditEntryView = ({
  entryData,
  onUpdate,
  onTagsUpdate
}: EditEntryViewProps) => {
  const timesheetProps = useTimesheetManagement()

  // Local state for form fields
  const [localData, setLocalData] = useState({
    title: entryData?.title || '',
    category: entryData?.category || '',
    learningAims: entryData?.learningAims || '',
    learningMethod: entryData?.learningMethod || '',
    impact: entryData?.impact || ''
  })

  const [selectedTags, setSelectedTags] = useState<Tag[]>(
    entryData?.selectedTags || []
  )

  const handleFieldChange = (field: keyof typeof localData, value: string) => {
    const updated = { ...localData, [field]: value }
    setLocalData(updated)
    onUpdate(updated)
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
      field: 'learningAims' as keyof typeof localData
    },
    {
      title: 'How you learnt it',
      field: 'learningMethod' as keyof typeof localData
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
          className="text-2xl font-bold border border-gray-300 rounded px-2 py-1 w-2/3"
        />
        <p className="text-sm text-gray-600">
          Latest time sheet update: {entryData?.lastTimesheetUpdate || 'N/A'}
        </p>
      </div>

      <input
        type="text"
        value={localData.category}
        onChange={(e) => handleFieldChange('category', e.target.value)}
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
