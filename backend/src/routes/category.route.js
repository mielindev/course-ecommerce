import express from "express";
import categoryController from "../controllers/category.controller.js";

const router = express.Router();

router.post("/", categoryController.createCategory);
router.get("/", categoryController.getCategories);

export default router;
