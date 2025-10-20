"use client";

import AuthRedirect from "@/components/AuthRedirect";
import CommonButton from "@/components/common/button/CommonButton";
import ButtonWithLoading from "@/components/common/custom/ButtonWithLoading";
import CommonHeader from "@/components/common/header/CommonHeader";
import { useSignUpMutation } from "@/store/api/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { z } from "zod";
import googleIcon from "../../../../public/images/google-icon.png";

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
const inputClass = {
  input:
    "w-full px-4 py-3 text-sm leading-[22px] rounded-lg  border border-[#DFE3E8] dark:border-[#212B36] bg-[#F4F6F8] dark:bg-[#161C24] text-[#919EAB] dark:text-[#637381]  cursor-pointer transition outline-none",
  label: "text-sm leading-[22px] text-[#212B36] dark:text-[#DFE3E8] mb-1 block",
  error: "text-red-500 text-xs mt-1",
};
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
            <div className="flex items-stretch gap-3">
              <div className="w-3 bg-green-500 rounded-full" />
              <CommonHeader
                size="2xl"
                className="flex items-center dark:text-white"
              >
                Join us and explore all features.
              </CommonHeader>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="w-full md:w-1/2 p-6 sm:p-10 flex flex-col justify-center">
          <div className="mb-6">
            <CommonHeader size="2xl" className=" dark:text-white">
              Create your account
            </CommonHeader>
            <CommonHeader className="!text-[#DFE3E8] mt-1">
              Get started in minutes.
            </CommonHeader>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
            <div>
              <label className={inputClass.label}>Full Name</label>
              <input
                type="text"
                placeholder="Your full name"
                {...register("fullName")}
                className={inputClass.input}
              />
              {errors.fullName && (
                <p className={inputClass.error}>{errors.fullName.message}</p>
              )}
            </div>

            <div>
              <label className={inputClass.label}>Email</label>
              <input
                type="email"
                placeholder="example@email.com"
                {...register("email")}
                className={inputClass.input}
              />
              {errors.email && (
                <p className={inputClass.error}>{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className={inputClass.label}>Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Type your password"
                  {...register("password")}
                  className={inputClass.input}
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
                <p className={inputClass.error}>{errors.password.message}</p>
              )}
            </div>

            <div>
              <label className={inputClass.label}>Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  {...register("confirmPassword")}
                  className={inputClass.input}
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
                <p className={inputClass.error}>
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <CommonButton
              type="submit"
              size="lg"
              disabled={isLoading}
              className="w-full mt-4"
            >
              {isLoading ? (
                <ButtonWithLoading title="Processing..." />
              ) : (
                "Register"
              )}
            </CommonButton>

            <p className="text-center text-gray-600 dark:text-gray-400 text-sm mt-3">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-green-500 hover:underline font-medium"
              >
                Login
              </Link>
            </p>

            <div className="mt-4">
              <p className="text-center text-gray-600 dark:text-gray-400 text-sm mb-2">
                Or continue with
              </p>
              <button
                type="button"
                className="flex items-center justify-center gap-2 border rounded-lg w-full py-3 bg-white dark:bg-[#0B0D12] text-gray-900 dark:text-white hover:shadow-md transition cursor-pointer"
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
