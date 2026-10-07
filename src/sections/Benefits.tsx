import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { Reveal } from '@/components/motion/Reveal'
import { SectionHeading } from '@/components/motion/SectionHeading'
import { benefits } from '@/data/content'

export function Benefits() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  // El anillo gira en 3D a medida que se hace scroll.
  const rotate = useTransform(scrollYProgress, [0, 1], [-50, 50])
  const tilt = useTransform(scrollYProgress, [0, 1], [65, 55])

  return (
    <section ref={ref} aria-labelledby="benefits-title" className="relative overflow-hidden bg-espresso py-28 text-ivory sm:py-36">
      <motion.div
        aria-hidden="true"
        style={reduce ? undefined : { rotateZ: rotate, rotateX: tilt, transformPerspective: 1200 }}
        className="pointer-events-none absolute -right-40 top-1/2 size-[640px] -translate-y-1/2 rounded-full border border-champagne/25 [box-shadow:0_0_0_40px_rgba(184,149,90,0.04),0_0_0_80px_rgba(184,149,90,0.03)]"
      />
      <div className="relative mx-auto grid max-w-7xl gap-16 px-4 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            id="benefits-title"
            tone="dark"
            eyebrow="Por qué elegirnos"
            title={
              <>
                Lujo silencioso, <em className="text-gilded">resultados</em> visibles
              </>
            }
            intro="Creemos en la belleza que no necesita gritar: técnica impecable, ingredientes nobles y un trato que se recuerda."
          />
        </div>
        <ol className="divide-y divide-ivory/10 border-y border-ivory/10">
          {benefits.map((b, i) => (
            <li key={b.title}>
              <Reveal delay={i * 0.08} className="group grid grid-cols-[auto_1fr] gap-8 py-10">
                <span className="font-heading text-5xl text-champagne/80 italic transition-transform duration-500 group-hover:-translate-y-1">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="text-3xl text-ivory">{b.title}</h3>
                  <p className="mt-3 max-w-md leading-relaxed text-ivory/65">{b.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
