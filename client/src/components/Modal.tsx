import { useEffect, useState } from 'react'
import ReadEntryView from './ReadEntryView'
import EditEntryView from './EditEntryView'

type ModalView = 'readEntry' | 'create' | 'edit'

interface ModalProps {
  onClose: () => void
  view?: ModalView
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

function Modal({ onClose, view: initialView = 'readEntry' }: ModalProps) {
  const [view, setView] = useState<ModalView>(initialView)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  const handleSave = () => {
    // TODO: Implement save logic
    console.log('Save entry')
  }

  const handleDelete = () => {
    // TODO: Implement delete logic
    console.log('Delete entry')
  }

  const getFooterButtons = (): ButtonConfig[] => {
    if (view === 'edit') {
      return [
        { label: 'Save', onClick: handleSave, variant: 'success' },
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

  const renderView = () => {
    switch (view) {
      case 'readEntry':
        return <ReadEntryView />
      case 'create':
      case 'edit':
        return <EditEntryView />
      default:
        return <ReadEntryView />
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
