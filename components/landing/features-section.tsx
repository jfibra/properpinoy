"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Search, CreditCard, Users, Building2, Zap } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Verified Listings",
    description: "All properties are verified by our team to ensure authenticity and quality.",
    color: "text-emerald-600",
    bgColor: "bg-emerald-100",
  },
  {
    icon: Search,
    title: "Advanced Search",
    description: "Find properties with powerful filters by location, price, type, and amenities.",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    icon: CreditCard,
    title: "Credit System",
    description: "Fair and transparent pricing with credits. Get 5 free listings when you sign up.",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    icon: Users,
    title: "Trusted Agents",
    description: "Connect with verified real estate professionals and property developers.",
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
  {
    icon: Building2,
    title: "All Property Types",
    description: "Houses, condos, lots, commercial spaces - find any type of property you need.",
    color: "text-teal-600",
    bgColor: "bg-teal-100",
  },
  {
    icon: Zap,
    title: "Instant Notifications",
    description: "Get notified immediately when new properties match your criteria.",
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
  },
]

export function FeaturesSection() {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Why Choose ProperPinoy?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We provide the most comprehensive and trusted platform for property listings in the Philippines
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card key={feature.title} className="hover:shadow-lg transition-shadow border-0 shadow-md">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4`}>
                    <Icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
