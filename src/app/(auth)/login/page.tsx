"use client";

import React from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import googleIcon from "../../../../public/images/google-icon.png";
import { useLoginMutation } from "@/store/api/authApi";
import { useDispatch } from "react-redux";
import { setToken } from "@/store/api/AuthState";
import AuthRedirect from "@/components/AuthRedirect";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { FiEye, FiEyeOff } from "react-icons/fi";

// Zod schema
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(5, { message: "Password must be at least 6 characters" }),
  remember: z.boolean().optional(),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", remember: false },
  });

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const result = await login({
        email: data.email,
        password: data.password,
      }).unwrap();
      const token = result.data.accessToken;
      dispatch(setToken(token));
    } catch (err) {
      const error = err as FetchBaseQueryError | { data?: { message: string } };
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#161C24] relative px-4 sm:px-6 py-6 transition-colors">
      {/* Decorative dots */}
      <div className="absolute top-10 left-6 sm:left-10 w-3 h-3 bg-green-500 rounded-full" />
      <div className="absolute bottom-20 left-1/4 w-3 h-3 bg-green-400 rounded-full" />
      <div className="absolute top-1/3 right-10 sm:right-20 w-6 h-6 bg-green-400 rounded-full" />
      <div className="absolute bottom-10 right-1/4 sm:right-1/3 w-6 h-6 bg-green-500 rounded-full" />

      <div className="relative w-full max-w-4xl">
        {/* Background shapes */}
        <div className="absolute hidden lg:block -top-12 bg-[#BBF7D0] -right-10 h-[520px] w-[520px] rotate-12 rounded-3xl dark:bg-[#212B36]" />
        <div className="absolute hidden lg:block -top-18 bg-[#F0FDF4] left-14 h-[520px] w-[500px] -rotate-12 rounded-3xl dark:bg-black" />

        <div className="relative w-full flex flex-col md:flex-row overflow-hidden rounded-2xl border bg-white dark:bg-background transition-colors shadow-lg">
          {/* Left Image */}
          <div className="hidden md:flex md:w-1/2 relative">
            <Image
              src="/images/login.png"
              alt="login-image"
              width={700}
              height={900}
              className="object-cover h-full w-full"
              priority
            />
            <div className="absolute bottom-8 left-6 sm:left-8 text-white text-lg sm:text-xl font-semibold max-w-xs sm:max-w-sm">
              <div className="flex items-center gap-3">
                <div className="w-1 h-10 sm:h-12 bg-green-500 rounded-full" />
                <p className="leading-tight">
                  Log in to continue your journey and access all features.
                </p>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 lg:p-14">
            <div className="mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Welcome back!
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Login to your account.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block mb-2 text-gray-700 dark:text-gray-300 font-medium">
                  E-mail
                </label>
                <input
                  type="email"
                  placeholder="e.g. example@email.com"
                  {...register("email")}
                  className="w-full px-4 py-3 border rounded-lg border-green-500 bg-white dark:bg-[#0B0D12] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block mb-2 text-gray-700 dark:text-gray-300 font-medium">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Type your password"
                    {...register("password")}
                    className="w-full px-4 py-3 border rounded-lg border-green-500 bg-white dark:bg-[#0B0D12] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
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
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    {...register("remember")}
                    className="appearance-none w-5 h-5 border-2 border-green-500 rounded-full checked:bg-green-500 checked:border-green-500 cursor-pointer"
                  />
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Remember
                  </p>
                </div>
                <button
                  type="button"
                  className="text-red-500 text-sm hover:underline cursor-pointer"
                >
                  <Link href="/forgot-password">Forgot Password</Link>
                </button>
              </div>

              {/* Submit */}
              <Button
                disabled={isLoading}
                type="submit"
                className="w-full bg-green-600 hover:bg-green-500 text-white mt-2 rounded-lg py-3 text-lg cursor-pointer"
              >
                Log in
              </Button>

              <p className="text-center text-gray-600 dark:text-gray-400 text-sm mt-4">
                Don&apos;t have an account?
                <Link
                  href="/register"
                  className="text-green-500 hover:underline font-medium cursor-pointer ml-1"
                >
                  Register
                </Link>
              </p>

              {/* Social Login */}
              <div className="mt-8">
                <p className="text-center text-gray-600 dark:text-gray-400 text-sm mb-3">
                  Or login with
                </p>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 border rounded-lg w-full py-2 bg-white dark:bg-[#0B0D12] text-gray-900 dark:text-white hover:shadow-md transition"
                >
                  <Image
                    src={googleIcon}
                    alt="Google"
                    width={70}
                    height={70}
                    style={{ height: "auto" }}
                    priority
                  />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function page() {
  return (
    <AuthRedirect>
      <LoginPage />
    </AuthRedirect>
  );
}
