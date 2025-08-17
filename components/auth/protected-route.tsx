"use client"

import type React from "react"

import { useAuth } from "./auth-provider"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Loader2 } from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: "user" | "admin"
  fallbackPath?: string
}

export function ProtectedRoute({ children, requiredRole, fallbackPath = "/login" }: ProtectedRouteProps) {
  const { user, role, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push(fallbackPath)
        return
      }

      if (requiredRole && role !== requiredRole) {
        // Redirect to appropriate dashboard
        if (role === "admin") {
          router.push("/admin")
        } else {
          router.push("/dashboard")
        }
        return
      }
    }
  }, [user, role, loading, router, requiredRole, fallbackPath])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!user || (requiredRole && role !== requiredRole)) {
    return null
  }

  return <>{children}</>
}
