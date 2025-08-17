import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database
export interface UserProfile {
  id: string
  email: string
  full_name?: string
  phone?: string
  company?: string
  role: "agent" | "developer" | "admin"
  credits: number
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface Property {
  id: string
  user_id: string
  title: string
  description?: string
  property_type: "house" | "condo" | "lot" | "commercial" | "apartment"
  listing_type: "sale" | "rent"
  price: number
  location: string
  city: string
  province: string
  bedrooms?: number
  bathrooms?: number
  floor_area?: number
  lot_area?: number
  images: string[]
  features: string[]
  status: "active" | "sold" | "rented" | "inactive"
  featured: boolean
  views: number
  created_at: string
  updated_at: string
}

export interface CreditTransaction {
  id: string
  user_id: string
  property_id?: string
  transaction_type: "deduct" | "add" | "refund"
  amount: number
  reason?: string
  created_at: string
}

export interface Inquiry {
  id: string
  property_id: string
  user_id?: string
  name: string
  email: string
  phone?: string
  message?: string
  status: string
  created_at: string
}
