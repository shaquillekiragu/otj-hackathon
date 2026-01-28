import { useState } from 'react'
import type { TimesheetEntry, NewTimesheetEntry } from '../types/timesheet'
import {
  calculateDuration,
  formatDateForDisplay
} from '../utils/timeCalculations'

interface UseTimesheetManagementProps {
  initialEntries: TimesheetEntry[]
  fetchTimesheets: (page: number) => Promise<void>
  totalPages: number
  currentPage: number
}

export const useTimesheetManagement = ({
  initialEntries,
  fetchTimesheets,
  totalPages,
  currentPage
}: UseTimesheetManagementProps) => {
  const [isAddingTimesheet, setIsAddingTimesheet] = useState(false)
  const [newEntry, setNewEntry] = useState<NewTimesheetEntry>({
    date: '',
    timeStarted: '',
    timeFinished: ''
  })

  const timesheetEntries = initialEntries

  const closeTimesheetForm = () => {
    setIsAddingTimesheet(false)
    setNewEntry({ date: '', timeStarted: '', timeFinished: '' })
  }

  const handleSaveTimesheet = () => {
    // TODO: API call to save timesheet entry
    const newTimesheetEntry: TimesheetEntry = {
      id: Date.now().toString(),
      date: formatDateForDisplay(newEntry.date),
      timeStarted: newEntry.timeStarted,
      timeFinished: newEntry.timeFinished,
      duration: calculateDuration(newEntry.timeStarted, newEntry.timeFinished)
    }

    console.log('Save timesheet entry:', newTimesheetEntry)

    // Navigate to first page to see the new entry after API call
    fetchTimesheets(1)

    closeTimesheetForm()
  }

  const handleDeleteTimesheet = (id: string) => {
    // TODO: API call to delete timesheet entry
    console.log('Delete timesheet entry:', id)
  }

  const handleEditTimesheet = (
    id: string,
    updatedEntry: Omit<TimesheetEntry, 'id'>
  ) => {
    // TODO: API call to update timesheet entry
    console.log('Edit timesheet entry:', id, updatedEntry)
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      fetchTimesheets(currentPage - 1)
    }
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      fetchTimesheets(currentPage + 1)
    }
  }

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
    goToNextPage
  }
}
