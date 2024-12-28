export interface IRouterMeta {
  name: string;
  path: string;
  isAuth: boolean;
  layout: "DEFAULT" | "ADMIN" | "NONE";
}

export type RouterMetaType = {
  [key: string]: IRouterMeta;
};

const routerMeta: RouterMetaType = {
  HomePage: {
    name: "Home",
    path: "/",
    isAuth: false,
    layout: "DEFAULT",
  },
  DashboardPage: {
    name: "Dashboard",
    path: "/dashboard",
    isAuth: true,
    layout: "ADMIN",
  },
  SignInPage: {
    name: "Sign in",
    path: "/login",
    isAuth: false,
    layout: "NONE",
  },
  SignUpPage: {
    name: "Sign up",
    path: "/register",
    isAuth: false,
    layout: "NONE",
  },
  ProfilePage: {
    name: "Profile",
    path: "/profile/:username/*",
    isAuth: true,
    layout: "DEFAULT",
  },
  NotFoundPage: {
    name: "404",
    path: "/*",
    isAuth: false,
    layout: "NONE",
  },
};

export default routerMeta;
