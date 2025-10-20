"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/login");
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50 dark:bg-[#161C24] transition-colors">
      <div className="flex flex-col items-center gap-6">
        {/* Spinner */}
        <Loader2 className="h-12 w-12 animate-spin text-green-600" />

        {/* Text */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Redirecting...
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
            Please wait while we take you to your dashboard.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-40 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-green-600 animate-[progress_2s_linear_forwards]" />
        </div>
      </div>

      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
