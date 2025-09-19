"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ListPropertyPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    whatsappNumber: "",
    email: "",
    streetAddress: "",
    city: "",
    suburb: "",
    province: "",
    areaCode: "",
    bedrooms: "",
    bathrooms: "",
    propertyType: "",
    monthlyRent: "",
    depositAmount: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/submit-property-listing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push("/list-property/confirmation")
      } else {
        alert("Failed to submit property listing. Please try again.")
      }
    } catch (error) {
      alert("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link href="/auth/login" className="mr-4">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </Link>
          <div className="flex items-center">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Blue_Search_Business_Logo__1_-removebg-preview-y1alAnHTPwrHwRhEKuTcNfe69clSA3.png"
              alt="KwaMastende Logo"
              className="w-8 h-8 mr-3"
            />
            <h1 className="text-2xl font-bold text-gray-900">List Your Property</h1>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">ENTER THE INFO BELOW TO LIST YOUR PROPERTY:</h2>
            <p className="text-gray-600">
              Fill in all the details about your property and we'll contact you within 24 hours.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                    FULL NAME: *
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0500ff] focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <Label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                    PHONE NUMBER: *
                  </Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    required
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0500ff] focus:border-transparent"
                    placeholder="+27 XX XXX XXXX"
                  />
                </div>
                <div>
                  <Label htmlFor="whatsappNumber" className="block text-sm font-medium text-gray-700 mb-2">
                    WHATSAPP NUMBER: *
                  </Label>
                  <Input
                    id="whatsappNumber"
                    type="tel"
                    required
                    value={formData.whatsappNumber}
                    onChange={(e) => handleInputChange("whatsappNumber", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0500ff] focus:border-transparent"
                    placeholder="+27 XX XXX XXXX"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    EMAIL: *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0500ff] focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
            </div>

            {/* Location Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                Location Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <Label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700 mb-2">
                    STREET ADDRESS: *
                  </Label>
                  <Input
                    id="streetAddress"
                    type="text"
                    required
                    value={formData.streetAddress}
                    onChange={(e) => handleInputChange("streetAddress", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0500ff] focus:border-transparent"
                    placeholder="123 Main Street"
                  />
                </div>
                <div>
                  <Label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                    CITY: *
                  </Label>
                  <Input
                    id="city"
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0500ff] focus:border-transparent"
                    placeholder="Johannesburg"
                  />
                </div>
                <div>
                  <Label htmlFor="suburb" className="block text-sm font-medium text-gray-700 mb-2">
                    SUBURB: *
                  </Label>
                  <Input
                    id="suburb"
                    type="text"
                    required
                    value={formData.suburb}
                    onChange={(e) => handleInputChange("suburb", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0500ff] focus:border-transparent"
                    placeholder="Soweto"
                  />
                </div>
                <div>
                  <Label htmlFor="province" className="block text-sm font-medium text-gray-700 mb-2">
                    PROVINCE: *
                  </Label>
                  <Input
                    id="province"
                    type="text"
                    required
                    value={formData.province}
                    onChange={(e) => handleInputChange("province", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0500ff] focus:border-transparent"
                    placeholder="Gauteng"
                  />
                </div>
                <div>
                  <Label htmlFor="areaCode" className="block text-sm font-medium text-gray-700 mb-2">
                    AREA CODE: *
                  </Label>
                  <Input
                    id="areaCode"
                    type="text"
                    required
                    value={formData.areaCode}
                    onChange={(e) => handleInputChange("areaCode", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0500ff] focus:border-transparent"
                    placeholder="1804"
                  />
                </div>
              </div>
            </div>

            {/* Property Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                Property Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-2">
                    NO OF BEDROOMS: *
                  </Label>
                  <Input
                    id="bedrooms"
                    type="number"
                    min="1"
                    required
                    value={formData.bedrooms}
                    onChange={(e) => handleInputChange("bedrooms", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0500ff] focus:border-transparent"
                    placeholder="2"
                  />
                </div>
                <div>
                  <Label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700 mb-2">
                    NO OF BATHROOMS: *
                  </Label>
                  <Input
                    id="bathrooms"
                    type="number"
                    min="1"
                    required
                    value={formData.bathrooms}
                    onChange={(e) => handleInputChange("bathrooms", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0500ff] focus:border-transparent"
                    placeholder="1"
                  />
                </div>
                <div>
                  <Label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-2">
                    Type of Property: *
                  </Label>
                  <Select
                    value={formData.propertyType}
                    onValueChange={(value) => handleInputChange("propertyType", value)}
                  >
                    <SelectTrigger className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0500ff] focus:border-transparent">
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartment">APARTMENT</SelectItem>
                      <SelectItem value="room">ROOM</SelectItem>
                      <SelectItem value="flat">FLAT</SelectItem>
                      <SelectItem value="house">HOUSE</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Pricing Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                Pricing Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="monthlyRent" className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Rent AMOUNT PER MONTH: R *
                  </Label>
                  <Input
                    id="monthlyRent"
                    type="number"
                    min="0"
                    required
                    value={formData.monthlyRent}
                    onChange={(e) => handleInputChange("monthlyRent", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0500ff] focus:border-transparent"
                    placeholder="3500"
                  />
                </div>
                <div>
                  <Label htmlFor="depositAmount" className="block text-sm font-medium text-gray-700 mb-2">
                    Deposit AMOUNT: R *
                  </Label>
                  <Input
                    id="depositAmount"
                    type="number"
                    min="0"
                    required
                    value={formData.depositAmount}
                    onChange={(e) => handleInputChange("depositAmount", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0500ff] focus:border-transparent"
                    placeholder="3500"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <Button type="submit" disabled={isSubmitting} className="w-full btn-primary text-lg py-4">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting Property Listing...
                  </>
                ) : (
                  "Submit Property Listing"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
