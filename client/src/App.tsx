import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointer } from '@fortawesome/free-regular-svg-icons/faHandPointer';
import JournalTimeline from './components/JournalTimeline';
import SearchFilters from './components/SearchFilters';
import Modal from './components/Modal';
import HeaderSection from './components/HeaderSection';
import ProgressDiagram from './components/ProgressDiagram';
import ProgressTrackerModal from './components/ProgressTrackerModal';
import { useJournalEntries } from './hooks/useJournalEntries';
import { useUserProgress } from './hooks/useUserProgress';

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [entryToView, setEntryToView] = useState('');
  const [search, setSearch] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const {
    loading,
    entries,
    error,
    refetch,
    currentPage,
    totalPages,
    goToNextPage,
    goToPreviousPage,
  } = useJournalEntries({ search, tags: selectedTags });

  const {
    progressData,
    loading: progressLoading,
    refetch: refetchProgress,
  } = useUserProgress();

  const handleModalClose = () => {
    setShowModal(false);
    setEntryToView('');
    // Refetch progress data when modal closes as timesheets may have changed
    refetchProgress();
  };

  const handleJournalUpdate = () => {
    refetch();
    refetchProgress();
  };

  const handleJournalCardClick = (id: string) => {
    setEntryToView(id);
    setShowModal(true);
  };
  return (
    <>
      {showModal && (
        <Modal
          onClose={handleModalClose}
          entryId={entryToView}
          onDelete={handleJournalUpdate}
          onUpdate={handleJournalUpdate}
        />
      )}

      {showProgressModal && (
        <ProgressTrackerModal
          onClose={() => setShowProgressModal(false)}
          {...progressData}
        />
      )}

      <main className="flex flex-col items-center p-4 gap-6 my-10 overflow-x-hidden">
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <HeaderSection
            progressData={progressData}
            loading={progressLoading}
          />

          <div className="w-full lg:sticky lg:top-10 flex flex-col items-center lg:items-end">
            <div className="flex flex-col items-center gap-4">
              <ProgressDiagram
                onClick={() => setShowProgressModal(true)}
                {...progressData}
              />
              <div className="flex items-center gap-1.5 text-xs text-gray-400 italic">
                <FontAwesomeIcon icon={faHandPointer} className="w-3 h-3" />
                <span>Click to view details</span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-5xl flex flex-col items-center gap-6">
          <button className="px-12!" onClick={() => setShowModal(true)}>
            Log OTJ
          </button>

          <SearchFilters
            onSearchChange={setSearch}
            onTagsChange={setSelectedTags}
          />

          <JournalTimeline
            handleClick={handleJournalCardClick}
            entries={entries}
            loading={loading}
            error={error}
            currentPage={currentPage}
            totalPages={totalPages}
            onNextPage={goToNextPage}
            onPreviousPage={goToPreviousPage}
          />
        </div>
      </main >
    </>
  );
};

export default App;
