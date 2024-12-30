// src/api/authApi.ts
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/utils/axiosInstance";
import { toast } from "sonner";

import {
  LoginCredentials,
  RegistrationCredentials,
} from "@/interfaces/auth/IAuth";

const loginUser = async (credentials: LoginCredentials) => {
  const { data } = await axiosInstance.post("/auth/login", credentials);
  return data;
};
const registerUser = async (credentials: RegistrationCredentials) => {
  const { data } = await axiosInstance.post("/auth/register", credentials);
  return data;
};

export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      toast.success("Login successful");
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Login failed");
    },
  });
};
export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      toast.success("Registration successful");
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Registration failed");
    },
  });
};
