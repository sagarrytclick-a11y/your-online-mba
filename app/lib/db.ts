import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env");
}

let cached = global._mongoose;

if (!cached) {
  cached = global._mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    };
    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((m) => m.connection || m)
      .catch((err) => {
        // Allow a later request to retry instead of caching a rejected promise
        cached.promise = null;
        throw err;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
