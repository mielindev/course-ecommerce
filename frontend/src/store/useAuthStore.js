import { create } from "zustand";
import axiosIntance from "../lib/axios";
import { toast } from "react-hot-toast";

const useAuthStore = create((set, get) => ({
  authUser: null,
  isRegisering: false,
  isLoggingIn: false,
  isUpdatingUser: false,
  isCheckingAuth: true,
  setUser: (user) => set({ authUser: user }),

  checkAuth: async () => {
    try {
      const res = await axiosIntance.get("/auth/check");
      set({ authUser: res.data.data });
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

  loginAccount: async (data) => {
    set({ isLogining: true });
    try {
      const res = await axiosIntance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success(res.message || "Login successful!");
    } catch (error) {
      console.log("Error in login: ", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isLogining: false });
    }
  },

  logout: async () => {
    try {
      await axiosIntance.post("/auth/logout");
      set({ authUser: null });
    } catch (error) {
      console.log("Error in logout: ", error);
    }
  },

  updateUser: async ({ avatar }) => {
    set({ isUpdatingUser: true });
    try {
      const res = await axiosIntance.put("/auth/update", { avatar });
      set({ authUser: res.data.data });
    } catch (error) {
    } finally {
      set({ isUpdatingUser: false });
    }
  },
}));

export default useAuthStore;
