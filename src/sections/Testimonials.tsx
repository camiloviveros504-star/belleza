import { motion, useReducedMotion } from 'motion/react'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ease } from '@/components/motion/ease'
import { SectionHeading } from '@/components/motion/SectionHeading'
import { testimonials } from '@/data/content'

const CARD_W = 300
const STEP = 360 / testimonials.length
// Radio del cilindro para que las tarjetas no se superpongan.
const RADIUS = Math.round(CARD_W / 2 / Math.tan(Math.PI / testimonials.length)) + 60

export function Testimonials() {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const active = ((index % testimonials.length) + testimonials.length) % testimonials.length

  useEffect(() => {
    if (paused || reduce) return
    const timer = setInterval(() => setIndex((i) => i + 1), 5000)
    return () => clearInterval(timer)
  }, [paused, reduce])

  return (
    <section id="testimonios" aria-labelledby="testimonials-title" className="overflow-hidden bg-muted/60 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <SectionHeading
          id="testimonials-title"
          align="center"
          eyebrow="Testimonios"
          title={
            <>
              Historias que nos <em className="text-gilded">inspiran</em>
            </>
          }
        />

        <div
          role="region"
          aria-roledescription="carrusel"
          aria-label="Testimonios de clientas"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="relative mx-auto h-[360px] [perspective:1400px]">
            <motion.ul
              className="absolute top-0 left-1/2 h-full [transform-style:preserve-3d]"
              style={{ width: CARD_W, marginLeft: -CARD_W / 2 }}
              animate={{ rotateY: -index * STEP }}
              transition={{ duration: reduce ? 0 : 1.1, ease }}
            >
              {testimonials.map((t, i) => (
                <li
                  key={t.name}
                  aria-hidden={i !== active}
                  className="absolute inset-0 [backface-visibility:hidden]"
                  style={{ transform: `rotateY(${i * STEP}deg) translateZ(${RADIUS}px)` }}
                >
                  <figure
                    className={`flex h-full flex-col rounded-2xl border bg-card p-8 shadow-[0_40px_80px_-50px_rgba(42,31,26,0.6)] transition-opacity duration-700 ${
                      i === active ? 'opacity-100' : 'opacity-45'
                    }`}
                  >
                    <Quote className="size-8 text-champagne" strokeWidth={1.2} />
                    <div className="mt-4 tracking-[0.3em] text-champagne" aria-label="5 de 5 estrellas">★★★★★</div>
                    <blockquote className="mt-4 flex-1 font-heading text-2xl leading-snug italic">“{t.text}”</blockquote>
                    <figcaption className="mt-6 border-t pt-4 text-sm">
                      <strong className="font-semibold">{t.name}</strong>
                      <span className="text-muted-foreground"> · {t.service}</span>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </motion.ul>
          </div>

          <div className="mt-12 flex items-center justify-center gap-6">
            <Button variant="outline" size="icon-lg" className="size-12 rounded-full" aria-label="Testimonio anterior" onClick={() => setIndex((i) => i - 1)}>
              <ChevronLeft />
            </Button>
            <div className="flex gap-2">
              {testimonials.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  aria-label={`Ver testimonio de ${t.name}`}
                  aria-current={i === active}
                  onClick={() => setIndex((cur) => cur + (i - active))}
                  className={`h-1.5 rounded-full transition-all duration-500 ${i === active ? 'w-8 bg-champagne' : 'w-3 bg-espresso/20'}`}
                />
              ))}
            </div>
            <Button variant="outline" size="icon-lg" className="size-12 rounded-full" aria-label="Siguiente testimonio" onClick={() => setIndex((i) => i + 1)}>
              <ChevronRight />
            </Button>
          </div>
          <p className="sr-only" aria-live="polite">
            Testimonio {active + 1} de {testimonials.length}: {testimonials[active].name}
          </p>
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground">Testimonios publicados con autorización de sus autoras.</p>
      </div>
    </section>
  )
}
