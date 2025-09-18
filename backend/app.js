import express from "express";
import globalErrorHandler from "./utils/globalErrorHandler.js";
const app = express();

// style parsing so req.query turns "stock[gt]=15" into { stock: { gt: 15 } }
app.set("query parser", "extended");

// Routes import
import UserRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import CustomerRoutes from "./routes/customer.router.js";
import SellerRoutes from "./routes/seller.routes.js";
import AdminRoutes from "./routes/admin.route.js";

// middlewares
app.use(express.json());

// route path
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);

// user routes
app.use("/api/v1/user", UserRoutes);
app.use("/api/v1/seller", SellerRoutes);
app.use("/api/v1/customer", CustomerRoutes);
app.use("/api/v1/admin", AdminRoutes);

// Catch-all for invalid paths
app.use((req, res, next) => {
  const error = new Error("Invalid path");
  error.status = 404;
  next(error);
});

app.use(globalErrorHandler);

export default app;
