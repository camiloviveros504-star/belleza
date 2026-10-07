import { site } from '../config/site'

/**
 * Gestión del consentimiento de cookies conforme a la Ley 1581 de 2012 y la
 * guía de la SIC: el consentimiento es previo, expreso, informado y granular.
 * Solo las cookies técnicas (necesarias) se usan sin autorización.
 */
export type ConsentCategories = {
  necessary: true
  analytics: boolean
  marketing: boolean
}

export type ConsentRecord = {
  id: string
  version: string
  date: string
  categories: ConsentCategories
}

const STORAGE_KEY = 'site_cookie_consent'
const MAX_AGE_DAYS = 365

export const defaultCategories: ConsentCategories = {
  necessary: true,
  analytics: false,
  marketing: false,
}

export function loadConsent(): ConsentRecord | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const record = JSON.parse(raw) as ConsentRecord
    const ageDays = (Date.now() - new Date(record.date).getTime()) / 86_400_000
    // Una nueva versión de la política o un consentimiento vencido exigen pedirlo de nuevo.
    if (record.version !== site.policyVersion || !(ageDays < MAX_AGE_DAYS)) return null
    return {
      ...record,
      categories: {
        necessary: true,
        analytics: record.categories?.analytics === true,
        marketing: record.categories?.marketing === true,
      },
    }
  } catch {
    return null
  }
}

export function saveConsent(categories: Omit<ConsentCategories, 'necessary'>): ConsentRecord {
  const record: ConsentRecord = {
    id: crypto.randomUUID(),
    version: site.policyVersion,
    date: new Date().toISOString(),
    categories: { necessary: true, ...categories },
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(record))
  } catch {
    // Almacenamiento bloqueado: el consentimiento vale solo para esta sesión.
  }
  return record
}

/** Borra cookies de terceros ya instaladas cuando el usuario revoca su consentimiento. */
export function deleteCookies(prefixes: string[]) {
  const host = location.hostname
  const domains = ['', host, `.${host}`, `.${host.split('.').slice(-2).join('.')}`]
  for (const cookie of document.cookie.split(';')) {
    const name = cookie.split('=')[0].trim()
    if (!prefixes.some((p) => name.startsWith(p))) continue
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ''}`
    }
  }
}

export const ANALYTICS_COOKIES = ['_ga', '_gid', '_gat']
export const MARKETING_COOKIES = ['_fbp', '_fbc', 'fr']
