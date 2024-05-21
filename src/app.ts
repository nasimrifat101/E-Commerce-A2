import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "../src/app/routes/productRoutes";
import orderRoutes from "../src/app/routes/orderRoutes";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

export default app;
