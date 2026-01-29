import { useState, useEffect } from 'react';
import axios from 'axios';
import type { ProgressTrackerProps } from '../types/progress-tracker';

const API_BASE_URL = 'http://localhost:8080/api';
const USER_ID = '64eea3f8b1234567890abcde';

interface UserProgressResponse {
  success: boolean;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    actualOTJHours: number;
    totalOTJHours: number;
    numberOfWeeksSinceStart: number;
    hoursPerWeekExpected: number;
    lastOTJActivity: Date;
    createdAt: Date;
  };
}

export const useUserProgress = () => {
  const [progressData, setProgressData] = useState<ProgressTrackerProps>({
    totalOTJHours: 400,
    actualOTJHours: 0,
    numberOfWeeksSinceStart: 0,
    hoursPerWeekExpected: 6,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserProgress = async () => {
    try {
      setLoading(true);
      const response = await axios.get<UserProgressResponse>(
        `${API_BASE_URL}/users/${USER_ID}`,
      );

      if (response.data.success && response.data.user) {
        const user = response.data.user;
        setProgressData({
          totalOTJHours: user.totalOTJHours,
          actualOTJHours: user.actualOTJHours,
          numberOfWeeksSinceStart: user.numberOfWeeksSinceStart,
          hoursPerWeekExpected: user.hoursPerWeekExpected,
        });
      }
      setError(null);
    } catch (err) {
      console.error('Error fetching user progress:', err);
      setError('Failed to load progress data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProgress();
  }, []);

  return {
    progressData,
    loading,
    error,
    refetch: fetchUserProgress,
  };
};
