import Product from "../models/product.model.js";
import User from "../models/user.model.js";

const cartController = {
  addToCart: async (req, res) => {
    try {
      const userId = req.user._id;
      const { productId, quantity } = req.body;

      if (!productId || quantity < 1) {
        return res
          .status(400)
          .json({ message: "Please enter all required fields" });
      }

      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const existingItemIndex = user.cart.findIndex(
        (item) => item.product.toString() === productId
      );

      if (existingItemIndex > -1) {
        user.cart[existingItemIndex].quantity += quantity;
      } else {
        user.cart.push({ product: productId, quantity });
      }

      await user.save();
      await user.populate("cart.product");

      return res
        .status(200)
        .json({ message: "Product added to cart", cart: user.cart });
    } catch (error) {
      console.log("Error in addToCart controller", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
  getCart: async (req, res) => {
    try {
      const userId = req.user._id;

      const user = await User.findById(userId).populate("cart.product");

      return res.status(200).json({ cart: user.cart });
    } catch (error) {
      console.log("Error in getCart controller", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
  removeFromCart: async (req, res) => {
    try {
      const userId = req.user._id;
      const { productId } = req.params;

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const existingItemIndex = user.cart.findIndex(
        (item) => item.product.toString() === productId
      );

      if (existingItemIndex > -1) {
        user.cart.splice(existingItemIndex, 1);
      }

      await user.save();

      return res
        .status(200)
        .json({ message: "Product removed from cart", cart: user.cart });
    } catch (error) {
      console.log("Error in removeFromCart controller", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
  updateCart: async (req, res) => {
    try {
      const userId = req.user._id;
      const { productId, quantity } = req.body;

      if (!productId || typeof quantity !== "number") {
        return res
          .status(400)
          .json({ message: "Please enter all required fields" });
      }

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const itemIndex = user.cart.findIndex(
        (item) => item.product.toString() === productId
      );

      if (itemIndex === -1) {
        return res.status(404).json({ message: "Item not found in cart" });
      }

      if (quantity <= 0) {
        user.cart.splice(itemIndex, 1);
      } else {
        user.cart[itemIndex].quantity = quantity;
      }

      await user.save();
      await user.populate("cart.product");

      return res
        .status(200)
        .json({ message: "Cart updated successfully", cart: user.cart }, res);
    } catch (error) {
      console.log("Error in updateCart controller", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

export default cartController;
