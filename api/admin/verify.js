import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
  if (!SECRET) {
    return res.status(500).json({ valid: false, error: "Server configuration error" });
  }

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
