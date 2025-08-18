"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Eye, EyeOff, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "./auth-provider"

const MySwal = withReactContent(Swal)

export function SignupForm() {
  // All hooks must be declared before any conditional return
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [fullName, setFullName] = useState("") // For backward compatibility, but will be derived
  const [phone, setPhone] = useState("")
  const [company, setCompany] = useState("")
  const [role, setRole] = useState<"agent" | "developer">("agent")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { signUp, resendConfirmation } = useAuth()

  // Password requirements
  const passwordChecks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

  setError("")

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setLoading(false);
      await MySwal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter a valid email address.",
      });
      setError("Please enter a valid email address.");
      return;
    }

    // Password requirements

    if (!passwordChecks.length || !passwordChecks.uppercase || !passwordChecks.number) {
      setLoading(false);
      await MySwal.fire({
        icon: "error",
        title: "Weak Password",
        text: "Password must be at least 8 characters, contain an uppercase letter, and a number.",
      });
      setError("Password must be at least 8 characters, contain an uppercase letter, and a number.");
      return;
    }

  const fullNameValue = `${firstName} ${lastName}`.trim();
  setFullName(fullNameValue);
  const { error } = await signUp(email, password, fullNameValue, role, phone, company, firstName, lastName)


    if (error) {
      setError(error.message)
      await MySwal.fire({
        icon: "error",
        title: "Signup Failed",
        text: error.message || "An error occurred during signup.",
      });
    } else {
      setSuccess(true)
      await MySwal.fire({
        icon: "success",
        title: "Signup Successful!",
        text: "We've sent you a confirmation link. Please check your email to activate your account.",
      });
    }

    setLoading(false)
  }

  const handleResendConfirmation = async () => {
    setResendLoading(true)
    const { error } = await resendConfirmation(email)

    if (error) {
      setError(error.message)
    } else {
      setError("")
      // Show success message or update UI
    }

    setResendLoading(false)
  }

  if (success) {
    return (
      <>
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-emerald-600">Check Your Email</CardTitle>
            <CardDescription>
              We've sent you a confirmation link. Please check your email to activate your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">Didn't receive the email? Check your spam folder or</p>
              <Button
                variant="outline"
                onClick={handleResendConfirmation}
                disabled={resendLoading}
                className="w-full bg-transparent"
              >
                {resendLoading ? "Sending..." : "Resend Confirmation Email"}
              </Button>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Link href="/login" className="text-emerald-600 hover:underline block">
                Back to Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </>
    );
  }

  return (
    <>
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-emerald-600">Join ProperPinoy</CardTitle>
          <CardDescription>Create your account and get 5 free listings</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}


            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your first name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your last name"
                required
              />
            </div>

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
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  required
                  minLength={8}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <div className="flex flex-col gap-1 mt-2 text-xs">
                <div className="flex items-center gap-1">
                  {passwordChecks.length ? <CheckCircle className="text-emerald-600" size={16} /> : <XCircle className="text-gray-400" size={16} />}
                  <span>At least 8 characters</span>
                </div>
                <div className="flex items-center gap-1">
                  {passwordChecks.uppercase ? <CheckCircle className="text-emerald-600" size={16} /> : <XCircle className="text-gray-400" size={16} />}
                  <span>Contains an uppercase letter</span>
                </div>
                <div className="flex items-center gap-1">
                  {passwordChecks.number ? <CheckCircle className="text-emerald-600" size={16} /> : <XCircle className="text-gray-400" size={16} />}
                  <span>Contains a number</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Company (Optional)</Label>
              <Input
                id="company"
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Your company name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">I am a</Label>
              <Select value={role} onValueChange={(value: "agent" | "developer") => setRole(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="agent">Real Estate Agent</SelectItem>
                  <SelectItem value="developer">Property Developer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={loading}>
              {loading ? "Creating account..." : "Create Account"}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-emerald-600 hover:underline">
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
