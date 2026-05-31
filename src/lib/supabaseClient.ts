import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

/** True when Supabase env vars are set → the app runs in real multi-user mode. */
export const supabaseEnabled = Boolean(url && anon)

let client: SupabaseClient | null = null

/** Lazily create the Supabase client; null when not configured (demo mode). */
export function supabase(): SupabaseClient | null {
  if (!supabaseEnabled) return null
  if (!client) client = createClient(url as string, anon as string)
  return client
}
