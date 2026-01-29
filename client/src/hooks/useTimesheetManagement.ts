import { useState, useEffect } from 'react';
import type { TimesheetEntry, NewTimesheetEntry } from '../types/timesheet';
import { calculateDuration } from '../utils/timeCalculations';

interface UseTimesheetManagementProps {
  initialEntries: TimesheetEntry[];
  fetchTimesheets: (page: number) => Promise<void>;
  totalPages: number;
  currentPage: number;
  onTimesheetsUpdate?: (timesheets: TimesheetEntry[]) => void;
}

export const useTimesheetManagement = ({
  initialEntries,
  fetchTimesheets,
  totalPages,
  currentPage,
  onTimesheetsUpdate,
}: UseTimesheetManagementProps) => {
  const [isAddingTimesheet, setIsAddingTimesheet] = useState(false);
  const [newEntry, setNewEntry] = useState<NewTimesheetEntry>({
    date: '',
    startTime: '',
    endTime: '',
  });
  const [localTimesheets, setLocalTimesheets] =
    useState<TimesheetEntry[]>(initialEntries);

  // Update local timesheets when initialEntries changes (e.g., when fetching from API)
  useEffect(() => {
    setLocalTimesheets(initialEntries);
  }, [initialEntries]);

  // Use local timesheets for display
  const timesheetEntries = localTimesheets;

  const closeTimesheetForm = () => {
    setIsAddingTimesheet(false);
    setNewEntry({ date: '', startTime: '', endTime: '' });
  };

  const handleSaveTimesheet = () => {
    const newTimesheetEntry: TimesheetEntry = {
      id: `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      date: newEntry.date,
      startTime: newEntry.startTime,
      endTime: newEntry.endTime,
      duration: calculateDuration(newEntry.startTime, newEntry.endTime),
    };

    // Add to local state
    const updatedTimesheets = [newTimesheetEntry, ...localTimesheets];
    setLocalTimesheets(updatedTimesheets);

    // Notify parent component (for create mode)
    if (onTimesheetsUpdate) {
      onTimesheetsUpdate(updatedTimesheets);
    } else {
      // For edit mode with existing entries, call API
      console.log('Save timesheet entry:', newTimesheetEntry);
      // Navigate to first page to see the new entry after API call
      fetchTimesheets(1);
    }

    closeTimesheetForm();
  };

  const handleDeleteTimesheet = (entry: TimesheetEntry) => {
    // Remove from local state by ID
    const updatedTimesheets = localTimesheets.filter((t) => t.id !== entry.id);
    setLocalTimesheets(updatedTimesheets);

    // Notify parent component (for create mode)
    if (onTimesheetsUpdate) {
      onTimesheetsUpdate(updatedTimesheets);
    } else {
      // For edit mode with existing entries, call API
      console.log('Delete timesheet entry:', entry);
    }
  };

  const handleEditTimesheet = (updatedEntry: TimesheetEntry) => {
    // Update in local state by matching using the ID
    const updatedTimesheets = localTimesheets.map((t) => {
      if (t.id === updatedEntry.id) {
        return updatedEntry;
      }
      return t;
    });
    setLocalTimesheets(updatedTimesheets);

    // Notify parent component (for create mode)
    if (onTimesheetsUpdate) {
      onTimesheetsUpdate(updatedTimesheets);
    } else {
      // For edit mode with existing entries, call API
      console.log('Edit timesheet entry:', updatedEntry);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      fetchTimesheets(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      fetchTimesheets(currentPage + 1);
    }
  };

  return {
    // State
    currentPage,
    totalPages,
    isAddingTimesheet,
    newEntry,
    timesheetEntries,
    // Handlers
    setIsAddingTimesheet,
    setNewEntry,
    closeTimesheetForm,
    handleSaveTimesheet,
    handleDeleteTimesheet,
    handleEditTimesheet,
    goToPreviousPage,
    goToNextPage,
  };
};
