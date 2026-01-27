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

export type UserIdInput = {
  id: string;
};

export type JournalIdInput = {
  id: string;
};