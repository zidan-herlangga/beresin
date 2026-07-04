import Busboy from "busboy";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { randomUUID } from "crypto";
import { v2 as cloudinary } from "cloudinary";

if (process.env.CLOUDINARY_CLOUD_NAME) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
const MAX_SIZE = 5 * 1024 * 1024;

export const config = { api: { bodyParser: false } };

function send(res, code, data, responded) {
  if (responded.done) return;
  responded.done = true;
  res.status(code).json(data);
}

function processBuffer(buffer, contentType, res, responded) {
  const busboy = Busboy({ headers: { "content-type": contentType }, limits: { fileSize: MAX_SIZE } });
  let fileReceived = false;

  busboy.on("file", (fieldname, file, info) => {
    fileReceived = true;
    const { filename, mimeType } = info;

    if (!ALLOWED_TYPES.includes(mimeType)) {
      file.resume();
      return send(res, 400, { error: "Tipe file tidak didukung. Gunakan JPG, PNG, WebP, GIF, atau SVG." }, responded);
    }

    const ext = filename.split(".").pop() || "jpg";
    const name = `${randomUUID()}.${ext}`;
    const chunks = [];

    file.on("data", (chunk) => chunks.push(chunk));
    file.on("end", async () => {
      const fileBuffer = Buffer.concat(chunks);

      try {
        const hasCloudinary = process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET;

        if (hasCloudinary) {
          const b64 = `data:${mimeType};base64,${fileBuffer.toString("base64")}`;
          const result = await cloudinary.uploader.upload(b64, {
            folder: "beresin",
            public_id: name.replace(`.${ext}`, ""),
            overwrite: true,
          });
          send(res, 200, { url: result.secure_url }, responded);
        } else {
          const uploadDir = process.env.VERCEL ? "/tmp/uploads" : join(process.cwd(), "public", "uploads");
          await mkdir(uploadDir, { recursive: true });
          await writeFile(join(uploadDir, name), fileBuffer);
          send(res, 200, { url: `/uploads/${name}` }, responded);
        }
      } catch (err) {
        console.error("Upload save error:", err);
        send(res, 500, { error: "Gagal menyimpan file" }, responded);
      }
    });
    file.on("error", () => send(res, 500, { error: "Gagal membaca file" }, responded));
  });

  busboy.on("finish", () => {
    if (!fileReceived) send(res, 400, { error: "Tidak ada file yang diupload" }, responded);
  });

  busboy.on("error", (err) => {
    console.error("Busboy error:", err);
    send(res, 500, { error: "Gagal memproses upload" }, responded);
  });

  busboy.end(buffer);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const responded = { done: false };

  try {
    const contentType = req.headers["content-type"];
    if (!contentType || !contentType.includes("multipart/form-data")) {
      return send(res, 400, { error: "Content-Type harus multipart/form-data" }, responded);
    }

    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const buffer = Buffer.concat(chunks);

    if (buffer.length === 0) {
      return send(res, 400, { error: "Request body kosong" }, responded);
    }

    processBuffer(buffer, contentType, res, responded);
  } catch (err) {
    console.error("Upload error:", err);
    send(res, 500, { error: "Gagal memproses upload" }, responded);
  }
}
