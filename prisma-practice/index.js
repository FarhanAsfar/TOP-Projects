import express from "express";
import dotenv from "dotenv";
import { prisma } from "./lib/prisma.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Prisma Practice Server is running!");
});

app.get("/users", async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            include: {
                posts: true,
                profile: true,
            },
        });
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});