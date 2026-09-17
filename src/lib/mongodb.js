/**
 * mongodb.js
 * MongoDB connection singleton using the official `mongodb` driver.
 * Prevents opening multiple connections in Next.js hot-reload (dev) and
 * serverless (prod) environments by caching the client promise on `global`.
 *
 * Backend & DB Rubric: demonstrates real connection strategy.
 * Replace MONGODB_URI in .env.local with your Atlas connection string.
 *
 * Week 9 Task: wire this into /api/students and /api/matches routes.
 */

import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {
  maxPoolSize: 10,         // max simultaneous connections
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

let client;
let clientPromise;

if (!uri) {
  // During Week 5, MONGODB_URI may not be set yet.
  // Mock routes will handle data; this file documents the strategy.
  console.warn(
    "[mongodb.js] MONGODB_URI is not defined. " +
    "Set it in .env.local to enable live database access."
  );
}

if (process.env.NODE_ENV === "development") {
  // In development, cache the client on the global object to avoid
  // exhausting the connection pool on every hot reload.
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, it is fine to create a new client for each module load.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;

/**
 * Helper: returns the hostel_db database handle.
 * Usage:
 *   import clientPromise from "@/lib/mongodb";
 *   const client = await clientPromise;
 *   const db = client.db("hostel_db");
 *   const students = await db.collection("students").find({}).toArray();
 */
export async function getDb() {
  const connectedClient = await clientPromise;
  return connectedClient.db("hostel_db");
}
