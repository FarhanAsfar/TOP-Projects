import mongoose from "mongoose";
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
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
}, {timestamps: true});

userSchema.pre("save", async function(){
    if(!this.isModified("password")){
        return;
    }
    this.password = bcrypt.hash(this.password, 10);
})

export const User = mongoose.model("User", userSchema);