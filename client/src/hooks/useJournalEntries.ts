import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import type { JournalEntry } from '../utils/journalData';

const API_BASE_URL = 'http://localhost:8080/api';
const USER_ID = '64eea3f8b1234567890abcde';

interface UseJournalEntriesParams {
  search?: string;
  tags?: string[];
}

export const useJournalEntries = (params: UseJournalEntriesParams = {}) => {
  const { search, tags } = params;
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchJournalEntries = useCallback(
    async (page: number = 1) => {
      try {
        setLoading(true);
        setError(null);

        const requestParams: Record<string, string | number> = {
          userId: USER_ID,
          page,
        };

        // Add search param if provided
        if (search && search.trim()) {
          requestParams.search = search.trim();
        }

        // Add tags param if provided (comma-separated)
        if (tags && tags.length > 0) {
          requestParams.tags = tags.join(',');
        }

        const response = await axios.get(`${API_BASE_URL}/journals`, {
          params: requestParams,
        });

        if (response.data.success && response.data.journalEntries) {
          // Transform _id to id for client consistency
          interface EntryResponse {
            _id: string;
            tags?: Array<{ _id: string; [key: string]: unknown }>;
            [key: string]: unknown;
          }

          const transformedEntries = response.data.journalEntries.entries.map(
            (entry: EntryResponse) => ({
              ...entry,
              id: entry._id,
              tags: entry.tags?.map((tag) => ({ ...tag, id: tag._id })) || [],
            }),
          );
          setEntries(transformedEntries);
          setCurrentPage(response.data.journalEntries.page);
          setTotalPages(response.data.journalEntries.totalPages);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (err) {
        const errorMessage =
          axios.isAxiosError(err) && err.response
            ? `Failed to fetch journal entries: ${err.response.statusText}`
            : err instanceof Error
              ? err.message
              : 'Unknown error occurred';
        setError(errorMessage);
        console.error('Error fetching journal entries:', err);
      } finally {
        setLoading(false);
      }
    },
    [search, tags],
  );

  useEffect(() => {
    // Reset to page 1 when search or tags change
    setCurrentPage(1);
    fetchJournalEntries(1);
  }, [fetchJournalEntries]);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      fetchJournalEntries(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      fetchJournalEntries(currentPage - 1);
    }
  };

  return {
    entries,
    loading,
    error,
    refetch: () => fetchJournalEntries(currentPage),
    currentPage,
    totalPages,
    goToNextPage,
    goToPreviousPage,
  };
};
