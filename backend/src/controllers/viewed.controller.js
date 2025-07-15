import { get } from "mongoose";
import Viewed from "../models/viewed.model.js";

const viewedController = {
  addView: async (req, res) => {
    try {
      const { productId } = req.body;
      const userId = req.user._id;

      if (!productId) {
        return res.status(400).json({ message: "Product ID is required" });
      }

      const existing = await Viewed.findOne({
        user: userId,
        product: productId,
      });

      if (existing) {
        return res.status(409).json({ message: "Product already viewed" });
      }

      const newViewed = new Viewed({ user: userId, product: productId });
      await newViewed.save();

      return res
        .status(201)
        .json({ message: "Product viewed successfully", data: newViewed });
    } catch (error) {
      console.log("Error in addView controller", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },

  getViews: async (req, res) => {
    try {
      const userId = req.user._id;

      const views = await Viewed.find({ user: userId }).populate("product");

      if (!views) {
        return res.status(404).json({ message: "Views not found" });
      }

      if (views.length === 0) {
        return res.status(404).json({ message: "No views found" });
      }

      return res
        .status(200)
        .json({ message: "Views retrieved successfully", data: views });
    } catch (error) {
      console.log("Error in getViews controller", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },

  removeView: async (req, res) => {
    try {
      const userId = req.user._id;
      const { productId } = req.params;

      const view = await Viewed.findOneAndDelete({
        user: userId,
        product: productId,
      });

      if (!view) {
        return res.status(404).json({ message: "View not found" });
      }

      return res.status(200).json({ message: "View removed successfully" });
    } catch (error) {
      console.log("Error in removeView controller", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

export default viewedController;
