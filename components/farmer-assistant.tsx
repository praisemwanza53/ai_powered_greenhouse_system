"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, User, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface Message {
  role: "user" | "assistant"
  content: string
}

export function FarmerAssistant() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm your Farming Assistant powered by AI. I can help with crop care, irrigation scheduling, pest management, harvest planning, and more. How can I assist you with your farming operations today?",
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage = { role: "user" as const, content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // In a real app, this would call an AI API
      // For now, we'll simulate a response
      setTimeout(() => {
        let response =
          "Thank you for your question. As your farming assistant, I'd need a bit more specific information about your crops, growing conditions, or the particular challenge you're facing to provide tailored advice. I can help with irrigation scheduling, pest management, nutrient requirements, harvest planning, or greenhouse environmental control. Could you provide more details about what you're growing and what specific assistance you need?"

        // Simple keyword matching for demo purposes
        if (input.toLowerCase().includes("water") && input.toLowerCase().includes("vanilla")) {
          response =
            "For vanilla orchids, water moderately but consistently. In your greenhouse setup, I recommend watering 2-3 times per week during active growth, ensuring the growing medium is moist but not soggy."
        } else if (input.toLowerCase().includes("fertilizer") && input.toLowerCase().includes("saffron")) {
          response =
            "For saffron crocus, use a balanced fertilizer with an NPK ratio of 10-10-10 during the growing season. Apply at half strength every 2-3 weeks."
        }

        setMessages((prev) => [...prev, { role: "assistant", content: response }])
        setIsLoading(false)
      }, 1000)
    } catch (error) {
      console.error("Error getting AI response:", error)
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I encountered an error. Please try again." },
      ])
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto pr-4">
        <div className="space-y-4 pb-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}>
              <div
                className={`flex max-w-[80%] items-start rounded-lg px-4 py-2 ${
                  message.role === "assistant" ? "bg-muted text-foreground" : "bg-skyblue-500 text-primary-foreground"
                }`}
              >
                <div className="mr-2 mt-0.5">
                  {message.role === "assistant" ? <Bot className="h-5 w-5" /> : <User className="h-5 w-5" />}
                </div>
                <div className="text-sm">{message.content}</div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex max-w-[80%] items-center rounded-lg bg-muted px-4 py-2 text-foreground">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span className="text-sm">Thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-4 flex items-end gap-2">
        <Textarea
          placeholder="Ask about crop care, irrigation, pest management, or harvesting..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-[80px] flex-1 resize-none"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              handleSubmit(e)
            }
          }}
        />
        <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
          <Send className="h-4 w-4" />
          <span className="sr-only">Send message</span>
        </Button>
      </form>
    </div>
  )
}
