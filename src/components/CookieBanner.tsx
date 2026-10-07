import { AnimatePresence, motion } from 'motion/react'
import { Cookie } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useConsent } from '@/context/consent-context'
import { routes } from '@/lib/router'
import { cta } from './cta'
import { Link } from './Link'
import { ease } from './motion/ease'

/**
 * Aviso de cookies. "Rechazar" y "Aceptar" tienen el mismo peso visual para
 * que la decisión sea libre; nada opcional se carga hasta que la persona elige.
 */
export function CookieBanner() {
  const { consent, preferencesOpen, acceptAll, rejectAll, openPreferences } = useConsent()
  const visible = !consent && !preferencesOpen

  return (
    <AnimatePresence>
      {visible && (
        <motion.section
          role="region"
          aria-label="Aviso de cookies"
          initial={{ y: 120, opacity: 0, rotateX: 25 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease }}
          style={{ transformPerspective: 1000 }}
          className="fixed inset-x-3 bottom-3 z-50 mx-auto flex max-h-[85vh] max-w-5xl flex-col gap-6 overflow-y-auto rounded-2xl border bg-card/95 p-6 text-sm shadow-[0_30px_80px_-30px_rgba(42,31,26,0.6)] backdrop-blur-xl sm:inset-x-6 sm:bottom-6 lg:p-8"
        >
          <div className="flex gap-4">
            <Cookie className="mt-1 hidden size-6 shrink-0 text-champagne sm:block" strokeWidth={1.4} />
            <div>
              <p className="font-heading text-2xl">Tu privacidad es importante</p>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                Usamos cookies técnicas necesarias para que el sitio funcione. Con tu autorización, también usaremos cookies
                analíticas para mejorar la página y cookies de marketing para mostrarte publicidad relevante. Puedes
                aceptarlas, rechazarlas o elegir cuáles permitir. Más información en nuestra{' '}
                <Link to={routes.cookies} className="text-foreground underline decoration-champagne underline-offset-4">Política de cookies</Link> y{' '}
                <Link to={routes.privacy} className="text-foreground underline decoration-champagne underline-offset-4">Política de tratamiento de datos</Link>.
              </p>
            </div>
          </div>
          <div className="grid gap-2 sm:flex sm:flex-wrap sm:justify-end">
            <Button variant="outline" onClick={openPreferences} className={cta('outline', 'h-11 px-5')}>
              Configurar
            </Button>
            <Button onClick={rejectAll} className={cta('default', 'h-11 px-5')}>
              Rechazar opcionales
            </Button>
            <Button onClick={acceptAll} className={cta('default', 'h-11 px-5')}>
              Aceptar todas
            </Button>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}
