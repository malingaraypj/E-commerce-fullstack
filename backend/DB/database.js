import mongoose, { connect } from "mongoose";
import { configDotenv } from "dotenv";

configDotenv({ path: "./.env" });

const DB = process.env.DB;

const connectDB = () =>
  mongoose
    .connect(DB)
    .then(() => {
      console.log("database connected");
    })
    .catch(() => {
      console.log("database not connected");
    });

export default connectDB;
