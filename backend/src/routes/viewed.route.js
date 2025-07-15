import express from "express";
import viewedController from "../controllers/viewed.controller.js";
import protectRoute from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", protectRoute, viewedController.addView);
router.get("/", protectRoute, viewedController.getViews);
router.delete("/:productId", protectRoute, viewedController.removeView);

export default router;
