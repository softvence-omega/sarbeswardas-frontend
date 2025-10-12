import { log } from "console";
import { baseApi } from "./baseApi";
import {
  ChangePassword,
  ForgotPassword,
  Login,
  LoginResponse,
  ResetPassword,
  SignUp,
} from "./types/auth";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, Login>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation<void, SignUp>({
      query: (user) => ({
        url: "/auth/register",
        method: "POST",
        body: user,
      }),
    }),
    changePassword: builder.mutation<any, ChangePassword>({
      query: (password) => ({
        url: "/auth/change-password",
        method: "PATCH",
        body: password,
      }),
    }),
    forgotPassword: builder.mutation<any, ForgotPassword>({
      query: (email) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: email,
      }),
    }),
    resetPassword: builder.mutation<any, ResetPassword>({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),
    logoutFromAllDevices: builder.mutation({
      query: () => ({
        url: "/auth/logout-from-all-devices",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useLogoutFromAllDevicesMutation,
} = authApi;
