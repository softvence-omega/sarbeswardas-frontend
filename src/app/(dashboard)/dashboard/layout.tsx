import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  User,
  CreditCard,
  Settings,
  LogOut,
  Wand2,
} from "lucide-react"
import Dropdown from "@/components/drop-down"
import ContentPage from "@/components/ContentPage"

export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex bg-background border-b dark:bg-[#161C24] h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear 
        group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex w-full justify-between items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />

            {/* User Avatar + Dropdown */}
            <Dropdown />
          </div>
        </header>

        {/* Page content */}
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <ContentPage />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
