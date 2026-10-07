import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { Switch } from '@/components/ui/switch'
import { useConsent } from '@/context/consent-context'
import { routes } from '@/lib/router'
import { cta } from './cta'
import { Link } from './Link'

const categories = [
  {
    key: 'necessary',
    title: 'Necesarias',
    text: 'Permiten el funcionamiento básico y seguro del sitio y guardan tus preferencias de cookies. No requieren autorización y no se pueden desactivar.',
  },
  {
    key: 'analytics',
    title: 'Analíticas',
    text: 'Nos ayudan a entender cómo se usa el sitio (páginas visitadas, tiempo de navegación) de forma agregada. Proveedor: Google Analytics.',
  },
  {
    key: 'marketing',
    title: 'Marketing',
    text: 'Permiten medir nuestras campañas y mostrarte anuncios relevantes en redes sociales. Proveedor: Meta (Facebook e Instagram).',
  },
] as const

export function CookiePreferences() {
  const { preferencesOpen, openPreferences, closePreferences } = useConsent()

  return (
    <Dialog open={preferencesOpen} onOpenChange={(open) => (open ? openPreferences() : closePreferences())}>
      <DialogContent className="max-h-[calc(100svh-2rem)] gap-0 overflow-y-auto rounded-2xl bg-card p-6 sm:max-w-xl sm:p-8">
        {/* Se monta al abrir para partir siempre de la decisión guardada. */}
        {preferencesOpen && <PreferencesForm />}
      </DialogContent>
    </Dialog>
  )
}

function PreferencesForm() {
  const { categories: current, closePreferences, save, consent } = useConsent()
  const [choice, setChoice] = useState({ analytics: current.analytics, marketing: current.marketing })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        save(choice)
      }}
    >
      <DialogTitle className="font-heading text-4xl font-medium">Preferencias de cookies</DialogTitle>
      <DialogDescription className="mt-3 leading-relaxed">
        Elige qué categorías autorizas. Puedes cambiar tu decisión cuando quieras desde el enlace “Configurar cookies” al
        final de la página. Consulta la{' '}
        <Link to={routes.cookies} onClick={closePreferences}>
          Política de cookies
        </Link>
        .
      </DialogDescription>

      <ul className="my-6 grid gap-3">
        {categories.map((c) => {
          const locked = c.key === 'necessary'
          const checked = locked ? true : choice[c.key]
          const switchId = `cookie-${c.key}`
          return (
            <li key={c.key} className="flex items-start justify-between gap-5 rounded-xl border bg-background/60 p-4">
              <div>
                <label htmlFor={switchId} className="font-semibold">
                  {c.title}
                </label>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{c.text}</p>
              </div>
              <Switch
                id={switchId}
                checked={checked}
                disabled={locked}
                onCheckedChange={(on) => !locked && setChoice((s) => ({ ...s, [c.key]: on }))}
                className="mt-1 data-checked:bg-champagne"
              />
            </li>
          )
        })}
      </ul>

      {consent && (
        <p className="mb-5 text-xs text-muted-foreground">
          Última decisión: {new Date(consent.date).toLocaleString('es-CO')} · ID {consent.id.slice(0, 8)}
        </p>
      )}

      <div className="grid gap-2 sm:grid-cols-3">
        <Button type="button" onClick={() => save({ analytics: false, marketing: false })} className={cta('default', 'h-auto min-h-11 px-3 py-2 tracking-[0.12em] whitespace-normal')}>
          Rechazar opcionales
        </Button>
        <Button type="submit" variant="outline" className={cta('outline', 'h-auto min-h-11 px-3 py-2 tracking-[0.12em] whitespace-normal')}>
          Guardar selección
        </Button>
        <Button type="button" onClick={() => save({ analytics: true, marketing: true })} className={cta('default', 'h-auto min-h-11 px-3 py-2 tracking-[0.12em] whitespace-normal')}>
          Aceptar todas
        </Button>
      </div>
    </form>
  )
}
