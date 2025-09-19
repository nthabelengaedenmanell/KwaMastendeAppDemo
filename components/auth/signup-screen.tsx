"use client"

// Importing necessary hooks from React and React-DOM for state management and form status
import { useActionState, useState } from "react"
import { useFormStatus } from "react-dom"
// Importing UI components from a custom component library
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
// Importing icons from lucide-react for loading and password visibility toggle
import { Loader2, Eye, EyeOff } from "lucide-react"
// Importing the signUp action from a custom library
import { signUp } from "@/lib/actions"
// Importing Link component from Next.js for navigation
import Link from "next/link"

// Defining the interface for SignupScreen component props
interface SignupScreenProps {
  onSwitchToLogin: () => void
}

// SubmitButton component to handle form submission with loading state
function SubmitButton({ termsAccepted }: { termsAccepted: boolean }) {
  // Using useFormStatus to track form submission status
  const { pending } = useFormStatus()

  return (
    // Button with conditional rendering for loading state and disabled state based on terms acceptance
    <Button type="submit" disabled={pending || !termsAccepted} className="w-full btn-primary text-lg py-4">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Creating Account...
        </>
      ) : (
        "Create Account"
      )}
    </Button>
  )
}

// Main SignupScreen component for rendering the signup form
export function SignupScreen({ onSwitchToLogin }: SignupScreenProps) {
  // Using useActionState to manage form submission state and errors
  const [state, formAction] = useActionState(signUp, null)
  // State to track if terms are accepted
  const [termsAccepted, setTermsAccepted] = useState(false)
  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false)

  return (
    // Main container with full-screen height and centered content
    <div className="min-h-screen flex flex-col justify-center px-6 py-12">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        {/* Header section with logo and title */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Blue_Search_Business_Logo__1_-removebg-preview-y1alAnHTPwrHwRhEKuTcNfe69clSA3.png"
              alt="KwaMastende Logo"
              className="w-40 h-40"
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">KwaMastende</h1>
          <p className="text-gray-800">Create your account</p>
        </div>

        {/* Form for user signup with action tied to formAction */}
        <form action={formAction} className="space-y-6">
          {/* Display error message if present */}
          {state?.error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{state.error}</div>
          )}

          {/* Display success message if present */}
          {state?.success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
              {state.success}
            </div>
          )}

          {/* Full Name input field */}
          <div>
            <Label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </Label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0500ff] focus:border-transparent"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email input field */}
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

          {/* Phone Number input field */}
          <div>
            <Label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0500ff] focus:border-transparent"
              placeholder="Enter your phone number"
            />
          </div>

          {/* Password input field with visibility toggle */}
          <div>
            <Label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0500ff] focus:border-transparent"
                placeholder="Create a password"
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

          {/* Terms and Conditions checkbox with links */}
          <div className="flex items-start space-x-3">
            <Checkbox
              id="terms"
              checked={termsAccepted}
              onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
              className="mt-1"
            />
            <div className="text-sm text-gray-600">
              <Label htmlFor="terms" className="cursor-pointer">
                I agree to the{" "}
                <Link href="/auth/terms" className="text-[#0500ff] hover:text-[#368cff] underline">
                  Terms and Conditions
                </Link>
                <div>
                  {/* Empty div for spacing */}
                </div>
                <Link href="/auth/privacy" className="text-[#0500ff] hover:text-[#368cff] underline">
                  and Privacy Policy
                </Link>
              </Label>
            </div>
          </div>

          {/* Submit button component */}
          <SubmitButton termsAccepted={termsAccepted} />
          
        </form>

        {/* Link to switch to login screen */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <button onClick={onSwitchToLogin} className="text-[#0500ff] hover:text-[#368cff] font-medium">
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}