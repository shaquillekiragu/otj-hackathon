import express from "express";
import cors from "cors";
import { usersCollection } from "./db/collections";
import { getDb } from "./db/mongoClient";

const app = express();

app.use(cors());
app.use(express.json());

// Test endpoint to list all users 
app.get("/api/test/users", async (_req, res) => {
  try {
    const users = await usersCollection().find().toArray();
    res.json({
      status: "ok",
      count: users.length,
      users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Test endpoint to list collections
app.get("/api/test/collections", async (_req, res) => {
  try {
    const db = getDb();
    const collections = await db.listCollections().toArray();
    res.json({
      status: "connected",
      database: db.databaseName,
      collections: collections.map((c) => c.name),
    });
  } catch (error) {
    console.error("Error listing collections:", error);
    res.status(500).json({ error: "Failed to fetch collections" });
  }
});

// Health check endpoint
app.get("/api/health", (_req, res) => {
  try {
    const db = getDb();
    res.json({
      status: "ok",
      mongodb: "connected",
      database: db.databaseName,
    });
  } catch (error) {
    res.status(500).json({ status: "error", mongodb: "disconnected" });
  }
});

export default app;
