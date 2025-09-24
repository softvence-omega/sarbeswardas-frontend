import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

import Dropdown from "@/components/drop-down"
import ContentPage from "@/components/ContentPage"

export default function Layout() {

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex bg-sidebar border-b dark:bg-card h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear 
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
