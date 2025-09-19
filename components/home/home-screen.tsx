"use client"

import { useState } from "react"
import { SearchBar } from "./search-bar"
import { PropertyCard } from "./property-card"
import { BottomNavigation } from "./bottom-navigation"
import { FilterModal } from "./filter-modal"
import { PropertyDetailsPage } from "./property-details-page"
import { HelpScreen } from "../help/help-screen"
import { signOut } from "@/lib/actions"

interface HomeScreenProps {
  user: any
}

const mockProperties = [
  {
    id: 1,
    title: "Modern 2-Bedroom Apartment in Soweto",
    description:
      "Beautiful modern apartment with updated kitchen and bathroom. Close to transport and shopping centers.",
    bedrooms: 2,
    bathrooms: 1,
    monthly_rent: 3500,
    deposit_amount: 3500,
    province: "Gauteng",
    township: "Soweto",
    street_address: "123 Vilakazi Street, Orlando West",
    landlord_name: "John Mthembu",
    landlord_phone: "+27 82 123 4567",
    landlord_email: "john.mthembu@email.com",
    features: ["Modern Kitchen", "Secure Parking", "Garden", "Close to Transport"],
    images: ["/soweto-apartment-exterior.png", "/modern-kitchen-interior.png", "/cozy-bedroom.png"],
  },
  {
    id: 2,
    title: "Spacious 3-Bedroom House in Alexandra",
    description: "Family home with large yard, perfect for children. Recently renovated with modern fixtures.",
    bedrooms: 3,
    bathrooms: 2,
    monthly_rent: 4200,
    deposit_amount: 4200,
    province: "Gauteng",
    township: "Alexandra",
    street_address: "45 Roosevelt Street, Alexandra",
    landlord_name: "Sarah Ndlovu",
    landlord_phone: "+27 83 987 6543",
    landlord_email: "sarah.ndlovu@email.com",
    features: ["Large Yard", "Recently Renovated", "Family Friendly", "Safe Neighborhood"],
    images: ["/alexandra-house-exterior.png", "/cozy-living-room.png", "/family-backyard.png"],
  },
  {
    id: 3,
    title: "Affordable 1-Bedroom Flat in Tembisa",
    description: "Cozy one-bedroom flat ideal for young professionals. Walking distance to taxi rank.",
    bedrooms: 1,
    bathrooms: 1,
    monthly_rent: 2800,
    deposit_amount: 2800,
    province: "Gauteng",
    township: "Tembisa",
    street_address: "78 Makoma Street, Tembisa",
    landlord_name: "Peter Sibeko",
    landlord_phone: "+27 84 555 7890",
    landlord_email: "peter.sibeko@email.com",
    features: ["Close to Transport", "Affordable", "Young Professional Friendly"],
    images: ["/tembisa-flat-exterior.png", "/cozy-bedroom.png", "/compact-kitchen.png"],
  },
  {
    id: 4,
    title: "Beautiful 2-Bedroom in Khayelitsha",
    description:
      "Well-maintained property with stunning mountain views. Includes built-in cupboards and modern appliances.",
    bedrooms: 2,
    bathrooms: 1,
    monthly_rent: 3200,
    deposit_amount: 3200,
    province: "Western Cape",
    township: "Khayelitsha",
    street_address: "12 Mandela Avenue, Site C",
    landlord_name: "Nomsa Jacobs",
    landlord_phone: "+27 21 123 4567",
    landlord_email: "nomsa.jacobs@email.com",
    features: ["Mountain Views", "Built-in Cupboards", "Modern Appliances", "Well Maintained"],
    images: ["/khayelitsha-house-exterior.png", "/mountain-view-living.png", "/modern-kitchen-interior.png"],
  },
  {
    id: 5,
    title: "Family Home in Mamelodi",
    description: "Large 4-bedroom family home with double garage. Perfect for growing families.",
    bedrooms: 4,
    bathrooms: 2,
    monthly_rent: 5500,
    deposit_amount: 5500,
    province: "Gauteng",
    township: "Mamelodi",
    street_address: "89 Stanza Bopape Street, Mamelodi West",
    landlord_name: "David Mashaba",
    landlord_phone: "+27 82 777 8888",
    landlord_email: "david.mashaba@email.com",
    features: ["Double Garage", "Large Family Home", "Growing Family", "Secure Area"],
    images: ["/mamelodi-family-home.png", "/spacious-living-room.png", "/double-garage.png"],
  },
  {
    id: 6,
    title: "Luxury 3-Bedroom Townhouse in Sandton",
    description: "Upmarket townhouse in secure complex with swimming pool and 24/7 security. Close to Sandton City.",
    bedrooms: 3,
    bathrooms: 2,
    monthly_rent: 12500,
    deposit_amount: 12500,
    province: "Gauteng",
    township: "Sandton",
    street_address: "15 Rivonia Road, Sandton",
    landlord_name: "Michael Johnson",
    landlord_phone: "+27 11 234 5678",
    landlord_email: "michael.johnson@email.com",
    features: ["Swimming Pool", "24/7 Security", "Upmarket Area", "Close to Shopping"],
    images: ["/sandton-townhouse.png", "/luxury-living-room.png", "/swimming-pool-complex.png"],
  },
  {
    id: 7,
    title: "Student Accommodation in Braamfontein",
    description: "Perfect for students near Wits University. Furnished room with shared kitchen and study areas.",
    bedrooms: 1,
    bathrooms: 1,
    monthly_rent: 3800,
    deposit_amount: 3800,
    province: "Gauteng",
    township: "Braamfontein",
    street_address: "234 Jorrissen Street, Braamfontein",
    landlord_name: "Lisa Patel",
    landlord_phone: "+27 82 456 7890",
    landlord_email: "lisa.patel@email.com",
    features: ["Furnished", "Near University", "Study Areas", "Student Friendly"],
    images: ["/student-accommodation.png", "/study-room.png", "/shared-kitchen.png"],
  },
  {
    id: 8,
    title: "Cozy 2-Bedroom in Gugulethu",
    description: "Warm and welcoming home in established neighborhood. Recently painted with new flooring.",
    bedrooms: 2,
    bathrooms: 1,
    monthly_rent: 2900,
    deposit_amount: 2900,
    province: "Western Cape",
    township: "Gugulethu",
    street_address: "67 NY1 Street, Gugulethu",
    landlord_name: "Thabo Mthembu",
    landlord_phone: "+27 21 987 6543",
    landlord_email: "thabo.mthembu@email.com",
    features: ["Recently Renovated", "Established Area", "Community Friendly", "New Flooring"],
    images: ["/gugulethu-house.png", "/renovated-interior.png", "/community-area.png"],
  },
  {
    id: 9,
    title: "Modern Bachelor Flat in Rosebank",
    description: "Stylish bachelor flat perfect for young professionals. Walking distance to Gautrain station.",
    bedrooms: 1,
    bathrooms: 1,
    monthly_rent: 6500,
    deposit_amount: 6500,
    province: "Gauteng",
    township: "Rosebank",
    street_address: "88 Oxford Road, Rosebank",
    landlord_name: "Jennifer Smith",
    landlord_phone: "+27 11 789 0123",
    landlord_email: "jennifer.smith@email.com",
    features: ["Near Gautrain", "Modern Design", "Professional Area", "Public Transport"],
    images: ["/rosebank-bachelor.png", "/modern-studio.png", "/gautrain-access.png"],
  },
  {
    id: 10,
    title: "Spacious 4-Bedroom in Mitchells Plain",
    description: "Large family home with big garden and braai area. Safe neighborhood with good schools nearby.",
    bedrooms: 4,
    bathrooms: 2,
    monthly_rent: 4800,
    deposit_amount: 4800,
    province: "Western Cape",
    township: "Mitchells Plain",
    street_address: "123 Spine Road, Mitchells Plain",
    landlord_name: "Ahmed Hassan",
    landlord_phone: "+27 21 555 4321",
    landlord_email: "ahmed.hassan@email.com",
    features: ["Large Garden", "Braai Area", "Good Schools", "Family Neighborhood"],
    images: ["/mitchells-plain-house.png", "/large-garden.png", "/braai-area.png"],
  },
]

export function HomeScreen({ user }: HomeScreenProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [activeTab, setActiveTab] = useState("listings")
  const [selectedProperty, setSelectedProperty] = useState<any>(null)
  const [showSignOutModal, setShowSignOutModal] = useState(false)
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
    bathrooms: "",
    township: "",
  })

  const filteredProperties = mockProperties.filter((property) => {
    const matchesSearch =
      property.street_address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.township.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.title.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesFilters =
      (!filters.minPrice || property.monthly_rent >= Number.parseInt(filters.minPrice)) &&
      (!filters.maxPrice || property.monthly_rent <= Number.parseInt(filters.maxPrice)) &&
      (!filters.bedrooms || property.bedrooms >= Number.parseInt(filters.bedrooms)) &&
      (!filters.bathrooms || property.bathrooms >= Number.parseInt(filters.bathrooms)) &&
      (!filters.township || property.township.toLowerCase().includes(filters.township.toLowerCase()))

    return matchesSearch && matchesFilters
  })

  const handleViewProperty = (property: any) => {
    setSelectedProperty(property)
  }

  const handleBackToListings = () => {
    setSelectedProperty(null)
  }

  const handleLogout = async () => {
    await signOut()
  }

  const handlePrivacyPolicy = () => {
    window.location.href = "/auth/privacy"
  }

  const handleTermsConditions = () => {
    window.location.href = "/auth/terms"
  }

  const handleListProperty = () => {
    window.location.href = "https://kwamastende.vercel.app/auth/login"
  }

  if (selectedProperty) {
    return <PropertyDetailsPage property={selectedProperty} onBack={handleBackToListings} />
  }

  if (activeTab === "help") {
    return <HelpScreen activeTab={activeTab} onTabChange={setActiveTab} />
  }

  if (activeTab === "settings") {
    return (
      <div className="min-h-screen pb-20 bg-white">
        <div className="px-6 py-8">
          <h1 className="text-2xl font-bold mb-6 text-gray-900">Settings</h1>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-gray-50 flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold mb-1 text-gray-900">Profile</h3>
                <p className="text-sm text-gray-600">
                  {user?.user_metadata?.full_name || user?.user_metadata?.name || "User"}
                </p>
                <p className="text-xs text-gray-500">
                  {user?.email || user?.user_metadata?.email || "demo@example.com"}
                </p>
              </div>
            </div>
            <div
              onClick={handlePrivacyPolicy}
              className="p-4 rounded-xl cursor-pointer transition-colors bg-gray-50 hover:bg-gray-100 flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold mb-1 text-gray-900">Privacy Policy</h3>
                <p className="text-sm text-gray-600">View our privacy policy and data handling practices</p>
              </div>
            </div>
            <div
              onClick={handleTermsConditions}
              className="p-4 rounded-xl cursor-pointer transition-colors bg-gray-50 hover:bg-gray-100 flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold mb-1 text-gray-900">Terms & Conditions</h3>
                <p className="text-sm text-gray-600">Read our terms of service and usage guidelines</p>
              </div>
            </div>
            <div
              onClick={handleListProperty}
              className="p-4 rounded-xl cursor-pointer transition-colors bg-blue-50 hover:bg-blue-100 flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold mb-1 text-blue-600">List Your Property</h3>
                <p className="text-sm text-blue-500">Add your property to our platform</p>
              </div>
            </div>
            <button
              onClick={() => setShowSignOutModal(true)}
              className="w-full p-4 rounded-xl font-medium transition-colors bg-red-50 text-red-600 hover:bg-red-100 flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-red-600">Sign Out</h3>
              </div>
            </button>
          </div>
        </div>
        {showSignOutModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="rounded-2xl p-6 w-full max-w-sm bg-white">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Sign Out</h3>
              <p className="mb-6 text-gray-600">Are you sure you want to sign out?</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowSignOutModal(false)}
                  className="flex-1 py-3 px-4 rounded-xl font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowSignOutModal(false)
                    handleLogout()
                  }}
                  className="flex-1 py-3 px-4 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}
        <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-20 bg-white">
      <div className="px-6 py-6 border-b border-gray-100 bg-white">
        <div className="flex items-center gap-3 mb-4">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Blue_Search_Business_Logo__1_-removebg-preview-IKf7q9Omyf1aX7kguklamOInGYckW6.png"
            alt="KwaMastende Logo"
            className="w-8 h-8"
          />
          <h1 className="text-2xl font-bold text-gray-900">KwaMastende</h1>
        </div>
        <SearchBar value={searchQuery} onChange={setSearchQuery} onFilterClick={() => setShowFilters(true)} />
      </div>
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-600">{filteredProperties.length} properties found</p>
        </div>
        <div className="space-y-4">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} onViewProperty={handleViewProperty} />
          ))}
        </div>
      </div>
      {showFilters && (
        <FilterModal filters={filters} onFiltersChange={setFilters} onClose={() => setShowFilters(false)} />
      )}
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}
