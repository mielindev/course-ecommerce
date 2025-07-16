import { create } from "zustand";
import axiosIntance from "../lib/axios";
import toast from "react-hot-toast";

const useCartStore = create((set, get) => ({
  cart: [],
  isGettingCart: false,

  getCart: async () => {
    try {
      set({ isGettingCart: true });
      const res = await axiosIntance.get("/auth/cart");
      set({ cart: res.data.cart, isGettingCart: false });
    } catch (error) {
      console.log("Error in getCart: ", error);
      set({ isGettingCart: false });
    }
  },

  addToCart: async ({ productId, quantity }) => {
    try {
      const res = await axiosIntance.post("/auth/cart/add", {
        productId,
        quantity,
      });

      const updatedCart = res.data.cart;

      set({ cart: updatedCart });

      toast.success(res.message || "Product added to cart!");
    } catch (error) {
      console.log("Error in addToCart: ", error);
      toast.error(error.response.data.message || "Failed to add to cart!");
    }
  },

  updateItemFromCart: async ({ productId, quantity }) => {
    try {
      const res = await axiosIntance.put("/auth/cart/update", {
        productId,
        quantity,
      });
      const updatedCart = res.data.cart;
      set({ cart: updatedCart });
    } catch (error) {
      console.log("Error in updateItemFromCart: ", error);
    }
  },
  removeItemFromCart: async (productId) => {
    try {
      const res = await axiosIntance.delete(`/auth/cart/remove/${productId}`);
      const updatedCart = res.data.cart;
      set({ cart: updatedCart });
      toast.success(res.message || "Product removed from cart!");
    } catch (error) {
      console.log("Error in removeItemFromCart: ", error);
      toast.error("Failed to remove from cart!");
    }
  },
}));

export default useCartStore;
