import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import useAuthStore from "./store/useAuthStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import useFavoriteStore from "./store/useFavoriteStore";

const App = () => {
  const { isCheckingAuth, authUser, checkAuth } = useAuthStore();
  const { getFavorites } = useFavoriteStore();

  useEffect(() => {
    checkAuth();
    getFavorites();
  }, [checkAuth, getFavorites]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div data-theme="dark">
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          className: "mt-3",
        }}
      />
    </div>
  );
};

export default App;
