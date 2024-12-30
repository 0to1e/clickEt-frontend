// src/routes.tsx
import { createBrowserRouter } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import Login from "./pages/auth/LoginPage";
import Register from "./pages/auth/RegistrationPage";
import Layout from "@/components/layouts/UserLayout";
import NoLayout from "@/components/layouts/NoneLayout";
import Test from "./components/common/LoadingFallback";
import ErrorFallback from "./components/common/ErrorFallback";

export const routers = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <DashboardPage />,
      },
    ],
  },
  {
    path: "/",
    element: <NoLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/t",
        element: <Test />,
      },
      {
        path: "*",
        element: <ErrorFallback />,
      },
    ],
  },
]);
