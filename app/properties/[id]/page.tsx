"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Bed, Bath, Square, Eye, Calendar, User, Building, Heart, Share2, ArrowLeft } from "lucide-react"
import { PublicNav } from "@/components/public/public-nav"
import { PropertyGallery } from "@/components/public/property-gallery"
import { ContactForm } from "@/components/public/contact-form"
import { supabase } from "@/lib/supabase"
import type { Property, Profile } from "@/lib/supabase"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"

export default function PropertyDetailPage() {
  const params = useParams()
  const [property, setProperty] = useState<Property | null>(null)
  const [agent, setAgent] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (params.id) {
      fetchProperty(params.id as string)
    }
  }, [params.id])

  const fetchProperty = async (id: string) => {
    try {
      // Fetch property details
      const { data: propertyData, error: propertyError } = await supabase
        .from("properties")
        .select("*")
        .eq("id", id)
        .eq("status", "active")
        .single()

      if (propertyError) throw propertyError

      setProperty(propertyData)

      // Fetch agent details
      const { data: agentData, error: agentError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", propertyData.user_id)
        .single()

      if (agentError) throw agentError

      setAgent(agentData)

      // Increment view count
      await supabase.rpc("increment_property_views", { property_id: id })
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-100 text-emerald-800"
      case "sold":
        return "bg-red-100 text-red-800"
      case "rented":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <PublicNav />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/4" />
            <div className="h-64 bg-gray-200 rounded" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-32 bg-gray-200 rounded" />
                <div className="h-48 bg-gray-200 rounded" />
              </div>
              <div className="h-96 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-gray-50">
        <PublicNav />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">Property not found or no longer available.</p>
              <Link href="/properties">
                <Button className="mt-4">Browse Properties</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PublicNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/properties">
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <ArrowLeft className="h-4 w-4" />
              Back to Properties
            </Button>
          </Link>
        </div>

        {/* Property Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge className={getStatusColor(property.status)}>
                  {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                </Badge>
                {property.featured && <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>}
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
              <div className="flex items-center gap-1 text-muted-foreground mb-4">
                <MapPin className="h-4 w-4" />
                <span>
                  {property.location}, {property.city}, {property.province}
                </span>
              </div>
              <div className="text-3xl font-bold text-emerald-600">{formatPrice(property.price)}</div>
              <p className="text-muted-foreground capitalize">
                {property.property_type} • For {property.listing_type}
              </p>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Heart className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>

        {/* Property Gallery */}
        <div className="mb-8">
          <PropertyGallery images={property.images} title={property.title} />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Property Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {property.bedrooms && (
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <Bed className="h-5 w-5 text-muted-foreground" />
                        <span className="text-2xl font-bold">{property.bedrooms}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Bedrooms</p>
                    </div>
                  )}
                  {property.bathrooms && (
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <Bath className="h-5 w-5 text-muted-foreground" />
                        <span className="text-2xl font-bold">{property.bathrooms}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Bathrooms</p>
                    </div>
                  )}
                  {property.floor_area && (
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <Square className="h-5 w-5 text-muted-foreground" />
                        <span className="text-2xl font-bold">{property.floor_area}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Floor Area (m²)</p>
                    </div>
                  )}
                  {property.lot_area && (
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <Building className="h-5 w-5 text-muted-foreground" />
                        <span className="text-2xl font-bold">{property.lot_area}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Lot Area (m²)</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            {property.description && (
              <Card>
                <CardHeader>
                  <CardTitle>Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{property.description}</p>
                </CardContent>
              </Card>
            )}

            {/* Features */}
            {property.features.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Features & Amenities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {property.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Property Info */}
            <Card>
              <CardHeader>
                <CardTitle>Property Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Property Type</p>
                    <p className="font-medium capitalize">{property.property_type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Listing Type</p>
                    <p className="font-medium capitalize">For {property.listing_type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Views</p>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{property.views}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Listed</p>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">
                        {formatDistanceToNow(new Date(property.created_at), { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Agent Info */}
            {agent && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-emerald-600" />
                    Listed by
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium">{agent.full_name || "Agent"}</p>
                      <p className="text-sm text-muted-foreground capitalize">{agent.role}</p>
                      {agent.company && <p className="text-sm text-muted-foreground">{agent.company}</p>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Contact Form */}
            <ContactForm
              property={property}
              agentInfo={
                agent
                  ? {
                      name: agent.full_name || "Agent",
                      email: agent.email,
                      phone: agent.phone || undefined,
                    }
                  : undefined
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
}
