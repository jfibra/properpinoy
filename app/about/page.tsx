import { PublicNav } from "@/components/public/public-nav"
import { Footer } from "@/components/landing/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50">
      <PublicNav />

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About ProperPinoy</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              The Philippines' premier property listing platform connecting real estate professionals with potential
              buyers and renters.
            </p>
          </div>

          {/* Main Content */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                We're revolutionizing the Philippine real estate market by providing a modern, user-friendly platform
                where property professionals can showcase their listings and connect with serious buyers and renters.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our credit-based system ensures quality listings while keeping costs affordable for real estate agents
                and developers across the Philippines.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why Choose Us?</h2>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>5 free property
                  listings to get you started
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Modern, mobile-friendly property showcase
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Direct contact with interested buyers
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Professional dashboard to manage your listings
                </li>
              </ul>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Showcase Your Properties?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Join hundreds of real estate professionals already using ProperPinoy to connect with buyers and renters
              across the Philippines.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                <Link href="/signup">Start Listing Properties</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
