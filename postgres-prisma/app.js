import express from "express"
import { prisma } from "./src/db/index.js";

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
    res.json("server is running")
});

export {app};