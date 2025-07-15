import Favorite from "../models/favorite.model.js";

const favoriteController = {
  addFavorite: async (req, res) => {
    try {
      const userId = req.user._id;
      const { productId } = req.body;

      if (!productId) {
        return res.status(400).json({ message: "Product ID is required" });
      }

      const existing = await Favorite.findOne({
        user: userId,
        product: productId,
      });

      if (existing) {
        return res
          .status(409)
          .json({ message: "Product already in favorites" });
      }

      const favorite = await Favorite.create({
        user: userId,
        product: productId,
      });

      if (!favorite) {
        return res.status(500).json({ message: "Failed to add to favorites" });
      }

      await favorite.save();

      return res.status(201).json({
        message: "Added to favorites successfully",
        favorite,
      });
    } catch (error) {
      console.log("Error in addFavorite controller", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
  getFavorites: async (req, res) => {
    try {
      const userId = req.user._id;

      const favorites = await Favorite.find({ user: userId }).populate(
        "product"
      );

      return res.status(200).json({ favorites });
    } catch (error) {
      console.log("Error in getFavorites controller", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
  removeFavorite: async (req, res) => {
    try {
      const userId = req.user._id;
      const { productId } = req.params;

      const favorite = await Favorite.findOneAndDelete({
        user: userId,
        product: productId,
      });

      if (!favorite) {
        return res.status(404).json({ message: "Favorite not found" });
      }

      return res.status(200).json({ message: "Favorite removed successfully" });
    } catch (error) {
      console.log("Error in removeFavorite controller", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

export default favoriteController;
