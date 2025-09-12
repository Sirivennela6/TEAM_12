import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to Environment Variables (MONGODB_URI).");
}

if (process.env.NODE_ENV === "development") {
  // In dev, reuse client between hot reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, create new client
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
