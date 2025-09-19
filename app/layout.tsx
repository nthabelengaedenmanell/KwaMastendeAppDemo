import type React from "react"
import type { Metadata } from "next"
import { Red_Hat_Display } from "next/font/google"
import { Suspense } from "react"
import "./globals.css"

const redHatDisplay = Red_Hat_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-red-hat-display",
})

export const metadata: Metadata = {
  title: "KwaMastende - Property Search",
  description: "Connecting Landlords and Tenants in South African Townships",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${redHatDisplay.variable} antialiased`}>
      <body className="font-sans bg-white text-gray-900">
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </body>
    </html>
  )
}
