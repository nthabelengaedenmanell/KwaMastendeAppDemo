import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center gap-3">
          <Link href="/auth/signup" className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <h1 className="text-lg font-semibold text-gray-900">Terms and Conditions</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 max-w-4xl mx-auto">
        <div className="prose prose-sm max-w-none">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Terms and Conditions</h1>

          <p className="text-sm text-gray-600 mb-6">Last updated: January 2025</p>

          <div className="space-y-6 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing and using the KwaMastende App ("the App"), you accept and agree to be bound by the terms
                and provision of this agreement. If you do not agree to abide by the above, please do not use this
                service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Description of Service</h2>
              <p>
                KwaMastende is a property rental platform that connects property seekers with landlords and property
                managers in South Africa. The App provides a platform for listing, searching, and facilitating rental
                property transactions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">3. User Accounts</h2>
              <p>
                To access certain features of the App, you must register for an account. You are responsible for
                maintaining the confidentiality of your account credentials and for all activities that occur under your
                account.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Property Listings</h2>
              <p>
                Property owners and authorized agents may list properties on the platform. All listings must be
                accurate, current, and comply with applicable laws. KwaMastende reserves the right to remove any listing
                that violates these terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">5. User Conduct</h2>
              <p>
                Users agree not to use the App for any unlawful purpose or in any way that could damage, disable, or
                impair the service. Prohibited activities include but are not limited to:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Posting false or misleading information</li>
                <li>Harassing other users</li>
                <li>Attempting to gain unauthorized access to the system</li>
                <li>Using the service for commercial purposes without authorization</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Privacy and Data Protection</h2>
              <p>
                Your privacy is important to us. Our Privacy Policy, which is incorporated into these Terms by
                reference, explains how we collect, use, and protect your information when you use our service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Intellectual Property</h2>
              <p>
                The App and its original content, features, and functionality are owned by KwaMastende and are protected
                by international copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Disclaimers</h2>
              <p>
                KwaMastende acts as a platform connecting property seekers with property owners. We do not guarantee the
                accuracy of property listings or the reliability of users. All rental agreements are between the tenant
                and landlord.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Limitation of Liability</h2>
              <p>
                KwaMastende shall not be liable for any indirect, incidental, special, consequential, or punitive
                damages resulting from your use of the App or any property rental transactions facilitated through the
                platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of South Africa, without
                regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">11. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. We will notify users of any material changes via
                email or through the App. Continued use of the service after changes constitutes acceptance of the new
                Terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">12. Contact Information</h2>
              <p>If you have any questions about these Terms and Conditions, please contact us at:</p>
              <div className="mt-2">
                <p>Email: legal@kwamastende.co.za</p>
                <p>Phone: +27 11 123 4567</p>
                <p>Address: 123 Main Street, Johannesburg, 2000, South Africa</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
