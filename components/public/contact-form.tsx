"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Phone, Mail, MessageSquare } from "lucide-react"
import type { Property } from "@/lib/supabase"

interface ContactFormProps {
  property: Property
  agentInfo?: {
    name: string
    email: string
    phone?: string
  }
}

export function ContactForm({ property, agentInfo }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: `Hi, I'm interested in "${property.title}". Please contact me with more information.`,
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setSuccess(true)
    setLoading(false)

    // Reset form after 3 seconds
    setTimeout(() => {
      setSuccess(false)
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: `Hi, I'm interested in "${property.title}". Please contact me with more information.`,
      })
    }, 3000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-emerald-600" />
          Contact Agent
        </CardTitle>
        <CardDescription>Get in touch about this property</CardDescription>
      </CardHeader>
      <CardContent>
        {success ? (
          <Alert className="border-emerald-200 bg-emerald-50 text-emerald-800">
            <AlertDescription>Thank you for your inquiry! The agent will contact you soon.</AlertDescription>
          </Alert>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Your full name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="Your phone number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                placeholder="Your message..."
                rows={4}
                required
              />
            </div>

            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </form>
        )}

        {/* Agent Contact Info */}
        {agentInfo && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="font-medium mb-3">Direct Contact</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a href={`mailto:${agentInfo.email}`} className="text-emerald-600 hover:underline">
                  {agentInfo.email}
                </a>
              </div>
              {agentInfo.phone && (
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <a href={`tel:${agentInfo.phone}`} className="text-emerald-600 hover:underline">
                    {agentInfo.phone}
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
