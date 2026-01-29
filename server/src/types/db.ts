import { ObjectId } from 'mongodb';

export type UserDocument = {
  _id?: ObjectId;
  firstName: string;
  lastName: string;
  expectedOTJHours: number;
  actualOTJHours: number;
  totalOTJHours: number;
  lastOTJActivity: Date;
  createdAt: Date;
};

export type JournalEntryDocument = {
  _id?: ObjectId;
  userId: ObjectId;
  title: string;
  category: string;
  description: Description;
  timeSheets?: TimeSheet[];
  tags?: TagDocument[];
  createdAt: Date;
  updatedAt: Date;
};

export type Description = {
  intend: string;
  implementation: string;
  impact: string;
};

export type TimeSheet = {
  _id?: ObjectId;
  date: Date;
  startTime: Date;
  endTime: Date;
  duration: number;
};

export type TagDocument = {
  _id?: ObjectId;
  userId: ObjectId;
  tagDescription: string;
  tagColour: string;
};
