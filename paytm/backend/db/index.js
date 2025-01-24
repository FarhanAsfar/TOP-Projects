import mongoose from "mongoose";

const connectDB = async() => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected\nHost:${connection.connection.host}`);
    } catch (error) {
        console.log(process.env.MONGO_URI)
        console.error("MongoDB connection Failed", error)
        process.exit(1);
    }
}

export default connectDB;