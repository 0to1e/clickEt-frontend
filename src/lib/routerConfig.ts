import { ERoles } from "@/interfaces/auth/IAuthContext";
import { ELayouts, IRouterConfig } from "@/interfaces/IRouterConfig";

export const routeConfig: IRouterConfig = {
  HomePage: {
    path: "/",
    layout: ELayouts.CLIENT,
    isProtected: false,
  componentLocation: "pages/HomePage",
  },
  LoginPage: {
    path: "/login",
    layout: ELayouts.NA,
    isProtected: false,
    componentLocation: "pages/auth/LoginPage",
  },
  RegisterPage: {
    path: "/register",
    layout: ELayouts.NA,
    isProtected: false,
    componentLocation: "pages/auth/RegistrationPage",
  },
  ForgetPasswordPage: {
    path: "/forget-password",
    layout: ELayouts.NA,
    isProtected: false,
    componentLocation: "pages/auth/ForgetPasswordPage",
  },
  ResetPasswordPage: {
    path: "/auth/reset-password/:token",
    layout: ELayouts.NA,
    isProtected: false,
    componentLocation: "pages/auth/PasswordResetPage",
  },
  AdminDashboardPage: {
    path: "/admin/dashboard",
    layout: ELayouts.ADMIN,
    isProtected: true,
    roles: [ERoles.ADMIN],
    componentLocation: "pages/admin/DashboardPage",
  },
  NotFoundPage: {
    path: "/404",
    layout: ELayouts.NA,
    isProtected: false,
    componentLocation: "pages/NotFoundPage",
  },
  UnauthorizedPage: {
    path: "/unauthorized",
    layout: ELayouts.NA,
    isProtected: false,
    componentLocation: "pages/UnauthorizedPage",
  },
  TestPage: {
    path: "/test",
    layout: ELayouts.NA,
    isProtected: true,
    componentLocation: "pages/TestPage",
  },
};