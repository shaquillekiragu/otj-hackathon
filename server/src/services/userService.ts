import { ObjectId } from 'mongodb';
import { usersCollection } from '../db/collections';
import { ApiError } from '../utils/apiError';

export const getUserByIdService = async (userId: string) => {
	const user = await usersCollection().findOne({
		_id: new ObjectId(userId),
	});

	if (!user) {
		throw new ApiError(`User not found for id: ${userId}`, 404);
	}

	return user;
};
