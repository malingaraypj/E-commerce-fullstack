import { configDotenv } from "dotenv";
import morgan from "morgan";
configDotenv({ path: "./.env" });

import app from "./app.js";

app.use(morgan("dev"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("server running at: " + PORT);
});
