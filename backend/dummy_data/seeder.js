import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import User from "./../models/User.js";
import connectDB from "../DB/database.js";

console.log(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
console.log("file", __filename);
const __dirname = fileURLToPath(__filename);

console.log("__direname: ", __dirname);

dotenv.config();
connectDB();

const users = JSON.parse(
  fs.readFileSync(path.join(__dirname, "dummy_data", "users.json"), utf - 8)
).users;

// Import user into DB
const importUserData = async () => {
  try {
    await User.create(users, { validationBeforeSave: false });
    console.log("Data successfully loaded! ");
  } catch (err) {
    console.error(err);
  }
  process.exit();
};

//Delete all user data
const deleteData = async () => {
  try {
    await User.deleteMany();
    console.log("Data successfully deleted: ");
  } catch (err) {
    console.error(err);
  }
  process.exit();
};

// process command line arguments
console.log(process.argv);
