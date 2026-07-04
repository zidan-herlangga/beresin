require("dotenv").config();
const express = require("express");
const path = require("path");
const fs = require("fs");
const Busboy = require("busboy");
const { randomUUID } = require("crypto");

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
const MAX_SIZE = 5 * 1024 * 1024;

async function loadHandler(modPath) {
  const fullPath = path.resolve(__dirname, modPath);
  const fileUrl = "file:///" + fullPath.replace(/\\/g, "/");
  const mod = await import(fileUrl);
  return mod.default;
}

async function start() {
  const app = express();
  app.use(express.json({ limit: "5mb" }));

  // serve uploaded files
  const uploadsDir = path.join(__dirname, "public", "uploads");
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
  app.use("/uploads", express.static(uploadsDir));

  const contactHandler = await loadHandler("api/contact.js");
  const loginHandler = await loadHandler("api/admin/login.js");
  const verifyHandler = await loadHandler("api/admin/verify.js");
  const contentHandler = await loadHandler("api/content.js");
  const seedHandler = await loadHandler("api/seed.js");

  app.post("/api/contact", (req, res) => contactHandler(req, res));
  app.post("/api/admin/login", (req, res) => loginHandler(req, res));
  app.get("/api/admin/verify", (req, res) => verifyHandler(req, res));
  app.post("/api/seed", (req, res) => seedHandler(req, res));

  app.all("/api/content/:page", (req, res) => {
    req.query.page = req.params.page;
    contentHandler(req, res);
  });

  app.all("/api/content", (req, res) => {
    contentHandler(req, res);
  });

  app.post("/api/upload", (req, res) => {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const busboy = Busboy({ headers: req.headers, limits: { fileSize: MAX_SIZE } });
    let fileReceived = false;
    let responded = false;

    function send(code, data) {
      if (responded) return;
      responded = true;
      res.status(code).json(data);
    }

    busboy.on("file", (fieldname, file, info) => {
      fileReceived = true;
      const { filename, mimeType } = info;
      if (!ALLOWED_TYPES.includes(mimeType)) {
        file.resume();
        return send(400, { error: "Tipe file tidak didukung. Gunakan JPG, PNG, WebP, GIF, atau SVG." });
      }

      const ext = filename.split(".").pop() || "jpg";
      const fileName = `${randomUUID()}.${ext}`;
      const savePath = path.join(uploadsDir, fileName);
      const writeStream = fs.createWriteStream(savePath);

      writeStream.on("error", (err) => {
        console.error("Write stream error:", err);
        send(500, { error: "Gagal menyimpan file" });
      });

      file.pipe(writeStream);
      file.on("end", () => {
        send(200, { url: `/uploads/${fileName}` });
      });
      file.on("error", () => {
        send(500, { error: "Gagal membaca file" });
      });
    });

    busboy.on("finish", () => {
      if (!fileReceived) send(400, { error: "Tidak ada file yang diupload" });
    });

    busboy.on("error", () => {
      send(500, { error: "Gagal memproses upload" });
    });

    req.pipe(busboy);
  });

  app.listen(3000, () => {
    console.log("API server running at http://localhost:3000");
  });
}

start();
