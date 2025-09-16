import express from "express";
import globalErrorHandler from "./utils/globalErrorHandler.js";
const app = express();

// Routes import
import UserRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";

// middlewares
app.use(express.json());

// route path
app.use("/api/v1/user", UserRoutes);
app.use("/api/v1/auth", authRoutes);

// Catch-all for invalid paths
app.use((req, res, next) => {
  const error = new Error("Invalid path");
  error.status = 404;
  next(error);
});

app.use(globalErrorHandler);

export default app;
