require("dotenv").config();
const express = require("express");

async function start() {
  const { default: handler } = await import("./api/contact.js");

  const app = express();
  app.use(express.json());
  app.post("/api/contact", handler);

  app.listen(3000, () => {
    console.log("API server running at http://localhost:3000");
  });
}
start();
