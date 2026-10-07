import { createContext, useContext } from 'react'
import type { ConsentCategories, ConsentRecord } from '../lib/consent'

export type ConsentValue = {
  consent: ConsentRecord | null
  categories: ConsentCategories
  preferencesOpen: boolean
  openPreferences: () => void
  closePreferences: () => void
  acceptAll: () => void
  rejectAll: () => void
  save: (choice: { analytics: boolean; marketing: boolean }) => void
}

export const ConsentContext = createContext<ConsentValue | null>(null)

export function useConsent() {
  const value = useContext(ConsentContext)
  if (!value) throw new Error('useConsent debe usarse dentro de <ConsentProvider>')
  return value
}
