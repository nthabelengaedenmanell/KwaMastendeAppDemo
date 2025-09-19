"use client"

// Import necessary dependencies for React and TypeScript
import type React from "react"
import { useState } from "react" // React hooks for state management
import { Button } from "@/components/ui/button" // Custom Button component from UI library
import { BottomNavigation } from "../home/bottom-navigation" // Navigation component for the app footer

// Define the Message interface to type the chat messages
interface Message {
  id: string // Unique identifier for each message
  content: string // Text content of the message
  isUser: boolean // Flag to indicate if the message is from the user or AI
  timestamp: Date // Timestamp of when the message was sent
}

// Define props for the HelpScreen component
interface HelpScreenProps {
  activeTab: string // Current active tab in the bottom navigation
  onTabChange: (tab: string) => void // Callback to handle tab changes
}

// Main HelpScreen component that renders either the chat interface or help topics
export function HelpScreen({ activeTab, onTabChange }: HelpScreenProps) {
  // State to manage the list of chat messages
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi! I'm your KwaMastende AI assistant. How can I help you find the perfect property today?",
      isUser: false,
      timestamp: new Date(),
    },
  ])
  // State for the user's input in the chat textarea
  const [inputMessage, setInputMessage] = useState("")
  // State to track if the AI is processing a response
  const [isLoading, setIsLoading] = useState(false)
  // State to toggle between chat view and help topics view
  const [showChat, setShowChat] = useState(false)

  // Function to handle sending a user message to the AI
  const handleSendMessage = async () => {
    // Prevent sending empty messages or while loading
    if (!inputMessage.trim() || isLoading) return

    // Create a new user message object
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      isUser: true,
      timestamp: new Date(),
    }

    // Add the user message to the messages state
    setMessages((prev) => [...prev, userMessage])
    const currentInput = inputMessage // Store input for API call
    setInputMessage("") // Clear the input field
    setIsLoading(true) // Set loading state to true

    try {
      // Send the user message to the chat API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: currentInput }),
      })

      // Check if the API response is successful
      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      // Handle streaming response from the API
      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let fullResponse = ""

      // Create a placeholder for the AI response
      const aiMessageId = (Date.now() + 1).toString()
      const aiMessage: Message = {
        id: aiMessageId,
        content: "",
        isUser: false,
        timestamp: new Date(),
      }

      // Add the AI message placeholder to the messages state
      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false) // Reset loading state

      if (reader) {
        // Read the streaming response chunks
        while (true) {
          const { done, value } = await reader.read()
          if (done) break // Exit loop when streaming is complete

          const chunk = decoder.decode(value, { stream: true })
          fullResponse += chunk // Append chunk to full response

          // Update the AI message content with the streamed data
          setMessages((prev) => prev.map((msg) => (msg.id === aiMessageId ? { ...msg, content: fullResponse } : msg)))
        }
      }
    } catch (error) {
      // Handle errors during API call
      console.error("Chat error:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I'm having trouble connecting right now. Please try again or contact support directly.",
        isUser: false,
        timestamp: new Date(),
      }
      // Add error message to the messages state
      setMessages((prev) => [...prev, errorMessage])
      setIsLoading(false) // Reset loading state
    }
  }

  // Function to handle Enter key press for sending messages
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault() // Prevent newline in textarea
      handleSendMessage() // Trigger message sending
    }
  }

  // Render the chat interface if showChat is true
  if (showChat) {
    return (
      <div className="min-h-screen bg-white pb-20 flex flex-col">
        {/* Chat Header Section */}
        <div className="px-6 py-4 border-b border-gray-100 bg-white sticky top-0 z-10">
          <div className="flex items-center gap-3">
            {/* Back button to return to help topics */}
            <button onClick={() => setShowChat(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex items-center gap-3">
              {/* AI Support icon */}
              <div className="w-8 h-8 bg-[#0500ff] rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <div>
                {/* Chat header title and subtitle */}
                <h2 className="font-semibold text-gray-900 text-lg">AI Support</h2>
                <p className="text-gray-500" style={{ fontSize: '14px' }}>Powered by Grok</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Messages Section */}
        <div className="flex-1 px-6 py-4 overflow-y-auto">
          <div className="space-y-4">
            {/* Render each message in the chat */}
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.isUser ? "bg-[#0500ff] text-white rounded-br-md" : "bg-gray-100 text-gray-900 rounded-bl-md"
                  }`}
                >
                  <p className="text-base whitespace-pre-wrap">{message.content}</p>
                  <p className={`text-sm mt-1 ${message.isUser ? "text-blue-100" : "text-gray-500"}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            ))}
            {/* Loading animation for AI response */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-2xl rounded-bl-md">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Chat Input Section */}
        <div className="px-6 py-4 border-t border-gray-100 bg-white">
          <div className="flex items-end gap-3">
            <div className="flex-1 relative">
              {/* Textarea for user input */}
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about properties, search tips, or anything else..."
                className="w-full p-3 pr-12 border border-gray-200 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-[#0500ff] focus:border-transparent text-base"
                rows={1}
                style={{ minHeight: "44px", maxHeight: "120px" }}
              />
            </div>
            {/* Send button */}
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="bg-[#0500ff] hover:bg-[#368cff] text-white p-3 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </Button>
          </div>
        </div>

        {/* Bottom navigation component */}
        <BottomNavigation activeTab={activeTab} onTabChange={onTabChange} />
      </div>
    )
  }

  // Render the help topics view if showChat is false
  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="px-6 py-8">
        {/* Help Center title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Help Center</h1>

        {/* AI Chat Card */}
        <div className="mb-6">
          <div className="p-6 bg-gradient-to-r from-[#0500ff] to-[#368cff] rounded-2xl text-white">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <div>
                {/* AI Support Assistant card title and subtitle */}
                <h3 className="font-semibold text-xl">AI Support Assistant - Powered by Grok AI </h3>
              </div>
            </div>
            <p className="text-white/90 text-base mb-4">
              Get instant help with property searches, rental questions, and app navigation. Our AI assistant is here
              24/7 to help you find your perfect home.
            </p>
            {/* Button to start the AI chat */}
            <Button
              onClick={() => setShowChat(true)}
              className="bg-white text-[#0500ff] hover:bg-gray-100 font-medium px-6 py-2 rounded-xl text-base"
            >
              Start Chat
            </Button>
          </div>
        </div>

        {/* Help Topics Section */}
        <div className="space-y-4">
          {/* How to Search Properties Topic */}
          <div className="p-4 bg-gray-50 rounded-xl">
            <h3 className="font-semibold text-xl text-gray-900 mb-2">How to Search Properties</h3>
            <p className="text-gray-600 text-base mb-3">
              Learn how to use filters and search effectively to find your ideal property.
            </p>
            <ul className="text-gray-600 text-base space-y-1">
              <li>• Use location filters to narrow down areas</li>
              <li>• Set price ranges that fit your budget</li>
              <li>• Filter by bedrooms and bathrooms</li>
            </ul>
          </div>

          {/* Contacting Landlords Topic */}
          <div className="p-4 bg-gray-50 rounded-xl">
            <h3 className="font-semibold text-xl text-gray-900 mb-2">Contacting Landlords</h3>
            <p className="text-gray-600 text-base mb-3">Tips for reaching out to property owners effectively.</p>
            <ul className="text-gray-600 text-base space-y-1">
              <li>• Be polite and professional in messages</li>
              <li>• Ask specific questions about the property</li>
              <li>• Schedule viewings during convenient times</li>
            </ul>
          </div>

          {/* Safety Tips Topic */}
          <div className="p-4 bg-gray-50 rounded-xl">
            <h3 className="font-semibold text-xl text-gray-900 mb-2">Safety Tips</h3>
            <p className="text-gray-600 text-base mb-3">Stay safe while searching for and viewing properties.</p>
            <ul className="text-gray-600 text-base space-y-1">
              <li>• Always view properties during daylight</li>
              <li>• Bring someone with you to viewings</li>
              <li>• Verify landlord identity before payments</li>
            </ul>
          </div>

          {/* Rental Process Topic */}
          <div className="p-4 bg-gray-50 rounded-xl">
            <h3 className="font-semibold text-xl text-gray-900 mb-2">Rental Process</h3>
            <p className="text-gray-600 text-base mb-3">Understanding the rental application and lease process.</p>
            <ul className="text-gray-600 text-base space-y-1">
              <li>• Prepare required documents in advance</li>
              <li>• Understand deposit and rental terms</li>
              <li>• Read lease agreements carefully</li>
            </ul>
          </div>

          {/* Contact Support Topic */}
          <div className="p-4 bg-gray-50 rounded-xl">
            <h3 className="font-semibold text-xl text-gray-900 mb-2">Contact Support</h3>
            <p className="text-gray-600 text-base mb-3">Need additional help? Our support team is here for you.</p>
            <div className="space-y-2">
              {/* Email contact link */}
              <button className="text-[#0500ff] hover:text-[#368cff] font-medium text-base block">
                📧 kwamastende@gmail.com
              </button>
            </div>
          </div>

          {/* Social Media Links Topic */}
          <div className="p-4 bg-gray-50 rounded-xl">
            <h3 className="font-semibold text-xl text-gray-900 mb-2">Follow Us</h3>
            <p className="text-gray-600 text-base mb-3">Stay connected with us on social media for updates and tips.</p>
            <div className="flex space-x-4">
              {/* Twitter link */}
              <a
                href="https://twitter.com/kwamastende"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0500ff] hover:text-[#368cff] transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* Facebook link */}
              <a
                href="https://facebook.com/kwamastende"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0500ff] hover:text-[#368cff] transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              {/* Instagram link */}
              <a
                href="https://instagram.com/kwamastende"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0500ff] hover:text-[#368cff] transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.332.014 7.052.072 3.668.227.929 2.988.776 6.352.719 7.632.705 8.041.705 11.3c0 3.259.014 3.668.072 4.948.153 3.364 2.894 6.125 6.258 6.278 1.28.058 1.689.072 4.948.072s3.668-.014 4.948-.072c3.364-.153 6.125-2.894 6.278-6.258.058-1.28.072-1.689.072-4.948 0-3.259-.014-3.668-.072-4.948-.153-3.364-2.894-6.125-6.258-6.278C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm4.86-10.144a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
                </svg>
              </a>
              {/* LinkedIn link */}
              <a
                href="https://linkedin.com/company/kwamastende"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0500ff] hover:text-[#368cff] transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.024-3.037-1.85-3.037-1.85 0-2.132 1.444-2.132 2.938v5.668H9.356V9.142h3.414v1.561h.048c.476-.9 1.637-1.85 3.37-1.85 3.602 0 4.267 2.37 4.267 5.455v6.144zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.781 13.019H3.555V9.142h3.563v11.31zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom navigation component */}
      <BottomNavigation activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  )
}
