"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "./auth-provider"
import Link from "next/link"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const { signIn } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const message = searchParams.get("message")
  const redirectTo = searchParams.get("redirectTo")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const { error } = await signIn(email, password)

    if (error) {
      setError(error.message)
    } else {
      if (redirectTo) {
        router.push(redirectTo)
      }
    }

    setLoading(false)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-emerald-600">Welcome Back</CardTitle>
        <CardDescription>Sign in to your ProperPinoy account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {message === "password_updated" && (
            <Alert>
              <AlertDescription>Your password has been updated successfully!</AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="text-right">
            <Link href="/auth/forgot-password" className="text-sm text-emerald-600 hover:underline">
              Forgot password?
            </Link>
          </div>

          <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/signup" className="text-emerald-600 hover:underline">
              Sign up
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
