import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

const cartController = {
  addProductToCart: async (req, res) => {
    try {
      const userId = req.user._id;
      const { productId, quantity = 1 } = req.body;

      if (!productId) {
        return res.status(400).json({ message: "Product ID is required" });
      }

      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      let cart = await Cart.findOne({ user: userId });
      if (!cart) {
        cart = new Cart({ user: userId, items: [] });
      }

      const existingItem = cart.items.find((item) =>
        item.product.equals(productId)
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity: quantity });
      }
      await cart.save();

      await cart.populate("items.product");

      return res.status(200).json({ cart: cart.items });
    } catch (error) {
      console.log("Error in addProductToCart controller", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },

  getCart: async (req, res) => {
    try {
      const userId = req.user._id;
      const cart = await Cart.findOne({ user: userId }).populate(
        "items.product"
      );

      if (!cart) {
        return res.status(200).json({ cart: [] });
      }

      return res
        .status(200)
        .json({ message: "Cart retrieved successfully", cart: cart.items });
    } catch (error) {
      console.log("Error in getCart controller", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },

  updateCart: async (req, res) => {
    try {
      const userId = req.user._id;
      const { productId, quantity } = req.body;

      if (!productId || quantity < 1) {
        return res
          .status(400)
          .json({ message: "Invalid product ID or quantity" });
      }

      const cart = await Cart.findOne({ user: userId });

      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      const existingItem = cart.items.find((item) =>
        item.product.equals(productId)
      );

      if (!existingItem) {
        return res.status(404).json({ message: "Product not found in cart" });
      }

      existingItem.quantity = quantity;

      await cart.save();
      await cart.populate("items.product");

      return res
        .status(200)
        .json({ message: "Cart updated successfully", cart: cart.items });
    } catch (error) {
      console.log("Error in updateCart controller", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },

  removeProductFromCart: async (req, res) => {
    try {
      const userId = req.user._id;
      const { productId } = req.params;

      const cart = await Cart.findOne({ user: userId });

      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      const initialLength = cart.items.length;
      cart.items = cart.items.filter((item) => !item.product.equals(productId));

      if (cart.items.length === initialLength) {
        return res.status(404).json({ message: "Product not found in cart" });
      }

      await cart.save();
      await cart.populate("items.product");

      return res
        .status(200)
        .json({ message: "Product removed from cart", cart: cart.items });
    } catch (error) {
      console.log("Error in removeProductFromCart controller", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

export default cartController;
