import { Description, TimeSheet } from './db';

export type JournalInput = {
  journalId?: string;
  userId: string;
  title: string;
  description: Description;
  category: string;
  timeSheets?: TimeSheet[];
  tags?: TagInput[];
};

export type TagInput = {
  tagDescription: string;
  tagColour: string;
};

export type UserIdInput = {
  userId: string;
};

export type JournalIdInput = {
  journalId: string;
};
