import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    try {
      const client = await clientPromise;
      const db = client.db("dailycoding");
      const users = db.collection("users");

      // Find user with same username & password
      const user = await users.findOne({ username, password });
      if (!user) {
        return res.status(401).json({ error: "Invalid username or password" });
      }

      return res.status(200).json({ message: "Login successful" });
    } catch (err) {
      console.error("Login error:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
