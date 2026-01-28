import { useState } from 'react'
import axios from 'axios'
import type { JournalEntry } from '../utils/journalData'
import type { Tag } from '../types/journal'
import type { TimesheetEntry } from '../types/timesheet'

const API_BASE_URL = 'http://localhost:8080/api'

interface CreateJournalEntryInput {
  userId: string
  title: string
  category: string
  description: {
    intend: string
    implementation: string
    impact: string
  }
  tags?: Tag[]
  timeSheets?: TimesheetEntry[]
}

interface UseCreateJournalEntryReturn {
  createJournalEntry: (
    input: CreateJournalEntryInput
  ) => Promise<JournalEntry | null>
  loading: boolean
  error: string | null
}

export const useCreateJournalEntry = (): UseCreateJournalEntryReturn => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createJournalEntry = async (
    input: CreateJournalEntryInput
  ): Promise<JournalEntry | null> => {
    try {
      setLoading(true)
      setError(null)

      const payload = {
        userId: input.userId,
        title: input.title,
        category: input.category,
        description: {
          intend: input.description.intend,
          implementation: input.description.implementation,
          impact: input.description.impact
        },
        tags:
          input.tags?.map((tag) => ({
            tagDescription: tag.tagDescription,
            tagColour: tag.tagColour
          })) || [],
        timeSheets: input.timeSheets?.map((ts) => ({
          date: new Date(ts.date),
          startTime: new Date(`${ts.date}T${ts.startTime}`),
          endTime: new Date(`${ts.date}T${ts.endTime}`),
          duration: ts.duration
        })) || []
      }

      const response = await axios.post(`${API_BASE_URL}/journals`, payload)

      if (response.data.success && response.data.journalEntry) {
        // Transform the response to match client format
        const createdEntry: JournalEntry = {
          ...response.data.journalEntry,
          id: response.data.journalEntry._id,
          tags:
            response.data.journalEntry.tags?.map(
              (tag: {
                _id: string
                tagDescription: string
                tagColour: string
              }) => ({
                ...tag,
                id: tag._id
              })
            ) || []
        }

        return createdEntry
      }

      return null
    } catch (err) {
      console.error('Error creating journal entry:', err)
      setError(
        axios.isAxiosError(err)
          ? err.response?.data?.message || err.message
          : 'Failed to create journal entry'
      )
      return null
    } finally {
      setLoading(false)
    }
  }

  return {
    createJournalEntry,
    loading,
    error
  }
}
