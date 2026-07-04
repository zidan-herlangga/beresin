import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
let client;
let db;

export async function connectDB() {
  if (db) return db;
  if (!uri) return null;
  try {
    client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    });
    await client.connect();
    db = client.db("beresin");
    return db;
  } catch {
    console.warn("MongoDB connection failed, using default data");
    return null;
  }
}

export async function getCollection(name) {
  const db = await connectDB();
  if (!db) return null;
  return db.collection(name);
}
