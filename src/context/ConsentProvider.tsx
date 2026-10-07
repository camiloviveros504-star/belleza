import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  ANALYTICS_COOKIES,
  MARKETING_COOKIES,
  defaultCategories,
  deleteCookies,
  loadConsent,
  saveConsent,
  type ConsentRecord,
} from '../lib/consent'
import { toast } from 'sonner'
import { applyConsent } from '../lib/trackers'
import { ConsentContext, type ConsentValue } from './consent-context'

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentRecord | null>(loadConsent)
  const [preferencesOpen, setPreferencesOpen] = useState(false)

  useEffect(() => {
    if (consent) applyConsent(consent.categories)
  }, [consent])

  const save = useCallback(
    (choice: { analytics: boolean; marketing: boolean }) => {
      const revoked =
        (consent?.categories.analytics && !choice.analytics) ||
        (consent?.categories.marketing && !choice.marketing)
      setConsent(saveConsent(choice))
      setPreferencesOpen(false)
      if (!choice.analytics) deleteCookies(ANALYTICS_COOKIES)
      if (!choice.marketing) deleteCookies(MARKETING_COOKIES)
      // Los scripts ya cargados no se pueden descargar: recargar garantiza que dejen de ejecutarse.
      if (revoked) location.reload()
      else toast.success('Preferencias de cookies guardadas')
    },
    [consent],
  )

  const value = useMemo<ConsentValue>(
    () => ({
      consent,
      categories: consent?.categories ?? defaultCategories,
      preferencesOpen,
      openPreferences: () => setPreferencesOpen(true),
      closePreferences: () => setPreferencesOpen(false),
      acceptAll: () => save({ analytics: true, marketing: true }),
      rejectAll: () => save({ analytics: false, marketing: false }),
      save,
    }),
    [consent, preferencesOpen, save],
  )

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>
}
