"use client"

import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"
import Link from "next/link"

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Reset Password</h1>
          <p className="text-gray-600">Need help with your password?</p>
        </div>

        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 text-blue-800 px-6 py-8 rounded-lg text-center space-y-4">
            <Mail className="mx-auto h-12 w-12 text-blue-600" />
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Contact Support</h3>
              <p className="text-sm">
                For password reset assistance, please send us an email and we'll help you get back into your account.
              </p>
            </div>
            <div className="space-y-2">
              <p className="font-medium">Email us at:</p>
              <a href="mailto:kamastende@gmail.com" className="text-blue-600 hover:text-blue-800 font-semibold text-lg">
                kamastende@gmail.com
              </a>
            </div>
          </div>

          <div className="text-center">
            <Link href="/auth/login">
              <Button variant="outline" className="w-full h-12 bg-transparent">
                Back to Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
