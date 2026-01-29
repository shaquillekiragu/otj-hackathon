import { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/journals';

interface UseDeleteJournalEntryReturn {
  deleteJournalEntry: (id: string) => Promise<boolean>;
  loading: boolean;
  error: string | null;
}

export const useDeleteJournalEntry = (): UseDeleteJournalEntryReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteJournalEntry = async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.delete(`${API_BASE_URL}/${id}`);

      if (response.data.success) {
        return true;
      }

      return false;
    } catch (err) {
      console.error('Error deleting journal entry:', err);
      setError(
        axios.isAxiosError(err)
          ? err.response?.data?.message || err.message
          : 'Failed to delete journal entry',
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteJournalEntry,
    loading,
    error,
  };
};
