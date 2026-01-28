import { useEffect, useState } from 'react'
import ReadEntryView from './ReadEntryView'
import EditEntryView from './EditEntryView'
import { getJournalEntryById, type JournalEntry } from '../utils/journalData'
import { type Tag } from '../types/journal'

type ModalView = 'readEntry' | 'edit' | 'create'

interface ModalProps {
  onClose: () => void
  entryId: string
}

interface ButtonConfig {
  label: string
  onClick: () => void
  variant: 'primary' | 'success' | 'danger' | 'secondary'
}

const buttonStyles = {
  base: '!px-4 !py-2 !text-white !rounded',
  primary: '!bg-blue-500 hover:!bg-blue-600',
  success: '!bg-green-500 hover:!bg-green-600',
  danger: '!bg-red-500 hover:!bg-red-600',
  secondary: '!bg-gray-200 !text-gray-800 hover:!bg-gray-300'
}

const Modal = ({ onClose, entryId }: ModalProps) => {
  const initialView = entryId ? 'readEntry' : 'create'
  const [view, setView] = useState<ModalView>(initialView)
  const [entryData, setEntryData] = useState<JournalEntry | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Fetch entry data if entryId exists
  useEffect(() => {
    const fetchEntry = async () => {
      if (entryId) {
        setIsLoading(true)
        try {
          const data = await getJournalEntryById(entryId)
          setEntryData(data)
        } catch (error) {
          console.error('Failed to fetch entry:', error)
        } finally {
          setIsLoading(false)
        }
      }
    }
    fetchEntry()
  }, [entryId])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  const handleSave = async () => {
    // TODO: Implement save logic
    console.log('Save entry', entryData)

    // If editing an existing entry, refetch the data
    if (entryId && view === 'edit') {
      try {
        const data = await getJournalEntryById(entryId)
        setEntryData(data)
        setView('readEntry')
      } catch (error) {
        console.error('Failed to refetch entry:', error)
      }
    } else {
      // For create mode, close the modal after save
      onClose()
    }
  }

  const handleDiscard = () => {
    onClose()
  }

  const handleDelete = () => {
    // TODO: Implement delete logic
    console.log('Delete entry')
  }

  const getFooterButtons = (): ButtonConfig[] => {
    if (view === 'create') {
      return [
        {
          label: 'Save',
          onClick: handleSave,
          variant: 'success'
        },
        {
          label: 'Discard',
          onClick: handleDiscard,
          variant: 'secondary'
        }
      ]
    }
    if (view === 'edit') {
      return [
        {
          label: 'Save',
          onClick: handleSave,
          variant: 'success'
        },
        {
          label: 'Cancel',
          onClick: () => setView('readEntry'),
          variant: 'primary'
        },
        { label: 'Delete', onClick: handleDelete, variant: 'danger' }
      ]
    }
    return [
      { label: 'Edit', onClick: () => setView('edit'), variant: 'secondary' },
      { label: 'Close', onClick: onClose, variant: 'secondary' }
    ]
  }

  const handleEntryUpdate = (updates: Partial<JournalEntry>) => {
    if (entryData) {
      setEntryData({ ...entryData, ...updates })
    }
  }

  const handleTagsUpdate = (tags: Tag[]) => {
    if (entryData) {
      setEntryData({ ...entryData, selectedTags: tags })
    }
  }

  const renderView = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Loading...</p>
        </div>
      )
    }

    if (entryId && !entryData) {
      return (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Entry not found</p>
        </div>
      )
    }

    switch (view) {
      case 'readEntry':
        return entryData ? <ReadEntryView entryData={entryData} /> : null
      case 'edit':
        return entryData ? (
          <EditEntryView
            entryData={entryData}
            onUpdate={handleEntryUpdate}
            onTagsUpdate={handleTagsUpdate}
          />
        ) : null
      case 'create':
        return (
          <EditEntryView
            entryData={null}
            onUpdate={handleEntryUpdate}
            onTagsUpdate={handleTagsUpdate}
          />
        )
      default:
        return entryData ? <ReadEntryView entryData={entryData} /> : null
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-3/4 max-h-[90vh] flex flex-col">
        <div className="p-8 overflow-y-auto flex-1">{renderView()}</div>

        <div className="flex justify-end gap-2 p-4 border-t border-gray-200 bg-white rounded-b-lg">
          {getFooterButtons().map((btn) => (
            <button
              key={btn.label}
              onClick={btn.onClick}
              className={`${buttonStyles.base} ${buttonStyles[btn.variant]}`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Modal
