import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center gap-3">
          <Link href="/auth/signup" className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <h1 className="text-lg font-semibold text-gray-900">Privacy Policy</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 max-w-4xl mx-auto">
        <div className="prose prose-sm max-w-none">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Privacy Policy</h1>

          <p className="text-sm text-gray-600 mb-6">Last updated: January 2025</p>

          <div className="space-y-6 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Introduction</h2>
              <p>
                KwaMastende ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains
                how we collect, use, disclose, and safeguard your information when you use our mobile application and
                services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Information We Collect</h2>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Personal Information</h3>
              <p>We may collect the following personal information:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Name and contact information (email, phone number)</li>
                <li>Account credentials (username, password)</li>
                <li>Profile information and preferences</li>
                <li>Property search history and saved listings</li>
                <li>Communication records with landlords and other users</li>
              </ul>

              <h3 className="text-lg font-medium text-gray-800 mb-2 mt-4">Technical Information</h3>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Device information (device type, operating system)</li>
                <li>Usage data (app interactions, features used)</li>
                <li>Location data (with your permission)</li>
                <li>Log files and analytics data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">3. How We Use Your Information</h2>
              <p>We use your information to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Provide and maintain our services</li>
                <li>Process your property searches and applications</li>
                <li>Facilitate communication between tenants and landlords</li>
                <li>Send you relevant property listings and updates</li>
                <li>Improve our app and user experience</li>
                <li>Comply with legal obligations</li>
                <li>Prevent fraud and ensure platform security</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Information Sharing</h2>
              <p>We may share your information with:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>
                  <strong>Property owners and agents:</strong> When you express interest in a property
                </li>
                <li>
                  <strong>Service providers:</strong> Third-party companies that help us operate our service
                </li>
                <li>
                  <strong>Legal authorities:</strong> When required by law or to protect our rights
                </li>
                <li>
                  <strong>Business transfers:</strong> In case of merger, acquisition, or sale of assets
                </li>
              </ul>
              <p className="mt-3">We do not sell your personal information to third parties for marketing purposes.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Data Security</h2>
              <p>We implement appropriate security measures to protect your personal information, including:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Encryption of sensitive data</li>
                <li>Secure server infrastructure</li>
                <li>Regular security audits</li>
                <li>Access controls and authentication</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Your Rights (POPIA Compliance)</h2>
              <p>Under the Protection of Personal Information Act (POPIA), you have the right to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Access your personal information</li>
                <li>Correct or update your information</li>
                <li>Delete your personal information</li>
                <li>Object to processing of your information</li>
                <li>Withdraw consent where applicable</li>
                <li>Lodge a complaint with the Information Regulator</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Data Retention</h2>
              <p>
                We retain your personal information for as long as necessary to provide our services and comply with
                legal obligations. Account information is typically retained for the duration of your account plus 7
                years for legal compliance.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Cookies and Tracking</h2>
              <p>
                We use cookies and similar technologies to enhance your experience, analyze usage patterns, and provide
                personalized content. You can control cookie settings through your device preferences.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Third-Party Services</h2>
              <p>
                Our app may contain links to third-party websites or integrate with third-party services. We are not
                responsible for the privacy practices of these external services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Children's Privacy</h2>
              <p>
                Our service is not intended for children under 18. We do not knowingly collect personal information from
                children under 18 years of age.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">11. Changes to Privacy Policy</h2>
              <p>
                We may update this Privacy Policy periodically. We will notify you of any material changes via email or
                through the app. Your continued use constitutes acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">12. Contact Us</h2>
              <p>For privacy-related questions or to exercise your rights, contact us at:</p>
              <div className="mt-2">
                <p>Email: privacy@kwamastende.co.za</p>
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
