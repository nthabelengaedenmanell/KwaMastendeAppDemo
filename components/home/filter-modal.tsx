"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface FilterModalProps {
  filters: {
    minPrice: string
    maxPrice: string
    bedrooms: string
    bathrooms: string
    township: string
  }
  onFiltersChange: (filters: any) => void
  onClose: () => void
}

export function FilterModal({ filters, onFiltersChange, onClose }: FilterModalProps) {
  const handleFilterChange = (key: string, value: string) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const clearFilters = () => {
    onFiltersChange({
      minPrice: "",
      maxPrice: "",
      bedrooms: "",
      bathrooms: "",
      township: "",
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
      <div className="bg-white w-full rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Filters</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-3">Price Range (R)</Label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Input
                  type="number"
                  placeholder="Min price"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <Input
                  type="number"
                  placeholder="Max price"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-3">Bedrooms</Label>
            <Input
              type="number"
              placeholder="Minimum bedrooms"
              value={filters.bedrooms}
              onChange={(e) => handleFilterChange("bedrooms", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-3">Bathrooms</Label>
            <Input
              type="number"
              placeholder="Minimum bathrooms"
              value={filters.bathrooms}
              onChange={(e) => handleFilterChange("bathrooms", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-3">Township</Label>
            <Input
              type="text"
              placeholder="Search township"
              value={filters.township}
              onChange={(e) => handleFilterChange("township", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <Button onClick={clearFilters} className="flex-1 btn-secondary">
            Clear All
          </Button>
          <Button onClick={onClose} className="flex-1 btn-primary">
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  )
}
