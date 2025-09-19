import { streamText } from "ai"
import { xai } from "@ai-sdk/xai"
import type { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json()

    if (!prompt) {
      return new Response("Prompt is required", { status: 400 })
    }

    const result = streamText({
      model: xai("grok-3", {
        apiKey: process.env.API_KEY,
      }),
      prompt: prompt,
      system: `You are a helpful customer support assistant for KwaMastende, a South African property rental app. 

Your role is to help users with:
- Finding and searching for rental properties
- Understanding how to use the app features
- Answering questions about the rental process in South Africa
- Providing guidance on contacting landlords
- Explaining safety tips for property viewing
- General app navigation and troubleshooting

Be friendly, professional, and knowledgeable about South African rental markets and townships. Always provide practical, actionable advice. If you don't know something specific about the app, be honest and suggest they contact support directly.

Keep responses concise but helpful, and use a warm, conversational tone appropriate for South African users.`,
    })

    return result.toTextStreamResponse()
  } catch (error) {
    console.error("Error generating chat response:", error)
    return new Response("Failed to generate response", { status: 500 })
  }
}
