import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DB_URL = process.env.DB_URL;  // from .env file

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log(" MongoDB Connected Successfully!");
  } catch (err) {
    console.error(" MongoDB Connection Failed:", err.message);
    process.exit(1);
  }
};

export default {connectDB};
