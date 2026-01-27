import { Request, Response } from 'express';
import { getUserByIdService } from '../services/userService';
import { UserIdInput } from '../types/payload';
import { ApiError } from '../utils/apiError';

export const getUser = async (req: Request<UserIdInput>, res: Response) => {
  try {
    const user = await getUserByIdService(req.params.userId);
    res.status(200).json({ success: true, user });
  } catch (error) {
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }

    console.error('Unexpected error getting user', error);

    res.status(500).json({
      success: false,
      message: `Failed to get user for id: ${req.params.userId}`,
    });
  }
};
