import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PropertyListingConfirmationPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center px-6 py-12">
      <div className="max-w-md mx-auto text-center">
        <div className="mb-8">
          <div className="flex justify-center mb-6">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Blue_Search_Business_Logo__1_-removebg-preview-y1alAnHTPwrHwRhEKuTcNfe69clSA3.png"
              alt="KwaMastende Logo"
              className="w-20 h-20"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">KwaMastende</h1>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="flex justify-center mb-6">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">Property Listing Submitted Successfully!</h2>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <p className="text-lg font-semibold text-gray-900 mb-2">WE WILL CONTACT YOU ASAP IN THE NEXT 24 HOURS</p>
            <p className="text-gray-600">
              Thank you for choosing KwaMastende to list your property. Our team will review your submission and get
              back to you within 24 hours with next steps.
            </p>
          </div>

          <div className="text-left space-y-3 text-sm text-gray-600 mb-6">
            <p>
              <strong>What happens next:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Our team will review your property details</li>
              <li>We'll contact you to verify information and discuss listing options</li>
              <li>Your property will be added to our platform once approved</li>
              <li>You'll start receiving inquiries from potential tenants</li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600">
              <strong>Need immediate assistance?</strong>
              <br />
              Email us at:{" "}
              <a href="mailto:kwamastende@gmail.com" className="text-[#0500ff] hover:text-[#368cff] underline">
                kwamastende@gmail.com
              </a>
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <Link href="/auth/login">
            <Button className="w-full btn-primary text-lg py-4">Back to Login</Button>
          </Link>

          <Link href="/" className="block">
            <Button
              variant="outline"
              className="w-full text-lg py-4 border-[#0500ff] text-[#0500ff] hover:bg-[#0500ff] hover:text-white bg-transparent"
            >
              Browse Properties
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
