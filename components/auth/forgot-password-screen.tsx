"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { forgotPassword } from "@/lib/actions"

interface ForgotPasswordScreenProps {
  onBackToLogin: () => void
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending} className="w-full btn-primary text-lg py-4">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Sending Reset Link...
        </>
      ) : (
        "Send Reset Link"
      )}
    </Button>
  )
}

export function ForgotPasswordScreen({ onBackToLogin }: ForgotPasswordScreenProps) {
  const [state, formAction] = useActionState(forgotPassword, null)

  if (state?.success) {
    return (
      <div className="min-h-screen flex flex-col justify-center px-6 py-12">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Check your email</h1>
          <p className="text-gray-600 mb-8">{state.success}</p>
          <p className="text-sm text-gray-500 mb-8">Need help? Contact our support team.</p>
          <Button onClick={onBackToLogin} className="w-full btn-secondary">
            Back to Sign In
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col justify-center px-6 py-12">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Reset Password</h1>
          <p className="text-gray-600">Enter your email to reset your password</p>
        </div>

        <form action={formAction} className="space-y-6">
          {state?.error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{state.error}</div>
          )}

          <div>
            <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
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

          <SubmitButton />
        </form>

        <div className="mt-8 text-center">
          <button onClick={onBackToLogin} className="text-[#0500ff] hover:text-[#368cff] font-medium">
            Back to Sign In
          </button>
        </div>
      </div>
    </div>
  )
}
