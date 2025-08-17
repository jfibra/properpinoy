import { LoginForm } from "@/components/auth/login-form"
import { PublicNav } from "@/components/public/public-nav"
import { Footer } from "@/components/landing/footer"
import { Suspense } from "react"

function LoginContent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex flex-col">
      <PublicNav />
      <div className="flex-1 flex items-center justify-center p-4">
        <LoginForm />
      </div>
      <Footer />
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  )
}
