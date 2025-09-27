import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import User from "./../models/User.js";
import Product from "./../models/Product.js";
import connectDB from "../DB/database.js";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// READ JSON FILES
const users = JSON.parse(
  fs.readFileSync(path.join(__dirname, "users.json"), "utf-8")
).users;

const products = JSON.parse(
  fs.readFileSync(path.join(__dirname, "products.json"), "utf-8")
).products;

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    // await User.create(users, { validateBeforeSave: false });
    await Product.create(products);
    console.log("Data successfully loaded!");
  } catch (err) {
    console.error(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    // await User.deleteMany();
    await Product.deleteMany();
    console.log("Data successfully deleted!");
  } catch (err) {
    console.error(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
