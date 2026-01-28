import { useState } from 'react'
import JournalTimeline from './components/JournalTimeline'
import SearchFilters from './components/SearchFilters'
import Modal from './components/Modal'
import ProgressTracker from './components/ProgressTracker'
import otjRequirements from './assets/otj-requirements.png'

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
        <div
          className="w-screen h-screen z-10 bg-transparent" onClick={() => {
            setShowModal(false)
            setEntryToView('')
          }}>
          <Modal
            onClose={() => {
              setShowModal(false)
              setEntryToView('')
            }}
            entryId={entryToView}
          />
        </div>
      )}
      <div className="flex flex-col items-center justify-start p-4 gap-4">
        <div className="w-full">
          <h1>Log Off-the-Job Activities</h1>
          <h2>
            Off-the-Job (OTJ) training refers to learning activities that take
            place during your paid working hours, but that are not part of your
            day-to-day duties. You can see more information on what counts as
            OTJ training{' '}
            <a
              href={otjRequirements}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              here
            </a>
            .
          </h2>
          <h2>You are currently 3 hours ahead of expectations.</h2>
        </div>
        <button className="px-12!" onClick={() => setShowModal(true)}>
          Log OTJ
        </button>
        <SearchFilters />
        <JournalTimeline handleClick={handleJournalCardClick} />
        <ProgressTracker />
      </div>
    </>
  )
}

export default App
