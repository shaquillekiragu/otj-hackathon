import { Response } from 'express';
import { ApiError } from '../../utils/apiError';

export const handleError = (res: Response, error: unknown, message: string) => {
  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }
  console.error(error);
  res.status(500).json({ success: false, message });
};
