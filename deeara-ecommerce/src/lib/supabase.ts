import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xrftkldyqorduxbbjpof.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyZnRrbGR5cW9yZHV4YmJqcG9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEwOTY3NDMsImV4cCI6MjA2NjY3Mjc0M30.Tq_fq-pjxvYzsYcNQGWz3kGPNSM8OBnLzH0DjEDhYIQ'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Product { 
  id: string
  name: string
  description: string
  price: number
  currency: string
  images: string[]
  sizes: string[]
  colors: string[]
  category: string
  is_featured: boolean
  is_limited_edition: boolean
  stock_quantity: number
  created_at: string
}

export interface User {
  id: string
  email: string
  full_name: string
  avatar_url?: string
  created_at: string
}

export interface CartItem {
  id: string
  user_id: string
  product_id: string
  quantity: number
  size: string
  color: string
  created_at: string
  product: Product
}

export interface WishlistItem {
  id: string
  user_id: string
  product_id: string
  created_at: string
  product: Product
}

export interface Order {
  id: string
  user_id: string
  status: 'pending' | 'confirmed' | 'packed' | 'shipped' | 'delivered' | 'cancelled'
  payment_status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded'
  tracking_id?: string
  delivery_partner?: string
  total_amount: number
  currency: string
  shipping_address: any
  billing_address: any
  items: any[]
  payment_intent_id?: string
  created_at: string
  updated_at: string
}

export interface Feedback {
  id: string
  name: string
  email: string
  message: string
  rating: number
  created_at: string
} 