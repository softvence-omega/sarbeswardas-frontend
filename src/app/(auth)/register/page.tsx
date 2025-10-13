"use client";

import React from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import googleIcon from "../../../../public/images/google-icon.png";
import { useSignUpMutation } from "@/store/api/authApi";
import { useRouter } from "next/navigation";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { FiEye, FiEyeOff } from "react-icons/fi";
import AuthRedirect from "@/components/AuthRedirect";

// Zod schema
const registerSchema = z
  .object({
    fullName: z.string().min(2, "Full name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// TypeScript type
type RegisterFormData = z.infer<typeof registerSchema>;

const SignUpPage = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });
  const router = useRouter();
  const [signUp, { isLoading }] = useSignUpMutation();

  const onSubmit = async (data: RegisterFormData) => {
    const payload = {
      fullName: data.fullName,
      email: data.email,
      password: data.password,
    };
    try {
      await signUp(payload);
      router.replace("/login");
    } catch (err) {
      const error = err as FetchBaseQueryError | { data?: { message: string } };
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#161C24] relative p-4 transition-colors">
      {/* Background decorative dots */}
      <div className="absolute top-10 left-10 w-3 h-3 bg-green-500 rounded-full" />
      <div className="absolute bottom-20 left-1/4 w-3 h-3 bg-green-400 rounded-full" />
      <div className="absolute top-1/3 right-20 w-6 h-6 bg-green-400 rounded-full" />
      <div className="absolute bottom-10 right-1/3 w-6 h-6 bg-green-500 rounded-full" />

      {/* Rotated blocks */}
      <div className="absolute hidden lg:block top-40 right-3/12 h-[500px] w-[400px] bg-[#BBF7D0] rotate-12 rounded-3xl dark:bg-[#212B36]" />
      <div className="absolute hidden lg:block top-20 left-4/12 h-[400px] w-[600px] -rotate-12 bg-[#F0FDF4] rounded-3xl dark:bg-[#0B0D12]" />

      {/* Card */}
      <div className="relative w-full max-w-4xl flex flex-col md:flex-row overflow-hidden rounded-2xl border bg-white dark:bg-[#111418]  transition-colors">
        {/* Left Image + Text */}
        <div className="hidden md:flex md:w-1/2 relative">
          <Image
            src="/images/register.png"
            alt="register-image"
            width={500}
            height={700}
            className="object-cover h-full w-full"
          />
          <div className="absolute bottom-6 left-6 text-white text-lg font-semibold max-w-xs">
            <div className="flex items-center gap-3">
              <div className="w-1 h-12 bg-green-500 rounded-full" />
              <p className="leading-tight">Join us and explore all features.</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="w-full md:w-1/2 p-6 sm:p-10 flex flex-col justify-center">
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Create your account
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm sm:text-base">
              Get started in minutes.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-300 text-sm font-medium">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Your full name"
                {...register("fullName")}
                className="w-full px-4 py-2 border rounded-lg border-green-500 dark:border-green-400 bg-white dark:bg-[#0B0D12] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
              />
              {errors.fullName && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-300 text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                placeholder="example@email.com"
                {...register("email")}
                className="w-full px-4 py-2 border rounded-lg border-green-500 dark:border-green-400 bg-white dark:bg-[#0B0D12] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-300 text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Type your password"
                  {...register("password")}
                  className="w-full px-4 py-2 border rounded-lg border-green-500 dark:border-green-400 bg-white dark:bg-[#0B0D12] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className=" cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  {showPassword ? (
                    <span>
                      <FiEye />
                    </span>
                  ) : (
                    <span>
                      <FiEyeOff />
                    </span>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-300 text-sm font-medium">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  {...register("confirmPassword")}
                  className="w-full px-4 py-2 border rounded-lg border-green-500 dark:border-green-400 bg-white dark:bg-[#0B0D12] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className=" cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  {showConfirmPassword ? (
                    <span>
                      <FiEye />
                    </span>
                  ) : (
                    <span>
                      <FiEyeOff />
                    </span>
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isLoading}
              className="cursor-pointer w-full bg-green-600 hover:bg-green-500 text-white mt-2 rounded-lg py-2 text-lg"
            >
              Register
            </Button>

            {/* Login Link */}
            <p className="text-center text-gray-600 dark:text-gray-400 text-sm mt-3">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-green-500 hover:underline font-medium"
              >
                Login
              </Link>
            </p>

            {/* Or login with */}
            <div className="mt-4">
              <p className="text-center text-gray-600 dark:text-gray-400 text-sm mb-2">
                Or continue with
              </p>
              <button
                type="button"
                className="flex items-center justify-center gap-2 border rounded-lg w-full py-2 bg-white dark:bg-[#0B0D12] text-gray-900 dark:text-white hover:shadow-md transition"
              >
                <Image src={googleIcon} alt="Google" width={70} height={70} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default function page() {
  return (
    <AuthRedirect>
      <SignUpPage />
    </AuthRedirect>
  );
}
