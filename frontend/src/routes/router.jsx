import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/main/MainLayout";
import ProductPage from "../pages/main/ProductPage";
import FavoritesPage from "../pages/main/FavoritesPage";
import ViewedPage from "../pages/main/ViewedPage";
import ExplorePage from "../pages/main/ExplorePage";
import AuthLayout from "../layouts/auth/AuthLayout";
import RegisterPage from "../pages/auth/RegisterPage";
import LoginPage from "../pages/auth/LoginPage";
import HomePage from "../pages/main/HomePage";
import ProductDetailPage from "../pages/main/ProductDetailPage";
import CartPage from "../pages/main/CartPage";
import ProfilePage from "../pages/auth/ProfilePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "products",
        children: [
          {
            index: true,
            element: <ProductPage />,
          },
          {
            path: ":id",
            element: <ProductDetailPage />,
          },
          {
            path: "viewed",
            element: <ViewedPage />,
          },
        ],
      },
      {
        path: "favorites",
        element: <FavoritesPage />,
      },
      {
        path: "explore",
        element: <ExplorePage />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
]);

export default router;
