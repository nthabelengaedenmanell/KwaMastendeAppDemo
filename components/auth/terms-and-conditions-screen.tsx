"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TermsAndConditionsScreenProps {
  onBack: () => void
}

export function TermsAndConditionsScreen({ onBack }: TermsAndConditionsScreenProps) {
  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" onClick={onBack} className="mr-3 p-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold text-gray-900">Terms and Conditions</h1>
        </div>
      </div>

      <div className="px-6 py-6 max-w-4xl mx-auto">
        <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Terms and Conditions for the KwaMastende App</h2>
            <p className="text-sm text-gray-600 mb-4">Last Updated: August 18, 2025</p>
          </div>

          <p className="mb-4">
            Welcome to the KwaMastende App ("the App"), a property search platform designed to connect landlords and
            tenants in South African townships ("eKasi"). By accessing or using the App, you agree to be bound by these
            Terms and Conditions ("Terms"). If you do not agree with these Terms, please do not use the App.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">1. General Provisions</h3>

          <h4 className="font-medium text-gray-900 mb-2">1.1. Purpose of the App:</h4>
          <p className="mb-3">
            The KwaMastende App is a platform that facilitates the search for affordable housing in South African
            townships, connecting landlords with tenants. It provides a database of properties, including backrooms,
            rooms, garages, and houses, to simplify the process of finding a place to call home.
          </p>

          <h4 className="font-medium text-gray-900 mb-2">1.2. Eligibility:</h4>
          <p className="mb-3">
            You must be at least 18 years old and have the legal capacity to enter into contracts to use the App. By
            using the App, you represent that you meet these requirements.
          </p>

          <h4 className="font-medium text-gray-900 mb-2">1.3. Acceptance of Terms:</h4>
          <p className="mb-4">
            These Terms constitute a legally binding agreement between you ("User," "you," or "your") and KwaMastende
            ("we," "us," or "our"). We reserve the right to update or modify these Terms at any time, and such changes
            will be effective upon posting within the App. Your continued use of the App after changes are posted
            constitutes your acceptance of the revised Terms.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">2. Use of the App</h3>

          <h4 className="font-medium text-gray-900 mb-2">2.1. Permitted Use:</h4>
          <p className="mb-3">
            The App is intended for personal, non-commercial use to search for properties or list properties for rent in
            South African townships. You may not use the App for any unlawful purpose, to solicit illegal activities, or
            to violate any applicable laws or regulations.
          </p>

          <h4 className="font-medium text-gray-900 mb-2">2.2. User Accounts:</h4>
          <ul className="list-disc pl-6 mb-3 space-y-1">
            <li>
              To access certain features, such as listing properties or contacting landlords/tenants, you must create an
              account and provide accurate, complete, and current information.
            </li>
            <li>
              You are responsible for maintaining the confidentiality of your account credentials and for all activities
              under your account.
            </li>
            <li>You agree to notify us immediately of any unauthorized use of your account.</li>
          </ul>

          <h4 className="font-medium text-gray-900 mb-2">2.3. Prohibited Activities:</h4>
          <p className="mb-2">You agree not to:</p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>Post false, misleading, or fraudulent property listings.</li>
            <li>Use the App to harass, discriminate against, or harm other users.</li>
            <li>
              Attempt to interfere with the App's functionality, including through hacking, introducing viruses, or
              other malicious code.
            </li>
            <li>Collect or store personal data about other users without their consent.</li>
            <li>
              Use the App for commercial purposes unrelated to its intended property search and connection services.
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">3. Property Listings and Transactions</h3>

          <h4 className="font-medium text-gray-900 mb-2">3.1. Accuracy of Listings:</h4>
          <p className="mb-3">
            Landlords are responsible for ensuring that property listings are accurate, complete, and up-to-date,
            including details about the property type (e.g., backrooms, rooms, garages, houses), location, price, and
            availability.
          </p>

          <h4 className="font-medium text-gray-900 mb-2">3.2. No Guarantee:</h4>
          <p className="mb-3">
            We do not guarantee the accuracy, quality, safety, or legality of any property listed on the App. Users are
            responsible for conducting their own due diligence, including verifying property details and inspecting
            properties before entering into agreements.
          </p>

          <h4 className="font-medium text-gray-900 mb-2">3.3. Transactions:</h4>
          <p className="mb-3">
            The App serves as a platform to connect landlords and tenants. Any agreements, contracts, or transactions
            between users are solely between the landlord and tenant. We are not a party to such agreements and bear no
            responsibility for disputes, damages, or issues arising from them.
          </p>

          <h4 className="font-medium text-gray-900 mb-2">3.4. Fees and Payments:</h4>
          <p className="mb-4">
            Listing properties and searching for properties on the App is currently free. We reserve the right to
            introduce fees for certain services in the future, with prior notice to users.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">4. Contact Information</h3>
          <p className="mb-4">
            For questions or concerns about these Terms or the App, please contact us at kwamastende@gmail.com
          </p>

          <p className="text-sm text-gray-600 mt-8 p-4 bg-gray-50 rounded-lg">
            By using the KwaMastende App, you acknowledge that you have read, understood, and agree to be bound by these
            Terms and Conditions.
          </p>
        </div>
      </div>
    </div>
  )
}
