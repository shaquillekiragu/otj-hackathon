import { MongoClient, Db } from "mongodb";

let client: MongoClient;
let db: Db;

export const connectMongo = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error("MONGO_URI not defined");

  client = new MongoClient(uri);
  await client.connect();
  db = client.db();
  console.log("MongoDB connected");
};

export const getDb = (): Db => {
  if (!db) throw new Error("Database not initialised. Call connectMongo first.");
  return db;
};

export const getClient = (): MongoClient => {
  if (!client) throw new Error("MongoClient not initialised. Call connectMongo first.");
  return client;
};
