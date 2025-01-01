import { axiosInstance } from "@/utils/axiosInstance";
import {
  LoginCredentials,
  RegistrationCredentials,
  ResetCredentials,
} from "@/interfaces/auth/IAuth";

export async function loginUser(credentials: LoginCredentials) {
  const { data } = await axiosInstance.post("/auth/login", credentials);
  return data;
}
export async function registerUser(credentials: RegistrationCredentials) {
  const { data } = await axiosInstance.post("/auth/register", credentials);
  return data;
}

export async function sendResetEmail(credentials: { email: string }) {
  const { data } = await axiosInstance.post(
    "/auth/forget-password/",
    credentials
  );
  return data;
}

export async function resetPassword(credentials: ResetCredentials) {
  const { data } = await axiosInstance.post(
    "/auth/reset-password/",
    credentials
  );
  return data;
}
