import { useState, useEffect } from 'react';
import axios from 'axios';
import type { Tag } from '../types/journal';

const API_BASE_URL = 'http://localhost:8080/api';
const USER_ID = '64eea3f8b1234567890abcde';

interface UseUserTagsReturn {
  tags: Tag[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useUserTags = (): UseUserTagsReturn => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTags = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(`${API_BASE_URL}/tags/${USER_ID}`);

      if (response.data.success && response.data.tags) {
        // Transform _id to id for client consistency
        const transformedTags = response.data.tags.map((tag: any) => ({
          ...tag,
          id: tag._id,
        }));
        setTags(transformedTags);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      const errorMessage =
        axios.isAxiosError(err) && err.response
          ? `Failed to fetch tags: ${err.response.statusText}`
          : err instanceof Error
            ? err.message
            : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Error fetching tags:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  return {
    tags,
    loading,
    error,
    refetch: fetchTags,
  };
};
