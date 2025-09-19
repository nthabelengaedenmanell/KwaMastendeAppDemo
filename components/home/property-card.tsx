"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface Property {
  id: number
  title: string
  description: string
  bedrooms: number
  bathrooms: number
  monthly_rent: number
  deposit_amount: number
  province: string
  township: string
  street_address: string
  landlord_name: string
  landlord_phone: string
  landlord_email: string
  features: string[]
  images: string[]
}

interface PropertyCardProps {
  property: Property
  onViewProperty?: (property: Property) => void
}

export function PropertyCard({ property, onViewProperty }: PropertyCardProps) {
  const [showShareModal, setShowShareModal] = useState(false)

  const handleCall = () => {
    window.location.href = `tel:${property.landlord_phone}`
  }

  const handleViewProperty = () => {
    console.log("[v0] View Property clicked for:", property.title)
    if (onViewProperty) {
      onViewProperty(property)
    }
  }

  const generateShareMessage = () => {
    return `🏠 ${property.title}

📍 Location: ${property.street_address}, ${property.township}, ${property.province}
🛏️ ${property.bedrooms} Bedrooms, 🚿 ${property.bathrooms} Bathrooms
💰 Monthly Rent: R${property.monthly_rent?.toLocaleString()}
💳 Deposit: R${property.deposit_amount?.toLocaleString()}

${property.description}

📱 Download the KwaMastende app now on Google Play Store`
  }

  const handleShare = (platform: string) => {
    const message = generateShareMessage()
    const encodedMessage = encodeURIComponent(message)

    switch (platform) {
      case "whatsapp":
        window.open(`https://wa.me/?text=${encodedMessage}`, "_blank")
        break
      case "email":
        window.location.href = `mailto:?subject=${encodeURIComponent(property.title)}&body=${encodedMessage}`
        break
      case "sms":
        window.location.href = `sms:?body=${encodedMessage}`
        break
      case "copy":
        navigator.clipboard.writeText(message)
        alert("Property details copied to clipboard!")
        break
    }
    setShowShareModal(false)
  }

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="relative">
          <div className="aspect-[4/3] relative">
            <img
              src={property.images?.[0] || "/placeholder.svg"}
              alt={property.title}
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => setShowShareModal(true)}
              className="absolute top-3 right-3 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{property.title}</h3>

          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-1 text-gray-600 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2V7z"
                />
              </svg>
              <span>{property.bedrooms} bed</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                />
              </svg>
              <span>{property.bathrooms} bath</span>
            </div>
          </div>

          <div className="mb-3">
            <div className="text-2xl font-bold text-gray-900 mb-1">
              R{(property.monthly_rent || 0).toLocaleString()}/month
            </div>
            <div className="text-sm text-gray-600">Deposit: R{(property.deposit_amount || 0).toLocaleString()}</div>
          </div>

          <div className="mb-4">
            <p className="text-gray-700 text-sm">{property.street_address}</p>
            <p className="text-gray-500 text-xs">
              {property.township}, {property.province}
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleCall}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-xl font-medium"
            >
              <div className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>Call</span>
              </div>
            </Button>
            <Button onClick={handleViewProperty} className="flex-1 btn-primary py-2 px-4 rounded-xl">
              <div className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                <span>View Property</span>
              </div>
            </Button>
          </div>
        </div>
      </div>

      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Share Property</h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleShare("whatsapp")}
                className="flex items-center gap-3 p-3 bg-green-50 hover:bg-green-100 rounded-xl transition-colors"
              >
                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                </svg>
                <span className="text-green-600 font-medium">WhatsApp</span>
              </button>
              <button
                onClick={() => handleShare("email")}
                className="flex items-center gap-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
              >
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-blue-600 font-medium">Email</span>
              </button>
              <button
                onClick={() => handleShare("sms")}
                className="flex items-center gap-3 p-3 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors"
              >
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <span className="text-purple-600 font-medium">Message</span>
              </button>
              <button
                onClick={() => handleShare("copy")}
                className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-gray-600 font-medium">Copy</span>
              </button>
            </div>
            <button
              onClick={() => setShowShareModal(false)}
              className="w-full mt-4 py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  )
}
