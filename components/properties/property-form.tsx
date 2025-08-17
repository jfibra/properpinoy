"use client"

import type React from "react"

import type { ReactElement } from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"
import { supabase } from "@/lib/supabase"
import type { Property } from "@/lib/supabase"

interface PropertyFormProps {
  property?: Property
  onSuccess?: () => void
}

export function PropertyForm({ property, onSuccess }: PropertyFormProps): ReactElement {
  const { user } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [credits, setCredits] = useState<number | null>(null)

  const [formData, setFormData] = useState({
    title: property?.title || "",
    description: property?.description || "",
    price: property?.price?.toString() || "",
    location: property?.location || "",
  })

  useState(() => {
    if (user) {
      loadUserCredits()
    }
  }, [user])

  const loadUserCredits = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase.from("credits").select("credits_available").eq("user_id", user.id).single()

      if (error) throw error
      setCredits(data?.credits_available || 0)
    } catch (err) {
      console.error("Error loading credits:", err)
      setCredits(0)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    if (!property && (credits === null || credits < 1)) {
      setError("Insufficient credits. You need at least 1 credit to create a property listing.")
      return
    }

    setLoading(true)
    setError("")

    try {
      const propertyData = {
        title: formData.title,
        description: formData.description,
        price: Number.parseFloat(formData.price),
        location: formData.location,
        user_id: user.id,
        status: "active",
      }

      let result
      if (property) {
        // Update existing property
        result = await supabase.from("properties").update(propertyData).eq("id", property.id).select()
      } else {
        // Create new property
        result = await supabase.from("properties").insert([propertyData]).select()

        if (result.data && result.data[0]) {
          const dummyPhotos = [
            `/placeholder.svg?height=400&width=600&query=modern-house-exterior`,
            `/placeholder.svg?height=400&width=600&query=house-interior-living-room`,
            `/placeholder.svg?height=400&width=600&query=house-kitchen-modern`,
          ]

          const photoInserts = dummyPhotos.map((url) => ({
            property_id: result.data[0].id,
            photo_url: url,
          }))

          await supabase.from("property_photos").insert(photoInserts)

          if (credits !== null) {
            await supabase
              .from("credits")
              .update({
                credits_available: credits - 1,
                credits_used:
                  (await supabase.from("credits").select("credits_used").eq("user_id", user.id).single()).data
                    ?.credits_used + 1 || 1,
              })
              .eq("user_id", user.id)
          }
        }
      }

      if (result.error) throw result.error

      onSuccess?.()
      router.push("/dashboard/properties")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-emerald-600">
          {property ? "Edit Property" : "Create New Property Listing"}
        </CardTitle>
        <CardDescription>
          {property ? "Update your property details" : `You have ${credits || 0} credits remaining`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {!property && (credits === null || credits < 1) && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                You don't have enough credits to create a new listing. Contact support to purchase more credits.
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Property Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="e.g., Beautiful 3BR House in Makati"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Describe your property..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price (PHP)</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                placeholder="0"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder="City, Province"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700"
              disabled={loading || (!property && (credits === null || credits < 1))}
            >
              {loading ? "Saving..." : property ? "Update Property" : "Create Listing"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
