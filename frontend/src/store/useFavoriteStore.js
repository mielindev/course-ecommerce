import { create } from "zustand";
import axiosIntance from "../lib/axios";
import { toast } from "react-hot-toast";

const useFavoriteStore = create((set, get) => ({
  favorites: [],
  isGettingFavorites: false,

  addFavorite: async (productId) => {
    try {
      const res = await axiosIntance.post(`/favorites`, { productId });
      set((state) => ({
        favorites: [...state.favorites, res.data.favorites],
      }));
      toast.success(res.message || "Product added to favorites!");
    } catch (error) {
      console.log("Error in addFavorite: ", error);
      toast.error(error.response.data.message || "Failed to add to favorites!");
    }
  },

  getFavorites: async () => {
    set({ isGettingFavorites: true });
    try {
      const res = await axiosIntance.get(`/favorites`);
      set({ favorites: res.data.favorites });
    } catch (error) {
      console.log("Error in getFavorites: ", error);
    } finally {
      set({ isGettingFavorites: false });
    }
  },

  removeFavorite: async (productId) => {
    try {
      await axiosIntance.delete(`/favorites/${productId}`);
      set((state) => ({
        favorites: state.favorites.filter((fav) => fav.product !== productId),
      }));
      toast.success("Product removed from favorites!");
    } catch (error) {
      console.log("Error in removeFavorite: ", error);
      toast.error("Failed to remove from favorites!");
    }
  },
}));

export default useFavoriteStore;
