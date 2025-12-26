import express from "express"
import dotenv from "dotenv"
dotenv.config();
import { userRouter } from "./user.router.js";

const app = express();

const PORT = process.env.PORT || 3333;

app.use(express.json());

app.get("/", (req, res) => {
    res.json("prisma server")
});

app.use("/api/user", userRouter);

app.listen(PORT, ()=>{
    console.log(`Server is running on port 3333`);
});


export {app};


