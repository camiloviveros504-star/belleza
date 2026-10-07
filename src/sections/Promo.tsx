import { cta } from '@/components/cta'
import { Link } from '@/components/Link'
import { Reveal } from '@/components/motion/Reveal'
import { Tilt } from '@/components/motion/Tilt'
import { TypeOnView } from '@/components/motion/Typewriter'
import { routes } from '@/lib/router'
import { trackEvent } from '@/lib/trackers'

/**
 * Las promociones deben indicar condiciones, vigencia y restricciones
 * (art. 33 Ley 1480 de 2011). Actualiza las fechas antes de publicar.
 */
export function Promo() {
  return (
    <section id="promociones" aria-labelledby="promo-title" className="py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <Reveal>
          <Tilt max={4} className="rounded-[2rem]">
            <div className="grain relative grid overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#2a1f1a_0%,#4a372c_55%,#8a6a58_100%)] p-8 text-ivory sm:p-14 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
              <div
                aria-hidden="true"
                className="absolute -top-32 -right-32 size-96 rounded-full bg-[radial-gradient(circle,#d8bd8a_0%,transparent_65%)] opacity-40"
              />
              <div className="relative [transform:translateZ(60px)]">
                <p className="mb-6 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-champagne">
                  <TypeOnView text="Promoción de temporada" />
                </p>
                <h2 id="promo-title" className="text-5xl leading-[1] sm:text-7xl">
                  <span className="text-gilded font-semibold italic">20%</span> en tu
                  <br />
                  primera visita
                </h2>
                <p className="mt-6 max-w-md text-ivory/75">
                  Aplica para cualquier ritual facial o de pestañas al reservar desde nuestra página web.
                </p>
                <Link
                  to="/?promo=PRIMERAVISITA#reservar"
                  className={cta('gold', 'mt-10')}
                  onClick={() => trackEvent('promo_click', { promo: 'PRIMERAVISITA' })}
                >
                  Quiero mi descuento
                </Link>
              </div>
              <p className="relative mt-10 self-end rounded-2xl border border-ivory/15 bg-ivory/5 p-6 text-xs leading-relaxed text-ivory/75 backdrop-blur-sm [transform:translateZ(30px)] lg:mt-0">
                <strong className="text-ivory">Condiciones:</strong> válido del 1 al 31 de octubre de 2026 o hasta agotar
                100 cupos. Solo para clientes nuevos, una vez por persona, no acumulable con otras promociones ni
                canjeable por dinero. Descuento sobre el precio de lista con IVA incluido. Consulta los{' '}
                <Link to={routes.terms} className="underline decoration-champagne underline-offset-4">
                  Términos y condiciones
                </Link>
                .
              </p>
            </div>
          </Tilt>
        </Reveal>
      </div>
    </section>
  )
}
