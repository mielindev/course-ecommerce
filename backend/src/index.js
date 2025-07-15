import express, { json } from "express";
import productRoute from "./routes/product.route.js";
import authRoute from "./routes/auth.route.js";
import categoryRoute from "./routes/category.route.js";
import favoriteRoute from "./routes/favorite.route.js";
import viewedRoute from "./routes/viewed.route.js";
import cartRoute from "./routes/cart.route.js";
import { config } from "dotenv";
import connectDB from "./lib/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";

config();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/products", productRoute);
app.use("/api/auth", authRoute);
app.use("/api/category", categoryRoute);
app.use("/api/favorites", favoriteRoute);
app.use("/api/viewed", viewedRoute);
app.use("/api/cart", cartRoute);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
