import { ObjectId } from 'mongodb';
import { Description, TimeSheet } from './db';

export type JournalInput = {
  id?: string;
  userId: string;
  title: string;
  description: Description;
  category: string;
  timeSheets?: TimeSheet[];
  tagIds?: string[];
};

export type ListJournalEntriesByUserInput = {
  userId: string;
};

export type GetJournalEntryByIdInput = {
  id: string;
};
