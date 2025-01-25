import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"


const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength:4,
    },
}, {timestamps: true});

// userSchema.pre("save", async function(){
//     if(!this.isModified("password")){
//         return;
//     }
//     this.password = bcrypt.hash(this.password, 10);
// })

const accountSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    balance: {
        type: Number,
        required: true,
    }
})

export const User = mongoose.model("User", userSchema);
export const Account = mongoose.model("Account", accountSchema);

