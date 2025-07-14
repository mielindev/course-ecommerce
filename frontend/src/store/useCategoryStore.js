import { create } from "zustand";
import axiosIntance from "../lib/axios";

const useCategoryStore = create((set, get) => ({
  categories: [],
  isGettingCategories: false,

  getCategories: async () => {
    set({ isGettingCategories: true });
    try {
      const res = await axiosIntance.get("category");
      set({ categories: res.data });
    } catch (error) {
      console.log("Error in getCategories: ", error);
    } finally {
      set({ isGettingCategories: false });
    }
  },
}));

export default useCategoryStore;
