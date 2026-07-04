import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "beresin-admin-secret-2024";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ valid: false });
  }

  try {
    jwt.verify(auth.slice(7), SECRET);
    res.status(200).json({ valid: true });
  } catch {
    res.status(401).json({ valid: false });
  }
}
