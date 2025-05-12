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

export function AIAssistant() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm your Greenhouse Care Assistant powered by Groq AI. I can help with crop care advice, environmental conditions, troubleshooting, and more. How can I assist you today?",
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
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
      // In a real app, this would call the Groq API
      // For now, we'll simulate a response
      setTimeout(() => {
        let response = ""

        if (input.toLowerCase().includes("vanilla")) {
          response =
            "Vanilla orchids (Vanilla planifolia) thrive in warm, humid conditions with filtered light. They need temperatures between 24-30°C, humidity of 80-85%, and regular misting. They're climbing plants that require support structures. The most critical period is during flowering when they need hand pollination for vanilla bean production."
        } else if (input.toLowerCase().includes("saffron")) {
          response =
            "Saffron crocus (Crocus sativus) prefers cooler temperatures between 15-18°C and moderate humidity (40-60%). They need well-draining soil and full sun exposure. Harvest the stigmas (the saffron threads) when flowers are fully open, typically in the morning. Each flower produces only 3 stigmas, which is why saffron is so valuable."
        } else if (input.toLowerCase().includes("humidity")) {
          response =
            "To increase humidity in Zone 3, you could: 1) Install a misting system on a timer, 2) Group plants together to create a microclimate, 3) Use humidity trays filled with water and pebbles, 4) Add a humidifier to the zone. Monitor the humidity levels to ensure they stay within the optimal range for your specific crops."
        } else if (input.toLowerCase().includes("yellow") || input.toLowerCase().includes("leaves")) {
          response =
            "Yellowing leaves could be caused by several factors: 1) Overwatering or poor drainage, 2) Nutrient deficiencies (particularly nitrogen), 3) Insufficient light, 4) Pest infestations, or 5) Disease. Check the soil moisture first, then examine for pests. Consider testing the nutrient levels in your growing medium and adjusting your fertilization schedule accordingly."
        } else if (input.toLowerCase().includes("co2") || input.toLowerCase().includes("co₂")) {
          response =
            "To optimize CO₂ levels for better plant growth: 1) Aim for 800-1200 ppm during daylight hours, 2) Install a CO₂ enrichment system with proper controls, 3) Ensure good air circulation while maintaining CO₂ concentration, 4) Monitor levels regularly with reliable sensors. Remember that CO₂ enrichment is most effective with adequate light, water, and nutrients."
        } else {
          response =
            "Thank you for your question. Based on greenhouse best practices, I'd recommend monitoring your environmental conditions closely and adjusting your care routines seasonally. For specific crop advice, please provide details about the plant varieties you're growing and their current conditions. Would you like information about temperature management, humidity control, lighting, or pest management?"
        }

        setMessages((prev) => [...prev, { role: "assistant", content: response }])
        setIsLoading(false)
      }, 1500)
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
          placeholder="Ask about crop care, environmental conditions, or troubleshooting..."
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
