import { useState } from 'react';
import axios from 'axios';
import type { JournalEntry } from '../utils/journalData';
import type { Tag } from '../types/journal';
import type { TimesheetEntry } from '../types/timesheet';

const API_BASE_URL = 'http://localhost:8080/api';

interface UpdateJournalEntryInput {
  userId: string;
  title: string;
  category: string;
  description: {
    intend: string;
    implementation: string;
    impact: string;
  };
  tags?: Tag[];
  timeSheets?: TimesheetEntry[];
}

interface UseUpdateJournalEntryReturn {
  updateJournalEntry: (
    journalId: string,
    data: UpdateJournalEntryInput,
  ) => Promise<JournalEntry | null>;
  loading: boolean;
  error: string | null;
}

export const useUpdateJournalEntry = (): UseUpdateJournalEntryReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateJournalEntry = async (
    journalId: string,
    data: UpdateJournalEntryInput,
  ): Promise<JournalEntry | null> => {
    try {
      setLoading(true);
      setError(null);

      // Transform tags to match backend format
      const transformedTags = data.tags?.map((tag) => ({
        tagDescription: tag.tagDescription,
        tagColour: tag.tagColour,
      }));

      // Transform timesheets to match backend format (Date objects)
      const transformedTimeSheets = data.timeSheets?.map((ts) => {
        const transformed: any = {
          date: new Date(ts.date),
          startTime: new Date(`${ts.date}T${ts.startTime}`),
          endTime: new Date(`${ts.date}T${ts.endTime}`),
          duration: ts.duration,
        };
        // Include _id if it exists (for existing timesheets)
        if (ts.id) {
          transformed._id = ts.id;
        }
        return transformed;
      });

      const payload = {
        userId: data.userId,
        title: data.title,
        category: data.category,
        description: data.description,
        tags: transformedTags,
        timeSheets: transformedTimeSheets,
      };

      const response = await axios.put(
        `${API_BASE_URL}/journals/${journalId}`,
        payload,
      );

      if (response.data.success && response.data.updatedJournalEntry) {
        // Transform response to match client format
        const apiEntry = response.data.updatedJournalEntry;
        const transformedEntry: JournalEntry = {
          id: apiEntry._id,
          title: apiEntry.title,
          category: apiEntry.category,
          description: apiEntry.description,
          tags:
            apiEntry.tags?.map((tag: any) => ({
              id: tag._id || tag.id,
              tagDescription: tag.tagDescription,
              tagColour: tag.tagColour,
            })) || [],
          timeSheets:
            apiEntry.timeSheets?.map((ts: any) => ({
              id: ts._id,
              date: new Date(ts.date).toISOString().split('T')[0],
              startTime: new Date(ts.startTime).toTimeString().slice(0, 5),
              endTime: new Date(ts.endTime).toTimeString().slice(0, 5),
              duration: ts.duration,
            })) || [],
          createdAt: apiEntry.createdAt,
          updatedAt: apiEntry.updatedAt,
        };

        return transformedEntry;
      }

      return null;
    } catch (err) {
      console.error('Error updating journal entry:', err);
      const errorMessage = axios.isAxiosError(err)
        ? err.response?.data?.message || err.message
        : 'Failed to update journal entry';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    updateJournalEntry,
    loading,
    error,
  };
};
