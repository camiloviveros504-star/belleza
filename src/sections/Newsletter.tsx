import { useId, useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { cta } from '@/components/cta'
import { Link } from '@/components/Link'
import { Reveal } from '@/components/motion/Reveal'
import { TypeOnView } from '@/components/motion/Typewriter'
import { env, site } from '@/config/site'
import { routes } from '@/lib/router'
import { submitForm } from '@/lib/submit'
import { trackEvent } from '@/lib/trackers'
import { clean, isEmail, limits } from '@/lib/validation'

export function Newsletter() {
  const id = useId()
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [error, setError] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle')

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    const value = clean(email, limits.email)
    if (!isEmail(value)) return setError('Escribe un correo electrónico válido.')
    if (!consent) return setError('Necesitamos tu autorización para enviarte información comercial.')
    setError('')
    setStatus('sending')
    const result = await submitForm('newsletter', env.newsletterEndpoint || env.formEndpoint, {
      type: 'newsletter',
      email: value,
      consents: { privacyPolicy: true, marketingChannels: ['email'] },
    })
    if (result.ok) {
      setStatus('done')
      trackEvent('sign_up', { method: 'newsletter' })
    } else {
      setStatus('idle')
      setError(result.error)
    }
  }

  return (
    <section aria-labelledby={`${id}-title`} className="grain relative overflow-hidden bg-espresso py-28 text-ivory">
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-8">
        <p className="mb-6 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-champagne">
          <TypeOnView text="Club Aurora" />
        </p>
        <Reveal>
          <h2 id={`${id}-title`} className="text-4xl text-ivory sm:text-6xl">
            Rituales, consejos y <em className="text-gilded">privilegios</em> exclusivos
          </h2>
        </Reveal>

        <AnimatePresence mode="wait">
          {status === 'done' ? (
            <motion.p key="done" role="status" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-10 text-lg text-ivory/80">
              ¡Gracias! Te enviamos un correo para confirmar tu suscripción.
            </motion.p>
          ) : (
            <motion.form key="form" noValidate onSubmit={onSubmit} exit={{ opacity: 0, y: -10 }} className="mx-auto mt-10 grid max-w-xl gap-5 text-left">
              <label htmlFor={`${id}-email`} className="sr-only">
                Correo electrónico
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Input
                  id={`${id}-email`}
                  type="email"
                  autoComplete="email"
                  placeholder="tucorreo@ejemplo.com"
                  maxLength={limits.email}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={!!error || undefined}
                  aria-describedby={error ? `${id}-error` : undefined}
                  className="h-12 flex-1 rounded-full border-ivory/20 bg-ivory/5 px-6 text-base text-ivory placeholder:text-ivory/40 md:text-sm"
                />
                <Button type="submit" disabled={status === 'sending'} className={cta('gold')}>
                  Suscribirme
                </Button>
              </div>
              <label className="flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-ivory/70">
                <Checkbox
                  checked={consent}
                  onCheckedChange={setConsent}
                  className="mt-0.5 size-[18px] border-ivory/40 data-checked:border-champagne data-checked:bg-champagne data-checked:text-espresso"
                />
                <span>
                  Autorizo a {site.legalName} a enviarme información comercial por correo electrónico, según la{' '}
                  <Link to={routes.privacy} className="text-ivory underline decoration-champagne underline-offset-4">
                    Política de tratamiento de datos
                  </Link>
                  . Puedo darme de baja en cualquier momento desde el enlace en cada correo.
                </span>
              </label>
              {error && (
                <p id={`${id}-error`} role="alert" className="text-sm text-[#f0a594]">
                  {error}
                </p>
              )}
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
