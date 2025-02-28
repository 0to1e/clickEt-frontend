import { ERoles } from "@/interfaces/auth/IAuthContext";
import { ELayouts, IRouterConfig } from "@/interfaces/IRouterConfig";

export const routeConfig: IRouterConfig = {
  HomePage: {
    path: "/",
    layout: ELayouts.CLIENT,
    isProtected: false,
    componentLocation: "pages/HomePage",
  },

  //==============================================  auth pages =====================================
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
  //==============================================  admin pages =====================================

  AdminDistributorPage: {
    path: "/admin/distributors",
    layout: ELayouts.ADMIN,
    isProtected: true,
    roles: [ERoles.ADMIN],
    componentLocation: "pages/admin/AdminDistributorPage",
  },
  AdminHallPage: {
    path: "/admin/halls",
    layout: ELayouts.ADMIN,
    isProtected: true,
    roles: [ERoles.ADMIN],
    componentLocation: "pages/admin/AdminHallPage",
  },
  AdmninTheatrePage: {
    path: "/admin/theatres",
    layout: ELayouts.ADMIN,
    isProtected: true,
    roles: [ERoles.ADMIN],
    componentLocation: "pages/admin/AdminTheatrePage",
  },
  AdmninScreeningPage: {
    path: "/admin/screenings",
    layout: ELayouts.ADMIN,
    isProtected: true,
    roles: [ERoles.ADMIN],
    componentLocation: "pages/admin/AdminScreeningPage",
  },


  //==============================================  utility pages =====================================

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


  //==============================================  feature pages =====================================

  ProfilePicturePage: {
    path: "/uprofile",
    layout: ELayouts.NA,
    isProtected: true,
    componentLocation: "pages/utilPages/ProfileUpload",
  },
  AddMovies: {
    path: "/admin/movies/add",
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
    path: "/payment/verify/*",
    layout: ELayouts.CLIENT,
    isProtected: true,
    componentLocation: "components/testPage/PaymentVerifyPage",
  },
  
};