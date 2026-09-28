import mongoose from "mongoose";
import "dotenv/config";

async function dbConnect() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("DB connected successfully");
  } catch (error) {
    console.error(error);
    console.log("DB Connection failed");
    process.exit(1);
  }
}

export default dbConnect;
