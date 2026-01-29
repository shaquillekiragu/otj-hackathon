import { useState } from 'react';
import axios from 'axios';
import type { Tag } from '../types/journal';

const API_BASE_URL = 'http://localhost:8080/api';
const USER_ID = '64eea3f8b1234567890abcde';

interface UseCreateTagReturn {
  createTag: (tagDescription: string, tagColour: string) => Promise<Tag | null>;
  loading: boolean;
  error: string | null;
}

export const useCreateTag = (): UseCreateTagReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createTag = async (
    tagDescription: string,
    tagColour: string,
  ): Promise<Tag | null> => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(`${API_BASE_URL}/tags`, {
        userId: USER_ID,
        tagDescription,
        tagColour,
      });

      if (response.data.success && response.data.tag) {
        const createdTag: Tag = {
          ...response.data.tag,
          id: response.data.tag._id,
        };
        return createdTag;
      }

      return null;
    } catch (err) {
      const errorMessage =
        axios.isAxiosError(err) && err.response
          ? err.response.data?.message ||
            `Create failed: ${err.response.statusText}`
          : err instanceof Error
            ? err.message
            : 'Failed to create tag';
      setError(errorMessage);
      console.error('Error creating tag:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    createTag,
    loading,
    error,
  };
};
