import { useState } from 'react'
import JournalTimeline from './components/JournalTimeline'
import SearchFilters from './components/SearchFilters'
import Modal from './components/Modal'

const App = () => {
  const [showModal, setShowModal] = useState(false)
  const [entryToView, setEntryToView] = useState('')

  const handleJournalCardClick = (id: string) => {
    setEntryToView(id)
    setShowModal(true)
  }
  return (
    <>
      {showModal && (
        <Modal
          onClose={() => {
            setShowModal(false)
            setEntryToView('')
          }}
          entryId={entryToView}
        />
      )}
      <div className="flex flex-col items-center justify-start p-4 gap-4">
        <div className="w-full">
          <h1>Log Off-the-Job Activities</h1>
          <h2>
            Description of what this page is for - update later!
            ********************
          </h2>
          <h2>You are currently 3 hours ahead of expectations.</h2>
        </div>
        <button className="px-12!" onClick={() => setShowModal(true)}>
          Log OTJ
        </button>
        <SearchFilters />
        <JournalTimeline
          handleClick={handleJournalCardClick}
        />
      </div>
    </>
  )
}

export default App
