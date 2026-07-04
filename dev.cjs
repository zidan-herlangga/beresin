require("dotenv").config();
const express = require("express");
const path = require("path");

async function loadHandler(modPath) {
  const fullPath = path.resolve(__dirname, modPath);
  const fileUrl = "file:///" + fullPath.replace(/\\/g, "/");
  const mod = await import(fileUrl);
  return mod.default;
}

async function start() {
  const app = express();
  app.use(express.json({ limit: "5mb" }));

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

  app.listen(3000, () => {
    console.log("API server running at http://localhost:3000");
  });
}

start();
