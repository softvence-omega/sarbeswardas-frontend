"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import logoutIcon from "../../public/images/logout.png";
import logoutVector from "../../public/images/logout-icon.png";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { removeToken } from "@/store/api/AuthState";
import { useRouter } from "next/navigation";
const LogoutDialog = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(removeToken());
    router.push("/login");
  };
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-lg text-center font-semibold">
              Log Out
            </DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-center">
            <Image src={logoutIcon} alt="logout" />
          </div>
          <div className="p-3 mb-2 flex items-center gap-2 rounded-xl text-sm bg-background dark:bg-[#212B36]">
            <Image src={logoutVector} alt="logout" />

            <span>You will be log out from the site.</span>
          </div>

          <div className="flex justify-center gap-3">
            <button
              onClick={handleLogout}
              className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700  cursor-pointer"
            >
              Log Out
            </button>
            <button
              onClick={() => setOpen(false)}
              className="w-full  text-white-800 border py-2 rounded-md border-gray-500 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </DialogContent>
      </Dialog>
      <DropdownMenuItem
        onClick={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
        className="flex items-center gap-2 text-red-600 hover:text-red-700 cursor-pointer"
      >
        <LogOut className="h-4 w-4" />
        Log Out
      </DropdownMenuItem>
    </div>
  );
};

export default LogoutDialog;
