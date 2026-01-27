import { ObjectId } from 'mongodb';
import { tagsCollection } from '../../db/collections';
import { TagDocument } from '../../types/db';

export const getUserTags = async (userId: ObjectId): Promise<TagDocument[]> => {
  return tagsCollection().find({ userId }).toArray();
};
