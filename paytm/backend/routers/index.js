import express from "express";
import userRouter from "./users.routes.js"
import accountRouter from "./accounts.routes.js"

const router = express.Router();

router.use("/user", userRouter);
router.use("/account", accountRouter);


export default router;