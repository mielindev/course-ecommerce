import express from "express";
import categoryController from "../controllers/category.controller.js";

const router = express.Router();

router.post("/", categoryController.createCategory);

export default router;
