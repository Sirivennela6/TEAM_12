// api/login.js
export default function handler(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body;

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
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
