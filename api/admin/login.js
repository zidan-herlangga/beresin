import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "beresin-admin-secret-2024";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { password } = req.body;
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

  if (password !== adminPassword) {
    return res.status(401).json({ error: "Password salah" });
  }

  const token = jwt.sign({ role: "admin" }, SECRET, { expiresIn: "7d" });
  res.status(200).json({ success: true, token });
}
