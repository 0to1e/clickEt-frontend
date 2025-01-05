import { ERoles } from "./auth/IAuth";

export enum ELayouts {
  CLIENT = "default",
  ADMIN = "admin",
  NA = "none",
}

export interface IRouterConfig {
  [page: string]: IRouterMeta;
}

export interface IRouterMeta {
  path: string;
  layout: ELayouts;
  isProtected: boolean;
  roles?: ERoles[];
  componentLocation:string;
}
