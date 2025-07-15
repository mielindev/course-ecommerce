import { create } from "zustand";
import axiosIntance from "../lib/axios";

const useCartStore = create((set, get) => ({
  cart: [],
  isGettingCart: false,
  isUpdatingCartItem: false,

  getCart: async () => {
    set({ isGettingCart: true });
    try {
      const res = await axiosIntance.get("/cart");
      set({ cart: res.data.cart });
    } catch (error) {
      console.log("Error in getCart: ", error);
    } finally {
      set({ isGettingCart: false });
    }
  },

  addToCart: async ({ productId, quantity }) => {
    try {
      const res = await axiosIntance.post("/cart/add", { productId, quantity });

      const updatedCart = res.data.cart;

      set({ cart: updatedCart });
    } catch (error) {
      console.log("Error in addToCart: ", error);
    }
  },

  updateItemFromCart: async ({ productId, quantity }) => {
    set({ isUpdatingCartItem: true });
    try {
      const res = await axiosIntance.put("/cart/update", {
        productId,
        quantity,
      });
      const updatedCart = res.data.cart;
      set({ cart: updatedCart });
    } catch (error) {
      console.log("Error in updateItemFromCart: ", error);
    } finally {
      set({ isUpdatingCartItem: false });
    }
  },
  removeItemFromCart: async (productId) => {
    try {
      const res = await axiosIntance.delete(`/cart/remove/${productId}`);
      const updatedCart = res.data.cart;
      set({ cart: updatedCart });
    } catch (error) {
      console.log("Error in removeItemFromCart: ", error);
    }
  },
}));

export default useCartStore;
