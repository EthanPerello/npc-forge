// src/lib/supabase-client.ts
import { createClient } from '@supabase/supabase-js'

// Environment variables (add these to your .env.local)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables not found. Storage features will be disabled.')
}

// Create Supabase client with auth integration
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      }
    })
  : null

// Storage bucket configuration
export const STORAGE_CONFIG = {
  BUCKET_NAME: 'character-portraits',
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  QUALITY_SETTINGS: {
    thumbnail: { width: 256, quality: 0.7 },
    display: { width: 512, quality: 0.8 },
    full: { width: 1024, quality: 0.9 }
  }
} as const

// Helper to check if Supabase is available
export function isSupabaseAvailable(): boolean {
  return !!supabase
}

// Helper to get authenticated user for storage operations
export async function getStorageUser() {
  if (!supabase) return null
  
  try {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  } catch (error) {
    console.warn('Failed to get authenticated user:', error)
    return null
  }
}