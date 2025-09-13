import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

let client;
let db;

export async function connectToDb() {
    if (db) return db;
    if (!client) {
        client = new MongoClient(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }
    await client.connect();
    db = client.db(dbName);
    return db;
}

export function getDb() {
    if (!db) {
        throw new Error('Database not initialized. Call connectToDb first.');
    }
    return db;
}
