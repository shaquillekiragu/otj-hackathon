import { Collection, Document } from 'mongodb';
import { getDb } from './mongoClient';
import { UserDocument, JournalEntryDocument, TagDocument } from '../types/db';

const getCollection = <T extends Document>(name: string): Collection<T> =>
  getDb().collection<T>(name);

export const usersCollection = () => getCollection<UserDocument>('users');
export const journalEntriesCollection = () =>
  getCollection<JournalEntryDocument>('journalEntries');
export const tagsCollection = () => getCollection<TagDocument>('tags');
