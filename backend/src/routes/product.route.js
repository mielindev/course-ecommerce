import express from "express";
import productController from "../controllers/product.controller.js";
import protectRoute from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", productController.getProducts);

router.get("/:id", productController.getProductById);

router.get(
  "/explore/suggestions",
  protectRoute,
  productController.getSuggestions
);

export default router;
