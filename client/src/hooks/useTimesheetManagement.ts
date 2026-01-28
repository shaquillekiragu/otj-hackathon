import { useState } from 'react'
import type { TimesheetEntry, NewTimesheetEntry } from '../types/timesheet'
import {
  calculateDuration,
  formatDateForDisplay
} from '../utils/timeCalculations'

export const useTimesheetManagement = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const [isAddingTimesheet, setIsAddingTimesheet] = useState(false)
  const [newEntry, setNewEntry] = useState<NewTimesheetEntry>({
    date: '',
    timeStarted: '',
    timeFinished: ''
  })
  const [timesheetEntries, setTimesheetEntries] = useState<TimesheetEntry[][]>([
    [
      {
        date: '21 Jan 2026',
        timeStarted: '14:00',
        timeFinished: '16:30',
        duration: '2h 30m'
      },
      {
        date: '20 Jan 2026',
        timeStarted: '09:30',
        timeFinished: '12:00',
        duration: '2h 30m'
      },
      {
        date: '17 Jan 2026',
        timeStarted: '10:00',
        timeFinished: '12:00',
        duration: '2h'
      }
    ],
    [
      {
        date: '16 Jan 2026',
        timeStarted: '13:00',
        timeFinished: '15:45',
        duration: '2h 45m'
      },
      {
        date: '15 Jan 2026',
        timeStarted: '09:00',
        timeFinished: '11:30',
        duration: '2h 30m'
      }
    ]
  ])

  const closeTimesheetForm = () => {
    setIsAddingTimesheet(false)
    setNewEntry({ date: '', timeStarted: '', timeFinished: '' })
  }

  const handleSaveTimesheet = () => {
    const newTimesheetEntry: TimesheetEntry = {
      date: formatDateForDisplay(newEntry.date),
      timeStarted: newEntry.timeStarted,
      timeFinished: newEntry.timeFinished,
      duration: calculateDuration(newEntry.timeStarted, newEntry.timeFinished)
    }

    // Add to the start of the first page
    setTimesheetEntries((prev) => {
      const updatedFirstPage = [newTimesheetEntry, ...prev[0]]
      return [updatedFirstPage, ...prev.slice(1)]
    })

    closeTimesheetForm()
  }

  const goToPreviousPage = () => {
    setCurrentPage((prev) => prev - 1)
  }

  const goToNextPage = () => {
    setCurrentPage((prev) => prev + 1)
  }

  return {
    // State
    currentPage,
    isAddingTimesheet,
    newEntry,
    timesheetEntries,
    // Handlers
    setIsAddingTimesheet,
    setNewEntry,
    closeTimesheetForm,
    handleSaveTimesheet,
    goToPreviousPage,
    goToNextPage
  }
}
