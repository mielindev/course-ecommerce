import express from "express";
import favoriteController from "../controllers/favorite.controller.js";
import protectRoute from "../middlewares/auth.middleware.js";

const router = express();

router.post("/", protectRoute, favoriteController.addFavorite);
router.get("/", protectRoute, favoriteController.getFavorites);
router.delete("/:productId", protectRoute, favoriteController.removeFavorite);

export default router;
