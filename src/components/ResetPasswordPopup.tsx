"use client";

import React, { useState, useEffect } from "react";

const ResetPasswordPopup = () => {
  const [code, setCode] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(300); // 5 minutes in seconds

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return; // allow only one digit
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
  };

  const handleVerify = () => {
    console.log("Code entered:", code.join(""));
    // Add verification logic here
  };

  const handleResend = () => {
    console.log("Resend code");
    setTimer(300); // reset timer
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-900 text-white p-6 rounded-xl w-[350px] relative">
        <h2 className="text-xl font-semibold mb-4">Verification</h2>
        <p className="text-gray-400 mb-6 text-sm">
          We have sent a 4-digit verification code to your email. Please check
          and confirm.
        </p>

        <div className="text-red-500 font-mono text-lg mb-4 text-center">
          {formatTime(timer)}
        </div>

        <div className="flex justify-between gap-3 mb-6">
          {code.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              className="w-14 h-14 text-center rounded-lg bg-gray-800 border border-gray-700 text-white text-xl focus:outline-none focus:border-green-500"
            />
          ))}
        </div>

        <div className="text-center mb-4">
          <button
            onClick={handleResend}
            className="text-sm text-gray-400 hover:text-white underline cursor-pointer"
          >
            Resend
          </button>
        </div>

        <button
          onClick={handleVerify}
          className="w-full py-2 rounded-lg bg-green-500 hover:bg-green-600 transition font-semibold cursor-pointer"
        >
          Verify
        </button>
      </div>
    </div>
  );
};

export default ResetPasswordPopup;
