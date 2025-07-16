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

      // Check if the user has already viewed the product
      await Viewed.findOneAndUpdate(
        {
          user: userId,
          product: productId,
        },
        // If the user has already viewed the product, update the timestamp
        {
          $set: {},
        },
        // Else create a new document
        {
          upsert: true,
          new: true,
          setDefaultsOnInsert: true,
        }
      );

      return res
        .status(201)
        .json({ message: "Product has been marked as viewed successfully" });
    } catch (error) {
      console.log("Error in addView controller", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },

  getViews: async (req, res) => {
    try {
      const userId = req.user._id;

      const views = await Viewed.find({ user: userId }).populate("product");

      if (views.length === 0) {
        return res.status(200).json({ message: "No views yet", viewed: [] });
      }

      return res
        .status(200)
        .json({ message: "Views retrieved successfully", viewed: views });
    } catch (error) {
      console.log("Error in getViews controller", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },

  removeView: async (req, res) => {
    try {
      const userId = req.user._id;

      const view = await Viewed.deleteMany({
        user: userId,
      });

      return res.status(200).json({ message: "View removed successfully" });
    } catch (error) {
      console.log("Error in removeView controller", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

export default viewedController;
