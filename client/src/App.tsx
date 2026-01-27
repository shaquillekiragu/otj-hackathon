import { useState } from 'react'
import JournalTimeline from './components/JournalTimeline'
import SearchFilters from './components/SearchFilters'
import Modal from './components/Modal'

function App() {
  const [showModal, setShowModal] = useState(true)

  const placeholderEntries = [
    {
      id: 1,
      title: 'Entry 1',
      description: 'Description for entry 1',
      date: '2026-01-26'
    },
    {
      id: 2,
      title: 'Entry 2',
      description: 'Description for entry 2',
      date: '2026-01-24'
    },
    {
      id: 3,
      title: 'Entry 3',
      description: 'Description for entry 3',
      date: '2026-01-20'
    }
  ]
  return (
    <>
      {showModal && <Modal onClose={() => setShowModal(false)} />}
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
        <JournalTimeline entries={placeholderEntries} />
      </div>
    </>
  )
}

export default App
