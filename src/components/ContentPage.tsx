"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Wand2 } from "lucide-react"

const ContentPage = () => {
  const [inputValue, setInputValue] = useState(
    "Generate a 3-day itinerary in NYC."
  )

  return (
    <div className="flex h-full flex-col items-center justify-center p-4 gap-6 ">
      {/* Header */}
      <h1 className="text-2xl md:text-3xl md:max-w-[500px] font-bold text-white text-center">
        Every perspective, every AI, one place.
      </h1>

      {/* Textarea Container */}
      <div className="relative w-full max-w-3xl bg-[#1A222C] p-6 rounded-xl shadow-lg border border-gray-700">
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full bg-background text-white p-3 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500 text-lg"
          rows={2}
          placeholder="Type your query here..."
        />

        {/* Bottom Actions */}
        <div className="flex justify-between items-center mt-4">
          {/* Specification Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-gray-400 hover:text-white">
                <span className="mr-2">Specification</span>
                <span className="ml-1">ⓘ</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#2A3440] text-white">
              <DropdownMenuItem className="hover:bg-[#3A4555]">
                Query
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-[#3A4555]">
                Create Image
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Generate Button */}
          <Button
            className="bg-green-600 text-white hover:bg-green-700 rounded-md px-4 py-2 flex items-center"
            onClick={() => alert("Generating...")}
          >
            Generate <Wand2 className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ContentPage
