"use client"

import * as React from "react"
import {
  LogOut,
  PlusCircle,
  Search,
  MessageSquare,
  MoreVertical,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/ui/sidebar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import ShareDialog from "./share-dialog"
import RenameDialog from "./rename-dialog"
import DeleteDialog from "./delete-dialog"
import Image from "next/image"
import lightLogo from "../../public/images/logo-light.jpeg"
import DarkLogo from "../../public/images/logo-dark.jpeg"
import { useTheme } from "next-themes"
export function AppSidebar() {
  const { theme } = useTheme()
  const recentItems = [
    "What is ui ux design?",
    "Can you write me...",
    "Can you discus...",
    "Can you discus...",
    "Can you discus...",
    "Can you discus...",
  ]

  return (
    <Sidebar collapsible="offcanvas" className="dark:bg-[#161C24] text-white">
      {/* Header */}
      <SidebarHeader className="p-3 border rounded-lg border-dashed">
        <SidebarGroup>
          <SidebarGroupContent>
            <div className="flex flex-col gap-5">
              {/* sidebar top some text */}
              <div className="flex items-center justify-between">
                <div className=" p-5 border border-gray-600 bg-background rounded-2xl">
                  <div className="flex items-start gap-3">
                    {
                      theme === "dark" ? (
                        <Image
                          src={DarkLogo}
                          alt="Logo"
                          className=" object-cover"
                        />) : (
                        <Image
                          src={lightLogo}
                          alt="Logo"
                          className="object-cover"
                        />)
                    }


                  </div>

                  <div className="mt-2">
                    <p className="text-xs text-muted-foreground">
                      Lorem Ipsum is simply dummy text of the printing industry.
                    </p>
                  </div>
                </div>
              </div>

              <Button className="bg-green-500 hover:bg-green-600 flex items-center text-white">
                New Query
                <PlusCircle className="h-4 w-4 mt-1 mr-2" />
              </Button>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent className="flex flex-col gap-4 p-3 border overflow-hidden rounded-lg border-dashed mt-2">
        <SidebarGroup>
          <SidebarGroupContent>
            {/* Search */}
            <div className="relative ">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search"
                className="pl-8 bg-transparent border-gray-700"
              />
            </div>

            {/* Recent */}
            <div className="mt-5 ">
              <p className="text-xs text-muted-foreground mb-2">Recent</p>
              <hr className="bg-gray-500/40 mb-2" />
              <div className="space-y-1 max-h-48 overflow-y-hidden">
                {recentItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between w-full rounded-lg hover:bg-muted/20 transition-colors"
                  >
                    {/* Left side: main button */}
                    <Button
                      variant="ghost"
                      className="flex-1 justify-start text-sm text-muted-foreground overflow-hidden"
                    >
                      <MessageSquare className="h-4 w-4 mr-2 shrink-0" />
                      <span className="truncate">{item}</span>
                    </Button>

                    {/* Right side: three dot action button with dropdown */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-2 text-muted-foreground hover:text-foreground shrink-0">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end" className="w-40">

                        <ShareDialog />
                        <RenameDialog />
                        <DeleteDialog />
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}

              </div>
              <Button
                variant="ghost"
                size="sm"
                className="mt-2 w-full justify-center text-xs"
              >
                See More
              </Button>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="p-3 border rounded-lg border-dashed mt-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/shadcn.jpg" alt="User" />
                  <AvatarFallback>BK</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Brooklyn</p>
                  <p className="text-xs text-muted-foreground">
                    felicia.reid@example.com
                  </p>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs border-green-600 text-green-500"
              >
                Upgrade Plan
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs text-red-500 border-red-600"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Log out
              </Button>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
