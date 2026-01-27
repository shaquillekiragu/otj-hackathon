import { ObjectId } from 'mongodb';
import { TagInput } from '../../types/payload';
import { TagDocument } from '../../types/db';

export const normaliseTagsForUser = (
  userId: ObjectId,
  tags: TagInput[],
): TagDocument[] =>
  tags.map((tag) => ({
    userId,
    tagDescription: tag.tagDescription.trim(),
    tagColour: tag.tagColour,
  }));
