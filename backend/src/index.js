import express, { json } from "express";
import productRoute from "./routes/product.route.js";
import authRoute from "./routes/auth.route.js";
import categoryRoute from "./routes/category.route.js";
import favoriteRoute from "./routes/favorite.route.js";
import viewedRoute from "./routes/viewed.route.js";
import { config } from "dotenv";
import connectDB from "./lib/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

config();
const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json({ limit: "10mb" }));
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

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(
      path.join(__dirname, "../../frontend/dist", "dist", "index.html")
    );
  });
}
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
