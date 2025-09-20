"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import googleIcon from "../../../../public/images/google-icon.png";

const Page = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Login", { email, password });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#161C24] relative p-6 transition-colors">
            {/* background green dots */}
            <div className="absolute top-10 left-10 w-3 h-3 bg-green-500 rounded-full" />
            <div className="absolute bottom-20 left-1/4 w-3 h-3 bg-green-400 rounded-full" />
            <div className="absolute top-1/3 right-20 w-6 h-6 bg-green-400 rounded-full" />
            <div className="absolute bottom-10 right-1/3 w-6 h-6 bg-green-500 rounded-full" />

            {/* main card */}
            <div className="relative w-full sm:w-auto">
                {/* background stylish rotated blocks */}
                <div className="absolute hidden lg:block -top-12 bg-[#BBF7D0] -right-10 h-[520px] w-[520px] rotate-12 rounded-3xl dark:bg-[#212B36]" />
                <div className="absolute hidden lg:block -top-18 bg-[#F0FDF4] left-14 h-[520px] w-[500px] -rotate-12 rounded-3xl dark:bg-black" />

                <div className="relative w-full md:min-w-4xl flex flex-col md:flex-row overflow-hidden rounded-2xl border bg-white dark:bg-background  transition-colors">
                    {/* Left side with image + overlay text */}
                    <div className="hidden md:flex md:w-1/2 relative">
                        <Image
                            src="/images/login.png"
                            alt="login-image"
                            width={700}
                            height={900}
                            className="object-cover h-full w-full"
                        />
                        <div className="absolute bottom-8 left-8 text-white  text-xl font-semibold max-w-sm">
                            <div className="flex items-center gap-3">
                                <div className="w-1 h-12 bg-green-500 rounded-full" />

                                <p className="leading-tight">
                                    Log in to continue your journey and access all features.                                </p>
                            </div>
                        </div>

                    </div>

                    {/* Right side form */}
                    <div className="w-full md:w-1/2 p-10 lg:p-14">
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                                Welcome back!
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">
                                Login to your account.
                            </p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-5">
                            {/* Email */}
                            <div>
                                <label className="block mb-2 text-gray-700 dark:text-gray-300 font-medium">
                                    E-mail
                                </label>
                                <input
                                    type="email"
                                    placeholder="e.g. example@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 border rounded-lg 
                                    border-green-500 bg-white dark:bg-[#0B0D12] 
                                    text-gray-900 dark:text-white
                                    placeholder-gray-400 dark:placeholder-gray-500 
                                    focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
                                    required
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block mb-2 text-gray-700 dark:text-gray-300 font-medium">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="Type your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 border rounded-lg 
                                    border-green-500 bg-white dark:bg-[#0B0D12] 
                                    text-gray-900 dark:text-white
                                    placeholder-gray-400 dark:placeholder-gray-500 
                                    focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
                                    required
                                />
                            </div>

                            {/* Remember & Forgot */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        className="appearance-none w-5 h-5 border-2 border-green-500 rounded-full 
                                        checked:bg-green-500 checked:border-green-500 cursor-pointer"
                                    />
                                    <p className="text-gray-700 dark:text-gray-300 text-sm">Remember</p>
                                </div>
                                <button type="button" className="text-red-500 text-sm hover:underline">
                                    Forgot Password?
                                </button>
                            </div>

                            {/* Submit */}
                            <Button
                                type="submit"
                                className="w-full bg-green-600 hover:bg-green-500 text-white mt-2 rounded-lg py-3 text-lg"
                            >
                                Log in
                            </Button>

                            {/* Register */}
                            <p className="text-center text-gray-600 dark:text-gray-400 text-sm mt-4">
                                Don&apos;t have an account?{" "}
                                <Link href="/register" className="text-green-500 hover:underline font-medium">
                                    Register
                                </Link>
                            </p>

                            {/* Or login with */}
                            <div className="mt-8">
                                <p className="text-center text-gray-600 dark:text-gray-400 text-sm mb-3">
                                    Or login with
                                </p>
                                <button
                                    type="button"
                                    className="flex items-center justify-center gap-3 border rounded-lg w-full py-3 bg-white dark:bg-[#0B0D12] text-gray-900 dark:text-white hover:shadow-md transition"
                                >
                                    <Image src={googleIcon} alt="Google" width={70} height={70} />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
