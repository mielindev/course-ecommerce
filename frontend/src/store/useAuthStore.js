import { create } from "zustand";
import axiosIntance from "../lib/axios";
import { toast } from "react-hot-toast";

const useAuthStore = create((set, get) => ({
  authUser: null,
  isRegisering: false,
  isCheckingAuth: true,
  setUser: (user) => set({ authUser: user }),

  checkAuth: async () => {
    try {
      const res = await axiosIntance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in checkAuth: ", error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  registerAccount: async (data) => {
    set({ isRegisering: true });
    try {
      const res = await axiosIntance.post("/auth/register", data);
      set({ authUser: res.data });
      toast.success(res.message || "Sign-up successful!");
    } catch (error) {
      console.log("Error in register: ", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isRegisering: false });
    }
  },
}));

export default useAuthStore;
