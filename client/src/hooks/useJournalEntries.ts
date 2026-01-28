import { useState, useEffect } from 'react'
import axios from 'axios'
import type { JournalEntry } from '../utils/journalData'

const API_BASE_URL = 'http://localhost:8080/api'
const USER_ID = '64eea3f8b1234567890abcde'

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

export const useJournalEntries = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchJournalEntries = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await axios.get(`${API_BASE_URL}/journals`, {
        params: {
          userId: USER_ID
        }
      })

      if (response.data.success && response.data.journalEntries) {
        // Transform API response to match client format
        const transformedEntries = response.data.journalEntries.entries.map(
          (entry: ApiJournalEntry) => ({
            id: entry._id,
            title: entry.title,
            category: entry.category,
            learningAims: entry.description?.intend || '',
            learningMethod: entry.description?.implementation || '',
            impact: entry.description?.impact || '',
            lastTimesheetUpdate:
              entry.timeSheets && entry.timeSheets.length > 0
                ? new Date(
                    entry.timeSheets[entry.timeSheets.length - 1].date
                  ).toLocaleDateString('en-GB')
                : new Date().toLocaleDateString('en-GB'),
            selectedTags: entry.tags
              ? entry.tags.map((tag: ApiTag, tagIndex: number) => ({
                  id: tag._id || `${entry._id}-tag-${tagIndex}`,
                  name: tag.tagDescription,
                  hexColor: tag.tagColour
                }))
              : [],
            timesheetEntries: entry.timeSheets
              ? entry.timeSheets.map((ts: ApiTimeSheet, index: number) => ({
                  id: `${entry._id}-ts-${index}`,
                  date: new Date(ts.date).toISOString().split('T')[0],
                  timeStarted: new Date(ts.startTime).toLocaleTimeString(
                    'en-GB',
                    {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false
                    }
                  ),
                  timeFinished: new Date(ts.endTime).toLocaleTimeString(
                    'en-GB',
                    {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false
                    }
                  ),
                  duration: `${Math.floor(ts.duration / 60)}h ${ts.duration % 60}m`
                }))
              : []
          })
        )
        setEntries(transformedEntries)
      } else {
        throw new Error('Invalid response format')
      }
    } catch (err) {
      const errorMessage =
        axios.isAxiosError(err) && err.response
          ? `Failed to fetch journal entries: ${err.response.statusText}`
          : err instanceof Error
            ? err.message
            : 'Unknown error occurred'
      setError(errorMessage)
      console.error('Error fetching journal entries:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJournalEntries()
  }, [])

  return {
    entries,
    loading,
    error,
    refetch: fetchJournalEntries
  }
}
