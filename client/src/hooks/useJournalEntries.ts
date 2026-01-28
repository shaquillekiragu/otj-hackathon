import { useState, useEffect } from 'react'
import axios from 'axios'
import type { JournalEntry } from '../utils/journalData'

const API_BASE_URL = 'http://localhost:8080/api'
const USER_ID = '64eea3f8b1234567890abcde'

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
        // Transform _id to id for client consistency
        const transformedEntries = response.data.journalEntries.entries.map(
          (entry: any) => ({
            ...entry,
            id: entry._id,
            tags: entry.tags?.map((tag: any) => ({ ...tag, id: tag._id })) || []
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
