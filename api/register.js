// api/register.js
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    if (!uri) {
      return res.status(500).json({ error: "Server config error: missing MongoDB URI" });
    }

    try {
      await client.connect();
      const db = client.db("dailycoding");
      const users = db.collection("users");

      const existingUser = await users.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ error: "Username already exists" });
      }

      await users.insertOne({ username, password });
      return res.status(201).json({ message: "Registration successful" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Database connection error" });
    } finally {
      await client.close();
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
