import express from "express";
import authController from "../controllers/auth.controller.js";
import protectRoute from "../middlewares/auth.middleware.js";
import cartController from "../controllers/cart.controller.js";
const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);

router.post("/logout", authController.logout);

router.get("/check", protectRoute, authController.check);
router.put("/update", protectRoute, authController.updateProfilePic);

router.get("/cart", protectRoute, cartController.getCart);
router.post("/cart/add", protectRoute, cartController.addToCart);
router.delete(
  "/cart/remove/:productId",
  protectRoute,
  cartController.removeFromCart
);
router.put("/cart/update", protectRoute, cartController.updateCart);

export default router;
