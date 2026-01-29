import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import ProgressDiagram from './ProgressDiagram';
import ProgressStats from './ProgressStats';
import type { ProgressTrackerProps } from '../types/progress-tracker';

interface ProgressTrackerModalProps extends ProgressTrackerProps {
  onClose: () => void;
}

export default function ProgressTrackerModal({
  onClose,
  ...progressTrackerProps
}: ProgressTrackerModalProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <section
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Close modal"
        >
          <FontAwesomeIcon icon={faXmark} className="w-5 h-5" />
        </button>

        <div className="p-6">
          <div className="mb-8 pb-6 border-b border-gray-200">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 mb-2 tracking-tight">
              Progress Tracker
            </h2>
            <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
          </div>
          <section className="w-full flex flex-col items-center gap-8 py-8 px-4">
            <ProgressDiagram {...progressTrackerProps} size="large" />
            <ProgressStats {...progressTrackerProps} />
          </section>
        </div>
      </div>
    </section>
  );
}
