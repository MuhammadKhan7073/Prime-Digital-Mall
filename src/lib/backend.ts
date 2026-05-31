import { supabase, supabaseEnabled } from './supabaseClient'
import type { BusinessSubmission, SubmissionStatus } from '@/store/submissions'

/** 'supabase' = real multi-user backend; 'demo' = browser-local (free static). */
export const backendMode: 'supabase' | 'demo' = supabaseEnabled ? 'supabase' : 'demo'

const TABLE = 'business_submissions'

/** Insert a new business signup (real mode). Returns the new id. */
export async function submitBusinessRemote(
  s: Omit<BusinessSubmission, 'id' | 'status' | 'createdAt'>,
): Promise<string> {
  const c = supabase()
  if (!c) throw new Error('Supabase not configured')
  const id = 'BIZ-' + Math.floor(100000 + Math.random() * 900000)
  const { error } = await c.from(TABLE).insert({
    id,
    vertical: s.vertical,
    category: s.category,
    business_name: s.businessName,
    owner_name: s.ownerName,
    city: s.city,
    phone: s.phone,
    whatsapp: s.whatsapp,
    description: s.description,
    address: s.address ?? null,
    delivery: s.delivery ?? null,
    status: 'pending',
  })
  if (error) throw error
  return id
}

/** Fetch all submissions (real mode), newest first. */
export async function fetchSubmissionsRemote(): Promise<BusinessSubmission[]> {
  const c = supabase()
  if (!c) return []
  const { data, error } = await c.from(TABLE).select('*').order('created_at', { ascending: false })
  if (error) throw error
  return (data ?? []).map((r: Record<string, unknown>) => ({
    id: String(r.id),
    vertical: r.vertical as BusinessSubmission['vertical'],
    category: String(r.category ?? ''),
    businessName: String(r.business_name ?? ''),
    ownerName: String(r.owner_name ?? ''),
    city: String(r.city ?? ''),
    phone: String(r.phone ?? ''),
    whatsapp: String(r.whatsapp ?? ''),
    description: String(r.description ?? ''),
    address: (r.address as string) ?? undefined,
    delivery: (r.delivery as string) ?? undefined,
    status: r.status as SubmissionStatus,
    createdAt: r.created_at ? Date.parse(String(r.created_at)) : 0,
  }))
}

/** Approve/reject a submission (real mode). */
export async function setStatusRemote(id: string, status: SubmissionStatus): Promise<void> {
  const c = supabase()
  if (!c) throw new Error('Supabase not configured')
  const { error } = await c.from(TABLE).update({ status }).eq('id', id)
  if (error) throw error
}
