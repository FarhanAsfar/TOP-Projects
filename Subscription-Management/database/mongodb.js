import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";

if(!DB_URI){
    throw new Error("MongoDB_URI environment variable is missing inside .env.<development/production>.local");
}

const connectDatabase = async () => {
    try {
        await mongoose.connect(DB_URI);

        console.log(`Database connected in ${NODE_ENV} mode`)
    } catch (error) {
        console.error("Could not connect to the Database", error);
        process.exit(1);
    }
}


export default connectDatabase;