import Busboy from "busboy";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { randomUUID } from "crypto";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
const MAX_SIZE = 5 * 1024 * 1024;

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  return new Promise((resolve) => {
    const busboy = Busboy({ headers: req.headers, limits: { fileSize: MAX_SIZE } });
    let fileSaved = false;
    let fileName = "";
    let fileBuffer = null;
    let fileMime = "";

    busboy.on("file", (fieldname, file, info) => {
      const { filename, mimeType } = info;
      if (!ALLOWED_TYPES.includes(mimeType)) {
        file.resume();
        res.status(400).json({ error: "Tipe file tidak didukung. Gunakan JPG, PNG, WebP, GIF, atau SVG." });
        fileSaved = true;
        return resolve();
      }

      fileMime = mimeType;
      const ext = filename.split(".").pop() || "jpg";
      fileName = `${randomUUID()}.${ext}`;
      const chunks = [];

      file.on("data", (chunk) => chunks.push(chunk));
      file.on("end", async () => {
        fileBuffer = Buffer.concat(chunks);

        try {
          const useCloudinary = process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET;

          if (useCloudinary) {
            const b64 = `data:${fileMime};base64,${fileBuffer.toString("base64")}`;
            const result = await cloudinary.uploader.upload(b64, {
              folder: "beresin",
              public_id: fileName.replace(`.${ext}`, ""),
              overwrite: true,
            });
            fileSaved = true;
            res.status(200).json({ url: result.secure_url });
          } else {
            const uploadDir = process.env.VERCEL ? "/tmp/uploads" : join(process.cwd(), "public", "uploads");
            await mkdir(uploadDir, { recursive: true });
            await writeFile(join(uploadDir, fileName), fileBuffer);
            fileSaved = true;
            res.status(200).json({ url: `/uploads/${fileName}` });
          }
        } catch (err) {
          console.error("Upload error:", err);
          res.status(500).json({ error: "Gagal menyimpan file" });
        }
        resolve();
      });
    });

    busboy.on("field", (name, val) => {});
    busboy.on("finish", () => {
      if (!fileSaved) {
        res.status(400).json({ error: "Tidak ada file yang diupload" });
        resolve();
      }
    });

    req.pipe(busboy);
  });
}
