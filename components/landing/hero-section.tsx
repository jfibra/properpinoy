"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <div className="relative bg-gradient-to-br from-emerald-50 via-blue-50 to-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-sm font-medium">
                🏠 Premium Property Platform
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Find Your Dream
                <span className="text-emerald-600"> Property</span> in the Philippines
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Connect with trusted real estate agents and developers. Browse thousands of verified properties across
                the Philippines with our premium listing platform.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/properties">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-lg px-8 py-3">
                  Browse Properties
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/signup">
                <Button variant="outline" size="lg" className="text-lg px-8 py-3 bg-transparent">
                  <Play className="mr-2 h-5 w-5" />
                  Get Started Free
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">10K+</div>
                <div className="text-sm text-gray-600">Properties Listed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">500+</div>
                <div className="text-sm text-gray-600">Trusted Agents</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">50+</div>
                <div className="text-sm text-gray-600">Cities Covered</div>
              </div>
            </div>
          </div>

          {/* Hero Illustration */}
          <div className="relative">
            <svg
              viewBox="0 0 400 300"
              className="w-full h-auto max-w-lg mx-auto"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Sky Background */}
              <rect width="400" height="150" fill="url(#skyGradient)" />

              {/* Ground */}
              <rect y="150" width="400" height="150" fill="#10b981" opacity="0.1" />

              {/* Buildings */}
              <rect x="50" y="80" width="60" height="70" fill="#059669" rx="4" />
              <rect x="130" y="60" width="80" height="90" fill="#047857" rx="4" />
              <rect x="230" y="90" width="50" height="60" fill="#065f46" rx="4" />
              <rect x="300" y="70" width="70" height="80" fill="#064e3b" rx="4" />

              {/* Windows */}
              <rect x="60" y="90" width="8" height="8" fill="white" rx="1" />
              <rect x="72" y="90" width="8" height="8" fill="white" rx="1" />
              <rect x="84" y="90" width="8" height="8" fill="white" rx="1" />
              <rect x="96" y="90" width="8" height="8" fill="white" rx="1" />

              <rect x="140" y="75" width="10" height="10" fill="white" rx="1" />
              <rect x="155" y="75" width="10" height="10" fill="white" rx="1" />
              <rect x="170" y="75" width="10" height="10" fill="white" rx="1" />
              <rect x="185" y="75" width="10" height="10" fill="white" rx="1" />

              {/* Trees */}
              <circle cx="30" cy="140" r="15" fill="#22c55e" />
              <rect x="27" y="140" width="6" height="20" fill="#92400e" />

              <circle cx="380" cy="135" r="12" fill="#16a34a" />
              <rect x="377" y="135" width="6" height="18" fill="#92400e" />

              {/* Clouds */}
              <circle cx="80" cy="40" r="12" fill="white" opacity="0.8" />
              <circle cx="90" cy="40" r="15" fill="white" opacity="0.8" />
              <circle cx="100" cy="40" r="12" fill="white" opacity="0.8" />

              <circle cx="300" cy="30" r="10" fill="white" opacity="0.6" />
              <circle cx="308" cy="30" r="12" fill="white" opacity="0.6" />
              <circle cx="316" cy="30" r="10" fill="white" opacity="0.6" />

              {/* Sun */}
              <circle cx="350" cy="50" r="20" fill="#fbbf24" opacity="0.8" />

              <defs>
                <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.1" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
