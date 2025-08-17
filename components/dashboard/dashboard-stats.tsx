"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Eye, CreditCard, TrendingUp } from "lucide-react"
import { supabase } from "@/lib/supabase"

interface DashboardStatsProps {
  userId?: string
}

export function DashboardStats({ userId }: DashboardStatsProps) {
  const [stats, setStats] = useState({
    totalProperties: 0,
    activeProperties: 0,
    totalViews: 0,
    creditsAvailable: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (userId) {
      fetchStats()
    }
  }, [userId])

  const fetchStats = async () => {
    if (!userId) return

    try {
      const { data: properties, error: propertiesError } = await supabase
        .from("properties")
        .select("status")
        .eq("user_id", userId)

      if (propertiesError) throw propertiesError

      const { data: credits, error: creditsError } = await supabase
        .from("credits")
        .select("credits_available")
        .eq("user_id", userId)
        .single()

      if (creditsError) throw creditsError

      const totalProperties = properties?.length || 0
      const activeProperties = properties?.filter((p) => p.status === "active").length || 0
      const creditsAvailable = credits?.credits_available || 0

      setStats({
        totalProperties,
        activeProperties,
        totalViews: 0, // Not tracking views yet
        creditsAvailable,
      })
    } catch (error) {
      console.error("Error fetching stats:", error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: "Total Properties",
      value: stats.totalProperties,
      icon: Building2,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Active Listings",
      value: stats.activeProperties,
      icon: TrendingUp,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
    },
    {
      title: "Total Views",
      value: stats.totalViews,
      icon: Eye,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Credits Available",
      value: stats.creditsAvailable,
      icon: CreditCard,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ]

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-gray-200 rounded mb-2" />
              <div className="h-8 bg-gray-200 rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <div className={`p-2 rounded-full ${stat.bgColor}`}>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value.toLocaleString()}</div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
