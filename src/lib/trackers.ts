import { env } from '../config/site'
import type { ConsentCategories } from './consent'

/**
 * Los scripts de terceros NO están en index.html: solo se inyectan después de
 * que la persona acepta la categoría correspondiente.
 */
declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    fbq?: ((...args: unknown[]) => void) & { queue?: unknown[]; loaded?: boolean; version?: string }
    _fbq?: unknown
  }
}

const loaded = new Set<string>()

function injectScript(src: string) {
  const script = document.createElement('script')
  script.async = true
  script.src = src
  document.head.appendChild(script)
}

function loadGoogleAnalytics(id: string) {
  if (loaded.has('ga')) return
  loaded.add('ga')
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    // gtag requiere el objeto `arguments`, no un array.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments)
  }
  window.gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'granted',
  })
  window.gtag('js', new Date())
  window.gtag('config', id, { anonymize_ip: true })
  injectScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`)
}

function loadMetaPixel(id: string) {
  if (loaded.has('meta')) return
  loaded.add('meta')
  const fbq = function (...args: unknown[]) {
    fbq.queue!.push(args)
  } as NonNullable<Window['fbq']>
  fbq.queue = []
  fbq.loaded = true
  fbq.version = '2.0'
  window.fbq = fbq
  window._fbq = fbq
  window.fbq('init', id)
  window.fbq('track', 'PageView')
  injectScript('https://connect.facebook.net/en_US/fbevents.js')
}

export function applyConsent(categories: ConsentCategories) {
  if (categories.analytics && env.ga4Id) loadGoogleAnalytics(env.ga4Id)
  if (categories.marketing && env.metaPixelId) loadMetaPixel(env.metaPixelId)
}

export function trackPageView(path: string) {
  window.gtag?.('event', 'page_view', { page_path: path })
  window.fbq?.('track', 'PageView')
}

export function trackEvent(name: string, params: Record<string, string | number> = {}) {
  window.gtag?.('event', name, params)
  window.fbq?.('trackCustom', name, params)
}
