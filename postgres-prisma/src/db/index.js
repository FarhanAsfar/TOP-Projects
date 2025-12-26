import dotenv from "dotenv"
import pkg from "@prisma/client";

dotenv.config();

const {PrismaClient} = pkg;
const prisma = new PrismaClient();

const connectDatabase = async ()=> {
    try {
        await prisma.$connect();
        console.log("PostgreSQL connected successfully");
    } catch (error) {
        console.error(`Database connection failed`, error);
        process.exit(1)
    }
}

const disconnectDatabase = async ()=> {
    await prisma.$disconnect();
}

export {connectDatabase, disconnectDatabase, prisma};