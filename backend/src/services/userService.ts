import { ObjectId } from 'mongodb';
import { usersCollection } from '../db/collections';
import { ApiError } from '../utils/apiError';

export const getUserByIdService = async (
	id: string,
) => {
	const user = await usersCollection().findOne({
		_id: new ObjectId(id),
	});

	if (!user) {
		throw new ApiError(`User${id} not found`, 404);
	}

	return user;
};