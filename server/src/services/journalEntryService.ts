import { ObjectId } from 'mongodb';
import { journalEntriesCollection, usersCollection } from '../db/collections';
import {
  Description,
  JournalEntryDocument,
  TagDocument,
  TimeSheet,
} from '../types/db';
import { syncUserTags } from './tagService';
import { getPagination } from './utils/pagination';
import { ApiError } from '../utils/apiError';
import { normaliseTagsForUser } from './utils/normaliseTagsForUsers';
import { JournalInput } from '../types/payload';
import { calculateActualOTJHours } from './utils/calculateUserProgress';

export const createJournalEntryService = async (createInput: JournalInput) => {
  const {
    userId,
    title,
    description,
    category,
    timeSheets = [],
    tags = [],
  } = createInput;

  if (!ObjectId.isValid(userId)) {
    throw new ApiError(`Invalid userId format: ${userId}`, 400);
  }

  const userObjectId = new ObjectId(userId);

  const normalisedTags = normaliseTagsForUser(userObjectId, tags);

  if (normalisedTags.length > 0) {
    await syncUserTags(userObjectId, normalisedTags);
  }

  // Ensure each timesheet has a unique _id
  const timeSheetsWithIds = timeSheets.map((ts) => ({
    ...ts,
    _id: ts._id || new ObjectId(),
  }));

  const newJournalEntry: JournalEntryDocument = {
    userId: new ObjectId(userId),
    title,
    category,
    description,
    timeSheets: timeSheetsWithIds,
    tags: normalisedTags,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const result = await journalEntriesCollection().insertOne(newJournalEntry);

  if (!result.insertedId) {
    throw new ApiError('Failed to create journal entry', 500);
  }

  // Update user's actualOTJHours if timesheets were added
  if (timeSheetsWithIds.length > 0) {
    const actualOTJHours = await calculateActualOTJHours(userObjectId);
    await usersCollection().updateOne(
      { _id: userObjectId },
      {
        $set: {
          actualOTJHours,
          lastOTJActivity: new Date(),
        },
      },
    );
  }

  return { _id: result.insertedId, ...newJournalEntry };
};

export const getJournalEntryByIdService = async (
  journalId: string,
  page?: string,
  limit?: string,
) => {
  if (!ObjectId.isValid(journalId)) {
    throw new ApiError(`Invalid journalId format: ${journalId}`, 400);
  }

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

export const listJournalEntriesByUserIdService = async (
  userId: string,
  page?: string,
  limit?: string,
  search?: string,
  tags?: string[],
) => {
  if (!userId) throw new ApiError('Missing userId', 400);

  if (!ObjectId.isValid(userId)) {
    throw new ApiError(`Invalid userId format: ${userId}`, 400);
  }

  const { page: pageNum, limit: limitNum, skip } = getPagination(page, limit);

  // Build dynamic query
  const query: any = { userId: new ObjectId(userId) };

  // Add search condition for title and description fields
  if (search && search.trim()) {
    const searchRegex = new RegExp(search.trim(), 'i'); // case-insensitive
    query.$or = [
      { title: searchRegex },
      { 'description.intend': searchRegex },
      { 'description.implementation': searchRegex },
      { 'description.impact': searchRegex },
    ];
  }

  // Add tags filter - match entries that have ALL specified tags
  if (tags && tags.length > 0) {
    query['tags.tagDescription'] = { $all: tags };
  }

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

export const updateJournalEntryService = async (
  journalId: string,
  updateInput: JournalInput,
) => {
  const { title, category, description, tags, timeSheets } = updateInput;

  if (!ObjectId.isValid(journalId)) {
    throw new ApiError(`Invalid journalId format: ${journalId}`, 400);
  }

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
    // Ensure each timesheet has a unique _id
    const timeSheetsWithIds = timeSheets.map((ts) => ({
      ...ts,
      _id: ts._id || new ObjectId(),
    }));
    updatedFields.timeSheets = timeSheetsWithIds;
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

  // Update user's actualOTJHours if timesheets were modified
  if (typeof timeSheets !== 'undefined') {
    const actualOTJHours = await calculateActualOTJHours(journalEntry.userId);
    await usersCollection().updateOne(
      { _id: journalEntry.userId },
      {
        $set: {
          actualOTJHours,
          lastOTJActivity: new Date(),
        },
      },
    );
  }

  return updatedJournalEntry;
};

export const deleteJournalEntryService = async (journalId: string) => {
  if (!ObjectId.isValid(journalId)) {
    throw new ApiError(`Invalid journalId format: ${journalId}`, 400);
  }

  const journalObjectId = new ObjectId(journalId);

  // Get the journal entry before deleting to access userId
  const journalEntry = await journalEntriesCollection().findOne({
    _id: journalObjectId,
  });

  if (!journalEntry) {
    throw new ApiError(
      `Journal entry not found for journal: ${journalId}`,
      404,
    );
  }

  const result = await journalEntriesCollection().deleteOne({
    _id: journalObjectId,
  });

  // Update user's actualOTJHours if the entry had timesheets
  if (
    result.deletedCount > 0 &&
    journalEntry.timeSheets &&
    journalEntry.timeSheets.length > 0
  ) {
    const actualOTJHours = await calculateActualOTJHours(journalEntry.userId);
    await usersCollection().updateOne(
      { _id: journalEntry.userId },
      {
        $set: {
          actualOTJHours,
          lastOTJActivity: new Date(),
        },
      },
    );
  }

  return result.deletedCount;
};
