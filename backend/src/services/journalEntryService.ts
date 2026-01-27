import { ObjectId } from 'mongodb';
import { journalEntriesCollection } from '../db/collections';
import {
  Description,
  JournalEntryDocument,
  TagDocument,
  TimeSheet,
} from '../types/db';
import { getPagination } from '../utils/pagination';
import { ApiError } from '../utils/apiError';
import { JournalInput } from '../types/payload';
import { normaliseTagsForUser } from './utils/normaliseTagsForUsers';
import { syncUserTags } from './tagService';

export const createJournalEntryService = async (createInput: JournalInput) => {
  const {
    userId,
    title,
    description,
    category,
    timeSheets = [],
    tags = [],
  } = createInput;

  const userObjectId = new ObjectId(userId);

  const normalisedTags = normaliseTagsForUser(userObjectId, tags);

  if (normalisedTags.length > 0) {
    await syncUserTags(userObjectId, normalisedTags);
  }

  const newJournalEntry: JournalEntryDocument = {
    userId: new ObjectId(userId),
    title,
    category,
    description,
    timeSheets,
    tags: normalisedTags,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const result = await journalEntriesCollection().insertOne(newJournalEntry);

  if (!result.insertedId) {
    throw new ApiError('Failed to create journal entry', 500);
  }

  return { _id: result.insertedId, ...newJournalEntry };
};

export const listJournalEntriesByUserIdService = async (
  userId: string,
  page?: string,
  limit?: string,
) => {
  if (!userId) throw new ApiError('Missing userId', 400);

  const { page: pageNum, limit: limitNum, skip } = getPagination(page, limit);

  const query = { userId: new ObjectId(userId) };

  const totalEntries = await journalEntriesCollection().countDocuments(query);
  const totalPages = Math.ceil(totalEntries / limitNum);

  const entries = await journalEntriesCollection()
    .find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limitNum)
    .toArray();

  return {
    entries,
    page: pageNum,
    limit: limitNum,
    totalPages,
    totalEntries,
  };
};

export const getJournalEntryByIdService = async (
  journalId: string,
  page?: string,
  limit?: string,
) => {
  const { page: pageNum, limit: limitNum, skip } = getPagination(page, limit);

  const journalEntry = await journalEntriesCollection().findOne({
    _id: new ObjectId(journalId),
  });

  if (!journalEntry) {
    throw new ApiError(
      `Journal entry not found for journal: ${journalId}`,
      404,
    );
  }

  const timesheets: TimeSheet[] = journalEntry.timeSheets || [];
  const totalTimesheets = timesheets.length;
  const totalPages = Math.ceil(totalTimesheets / limitNum);

  const paginatedTimesheets = timesheets.slice(skip, skip + limitNum);

  return {
    journalEntry,
    timesheets: paginatedTimesheets,
    page: pageNum,
    limit: limitNum,
    totalPages,
    totalTimesheets,
  };
};

export const updateJournalEntryService = async (
  journalId: string,
  updateInput: JournalInput,
) => {
  const { title, category, description, tags, timeSheets } = updateInput;

  const journalObjectId = new ObjectId(journalId);

  const journalEntry = await journalEntriesCollection().findOne({
    _id: journalObjectId,
  });

  if (!journalEntry) {
    throw new ApiError(
      `Journal entry not found for journal: ${journalId}`,
      404,
    );
  }

  const updatedFields: Partial<JournalEntryDocument> = {
    title,
    category,
    description,
    updatedAt: new Date(),
  };

  if (typeof timeSheets !== 'undefined') {
    updatedFields.timeSheets = timeSheets;
  }

  if (typeof tags !== 'undefined') {
    const normalisedTags = normaliseTagsForUser(journalEntry.userId, tags);

    await syncUserTags(journalEntry.userId, normalisedTags);

    updatedFields.tags = normalisedTags;
  }

  const updatedJournalEntry = await journalEntriesCollection().findOneAndUpdate(
    { _id: journalObjectId },
    { $set: updatedFields },
    { returnDocument: 'after' },
  );

  if (!updatedJournalEntry) {
    throw new ApiError(
      `Journal entry not found for journal: ${journalId}`,
      404,
    );
  }

  return updatedJournalEntry;
};

export const deleteJournalEntryService = async (journalId: string) => {
  const result = await journalEntriesCollection().deleteOne({
    _id: new ObjectId(journalId),
  });

  return result.deletedCount;
};
