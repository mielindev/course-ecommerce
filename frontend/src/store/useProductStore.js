import { create } from "zustand";
import axiosIntance from "../lib/axios";

const useProductStore = create((set, get) => ({
  products: [],
  suggestions: [],
  isGetingProducts: false,
  productDetail: null,

  getProducts: async (
    page = 1,
    pageSize = 10,
    search = "",
    category = "",
    priceOption = ""
  ) => {
    try {
      const res = await axiosIntance.get("products", {
        params: {
          page,
          pageSize,
          search,
          category,
          priceOption,
        },
      });
      set({ products: res.data });
    } catch (error) {
      console.log("Error in getProducts: ", error);
    }
  },

  getProductById: async (productId) => {
    set({ isGetingProducts: true });
    try {
      const res = await axiosIntance.get(`products/${productId}`);
      set({ productDetail: res.data });
    } catch (error) {
      console.log("Error in getProductById: ", error);
    } finally {
      set({ isGetingProducts: false });
    }
  },

  getSuggestions: async () => {
    set({ isGetingProducts: true });
    try {
      const res = await axiosIntance.get("products/explore/suggestions");
      set({ suggestions: res.data.data });
    } catch (error) {
      console.log("Error in getSuggestions: ", error);
    } finally {
      set({ isGetingProducts: false });
    }
  },
}));

export default useProductStore;
