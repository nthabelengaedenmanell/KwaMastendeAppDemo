"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PrivacyPolicyScreenProps {
  onBack: () => void
}

export function PrivacyPolicyScreen({ onBack }: PrivacyPolicyScreenProps) {
  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" onClick={onBack} className="mr-3 p-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold text-gray-900">Privacy Policy</h1>
        </div>
      </div>

      <div className="px-6 py-6 max-w-4xl mx-auto">
        <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Privacy Policy for the KwaMastende App</h2>
            <p className="text-sm text-gray-600 mb-4">Last Updated: August 18, 2025</p>
          </div>

          <p className="mb-4">
            KwaMastende ("we," "us," or "our") is committed to protecting the privacy of users ("you" or "your") of the
            KwaMastende App ("the App"), a property search platform designed to connect landlords and tenants in South
            African townships ("eKasi"). This Privacy Policy explains how we collect, use, disclose, and safeguard your
            personal information when you use the App. By using the App, you consent to the practices described in this
            Privacy Policy.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">1. Information We Collect</h3>
          <p className="mb-3">
            We collect the following types of information to provide and improve the App's services:
          </p>

          <h4 className="font-medium text-gray-900 mb-2">1.1. Personal Information:</h4>
          <p className="mb-2">
            Information that identifies you, which you may provide when creating an account, listing a property, or
            contacting other users:
          </p>
          <ul className="list-disc pl-6 mb-3 space-y-1">
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Address or location details (e.g., township or property location)</li>
            <li>Other information you voluntarily provide, such as in messages or property descriptions</li>
          </ul>

          <h4 className="font-medium text-gray-900 mb-2">1.2. Non-Personal Information:</h4>
          <p className="mb-2">
            Information that does not directly identify you, collected automatically when you use the App:
          </p>
          <ul className="list-disc pl-6 mb-3 space-y-1">
            <li>Device information (e.g., device type, operating system, IP address)</li>
            <li>Usage data (e.g., pages visited, search queries, time spent on the App)</li>
            <li>
              Location data (e.g., approximate location based on IP address or precise location if you enable location
              services)
            </li>
          </ul>

          <h4 className="font-medium text-gray-900 mb-2">1.3. User Content:</h4>
          <p className="mb-4">
            Information you submit to the App, such as property listings, photos, or messages exchanged with other
            users.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">2. How We Use Your Information</h3>
          <p className="mb-3">We use your information to operate and enhance the App's functionality, including:</p>

          <h4 className="font-medium text-gray-900 mb-2">2.1. Providing Services:</h4>
          <ul className="list-disc pl-6 mb-3 space-y-1">
            <li>To facilitate property searches and connect landlords with tenants.</li>
            <li>To display property listings, including backrooms, rooms, garages, and houses.</li>
            <li>To enable communication between users (e.g., landlords and tenants).</li>
          </ul>

          <h4 className="font-medium text-gray-900 mb-2">2.2. Improving the App:</h4>
          <ul className="list-disc pl-6 mb-3 space-y-1">
            <li>To analyze usage patterns and improve the App's features and performance.</li>
            <li>To personalize your experience, such as suggesting properties in your preferred township.</li>
          </ul>

          <h4 className="font-medium text-gray-900 mb-2">2.3. Communication:</h4>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>To send you updates, notifications, or responses to your inquiries.</li>
            <li>To provide customer support and address issues related to your account.</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">3. Your Choices and Rights</h3>

          <h4 className="font-medium text-gray-900 mb-2">3.1. Account Information:</h4>
          <p className="mb-3">
            You may update or correct your account information at any time through the App's settings. You can also
            request deletion of your account by contacting us at kwamastende@gmail.com.
          </p>

          <h4 className="font-medium text-gray-900 mb-2">3.2. Data Access and Deletion:</h4>
          <p className="mb-2">
            Subject to applicable South African laws, such as the Protection of Personal Information Act (POPIA), you
            may have the right to:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>Access the personal information we hold about you.</li>
            <li>Request correction of inaccurate information.</li>
            <li>Request deletion of your personal information.</li>
            <li>Object to or restrict the processing of your information.</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">4. Data Security</h3>
          <p className="mb-4">
            We implement reasonable technical and organizational measures to protect your personal information from
            unauthorized access, loss, or misuse. However, no system is completely secure, and we cannot guarantee the
            absolute security of your information. You are responsible for maintaining the confidentiality of your
            account credentials and for any information you share with other users.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">5. Contact Us</h3>
          <p className="mb-4">
            If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please
            contact us at:
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p>
              <strong>Email:</strong> kwamastende@gmail.com
            </p>
          </div>

          <p className="text-sm text-gray-600 mt-8 p-4 bg-gray-50 rounded-lg">
            By using the KwaMastende App you acknowledge that you have read, understood, and agree to this Privacy
            Policy.
          </p>
        </div>
      </div>
    </div>
  )
}
