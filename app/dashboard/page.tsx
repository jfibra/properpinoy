"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Building2, CreditCard } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [credits, setCredits] = useState<number | null>(null)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    } else if (user) {
      loadUserCredits()
    }
  }, [user, loading, router])

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back!</h1>
          <p className="text-muted-foreground mt-2">Manage your property listings and track your performance</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/properties/create">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Create New Listing</CardTitle>
                  <div className="p-2 bg-emerald-100 rounded-full">
                    <Plus className="h-5 w-5 text-emerald-600" />
                  </div>
                </div>
                <CardDescription>Add a new property to your portfolio</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {credits !== null && credits > 0 ? `${credits} credits available` : "No credits remaining"}
                </p>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/dashboard/properties">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">My Properties</CardTitle>
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Building2 className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <CardDescription>View and manage your listings</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Manage your portfolio</p>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/dashboard/credits">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Credits & Billing</CardTitle>
                  <div className="p-2 bg-orange-100 rounded-full">
                    <CreditCard className="h-5 w-5 text-orange-600" />
                  </div>
                </div>
                <CardDescription>Manage your credits and billing</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{credits || 0} credits remaining</p>
              </CardContent>
            </Link>
          </Card>
        </div>

        {/* Stats */}
        <div className="mb-8">
          <DashboardStats userId={user.id} />
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <RecentActivity userId={user.id} />

          <Card>
            <CardHeader>
              <CardTitle>Quick Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-emerald-50 rounded-lg">
                <h4 className="font-medium text-emerald-800 mb-2">Optimize Your Listings</h4>
                <p className="text-sm text-emerald-700">
                  Add high-quality photos and detailed descriptions to attract more buyers.
                </p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">Manage Your Credits</h4>
                <p className="text-sm text-blue-700">
                  Each listing costs 1 credit. Monitor your usage and purchase more when needed.
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-medium text-purple-800 mb-2">Track Performance</h4>
                <p className="text-sm text-purple-700">Monitor views and engagement to understand what works best.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
