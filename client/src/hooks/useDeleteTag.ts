import { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';
const USER_ID = '64eea3f8b1234567890abcde';

interface UseDeleteTagReturn {
  deleteTag: (tagId: string) => Promise<boolean>;
  loading: boolean;
  error: string | null;
}

export const useDeleteTag = (): UseDeleteTagReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteTag = async (tagId: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.delete(
        `${API_BASE_URL}/tags/${USER_ID}/${tagId}`,
      );

      if (response.data.success) {
        return true;
      } else {
        throw new Error('Failed to delete tag');
      }
    } catch (err) {
      const errorMessage =
        axios.isAxiosError(err) && err.response
          ? err.response.data?.message ||
            `Delete failed: ${err.response.statusText}`
          : err instanceof Error
            ? err.message
            : 'Failed to delete tag';
      setError(errorMessage);
      console.error('Error deleting tag:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteTag,
    loading,
    error,
  };
};
