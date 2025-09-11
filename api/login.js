// api/login.js
export default function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { username, password } = req.body;

      const USERNAME = process.env.USERNAME;
      const PASSWORD = process.env.PASSWORD;

      if (username === USERNAME && password === PASSWORD) {
        res.status(200).json({ message: "Login successful" });
      } else {
        res.status(401).json({ error: "Invalid username or password" });
      }
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
