"use client"

import { PublicNav } from "@/components/public/public-nav"
import { PropertyList } from "@/components/properties/property-list"

export default function PropertiesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PublicNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Browse Properties</h1>
          <p className="text-muted-foreground mt-2">Find your perfect property in the Philippines</p>
        </div>

        <PropertyList />
      </div>
    </div>
  )
}
