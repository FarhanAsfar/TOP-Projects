import dotenv from "dotenv"
dotenv.config();
import express from "express";
import cors from "cors";


import connectDB from "../backend/db/index.js";
import mainRouter from "../backend/routers/index.js";

const app = express();

connectDB()
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on ${process.env.PORT}`);
    });
})
.catch(error => {
    console.log("Server connection failed", error);
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/v1", mainRouter);



