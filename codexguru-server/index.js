import express from "express";
import dotenv from "dotenv";
import dbConnect from "./config/db.conf.js";

dotenv.config();

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Express + TypeScript Server");
});

await dbConnect();

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
