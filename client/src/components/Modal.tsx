import { useEffect, useState } from 'react'
import ReadEntryView from './ReadEntryView'
import EditEntryView from './EditEntryView'

type ModalView = 'readEntry' | 'create' | 'edit'

interface ModalProps {
  onClose: () => void
  view?: ModalView
}

function Modal({ onClose, view: initialView = 'readEntry' }: ModalProps) {
  const [view, setView] = useState<ModalView>(initialView)

  useEffect(() => {
    // Disable scrolling on mount
    document.body.style.overflow = 'hidden'

    // Re-enable scrolling on unmount
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

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
          <button
            onClick={() => setView(view === 'readEntry' ? 'edit' : 'readEntry')}
          >
            {view === 'readEntry' ? 'Edit' : 'Discard Changes'}
          </button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}

export default Modal
