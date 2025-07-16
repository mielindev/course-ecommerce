import { create } from "zustand";
import axiosIntance from "../lib/axios";
import toast from "react-hot-toast";

const useViewedStore = create((set, get) => ({
  viewedProducts: [],
  isGettingViewedProducts: false,

  addViewedProduct: async (productId) => {
    try {
      const res = await axiosIntance.post(`/viewed`, { productId });
      set((state) => ({
        viewedProducts: [...state.viewedProducts, res.data.viewed],
      }));
    } catch (error) {
      console.log("Error in addViewedProduct: ", error);
    }
  },

  getViewedProducts: async () => {
    set({ isGettingViewedProducts: true });
    try {
      const res = await axiosIntance.get(`/viewed`);
      set({ viewedProducts: res.data.viewed });
    } catch (error) {
      console.log("Error in getViewedProducts: ", error);
    } finally {
      set({ isGettingViewedProducts: false });
    }
  },

  removeViewedProduct: async () => {
    try {
      await axiosIntance.delete(`/viewed`);
      set({ viewedProducts: [] });
      toast.success("Viewed products totally removed!");
    } catch (error) {
      console.log("Error in removeViewedProduct: ", error);
      toast.error("Failed to remove viewed products!");
    }
  },
}));

export default useViewedStore;
