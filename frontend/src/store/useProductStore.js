import { create } from "zustand";
import axiosIntance from "../lib/axios";

const useProductStore = create((set, get) => ({
  products: [],
  isGetingProducts: false,
  productDetail: null,

  getProductPagination: async (page = 1, pageSize = 10) => {
    try {
      const res = await axiosIntance.get("products", {
        params: {
          page,
          pageSize,
        },
      });
      set({ products: res.data });
    } catch (error) {
      console.log("Error in getProductPagination: ", error);
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
}));

export default useProductStore;
