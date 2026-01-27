import { ObjectId } from 'mongodb';
import { tagsCollection } from '../../db/collections';
import { TagDocument } from '../../types/db';

export const addMissingTags = async (
  userId: ObjectId,
  tagsToAdd: TagDocument[],
) => {
  if (tagsToAdd.length === 0) return;

  const newTagDocuments = tagsToAdd.map((tag) => ({
    _id: new ObjectId(),
    userId,
    tagDescription: tag.tagDescription,
    tagColour: tag.tagColour,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  await tagsCollection().insertMany(newTagDocuments);

  return newTagDocuments;
};
