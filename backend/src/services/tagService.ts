import { ObjectId } from 'mongodb';
import { ApiError } from '../utils/apiError';
import { TagDocument } from '../types/db';
import { TagInput } from '../types/payload';
import { journalEntriesCollection, tagsCollection } from '../db';
import { getUserTags } from './utils/getUserTags';
import { addMissingTags } from './utils/addMissingTags';

export const syncUserTags = async (
  userId: ObjectId,
  incomingTags: TagDocument[],
) => {
  const existingTags = await getUserTags(userId);
  const existingMap = new Map(existingTags.map((t) => [t.tagDescription, t]));
  const newTags = incomingTags.filter(
    (t) => !existingMap.has(t.tagDescription),
  );

  if (newTags.length) {
    await addMissingTags(userId, newTags);
  }
};

export const getTagsByUserService = async (userId: string) => {
  const userObjectId = new ObjectId(userId);
  return getUserTags(userObjectId);
};

export const updateUserTagService = async (
  tagId: string,
  userId: string,
  updateInput: TagInput,
) => {
  const tagObjectId = new ObjectId(tagId);
  const userObjectId = new ObjectId(userId);

  const updatedTag = await tagsCollection().findOneAndUpdate(
    { _id: tagObjectId, userId: userObjectId },
    { $set: { ...updateInput } },
    { returnDocument: 'after' },
  );

  if (!updatedTag) throw new ApiError(`Tag not found for id: ${tagId}`, 404);

  // Propagate updates to journal entries
  await journalEntriesCollection().updateMany(
    { userId: userObjectId, 'tags._id': tagObjectId },
    {
      $set: {
        'tags.$.tagDescription': updateInput.tagDescription,
        'tags.$.tagColour': updateInput.tagColour,
      },
    },
  );

  return updatedTag;
};

export const deleteUserTagService = async (tagId: string, userId: string) => {
  const tagObjectId = new ObjectId(tagId);
  const userObjectId = new ObjectId(userId);

  const deleteResult = await tagsCollection().deleteOne({
    _id: tagObjectId,
    userId: userObjectId,
  });

  if (deleteResult.deletedCount === 0) throw new ApiError('Tag not found', 404);

  // Removes deleted tag from all journal entries
  await journalEntriesCollection().updateMany(
    { userId: userObjectId },
    { $pull: { tags: { _id: tagObjectId } } },
  );

  return deleteResult.deletedCount;
};
