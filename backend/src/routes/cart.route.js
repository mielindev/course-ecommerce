import express from "express";
import cartController from "../controllers/cart.controller.js";
import protectRoute from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, cartController.getCart);
router.post("/add", protectRoute, cartController.addProductToCart);
router.put("/update", protectRoute, cartController.updateProductFromCart);
router.delete(
  "/remove/:productId",
  protectRoute,
  cartController.removeProductFromCart
);

export default router;
