import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export default async function handler(req, res) {
  if (!SECRET || !ADMIN_PASSWORD) {
    return res.status(500).json({ error: "Server configuration error" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { password } = req.body;

  if (typeof password !== "string" || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Password salah" });
  }

  const token = jwt.sign({ role: "admin", iat: Math.floor(Date.now() / 1000) }, SECRET, { expiresIn: "7d" });
  res.status(200).json({ success: true, token });
}
