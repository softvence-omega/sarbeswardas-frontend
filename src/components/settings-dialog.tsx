"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Settings } from "lucide-react";
import Image from "next/image";
import editIcon from "../../public/images/edit-icon.png";

const SettingsDialog = () => {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState("account");
  const [editFullName, setEditFullName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [fullName, setFullName] = useState("Brooklyn Richard");
  const [email, setEmail] = useState("mohibulla@gmail.com");
  const [password, setPassword] = useState("••••••••");

  const handleEditClick = (field: string) => {
    if (field === "fullName") setEditFullName(!editFullName);
    if (field === "email") setEditEmail(!editEmail);
    if (field === "password") setEditPassword(!editPassword);
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px] rounded-xl border bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-center">
              Settings
            </DialogTitle>
          </DialogHeader>

          <div className="w-full">
            {/* Custom Tab Buttons */}
            <div className="flex w-full">
              <button
                onClick={() => setTab("account")}
                className={`flex-1 py-2 text-sm font-medium rounded-md ${
                  tab === "account"
                    ? "bg-green-600 text-white"
                    : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                Account
              </button>
              <button
                onClick={() => setTab("security")}
                className={`flex-1 py-2 text-sm font-medium rounded-md ${
                  tab === "security"
                    ? "bg-green-600 text-white"
                    : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                Security
              </button>
            </div>

            {/* Account Content */}
            {tab === "account" && (
              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Update Picture:</label>
                  <div className="relative">
                    <Image
                      src="/images/logout-icon.png"
                      alt="profile"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Full Name:</label>
                  <div className="flex items-center gap-2">
                    {editFullName ? (
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 p-1 rounded-md w-40"
                      />
                    ) : (
                      <span className="text-gray-600 dark:text-gray-400">
                        {fullName}
                      </span>
                    )}
                    <button
                      onClick={() => handleEditClick("fullName")}
                      className="text-sm"
                    >
                      <Image src={editIcon} alt="edit" width={20} height={20} />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Email Address:</label>
                  <div className="flex items-center gap-2">
                    {editEmail ? (
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 p-1 rounded-md w-40"
                      />
                    ) : (
                      <span className="text-gray-600 dark:text-gray-400">
                        {email}
                      </span>
                    )}
                    <button
                      onClick={() => handleEditClick("email")}
                      className="text-sm"
                    >
                      <Image src={editIcon} alt="edit" width={20} height={20} />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Delete account</label>
                  <button className="text-red-600 dark:text-red-400 py-1 px-3 rounded-md text-sm border border-red-500 hover:bg-red-50 dark:hover:bg-red-950">
                    Delete Account
                  </button>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                  <span className="mr-2">ⓘ</span> This will change your whole
                  interface.
                </p>
              </div>
            )}

            {/* Security Content */}
            {tab === "security" && (
              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Password:</label>
                  <div className="flex items-center gap-2">
                    {editPassword ? (
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 p-1 rounded-md w-40"
                      />
                    ) : (
                      <span className="text-gray-600 dark:text-gray-400">
                        {password}
                      </span>
                    )}
                    <button
                      onClick={() => handleEditClick("password")}
                      className="text-sm"
                    >
                      <Image src={editIcon} alt="edit" width={20} height={20} />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">
                    Log out of all devices
                  </label>
                  <button className="text-red-600 dark:text-red-400 py-1 px-3 rounded-md text-sm border border-red-500 hover:bg-red-50 dark:hover:bg-red-950">
                    Log Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <DropdownMenuItem
        onClick={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
        className="flex items-center gap-2 text-green-600 hover:text-green-700 cursor-pointer"
      >
        <Settings className="h-4 w-4" />
        Settings
      </DropdownMenuItem>
    </div>
  );
};

export default SettingsDialog;
