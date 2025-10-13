"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForgotPasswordMutation } from "@/store/api/authApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import AuthRedirect from "@/components/AuthRedirect";

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  //Load saved email from localStorage when page loads

  useEffect(() => {
    const storedEmail = localStorage.getItem("selectedEmail");
    if (storedEmail) {
      setValue("email", storedEmail);
    }
  }, [setValue]);

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      localStorage.setItem("selectedEmail", data.email);
      await forgotPassword(data);
      reset();
    } catch (err) {
      const error = err as FetchBaseQueryError | { data?: { message: string } };
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="bg-white dark:bg-[#0B0D12] rounded-2xl shadow-2xl w-[360px] p-6 sm:p-8 relative">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Forgot Password
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email Input */}
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Email Address
            </label>
            <input
              type="email"
              placeholder="example@email.com"
              {...register("email")}
              className={`w-full px-4 py-3 border rounded-lg ${
                errors.email ? "border-red-500" : "border-gray-300"
              } dark:border-gray-700 bg-white dark:bg-[#0B0D12] text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Send OTP Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-70 text-white py-3 rounded-lg text-base font-medium transition-all duration-200 cursor-pointer"
          >
            {isLoading ? "Sending..." : "Send OTP"}
          </button>
        </form>

        {/* Login / Register links */}
        <div className="text-center mt-5 space-y-2">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Remember your password?{" "}
            <Link
              href="/login"
              className="text-green-600 hover:underline font-medium cursor-pointer"
            >
              Login
            </Link>
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Don’t have an account?{" "}
            <Link
              href="/register"
              className="text-green-600 hover:underline font-medium cursor-pointer"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default function page() {
  return (
    <AuthRedirect>
      <ForgotPasswordPage />
    </AuthRedirect>
  );
}
