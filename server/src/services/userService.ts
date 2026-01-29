import { ObjectId } from 'mongodb';
import { usersCollection } from '../db/collections';
import { ApiError } from '../utils/apiError';

export const getUserByIdService = async (userId: string) => {
  if (!ObjectId.isValid(userId)) {
    throw new ApiError(`Invalid userId format: ${userId}`, 400);
  }

  const user = await usersCollection().findOne({
    _id: new ObjectId(userId),
  });

  if (!user) {
    throw new ApiError(`User not found for id: ${userId}`, 404);
  }

  // Return user with progress tracking data, providing defaults for missing fields
  // actualOTJHours is maintained by journal entry service when timesheets change
  return {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    actualOTJHours: user.actualOTJHours ?? 0,
    totalOTJHours: user.totalOTJHours ?? 400,
    numberOfWeeksSinceStart: user.numberOfWeeksSinceStart ?? 0,
    hoursPerWeekExpected: user.hoursPerWeekExpected ?? 6,
    lastOTJActivity: user.lastOTJActivity,
    createdAt: user.createdAt,
  };
};
