"use client"

import React, { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { LogOut } from "lucide-react"
import { useTheme } from "next-themes"

const PersonalizationDialog = () => {
    const [open, setOpen] = useState(false)
    const { theme, setTheme, systemTheme } = useTheme()

    return (
        <div>
            {/* Dialog */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="text-lg text-center font-semibold">
                            Personalization
                        </DialogTitle>
                    </DialogHeader>

                    {/* Dialog Body */}
                    <div className="p-4 space-y-4">
                        {/* Theme Selector */}
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium">Theme:</label>
                            <select
                                className="border rounded-md px-2 py-1 text-sm"
                                value={theme === "system" ? systemTheme : theme}
                                onChange={(e) => setTheme(e.target.value)}
                            >
                                <option value="light">Light</option>
                                <option value="dark">Dark</option>
                                <option value="system">System</option>
                            </select>
                        </div>

                        {/* Language Selector (Placeholder) */}
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium">Language:</label>
                            <select className="border rounded-md px-2 py-1 text-sm">
                                <option value="en">English</option>
                                <option value="bn">Bangla</option>
                            </select>
                        </div>


                    </div>

                    {/* Dialog Footer */}
                    <div className="flex justify-center gap-3 mt-4">
                        <button className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700">
                            Save
                        </button>
                        <button
                            onClick={() => setOpen(false)}
                            className="w-full t border py-2 rounded-md border-gray-500 dark:text-white"
                        >
                            Cancel
                        </button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Dropdown Menu Item */}
            <DropdownMenuItem
                onClick={(e) => {
                    e.preventDefault()
                    setOpen(true)
                }}
                className="flex items-center gap-2 text-green-600 hover:text-green-700"
            >
                <LogOut className="h-4 w-4" />
                Personalization
            </DropdownMenuItem>
        </div>
    )
}

export default PersonalizationDialog
