import express from "express";
import authMiddleware from "../middleware";
import { Account } from "../models/users.models";
const router = express.Router();


router.get("/balance", authMiddleware, async(req, res) => {
    const account = await Account.findOne({
        userId: req.userId,
    });

    res.json({
        balance: account.balance
    })
})



export default router;