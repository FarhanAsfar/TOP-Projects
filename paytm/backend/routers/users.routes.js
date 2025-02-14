import express from "express"
import zod from "zod"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"

import {User, Account} from "../models/users.models.js"
import authMiddleware from "../middleware.js"

const router = express.Router();

const signupSchema = zod.object({
    username: zod.string(),
    password: zod.string().min(4, "at least 4 characters"),
    firstName: zod.string(),
    lastName: zod.string(),
})

router.post("/signup", async(req, res) => {
    const body = req.body;

    const {success} = signupSchema.safeParse(req.body);
    if(!success){
        return res.json({
            message: "Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username: body.username
    });
    
    if(user){
        return res.json({
            message: "Username already exists"
        });
    }

    const dbUser = await User.create(body);
    // const token = jwt.sign({
    //     userId: dbUser._id
    // }, process.env.JWT_SECRET);

    await Account.create({
        userId: dbUser.id,
        balance: 1 + Math.random()*1000,
    })

    res.json({
        message: "User created successfully",
        // token: token
    })
});

const signinBody = zod.object({
    username: zod.string(),
    password: zod.string().min(4)
})

router.get("/signin", authMiddleware, async(req, res) => {
    const {success} = signinBody.safeParse(req.body);
    
    if(!success){
        return res.status(411).json({
            message: "Invalid username/password"
        });
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if(user){
        const token = jwt.sign({
            userId: user.id
        }, process.env.JWT_SECRET);

        res.json({
            token: token
        })
        return;
    }

    res.status(411).json({
        message: "Error while logging in"
    });
})

const updateBody = zod.object({
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
    password: zod.string().optional(),
})

router.put("/", authMiddleware, async(req, res) => {
    const {success} = updateBody.safeParse(req.body);

    if(!success){
        res.status(411).json({
            message: "Could not update the data"
        })
    }

    await User.updateOne(req.body, {
        id: req.userId
    })

    res.json({
        message: "Updated successfully!"
    });
})

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        },
    {
        lastName: {
            "$regex": filter
        }
    }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

router.post("/transfer", authMiddleware, async(req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    
    const {amount, to} = req.body;

    const account = await Account.findOne({
        userId: req.userId
    }).session(session);

    if(!account || account.balance < amount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient Balance"
        });
    }

    const toAccount = await Account.findOne({
        userId: to
    }).session(session);

    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    await Account.updateOne({userId: req.userId}, {$inc: {balance: -amount}}).session(session);

    await Account.updateOne({userId: to}, {$inc: {balance: amount}}).session(session);


    await session.commitTransaction();
    
    res.json({
        message: "Transfer successful"
    });
});

export default router;