import dotenv from "dotenv"
dotenv.config();

import { app } from "./app.js";
import { connectDatabase, disconnectDatabase, prisma } from "./src/db/index.js";

connectDatabase()
    .then(()=> {
        app.listen(process.env.PORT, ()=> {
            console.log(`Server is running on PORT: 3333`);
        })
    })
    .catch((error) => {
        console.error("Server connection error (index.js)", error);
        process.exit(1);
    });

process.on('SIGINT', async()=>{
    await disconnectDatabase();
    console.log("Database disconnected");
    process.exit(0);
});