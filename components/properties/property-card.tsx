"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Bed, Bath, Square, Eye, Edit, Trash2 } from "lucide-react"
import type { Property } from "@/lib/supabase"
import Link from "next/link"

interface PropertyCardProps {
  property: Property
  showActions?: boolean
  onEdit?: (property: Property) => void
  onDelete?: (property: Property) => void
}

export function PropertyCard({ property, showActions = false, onEdit, onDelete }: PropertyCardProps) {
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
      case "inactive":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={property.images[0] || "/placeholder.svg?height=200&width=300&query=property"}
          alt={property.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 left-2 flex gap-2">
          <Badge className={getStatusColor(property.status)}>
            {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
          </Badge>
          {property.featured && <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>}
        </div>
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Eye className="h-3 w-3" />
            {property.views}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg line-clamp-2">{property.title}</h3>
            <p className="text-2xl font-bold text-emerald-600">{formatPrice(property.price)}</p>
            <p className="text-sm text-muted-foreground capitalize">
              {property.property_type} • For {property.listing_type}
            </p>
          </div>

          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span className="line-clamp-1">
              {property.location}, {property.city}
            </span>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {property.bedrooms && (
              <div className="flex items-center gap-1">
                <Bed className="h-4 w-4" />
                <span>{property.bedrooms}</span>
              </div>
            )}
            {property.bathrooms && (
              <div className="flex items-center gap-1">
                <Bath className="h-4 w-4" />
                <span>{property.bathrooms}</span>
              </div>
            )}
            {property.floor_area && (
              <div className="flex items-center gap-1">
                <Square className="h-4 w-4" />
                <span>{property.floor_area}m²</span>
              </div>
            )}
          </div>

          {property.description && <p className="text-sm text-muted-foreground line-clamp-2">{property.description}</p>}

          <div className="flex justify-between items-center pt-2">
            <Link href={`/properties/${property.id}`}>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </Link>

            {showActions && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => onEdit?.(property)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => onDelete?.(property)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
