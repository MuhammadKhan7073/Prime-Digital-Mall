'use client'

import { useEffect } from 'react'

/**
 * Registers the service worker (PWA: installable + offline shell).
 * Uses a relative path so it resolves correctly under any base path.
 */
export function PWARegister() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return
    if (window.location.hostname === 'localhost') return // skip in local dev
    const base = process.env.NEXT_PUBLIC_BASE_PATH || ''
    const swUrl = `${base}/sw.js`
    navigator.serviceWorker.register(swUrl, { scope: `${base}/` }).catch(() => {})
  }, [])
  return null
}
