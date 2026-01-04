import mongoose, { mongo } from "mongoose";
import { ENV } from "./env.js";

export const connectDb = async () => {
    try {
        await mongoose.connect(ENV.DB_URL);
        console.log("Connected to the database successfully");
    }
    catch (error) {
        console.error("Error connecting to the database:", error);
        process.exit(1);
    }
}