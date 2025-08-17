"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Loader2 } from "lucide-react"

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { data, error } = await supabase.auth.getSession()

      if (error) {
        console.error("Auth callback error:", error)
        router.push("/login?error=callback_error")
        return
      }

      if (data.session) {
        const userRole = data.session.user.user_metadata?.role || "user"

        // Redirect based on role
        if (userRole === "admin") {
          router.push("/admin")
        } else {
          router.push("/dashboard")
        }
      } else {
        router.push("/login")
      }
    }

    handleAuthCallback()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
        <p className="text-muted-foreground">Confirming your account...</p>
      </div>
    </div>
  )
}
