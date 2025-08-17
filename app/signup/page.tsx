import { SignupForm } from "@/components/auth/signup-form"
import { PublicNav } from "@/components/public/public-nav"
import { Footer } from "@/components/landing/footer"

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex flex-col">
      <PublicNav />
      <div className="flex-1 flex items-center justify-center p-4">
        <SignupForm />
      </div>
      <Footer />
    </div>
  )
}
