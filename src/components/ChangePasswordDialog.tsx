"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { MdOutlineLockPerson } from "react-icons/md";
import { useChangePasswordMutation } from "@/store/api/authApi";

// Zod schema
const changePasswordSchema = z.object({
  oldPassword: z.string().min(6, "Old password is required"),
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
});

// TypeScript type
type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

const ChangePasswordDialog = () => {
  const [open, setOpen] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const onSubmit = async (data: ChangePasswordFormData) => {
    try {
      const apiBody = {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      };
      await changePassword(apiBody);

      reset();
      setOpen(false);
    } catch (error) {
      console.error("Failed to change password:", error);
    }
  };

  return (
    <div>
      {/* Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-lg text-center font-semibold">
              Change Password
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-300 text-sm font-medium">
                Old Password
              </label>
              <input
                type="password"
                placeholder="Type your password"
                {...register("oldPassword")}
                className="w-full px-4 py-2 border rounded-lg border-green-500 dark:border-green-400 bg-white dark:bg-[#0B0D12] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
              />
              {errors.oldPassword && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.oldPassword.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-300 text-sm font-medium">
                New Password
              </label>
              <input
                type="password"
                placeholder="Type your password"
                {...register("newPassword")}
                className="w-full px-4 py-2 border rounded-lg border-green-500 dark:border-green-400 bg-white dark:bg-[#0B0D12] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
              />
              {errors.newPassword && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            {/* Dialog Footer */}
            <div className="flex justify-center gap-3 mt-4">
              <button
                disabled={isLoading}
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 cursor-pointer"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="w-full border py-2 rounded-md border-gray-500 dark:text-white cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <DropdownMenuItem
        onClick={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
        className="flex items-center gap-2 text-green-600 hover:text-green-700 cursor-pointer"
      >
        <MdOutlineLockPerson className="h-4 w-4" />
        Change Password
      </DropdownMenuItem>
    </div>
  );
};

export default ChangePasswordDialog;
