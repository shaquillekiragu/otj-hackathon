import { useEffect, useState } from 'react';
import ReadEntryView from './ReadEntryView';
import EditEntryView from './EditEntryView';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { type JournalEntry } from '../utils/journalData';
import { type Tag } from '../types/journal';
import { type TimesheetEntry } from '../types/timesheet';
import { useJournalEntry } from '../hooks/useJournalEntry';
import { useCreateJournalEntry } from '../hooks/useCreateJournalEntry';
import { useDeleteJournalEntry } from '../hooks/useDeleteJournalEntry';
import { useUpdateJournalEntry } from '../hooks/useUpdateJournalEntry';

const USER_ID = '64eea3f8b1234567890abcde';

type ModalView = 'readEntry' | 'edit' | 'create';

interface ModalProps {
  onClose: () => void;
  entryId: string;
  onDelete?: () => void;
  onUpdate?: () => void;
}

interface ButtonConfig {
  label: string;
  onClick: () => void;
  variant: 'primary' | 'success' | 'danger' | 'secondary';
}

const buttonStyles = {
  base: '!px-4 !py-2 !text-white !rounded',
  primary: '!bg-blue-500 hover:!bg-blue-600',
  success: '!bg-green-500 hover:!bg-green-600',
  danger: '!bg-red-500 hover:!bg-red-600',
  secondary: '!bg-gray-400 !text-gray-800 hover:!bg-gray-500',
};

const Modal = ({ onClose, entryId, onDelete, onUpdate }: ModalProps) => {
  const initialView = entryId ? 'readEntry' : 'create';
  const [view, setView] = useState<ModalView>(initialView);
  const {
    entry: entryData,
    timesheets,
    loading: isLoading,
    error,
    refetch,
    fetchTimesheets,
    totalPages,
    currentPage,
  } = useJournalEntry(entryId);
  const { createJournalEntry } = useCreateJournalEntry();
  const { deleteJournalEntry, loading: isDeleting } = useDeleteJournalEntry();
  const { updateJournalEntry, loading: isUpdating } = useUpdateJournalEntry();
  const [editData, setEditData] = useState<JournalEntry | null>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleSave = async () => {
    if (view === 'create') {
      // Create new journal entry
      if (!editData) {
        console.error('No data to save');
        return;
      }

      const createdEntry = await createJournalEntry({
        userId: USER_ID,
        title: editData.title || '',
        category: editData.category || '',
        description: {
          intend: editData.description?.intend || '',
          implementation: editData.description?.implementation || '',
          impact: editData.description?.impact || '',
        },
        tags: editData.tags || [],
        timeSheets: editData.timeSheets || [],
      });

      if (createdEntry) {
        // Update editData with the created entry
        setEditData(createdEntry);
        // Switch to read view to show the newly created entry
        setView('readEntry');
        // Notify parent to refetch the list
        onUpdate?.();
      }
    } else if (entryId && view === 'edit') {
      // Update existing entry
      if (!editData) {
        console.error('No data to update');
        return;
      }

      const updatedEntry = await updateJournalEntry(entryId, {
        userId: USER_ID,
        title: editData.title || '',
        category: editData.category || '',
        description: {
          intend: editData.description?.intend || '',
          implementation: editData.description?.implementation || '',
          impact: editData.description?.impact || '',
        },
        tags: editData.tags || [],
        timeSheets: editData.timeSheets || [],
      });

      if (updatedEntry) {
        await refetch();
        onUpdate?.();
        setView('readEntry');
      }
    }
  };

  const handleDiscard = () => {
    onClose();
  };

  const handleDeleteClick = () => {
    if (!entryId && !editData?.id) {
      console.error('No entry to delete');
      return;
    }
    setShowDeleteConfirmation(true);
  };

  const handleDeleteConfirm = async () => {
    const idToDelete = entryId || editData?.id || '';
    const success = await deleteJournalEntry(idToDelete);

    if (success) {
      setShowDeleteConfirmation(false);
      onDelete?.();
      onClose();
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirmation(false);
  };

  const handleTimesheetUpdate = async (updatedTimesheets: TimesheetEntry[]) => {
    if (!entryId || !entryData) {
      console.error('No entry to update');
      return;
    }

    await updateJournalEntry(entryId, {
      userId: USER_ID,
      title: entryData.title || '',
      category: entryData.category || '',
      description: {
        intend: entryData.description?.intend || '',
        implementation: entryData.description?.implementation || '',
        impact: entryData.description?.impact || '',
      },
      tags: entryData.tags || [],
      timeSheets: updatedTimesheets,
    });

    await refetch();
    onUpdate?.();
  };

  const getFooterButtons = (): ButtonConfig[] => {
    if (view === 'create') {
      return [
        {
          label: 'Save',
          onClick: handleSave,
          variant: 'success',
        },
        {
          label: 'Discard',
          onClick: handleDiscard,
          variant: 'secondary',
        },
      ];
    }
    if (view === 'edit') {
      return [
        {
          label: 'Save',
          onClick: handleSave,
          variant: 'success',
        },
        {
          label: 'Cancel',
          onClick: () => setView('readEntry'),
          variant: 'primary',
        },
        { label: 'Delete', onClick: handleDeleteClick, variant: 'danger' },
      ];
    }
    return [
      {
        label: 'Edit',
        onClick: () => {
          // Use editData if available (newly created entry), otherwise use entryData
          const dataToEdit = editData || entryData;
          if (dataToEdit) {
            setEditData({
              ...dataToEdit,
              timeSheets: timesheets || dataToEdit.timeSheets || [],
            });
          }
          setView('edit');
        },
        variant: 'secondary',
      },
      { label: 'Close', onClick: onClose, variant: 'secondary' },
    ];
  };

  const handleEntryUpdate = (updates: Partial<JournalEntry>) => {
    if (editData) {
      setEditData({ ...editData, ...updates });
    } else {
      // Initialize editData for create mode
      setEditData({
        id: '',
        title: '',
        category: '',
        description: {
          intend: '',
          implementation: '',
          impact: '',
        },
        tags: [],
        timeSheets: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...updates,
      } as JournalEntry);
    }
  };

  const handleTagsUpdate = (tags: Tag[]) => {
    if (editData) {
      setEditData({ ...editData, tags });
    } else {
      // Initialize editData for create mode with tags
      setEditData({
        id: '',
        title: '',
        category: '',
        description: {
          intend: '',
          implementation: '',
          impact: '',
        },
        tags,
        timeSheets: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as JournalEntry);
    }
  };

  const handleTimesheetsUpdate = (timeSheets: TimesheetEntry[]) => {
    if (editData) {
      setEditData({ ...editData, timeSheets });
    } else {
      // Initialize editData for create mode with timesheets
      setEditData({
        id: '',
        title: '',
        category: '',
        description: {
          intend: '',
          implementation: '',
          impact: '',
        },
        tags: [],
        timeSheets,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as JournalEntry);
    }
  };

  const renderView = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Loading...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center h-64">
          <p className="text-red-500">Error: {error}</p>
        </div>
      );
    }

    if (entryId && !entryData && view !== 'create') {
      return (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Entry not found</p>
        </div>
      );
    }

    switch (view) {
      case 'readEntry': {
        // Use editData if available (after creating), otherwise use entryData
        const dataToShow = editData || entryData;
        // If we just created an entry, use timeSheets from editData; otherwise use timesheets from API
        const timesheetEntriesToShow = editData?.timeSheets || timesheets;
        return dataToShow ? (
          <ReadEntryView
            entryData={dataToShow}
            timesheetEntries={timesheetEntriesToShow}
            fetchTimesheets={fetchTimesheets}
            totalPages={totalPages}
            currentPage={currentPage}
            onTimesheetUpdate={handleTimesheetUpdate}
          />
        ) : null;
      }
      case 'edit':
        return editData ? (
          <EditEntryView
            entryData={editData}
            onUpdate={handleEntryUpdate}
            onTagsUpdate={handleTagsUpdate}
            onTimesheetsUpdate={handleTimesheetsUpdate}
            timesheetEntries={timesheets}
            fetchTimesheets={fetchTimesheets}
            totalPages={totalPages}
            currentPage={currentPage}
          />
        ) : null;
      case 'create':
        return (
          <EditEntryView
            entryData={editData}
            onUpdate={handleEntryUpdate}
            onTagsUpdate={handleTagsUpdate}
            onTimesheetsUpdate={handleTimesheetsUpdate}
            timesheetEntries={editData?.timeSheets || []}
            fetchTimesheets={async () => {}}
            totalPages={1}
            currentPage={1}
          />
        );
      default:
        return entryData ? (
          <ReadEntryView
            entryData={entryData}
            timesheetEntries={timesheets}
            fetchTimesheets={fetchTimesheets}
            totalPages={totalPages}
            currentPage={currentPage}
            onTimesheetUpdate={handleTimesheetUpdate}
          />
        ) : null;
    }
  };

  return (
    <section
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-lg w-3/4 max-h-[90vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-8 overflow-y-auto flex-1">{renderView()}</div>

          <div className="flex justify-end gap-2 p-4 border-t border-gray-200 bg-white rounded-b-lg">
            {getFooterButtons().map((btn) => (
              <button
                key={btn.label}
                onClick={btn.onClick}
                disabled={
                  (isDeleting && btn.label === 'Delete') ||
                  (isUpdating && btn.label === 'Save')
                }
                className={`${buttonStyles.base} ${buttonStyles[btn.variant]} ${
                  (isDeleting && btn.label === 'Delete') ||
                  (isUpdating && btn.label === 'Save')
                    ? '!opacity-50 !cursor-not-allowed'
                    : ''
                }`}
              >
                {isDeleting && btn.label === 'Delete'
                  ? 'Deleting...'
                  : isUpdating && btn.label === 'Save'
                    ? 'Saving...'
                    : btn.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <DeleteConfirmationModal
        isOpen={showDeleteConfirmation}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        isDeleting={isDeleting}
      />
    </section>
  );
};

export default Modal;
