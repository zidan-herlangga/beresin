import { getCollection } from "./lib/db.js";

export default async function handler(req, res) {
  const slug = req.query.slug || req.body?.slug;
  if (!slug) return res.status(400).json({ error: "slug required" });

  try {
    const col = await getCollection("views");
    if (!col) return res.status(503).json({ error: "db unavailable" });

    if (req.method === "POST") {
      await col.updateOne({ slug }, { $inc: { count: 1 } }, { upsert: true });
      const doc = await col.findOne({ slug });
      return res.status(200).json({ slug, count: doc?.count || 1 });
    }

    const doc = await col.findOne({ slug });
    return res.status(200).json({ slug, count: doc?.count || 0 });
  } catch {
    return res.status(500).json({ error: "server error" });
  }
}
