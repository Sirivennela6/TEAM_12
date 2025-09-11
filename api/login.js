// api/login.js
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Parse the request body
      const { username, password } = req.body;

      // Read environment variables
      const USERNAME = process.env.USERNAME;
      const PASSWORD = process.env.PASSWORD;

      if (!USERNAME || !PASSWORD) {
        return res.status(500).json({ error: "Server config error: missing credentials" });
      }

      if (username === USERNAME && password === PASSWORD) {
        return res.status(200).json({ message: "Login successful" });
      } else {
        return res.status(401).json({ error: "Invalid username or password" });
      }
    } catch (err) {
      console.error("Login API error:", err);
      return res.status(500).json({ error: "Server error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
