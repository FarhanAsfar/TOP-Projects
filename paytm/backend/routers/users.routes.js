import express from "express"
import User from "../models/users.models"
import zod from "zod"
import jwt from "jsonwebtoken"
import authMiddleware from "../middleware"

const router = express.Router();

const signupSchema = zod.object({
    username: zod.string(),
    password: zod.string(),
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

    const user = User.findOne({
        username: body.username
    });
    if(user._id){
        return res.json({
            message: "Username already exists"
        });
    }

    const dbUser = await User.create(body);
    const token = jwt.sign({
        userId: dbUser._id
    }, process.env.JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    })
});

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string().minLength(4)
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
            userId: user_.id
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
            _id: user_.id
        }))
    })
})



module.exports = router;