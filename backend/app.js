import express from "express";
import globalErrorHandler from "./utils/globalErrorHandler.js";
import UserRoutes from "./routes/user.routes.js";
const app = express();

app.use("/api/v1/user", UserRoutes);

// Catch-all for invalid paths
app.use((req, res, next) => {
  const error = new Error("Invalid path");
  error.status = 404;
  next(error);
});

app.use(globalErrorHandler);

export default app;
