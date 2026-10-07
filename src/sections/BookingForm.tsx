import { AnimatePresence, motion } from 'motion/react'
import { CalendarCheck, Loader2, MapPin, MessageCircle } from 'lucide-react'
import { useId, useState, type FormEvent, type ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { cta } from '@/components/cta'
import { Link } from '@/components/Link'
import { ease } from '@/components/motion/ease'
import { Reveal } from '@/components/motion/Reveal'
import { SectionHeading } from '@/components/motion/SectionHeading'
import { env, site, whatsappLink } from '@/config/site'
import { services } from '@/data/content'
import { routes, useRouter } from '@/lib/router'
import { submitForm } from '@/lib/submit'
import { trackEvent } from '@/lib/trackers'
import { clean, isEmail, isName, isPhone, limits } from '@/lib/validation'

type Channel = 'whatsapp' | 'email' | 'sms'

const channels: { value: Channel; label: string }[] = [
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'email', label: 'Correo' },
  { value: 'sms', label: 'SMS' },
]

const initial = {
  name: '',
  phone: '',
  email: '',
  service: '',
  date: '',
  message: '',
  health: '',
  website: '', // honeypot anti-spam: invisible para personas
  privacy: false,
  adult: false,
  sensitive: false,
  marketing: [] as Channel[],
}

type Key = keyof typeof initial
type Errors = Partial<Record<Key, string>>

const serviceItems = [{ value: null, label: 'Selecciona un servicio' }, ...services.map((s) => ({ value: s.id, label: s.name }))]

function readQuery(search: string) {
  const params = new URLSearchParams(search)
  const service = params.get('servicio') ?? ''
  return {
    service: services.some((s) => s.id === service) ? service : '',
    promo: /^[A-Z0-9]{3,20}$/.test(params.get('promo') ?? '') ? params.get('promo')! : '',
  }
}

const today = () => new Date().toISOString().slice(0, 10)

export function BookingForm() {
  const id = useId()
  const { search } = useRouter()
  const [prevSearch, setPrevSearch] = useState(search)
  const [query, setQuery] = useState(() => readQuery(search))
  const [values, setValues] = useState({ ...initial, service: query.service })
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'demo' | 'error'>('idle')
  const [serverError, setServerError] = useState('')

  // Al elegir un servicio o promoción desde otra sección, la URL cambia: preselecciónalo.
  if (search !== prevSearch) {
    const next = readQuery(search)
    setPrevSearch(search)
    setQuery(next)
    if (next.service) setValues((v) => ({ ...v, service: next.service }))
    if (status !== 'sending') setStatus('idle')
  }

  const set = <K extends Key>(key: K, value: (typeof initial)[K]) => setValues((v) => ({ ...v, [key]: value }))

  const toggleChannel = (c: Channel, on: boolean) =>
    set('marketing', on ? [...new Set([...values.marketing, c])] : values.marketing.filter((x) => x !== c))

  function validate() {
    const e: Errors = {}
    if (!isName(clean(values.name, limits.name))) e.name = 'Escribe tu nombre (solo letras).'
    if (!isPhone(clean(values.phone, limits.phone))) e.phone = 'Escribe un celular colombiano válido, p. ej. 300 123 4567.'
    if (!isEmail(clean(values.email, limits.email))) e.email = 'Escribe un correo electrónico válido.'
    if (!values.service) e.service = 'Elige un servicio.'
    if (values.date && values.date < today()) e.date = 'La fecha no puede estar en el pasado.'
    if (values.health.trim() && !values.sensitive)
      e.sensitive = 'Para registrar información de salud necesitamos tu autorización expresa, o deja ese campo vacío.'
    if (!values.privacy) e.privacy = 'Debes autorizar el tratamiento de tus datos para gestionar la reserva.'
    if (!values.adult) e.adult = 'Debes ser mayor de edad. Si eres menor, la reserva la debe hacer tu representante legal.'
    return e
  }

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault()
    if (values.website) return // bot
    const e = validate()
    setErrors(e)
    const first = Object.keys(e)[0]
    if (first) {
      document.querySelector<HTMLElement>(`[data-field="${first}"] :is(input:not([aria-hidden]),button,[role=checkbox],textarea)`)?.focus()
      return
    }
    setStatus('sending')
    const result = await submitForm('booking', env.formEndpoint, {
      type: 'reserva',
      name: clean(values.name, limits.name),
      phone: clean(values.phone, limits.phone),
      email: clean(values.email, limits.email),
      service: values.service,
      date: values.date,
      promo: query.promo,
      message: clean(values.message, limits.message),
      health: values.sensitive ? clean(values.health, limits.message) : '',
      consents: {
        privacyPolicy: true,
        adult: true,
        sensitiveData: values.sensitive && !!values.health.trim(),
        marketingChannels: values.marketing,
      },
    })
    if (result.ok) {
      setStatus(result.demo ? 'demo' : 'done')
      trackEvent('generate_lead', { service: values.service })
      setValues({ ...initial })
    } else {
      setStatus('error')
      setServerError(result.error)
    }
  }

  const a11y = (key: Key) => ({
    id: `${id}-${key}`,
    'aria-invalid': !!errors[key] || undefined,
    'aria-describedby': errors[key] ? `${id}-${key}-error` : undefined,
  })

  const fieldError = (key: Key) =>
    errors[key] && (
      <p id={`${id}-${key}-error`} className="text-xs text-destructive">
        {errors[key]}
      </p>
    )

  const field = (name: Key, label: string, children: ReactNode) => (
    <div data-field={name} className="grid gap-2">
      <Label htmlFor={`${id}-${name}`} className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </Label>
      {children}
      {fieldError(name)}
    </div>
  )

  const consent = (name: 'privacy' | 'adult' | 'sensitive', children: ReactNode) => (
    <div data-field={name} className="grid gap-1.5">
      <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed">
        <Checkbox
          {...a11y(name)}
          checked={values[name]}
          onCheckedChange={(v) => set(name, v)}
          className="mt-1 size-[18px] data-checked:border-champagne data-checked:bg-champagne"
        />
        <span>{children}</span>
      </label>
      {fieldError(name)}
    </div>
  )

  const input = 'h-12 rounded-lg bg-background/70 px-4 text-base md:text-sm'

  return (
    <section id="reservar" aria-labelledby="booking-title" className="relative bg-[linear-gradient(180deg,var(--ivory),#efe5d8)] py-28 sm:py-36">
      <div className="mx-auto grid max-w-7xl gap-16 px-4 sm:px-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            id="booking-title"
            eyebrow="Reserva"
            title={
              <>
                Tu momento <em className="text-gilded">comienza</em> aquí
              </>
            }
            intro="Déjanos tus datos y te confirmamos disponibilidad por el medio que prefieras, dentro de nuestro horario de atención."
            className="mb-10"
          />
          {query.promo && (
            <p className="mb-6 inline-flex rounded-full border border-dashed border-champagne px-4 py-2 text-sm">
              Código aplicado:&nbsp;<strong>{query.promo}</strong>
            </p>
          )}
          <ul className="grid gap-4 text-sm">
            <li className="flex items-center gap-3">
              <MessageCircle className="size-4 text-champagne" />
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
                WhatsApp {site.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="size-4 text-champagne" />
              {site.address}, {site.city}
            </li>
          </ul>
        </div>

        <Reveal className="[perspective:1600px]">
          <AnimatePresence mode="wait" initial={false}>
            {status === 'done' || status === 'demo' ? (
              <motion.div
                key="ok"
                role="status"
                initial={{ opacity: 0, rotateY: -70 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: 70 }}
                transition={{ duration: 0.7, ease }}
                className="grid justify-items-center gap-4 rounded-3xl border bg-card p-12 text-center shadow-[0_40px_80px_-50px_rgba(42,31,26,0.5)]"
              >
                <span className="grid size-16 place-items-center rounded-full bg-champagne/15 text-champagne">
                  <CalendarCheck className="size-7" />
                </span>
                <h3 className="text-4xl">¡Solicitud recibida!</h3>
                <p className="max-w-sm text-muted-foreground">
                  Te contactaremos pronto para confirmar tu cita. Revisa tu WhatsApp o tu correo.
                </p>
                {status === 'demo' && (
                  <p className="text-xs text-muted-foreground">
                    Modo demostración: configura <code>VITE_FORM_ENDPOINT</code> para recibir las reservas.
                  </p>
                )}
                <Button variant="outline" className={cta('outline', 'mt-2')} onClick={() => setStatus('idle')}>
                  Hacer otra reserva
                </Button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                noValidate
                onSubmit={onSubmit}
                initial={{ opacity: 0, rotateY: 70 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: -70 }}
                transition={{ duration: 0.7, ease }}
                className="grid gap-6 rounded-3xl border bg-card/90 p-6 shadow-[0_40px_80px_-50px_rgba(42,31,26,0.5)] backdrop-blur sm:p-10"
              >
                {field('name', 'Nombre completo *', (
                  <Input {...a11y('name')} autoComplete="name" maxLength={limits.name} value={values.name} onChange={(e) => set('name', e.target.value)} className={input} />
                ))}
                <div className="grid gap-6 sm:grid-cols-2">
                  {field('phone', 'Celular *', (
                    <Input {...a11y('phone')} type="tel" inputMode="tel" autoComplete="tel" maxLength={limits.phone} value={values.phone} onChange={(e) => set('phone', e.target.value)} className={input} />
                ))}
                  {field('email', 'Correo electrónico *', (
                    <Input {...a11y('email')} type="email" autoComplete="email" maxLength={limits.email} value={values.email} onChange={(e) => set('email', e.target.value)} className={input} />
                ))}
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  {field('service', 'Servicio *', (
                    <Select items={serviceItems} value={values.service || null} onValueChange={(v) => set('service', (v as string | null) ?? '')}>
                      <SelectTrigger {...a11y('service')} className={`${input} w-full data-[size=default]:h-12`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((s) => (
                          <SelectItem key={s.id} value={s.id}>
                            {s.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                ))}
                  {field('date', 'Fecha preferida', (
                    <Input {...a11y('date')} type="date" min={today()} value={values.date} onChange={(e) => set('date', e.target.value)} className={input} />
                ))}
                </div>
                {field('message', 'Comentarios', (
                  <Textarea {...a11y('message')} rows={3} maxLength={limits.message} value={values.message} onChange={(e) => set('message', e.target.value)} className="min-h-24 rounded-lg bg-background/70 px-4 py-3" />
                ))}

                <div className="grid gap-4 rounded-2xl border border-champagne/30 bg-accent/40 p-5">
                  {field('health', 'Información de salud relevante (opcional)', (
                    <Textarea
                      id={`${id}-health`}
                      rows={2}
                      maxLength={limits.message}
                      placeholder="Alergias, embarazo, tratamientos dermatológicos…"
                      value={values.health}
                      onChange={(e) => set('health', e.target.value)}
                      className="min-h-20 rounded-lg bg-background/80 px-4 py-3"
                    />
                ))}
                  <p className="text-xs text-muted-foreground">
                    Es un dato sensible: no estás obligada(o) a suministrarlo. Solo lo usamos para cuidar tu seguridad durante
                    el servicio.
                  </p>
                  {consent('sensitive', (
                    <>
                    Autorizo de forma expresa y facultativa el tratamiento de mis datos de salud con la finalidad descrita
                    (art. 6 Ley 1581 de 2012).
                  </>
                  ))}
                </div>

                <fieldset className="grid gap-4">
                  <legend className="mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Autorizaciones</legend>
                  {consent('privacy', (
                    <>
                    * Autorizo a {site.legalName} a tratar mis datos personales para gestionar mi reserva, según la{' '}
                    <Link to={routes.privacy} className="underline decoration-champagne underline-offset-4">Política de tratamiento de datos</Link> y el{' '}
                    <Link to={routes.notice} className="underline decoration-champagne underline-offset-4">Aviso de privacidad</Link>. Conozco mis
                    derechos a conocer, actualizar, rectificar y suprimir mis datos y a revocar esta autorización.
                  </>
                  ))}
                  {consent('adult', (
                    <>* Declaro que soy mayor de 18 años.</>
                  ))}

                  <div className="mt-2 grid gap-3 border-t pt-5">
                    <p className="text-sm">(Opcional) Quiero recibir promociones y novedades por:</p>
                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                      {channels.map((c) => (
                        <label key={c.value} className="flex cursor-pointer items-center gap-2 text-sm">
                          <Checkbox
                            checked={values.marketing.includes(c.value)}
                            onCheckedChange={(on) => toggleChannel(c.value, on)}
                            className="size-[18px] data-checked:border-champagne data-checked:bg-champagne"
                          />
                          {c.label}
                        </label>
                      ))}
                    </div>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      Conforme a la Ley 2300 de 2023, solo te contactaremos por los canales que elijas, de lunes a viernes de
                      7:00 a. m. a 7:00 p. m. y sábados de 8:00 a. m. a 3:00 p. m., máximo una vez por semana por canal.
                      Nunca domingos ni festivos.
                    </p>
                  </div>
                </fieldset>

                {/* Honeypot: oculto para personas, los bots suelen rellenarlo. */}
                <div className="absolute -left-[10000px] size-px overflow-hidden" aria-hidden="true">
                  <label htmlFor={`${id}-website`}>No llenar</label>
                  <input id={`${id}-website`} tabIndex={-1} autoComplete="off" value={values.website} onChange={(e) => set('website', e.target.value)} />
                </div>

                {status === 'error' && (
                  <p role="alert" className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                    {serverError}
                  </p>
                )}

                <Button type="submit" disabled={status === 'sending'} className={cta('default', 'w-full')}>
                  {status === 'sending' ? <Loader2 className="size-4 animate-spin" /> : null}
                  {status === 'sending' ? 'Enviando…' : 'Solicitar reserva'}
                </Button>
                <p className="text-center text-xs text-muted-foreground">Los campos marcados con * son obligatorios.</p>
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  )
}
