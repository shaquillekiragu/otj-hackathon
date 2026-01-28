import { useState } from 'react'
import type { TimesheetEntry, NewTimesheetEntry } from '../types/timesheet'
import { calculateDuration } from '../utils/timeCalculations'

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
    startTime: '',
    endTime: ''
  })

  const timesheetEntries = initialEntries

  const closeTimesheetForm = () => {
    setIsAddingTimesheet(false)
    setNewEntry({ date: '', startTime: '', endTime: '' })
  }

  const handleSaveTimesheet = () => {
    // TODO: API call to save timesheet entry
    const newTimesheetEntry: TimesheetEntry = {
      date: newEntry.date,
      startTime: newEntry.startTime,
      endTime: newEntry.endTime,
      duration: calculateDuration(newEntry.startTime, newEntry.endTime)
    }

    console.log('Save timesheet entry:', newTimesheetEntry)

    // Navigate to first page to see the new entry after API call
    fetchTimesheets(1)

    closeTimesheetForm()
  }

  const handleDeleteTimesheet = (entry: TimesheetEntry) => {
    // TODO: API call to delete timesheet entry
    console.log('Delete timesheet entry:', entry)
  }

  const handleEditTimesheet = (updatedEntry: TimesheetEntry) => {
    // TODO: API call to update timesheet entry
    console.log('Edit timesheet entry:', updatedEntry)
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
