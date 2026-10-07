import { ArrowUpRight, Brush, Eye, Flower2, Hand, Sparkles, Wind } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Link } from '@/components/Link'
import { Stagger, StaggerItem } from '@/components/motion/Reveal'
import { SectionHeading } from '@/components/motion/SectionHeading'
import { Tilt } from '@/components/motion/Tilt'
import { formatCOP, services } from '@/data/content'
import { trackEvent } from '@/lib/trackers'

const icons = {
  facial: Sparkles,
  manicure: Hand,
  cejas: Eye,
  cabello: Wind,
  maquillaje: Brush,
  masaje: Flower2,
} as const

export function Services() {
  return (
    <section id="servicios" aria-labelledby="services-title" className="py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <SectionHeading
          id="services-title"
          eyebrow="Nuestros rituales"
          title={
            <>
              Cuidado experto, <em className="text-gilded">detalle</em> a detalle
            </>
          }
          intro="Precios en pesos colombianos con IVA incluido. Cada servicio comienza con una valoración sin costo."
        />

        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = icons[s.id as keyof typeof icons] ?? Sparkles
            return (
              <StaggerItem key={s.id}>
                <Tilt className="h-full rounded-2xl">
                  <article className="flex h-full flex-col rounded-2xl border bg-card p-8 shadow-[0_30px_60px_-40px_rgba(42,31,26,0.35)] transition-colors duration-500 hover:border-champagne/60">
                    <div className="mb-10 flex items-start justify-between [transform:translateZ(50px)]">
                      <span className="grid size-14 place-items-center rounded-full border border-champagne/40 bg-gradient-to-br from-white to-accent text-mocha">
                        <Icon className="size-6" strokeWidth={1.4} />
                      </span>
                      <span className="font-heading text-sm text-muted-foreground italic">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="flex-1 [transform:translateZ(30px)]">
                      {s.tag && (
                        <Badge variant="outline" className="mb-3 rounded-full border-champagne/50 text-[0.62rem] uppercase tracking-[0.18em] text-mocha">
                          {s.tag}
                        </Badge>
                      )}
                      <h3 className="text-3xl leading-tight">{s.name}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
                    </div>
                    <div className="mt-8 flex items-end justify-between border-t border-dashed pt-5 [transform:translateZ(20px)]">
                      <div>
                        <p className="text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">{s.duration}</p>
                        <p className="font-heading text-3xl">{formatCOP(s.price)}</p>
                      </div>
                      <Link
                        to={`/?servicio=${s.id}#reservar`}
                        aria-label={`Reservar ${s.name}`}
                        onClick={() => trackEvent('select_service', { service: s.id })}
                        className="grid size-12 place-items-center rounded-full bg-primary text-primary-foreground transition-all duration-300 hover:rotate-45 hover:bg-champagne hover:text-espresso"
                      >
                        <ArrowUpRight className="size-5" />
                      </Link>
                    </div>
                  </article>
                </Tilt>
              </StaggerItem>
            )
          })}
        </Stagger>
      </div>
    </section>
  )
}
