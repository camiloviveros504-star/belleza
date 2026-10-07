import { cta } from '@/components/cta'
import { Link } from '@/components/Link'
import { TypeOnView } from '@/components/motion/Typewriter'
import { routes } from '@/lib/router'

export function NotFound() {
  return (
    <section className="grid min-h-[70vh] place-items-center px-4 py-24 text-center">
      <div>
        <p className="font-heading text-[9rem] leading-none text-gilded italic">404</p>
        <h1 className="mt-4 text-4xl">
          <TypeOnView text="No encontramos esta página" />
        </h1>
        <p className="mt-4 text-muted-foreground">Es posible que el enlace haya cambiado o ya no exista.</p>
        <Link to={routes.home} className={cta('default', 'mt-10')}>
          Volver al inicio
        </Link>
      </div>
    </section>
  )
}
