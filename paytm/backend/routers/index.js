import express from "express";
import userRouter from "./router"
const router = express.Router();

router.use("/user", userRouter);



module.exports = router;