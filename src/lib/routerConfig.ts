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
    path: "/auth/forget-password",
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
    componentLocation: "pages/utilPages/NotFoundPage",
  },
  UnauthorizedPage: {
    path: "/unauthorized",
    layout: ELayouts.NA,
    isProtected: false,
    componentLocation: "pages/utilPages/UnauthorizedPage",
  },
  TestPage: {
    path: "/test",
    layout: ELayouts.NA,
    isProtected: false,
    componentLocation: "pages/TestPage",
  },
  ProfilePicturePage: {
    path: "/uprofile",
    layout: ELayouts.NA,
    isProtected: true,
    componentLocation: "pages/utilPages/ProfileUpload",
  },
  AddMovies: {
    path: "/movie/add",
    layout: ELayouts.ADMIN,
    isProtected: true,
    componentLocation: "pages/movie/AddmovieForm",
  },
  
  MovieDetailsPage: {
    path: "/movie/:slug",
    layout: ELayouts.CLIENT,
    isProtected: false,
    componentLocation: "pages/movie/movieDetailsPage",
  },
  
  PaymentVerificationPage: {
    path: "/payment/verify",
    layout: ELayouts.CLIENT,
    isProtected: true,
    componentLocation: "components/testPage/PaymentVerifyPage",
  },
  
};