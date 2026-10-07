import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowDown, MessageCircle } from 'lucide-react'
import { useRef } from 'react'
import { cta } from '@/components/cta'
import { Link } from '@/components/Link'
import { ease } from '@/components/motion/ease'
import { Typewriter } from '@/components/motion/Typewriter'
import { Hero3D } from '@/components/three/Hero3D'
import { site, whatsappLink } from '@/config/site'
import { trackEvent } from '@/lib/trackers'

const words = ['atemporal.', 'radiante.', 'auténtica.', 'elegante.'] as const

const stats = [
  { value: '+2.500', label: 'Clientas atendidas' },
  { value: '4,9', label: 'Calificación promedio' },
  { value: '8', label: 'Años de experiencia' },
]

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const sceneY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const enter = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 30, filter: 'blur(12px)' },
          animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
          transition: { duration: 1.1, delay, ease },
        }

  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      className="grain relative -mt-[var(--header-h)] flex min-h-[100svh] items-center overflow-hidden pt-[var(--header-h)]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_80%_20%,#efe2cf_0%,transparent_60%),radial-gradient(800px_500px_at_10%_90%,#ece3d8_0%,transparent_60%)]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[0.18em] left-1/2 -translate-x-1/2 font-heading text-[28vw] leading-none whitespace-nowrap text-espresso/[0.035] italic select-none"
      >
        Aurora
      </span>

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-6 px-4 py-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        <motion.div style={reduce ? undefined : { y: copyY, opacity: fade }} className="relative z-10">
          <motion.p
            {...enter(0.1)}
            className="mb-8 flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-mocha"
          >
            <span aria-hidden="true" className="h-px w-10 bg-current" />
            Estética de autor · {site.city.split(',')[0]}
          </motion.p>

          <motion.h1
            {...enter(0.25)}
            id="hero-title"
            className="text-[clamp(3rem,7.4vw,6.6rem)] leading-[0.95] font-medium"
          >
            El arte de lucir
            <br />
            <span className="inline-block min-h-[1.05em] font-semibold italic">
              <Typewriter words={words} className="text-gilded pr-1" />
            </span>
          </motion.h1>

          <motion.p {...enter(0.45)} className="mt-8 max-w-md text-lg leading-relaxed text-muted-foreground">
            Rituales faciales, cejas, pestañas, uñas y cabello en un estudio sereno, con productos certificados y
            manos expertas que entienden tu belleza.
          </motion.p>

          <motion.div {...enter(0.6)} className="mt-10 flex flex-wrap gap-3">
            <Link to="/#reservar" className={cta()} onClick={() => trackEvent('cta_reservar', { location: 'hero' })}>
              Reservar mi cita
            </Link>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className={cta('outline')}
              onClick={() => trackEvent('contact_whatsapp', { location: 'hero' })}
            >
              <MessageCircle className="size-4" /> WhatsApp
            </a>
          </motion.div>

          <motion.dl {...enter(0.8)} className="mt-14 grid max-w-md grid-cols-3 divide-x divide-border border-t pt-6">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col px-4 first:pl-0">
                <dt className="text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">{s.label}</dt>
                <dd className="order-first font-heading text-4xl">{s.value}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <motion.div
          style={reduce ? undefined : { y: sceneY }}
          initial={reduce ? false : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, delay: 0.3, ease }}
          className="relative h-[380px] sm:h-[480px] lg:h-[620px]"
        >
          <Hero3D />
          <motion.div
            initial={reduce ? false : { opacity: 0, x: 30, rotateY: -25 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1.2, delay: 1.1, ease }}
            style={{ transformPerspective: 900 }}
            className="absolute bottom-6 left-2 max-w-[230px] rounded-2xl border border-white/60 bg-white/55 p-5 shadow-[0_20px_60px_-25px_rgba(42,31,26,0.45)] backdrop-blur-md sm:left-6"
          >
            <p className="text-[0.62rem] uppercase tracking-[0.25em] text-mocha">Ritual del mes</p>
            <p className="mt-1 font-heading text-xl leading-tight">Glow facial + lifting de pestañas</p>
            <p className="mt-2 font-heading text-3xl text-gilded">−20%</p>
          </motion.div>
        </motion.div>
      </div>

      <Link
        to="/#servicios"
        aria-label="Ir a servicios"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground lg:flex"
      >
        Descubre
        <ArrowDown className="size-4 animate-bounce" />
      </Link>
    </section>
  )
}
