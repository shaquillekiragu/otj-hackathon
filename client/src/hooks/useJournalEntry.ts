import { useState, useEffect } from 'react'
import axios from 'axios'
import type { JournalEntry } from '../utils/journalData'
import type { TimesheetEntry } from '../types/timesheet'

const API_BASE_URL = 'http://localhost:8080/api'

interface UseJournalEntryReturn {
  entry: JournalEntry | null
  timesheets: TimesheetEntry[]
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
  fetchTimesheets: (page: number, limit?: number) => Promise<void>
  totalPages: number
  currentPage: number
}

export const useJournalEntry = (
  entryId: string | null
): UseJournalEntryReturn => {
  const [entry, setEntry] = useState<JournalEntry | null>(null)
  const [timesheets, setTimesheets] = useState<TimesheetEntry[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)

  const fetchJournalEntry = async () => {
    if (!entryId) {
      setEntry(null)
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)

      const response = await axios.get(`${API_BASE_URL}/journals/${entryId}`, {
        params: { limit: 4 }
      })

      if (response.data.success && response.data.journalEntry) {
        // Transform _id to id for client consistency
        const apiEntry = response.data.journalEntry.journalEntry
        const transformedEntry = {
          ...apiEntry,
          id: apiEntry._id,
          tags:
            apiEntry.tags?.map((tag: any) => ({ ...tag, id: tag._id })) || []
        }
        setEntry(transformedEntry)
        setTimesheets(response.data.journalEntry.timesheets || [])

        // Extract pagination metadata
        setTotalPages(response.data.journalEntry.totalPages || 1)
        setCurrentPage(response.data.journalEntry.page || 1)
      }
    } catch (err) {
      console.error('Error fetching journal entry:', err)
      setError(
        axios.isAxiosError(err)
          ? err.response?.data?.message || err.message
          : 'Failed to fetch journal entry'
      )
      setEntry(null)
    } finally {
      setLoading(false)
    }
  }

  const fetchTimesheets = async (page: number, limit: number = 4) => {
    if (!entryId) return

    try {
      setLoading(true)
      setError(null)

      const response = await axios.get(`${API_BASE_URL}/journals/${entryId}`, {
        params: { page, limit }
      })

      if (response.data.success && response.data.journalEntry) {
        // Use data directly from API response
        setTimesheets(response.data.journalEntry.timesheets || [])

        // Extract pagination metadata
        setTotalPages(response.data.journalEntry.totalPages || 1)
        setCurrentPage(response.data.journalEntry.page || page)
      }
    } catch (err) {
      console.error('Error fetching timesheets:', err)
      setError(
        axios.isAxiosError(err)
          ? err.response?.data?.message || err.message
          : 'Failed to fetch timesheets'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJournalEntry()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entryId])

  return {
    entry,
    timesheets,
    loading,
    error,
    refetch: fetchJournalEntry,
    fetchTimesheets,
    totalPages,
    currentPage
  }
}
