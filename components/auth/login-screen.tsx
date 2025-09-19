"use client"

import { useActionState, useEffect, useState } from "react"
import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Eye, EyeOff } from "lucide-react"
import { signIn } from "@/lib/actions"
import { useRouter } from "next/navigation"

interface LoginScreenProps {
  onSwitchToSignup: () => void
  onForgotPassword: () => void
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending} className="w-full btn-primary text-lg py-4">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Signing in...
        </>
      ) : (
        "Sign in"
      )}
    </Button>
  )
}

export function LoginScreen({ onSwitchToSignup, onForgotPassword }: LoginScreenProps) {
  const router = useRouter()
  const [state, formAction] = useActionState(signIn, null)
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (state?.success) {
      router.push("/")
    }
  }, [state, router])

  return (
    <div className="min-h-screen flex flex-col justify-center px-6 py-12">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-2">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Blue_Search_Business_Logo__1_-removebg-preview-y1alAnHTPwrHwRhEKuTcNfe69clSA3.png"
              alt="KwaMastende Logo"
              className="w-40 h-40"
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">KwaMastende</h1>
          <p className="text-gray-900">Welcome back</p>
        </div>

        <form action={formAction} className="space-y-6">
          {state?.error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{state.error}</div>
          )}

          <div>
            <Label htmlFor="email" className="block text-lg font-medium text-gray-900 mb-2">
              Email address
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0500ff] focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <Label htmlFor="password" className="block text-lg font-medium text-gray-700 mb-2">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0500ff] focus:border-transparent"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>
          <SubmitButton />
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <button onClick={onSwitchToSignup} className="text-[#0500ff] hover:text-[#368cff] font-medium">
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
