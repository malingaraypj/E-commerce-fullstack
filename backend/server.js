import { configDotenv } from "dotenv";
import morgan from "morgan";
configDotenv({ path: "./.env" });

import connectDB from "./DB/database.js";
import app from "./app.js";

app.use(morgan("dev"));

const PORT = process.env.PORT || 3000;

connectDB();

app.listen(PORT, () => {
  console.log("server running at: " + PORT);
});
