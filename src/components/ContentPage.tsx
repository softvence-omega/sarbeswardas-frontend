"use client"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Copy,
  FileText,
  Share2,
  ThumbsDown,
  ThumbsUp,
  Wand2,
  Bot,
  User,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const ContentPage = () => {
  const [inputValue, setInputValue] = useState("")
  const [messages, setMessages] = useState<
    { role: "user" | "ai"; content: string }[]
  >([])
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async () => {
    if (!inputValue.trim()) return
    const userMessage = { role: "user" as const, content: inputValue }
    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsGenerating(true)

    // Example AI response (replace with API stream later)
    const responseText = `Here’s a 3-day NYC itinerary that balances iconic landmarks, local experiences, food, and walkable neighborhoods.`

    let i = 0
    let temp = ""
    setMessages((prev) => [...prev, { role: "ai", content: "" }])
    const interval = setInterval(() => {
      temp += responseText[i]
      i++
      if (i >= responseText.length) {
        clearInterval(interval)
        setIsGenerating(false)
      }
      setMessages((prev) => {
        const lastIdx = prev.length - 1
        return prev.map((msg, idx) =>
          idx === lastIdx && msg.role === "ai"
            ? { ...msg, content: temp }
            : msg
        )
      })
    }, 20)
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    alert("Copied to clipboard!")
  }

  return (
    <div className="flex h-full flex-col items-center justify-center p-4 gap-6 ">
      {/* Header */}
      {messages.length === 0 ? (
        <h1 className="text-2xl md:text-3xl md:max-w-[500px] font-bold text-white text-center">
          Every perspective, every AI, one place.
        </h1>
      ) : (
        <div className="w-full max-w-3xl border border-border rounded-xl shadow-md whitespace-pre-wrap text-foreground leading-relaxed">
          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.role === "ai" && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}

                <div className="flex flex-col max-w-[75%]">
                  <div
                    className={`p-4 rounded-xl text-sm whitespace-pre-wrap ${
                      msg.role === "user"
                        ? "bg-green-600 text-white self-end"
                        : "bg-[#212B36] border border-border text-foreground"
                    }`}
                  >
                    {msg.content}
                  </div>

                  {/* Reaction Bar only for AI */}
                  {msg.role === "ai" && (
                    <div className="flex justify-between md:flex-row flex-col gap-3 items-center mt-3">
                      <div className="flex gap-3">
                        <Button size="icon" variant="ghost" className="rounded-lg border border-border">
                          <ThumbsUp className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className="rounded-lg border border-border">
                          <ThumbsDown className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="rounded-lg border border-border"
                          onClick={() => handleCopy(msg.content)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className="rounded-lg border border-border">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <Button
                        variant="outline"
                        className="text-green-500 border-green-500 hover:bg-green-950/20"
                      >
                        Show All Responses <FileText className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>

                {msg.role === "user" && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-gray-400 hover:text-white">
                <span className="mr-2">Specification</span>
                <span className="ml-1">ⓘ</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#2A3440] text-white">
              <DropdownMenuItem className="hover:bg-[#3A4555]">Query</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-[#3A4555]">Create Image</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            className="bg-green-600 text-white hover:bg-green-700 rounded-md px-4 py-2 flex items-center"
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? "Generating..." : (
              <>
                Generate <Wand2 className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ContentPage
