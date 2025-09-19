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

interface PropertyDetailsPageProps {
  property: Property
  onBack: () => void
}

// Mock additional property data
const getPropertyDetails = (property: Property) => ({
  ...property,
  images:
    property.images?.length > 0
      ? property.images
      : [
          "/placeholder.svg",
          "/modern-kitchen-interior.png",
          "/cozy-bedroom.png",
          "/modern-bathroom-interior.png",
          "/cozy-living-room.png",
        ],
  features:
    property.features?.length > 0
      ? property.features
      : [
          "Fully tiled",
          "Built-in cupboards",
          "Secure parking",
          "Garden space",
          "Close to transport",
          "Shopping centers nearby",
        ],
  landlord: {
    name: property.landlord_name || "Property Owner",
    phone: property.landlord_phone || "+27 82 123 4567",
    whatsapp: property.landlord_phone || "+27 82 123 4567",
  },
  description:
    property.description ||
    "Beautiful family home in a safe and secure area. Perfect for families looking for comfort and convenience.",
})

export function PropertyDetailsPage({ property, onBack }: PropertyDetailsPageProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showReportModal, setShowReportModal] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [reportReason, setReportReason] = useState("")
  const propertyDetails = getPropertyDetails(property)

  const handleCall = () => {
    window.location.href = `tel:${propertyDetails.landlord.phone}`
  }

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hi, I'm interested in the ${propertyDetails.bedrooms} bedroom property at ${property.street_address}`,
    )
    window.open(`https://wa.me/${propertyDetails.landlord.whatsapp.replace(/[^0-9]/g, "")}?text=${message}`, "_blank")
  }

  const generateShareMessage = () => {
    return `🏠 ${property.title}

📍 Location: ${property.street_address}, ${property.township}, ${property.province}
🛏️ ${property.bedrooms} Bedrooms, 🚿 ${property.bathrooms} Bathrooms
💰 Monthly Rent: R${property.monthly_rent?.toLocaleString()}
💳 Deposit: R${property.deposit_amount?.toLocaleString()}

${property.description}

✨ Features: ${propertyDetails.features.slice(0, 3).join(", ")}

👤 Contact: ${property.landlord_name}
📞 Phone: ${property.landlord_phone}

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

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % propertyDetails.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + propertyDetails.images.length) % propertyDetails.images.length)
  }

  const handleReport = () => {
    setShowReportModal(true)
  }

  const submitReport = () => {
    const subject = encodeURIComponent(`Report Landlord: ${property.landlord_name}`)
    const body = encodeURIComponent(`
Property: ${property.title}
Landlord: ${property.landlord_name}
Phone: ${property.landlord_phone}
Email: ${property.landlord_email}
Property Address: ${property.street_address}, ${property.township}, ${property.province}

Reason for Report:
${reportReason}

Please investigate this landlord for the reasons stated above.
    `)

    window.location.href = `mailto:kamastende@gmail.com?subject=${subject}&body=${body}`
    setShowReportModal(false)
    setReportReason("")
  }

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-semibold">Property Details</h1>
          <button onClick={() => setShowShareModal(true)} className="p-2 hover:bg-gray-100 rounded-full">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
              />
            </svg>
          </button>
        </div>

        {/* Image Slideshow */}
        <div className="relative aspect-[4/3] bg-gray-100">
          <img
            src={propertyDetails.images[currentImageIndex] || "/placeholder.svg"}
            alt={`Property image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
          />

          {/* Navigation arrows */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Image indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {propertyDetails.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full ${index === currentImageIndex ? "bg-white" : "bg-white/50"}`}
              />
            ))}
          </div>
        </div>

        {/* Property Information */}
        <div className="p-6 space-y-6">
          {/* Basic Details */}
          <div>
            <div className="flex items-center gap-4 mb-3">
              <div className="flex items-center gap-1 text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2V7z"
                  />
                </svg>
                <span className="font-medium">{propertyDetails.bedrooms} Bedrooms</span>
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                  />
                </svg>
                <span className="font-medium">{propertyDetails.bathrooms} Bathrooms</span>
              </div>
            </div>

            <p className="text-gray-700 mb-4">{propertyDetails.description}</p>
          </div>

          {/* Pricing */}
          <div className="bg-gray-50 p-4 rounded-xl">
            <h3 className="font-semibold text-gray-900 mb-3">Pricing</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Monthly Rent:</span>
                <span className="font-semibold text-2xl text-[#0500ff]">
                  R{(property.monthly_rent || 0).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Deposit:</span>
                <span className="font-semibold text-lg">R{(property.deposit_amount || 0).toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Location */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Location</h3>
            <div className="flex items-start gap-2">
              <svg className="w-5 h-5 text-gray-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <div>
                <p className="font-medium text-gray-900">{property.street_address}</p>
                <p className="text-gray-600 text-sm">
                  {property.township}, {property.province}
                </p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Features</h3>
            <div className="grid grid-cols-2 gap-2">
              {propertyDetails.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Landlord Details */}
          <div className="bg-gray-50 p-4 rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Landlord Details</h3>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-900">{propertyDetails.landlord.name}</p>
                <p className="text-gray-600 text-sm">{propertyDetails.landlord.phone}</p>
              </div>
            </div>

            {/* Contact Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={handleCall}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                Call
              </Button>
              <Button
                onClick={handleWhatsApp}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                </svg>
                WhatsApp
              </Button>
            </div>

            <div className="mt-3">
              <Button
                onClick={handleReport}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-2.5 px-4 rounded-xl font-medium flex items-center justify-center gap-2"
              >
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/icons8-warning-96-mbz8mjEzHIxFfK2A2dX04TXWpi6psM.png"
                  alt="Report"
                  className="w-4 h-4"
                />
                Report Landlord
              </Button>
            </div>
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
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
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

      {showReportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/icons8-warning-96-mbz8mjEzHIxFfK2A2dX04TXWpi6psM.png"
                alt="Report"
                className="w-6 h-6"
              />
              <h3 className="text-lg font-semibold text-gray-900">Report Landlord</h3>
            </div>

            <p className="text-gray-600 mb-4">
              Report {property.landlord_name} for inappropriate behavior or violations.
            </p>

            <textarea
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              placeholder="Please describe the reason for reporting this landlord..."
              className="w-full p-3 border border-gray-300 rounded-xl resize-none h-24 mb-4"
              required
            />

            <div className="flex gap-3">
              <Button
                onClick={() => setShowReportModal(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-xl"
              >
                Cancel
              </Button>
              <Button
                onClick={submitReport}
                disabled={!reportReason.trim()}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-xl disabled:opacity-50"
              >
                Submit Report
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
