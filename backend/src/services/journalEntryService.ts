import { ObjectId } from 'mongodb';
import { journalEntriesCollection } from '../db/collections';
import { Description, JournalEntryDocument, TimeSheet } from '../types/db';
import { getPagination } from '../utils/pagination';
import { ApiError } from '../utils/apiError';
import { JournalInput } from '../types/payload';

export const createJournalEntryService = async (createInput: JournalInput) => {
  const {
    userId,
    title,
    description,
    category,
    timeSheets = [],
    tagIds = [],
  } = createInput;

  const newJournalEntry: JournalEntryDocument = {
    userId: new ObjectId(userId),
    title,
    category,
    description,
    timeSheets,
    tagIds,
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
  id: string,
  page?: string,
  limit?: string,
) => {
  const { page: pageNum, limit: limitNum, skip } = getPagination(page, limit);

  const journalEntry = await journalEntriesCollection().findOne({
    _id: new ObjectId(id),
  });

  if (!journalEntry) {
    throw new ApiError(`Journal entry not found for journal: ${id}`, 404);
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

export const updateJournalEntryService = async (updateInput: JournalInput) => {
  const updatedJournalEntry = await journalEntriesCollection().findOneAndUpdate(
    { _id: new ObjectId(updateInput.id) },
    {
      $set: {
        ...updateInput,
        userId: new ObjectId(updateInput.userId),
        updateInput: new Date(),
      },
    },
    { returnDocument: 'after' },
  );

  if (!updatedJournalEntry) {
    throw new ApiError(
      `Journal entry not found for journal: ${updateInput.id}`,
      404,
    );
  }

  return updatedJournalEntry;
};

export const deleteJournalEntryService = async (id: string) => {
  const result = await journalEntriesCollection().deleteOne({
    _id: new ObjectId(id),
  });

  return result.deletedCount === 1;
};
