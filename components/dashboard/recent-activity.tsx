"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDistanceToNow } from "date-fns"
import { CreditCard, Building2 } from "lucide-react"
import { supabase } from "@/lib/supabase"

interface RecentActivityProps {
  userId?: string
}

interface ActivityItem {
  id: string
  type: "credit" | "property" | "view"
  title: string
  description: string
  timestamp: string
  icon: any
  color: string
}

export function RecentActivity({ userId }: RecentActivityProps) {
  const [activities, setActivities] = useState<ActivityItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (userId) {
      fetchRecentActivity()
    }
  }, [userId])

  const fetchRecentActivity = async () => {
    if (!userId) return

    try {
      const { data: transactions, error: transactionsError } = await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(5)

      const { data: properties, error: propertiesError } = await supabase
        .from("properties")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(5)

      if (transactionsError) throw transactionsError
      if (propertiesError) throw propertiesError

      const activityItems: ActivityItem[] = []

      transactions?.forEach((transaction) => {
        activityItems.push({
          id: `credit-${transaction.id}`,
          type: "credit",
          title: `Credit ${transaction.type}`,
          description: `${transaction.credits_added || 0} credit(s) added - ${transaction.type}`,
          timestamp: transaction.created_at,
          icon: CreditCard,
          color: "text-emerald-600",
        })
      })

      // Add property activities
      properties?.forEach((property) => {
        activityItems.push({
          id: `property-${property.id}`,
          type: "property",
          title: "Property Listed",
          description: property.title,
          timestamp: property.created_at,
          icon: Building2,
          color: "text-blue-600",
        })
      })

      // Sort by timestamp
      activityItems.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

      setActivities(activityItems.slice(0, 10))
    } catch (error) {
      console.error("Error fetching recent activity:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4 animate-pulse">
                <div className="w-8 h-8 bg-gray-200 rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        {activities.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">No recent activity</p>
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => {
              const Icon = activity.icon
              return (
                <div key={activity.id} className="flex items-start space-x-4">
                  <div className="p-2 rounded-full bg-gray-100">
                    <Icon className={`h-4 w-4 ${activity.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-sm text-muted-foreground line-clamp-2">{activity.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
