import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { User } from "lucide-react";
import SubscriptionDropdownItem from "./subscription-dialog";
import SettingsDialog from "./settings-dialog";
import LogoutDialog from "./logout-dialog";
import PersonalizationDialog from "./personalization-dialog";
import image from "../../public/images/login.png";
import ChangePasswordDialog from "./ChangePasswordDialog";
export default function Dropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer h-9 w-9">
          <AvatarImage src={image.src} alt="User" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex items-center gap-2">
          <User className="h-4 w-4" />
          My Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="">
          <SubscriptionDropdownItem />
        </div>
        <SettingsDialog />
        <PersonalizationDialog />
        <ChangePasswordDialog />

        <DropdownMenuSeparator />
        <LogoutDialog />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
