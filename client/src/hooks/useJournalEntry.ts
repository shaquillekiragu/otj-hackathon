import { useState, useEffect } from 'react'
import axios from 'axios'
import type { JournalEntry } from '../utils/journalData'
import type { TimesheetEntry } from '../types/timesheet'

const API_BASE_URL = 'http://localhost:8080/api'

// API response types
interface ApiTag {
  _id: string
  tagDescription: string
  tagColour: string
}

interface ApiTimeSheet {
  date: string
  startTime: string
  endTime: string
  duration: number
}

interface ApiDescription {
  intend?: string
  implementation?: string
  impact?: string
}

interface ApiJournalEntry {
  _id: string
  title: string
  category: string
  description?: ApiDescription
  timeSheets?: ApiTimeSheet[]
  tags?: ApiTag[]
}

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
        const apiEntry: ApiJournalEntry =
          response.data.journalEntry.journalEntry
        const apiTimesheets: ApiTimeSheet[] =
          response.data.journalEntry.timesheets || []

        // Extract pagination metadata
        setTotalPages(response.data.journalEntry.totalPages || 1)
        setCurrentPage(response.data.journalEntry.page || 1)

        // Transform timesheets from API
        const transformedTimesheets: TimesheetEntry[] = apiTimesheets.map(
          (ts: ApiTimeSheet, index: number) => ({
            id: `${apiEntry._id}-ts-${index}`,
            date: new Date(ts.date).toISOString().split('T')[0],
            timeStarted: new Date(ts.startTime).toLocaleTimeString('en-GB', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
            }),
            timeFinished: new Date(ts.endTime).toLocaleTimeString('en-GB', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
            }),
            duration: `${Math.floor(ts.duration / 60)}h ${ts.duration % 60}m`
          })
        )

        // Transform API response to match client format
        const transformedEntry: JournalEntry = {
          id: apiEntry._id,
          title: apiEntry.title,
          category: apiEntry.category,
          learningAims: apiEntry.description?.intend || '',
          learningMethod: apiEntry.description?.implementation || '',
          impact: apiEntry.description?.impact || '',
          lastTimesheetUpdate:
            apiTimesheets.length > 0
              ? new Date(
                  apiTimesheets[apiTimesheets.length - 1].date
                ).toLocaleDateString('en-GB')
              : new Date().toLocaleDateString('en-GB'),
          selectedTags: apiEntry.tags
            ? apiEntry.tags.map((tag: ApiTag, tagIndex: number) => ({
                id: tag._id || `${apiEntry._id}-tag-${tagIndex}`,
                name: tag.tagDescription,
                hexColor: tag.tagColour
              }))
            : [],
          timesheetEntries: transformedTimesheets
        }

        setEntry(transformedEntry)
        setTimesheets(transformedTimesheets)
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
        const apiEntry: ApiJournalEntry =
          response.data.journalEntry.journalEntry
        const apiTimesheets: ApiTimeSheet[] =
          response.data.journalEntry.timesheets || []

        // Extract pagination metadata
        setTotalPages(response.data.journalEntry.totalPages || 1)
        setCurrentPage(response.data.journalEntry.page || page)

        // Transform timesheets from API
        const transformedTimesheets: TimesheetEntry[] = apiTimesheets.map(
          (ts: ApiTimeSheet, index: number) => ({
            id: `${apiEntry._id}-ts-${index}`,
            date: new Date(ts.date).toISOString().split('T')[0],
            timeStarted: new Date(ts.startTime).toLocaleTimeString('en-GB', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
            }),
            timeFinished: new Date(ts.endTime).toLocaleTimeString('en-GB', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
            }),
            duration: `${Math.floor(ts.duration / 60)}h ${ts.duration % 60}m`
          })
        )

        setTimesheets(transformedTimesheets)
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
