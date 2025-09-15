import express from "express";
import globalErrorHandler from "./utils/globalErrorHandler.js";
const app = express();

app.get("/", async (req, res) => {
  res.json({
    status: "success",
  });
});

// Catch-all for invalid paths
app.use((req, res, next) => {
  const error = new Error("Invalid path");
  error.status = 404;
  next(error);
});

app.use(globalErrorHandler);

export default app;
