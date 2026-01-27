import { Collection, Document } from "mongodb";
import { getDb } from "./mongoClient";
import { User, JournalEntry, Tag } from "../types/types";

const getCollection = <T extends Document>(name: string): Collection<T> => getDb().collection<T>(name);

export const usersCollection = () => getCollection<User>("users");
export const journalEntriesCollection = () => getCollection<JournalEntry>("journalEntries");
export const tagsCollection = () => getCollection<Tag>("tags");
