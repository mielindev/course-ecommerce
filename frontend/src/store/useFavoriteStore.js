import { create } from "zustand";
import axiosIntance from "../lib/axios";

const useFavoriteStore = create((set, get) => ({
  favorites: [],

  addFavorite: async (productId) => {
    try {
      const res = await axiosIntance.post(`/favorites`, { productId });
      set((state) => ({
        favorites: [...state.favorites, res.data.favorites],
      }));
    } catch (error) {
      console.log("Error in addFavorite: ", error);
    }
  },

  getFavorites: async () => {
    try {
      const res = await axiosIntance.get(`/favorites`);
      set({ favorites: res.data.favorites });
    } catch (error) {
      console.log("Error in getFavorites: ", error);
    }
  },

  removeFavorite: async (productId) => {
    try {
      await axiosIntance.delete(`/favorites/${productId}`);
      set((state) => ({
        favorites: state.favorites.filter((fav) => fav.product !== productId),
      }));
    } catch (error) {
      console.log("Error in removeFavorite: ", error);
    }
  },
}));

export default useFavoriteStore;
