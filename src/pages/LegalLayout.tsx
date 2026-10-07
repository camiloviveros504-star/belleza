import { motion } from 'motion/react'
import { useEffect, type ReactNode } from 'react'
import { Link } from '@/components/Link'
import { ease } from '@/components/motion/ease'
import { TypeOnView } from '@/components/motion/Typewriter'
import { site } from '@/config/site'
import { routes } from '@/lib/router'

export function LegalLayout({ title, children }: { title: string; children: ReactNode }) {
  useEffect(() => {
    document.title = `${title} | ${site.brandName}`
  }, [title])

  return (
    <article className="pt-16 pb-28 sm:pt-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-8">
        <nav aria-label="Ruta de navegación" className="mb-8 text-[0.7rem] uppercase tracking-[0.25em] text-muted-foreground">
          <Link to={routes.home} className="hover:text-foreground">Inicio</Link>
          <span className="mx-3 text-champagne">/</span>
          <span aria-current="page">
            <TypeOnView text={title} />
          </span>
        </nav>
        <motion.h1
          initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, ease }}
          className="text-5xl leading-[1.02] sm:text-6xl"
        >
          {title}
        </motion.h1>
        <p className="mt-6 border-b pb-8 text-sm text-muted-foreground">
          Versión {site.policyVersion} · Última actualización: {site.policyDate}
        </p>
        <div className="prose-legal mt-8">{children}</div>
      </div>
    </article>
  )
}

export function ResponsibleData() {
  return (
    <ul>
      <li><strong>Razón social:</strong> {site.legalName}</li>
      <li><strong>NIT:</strong> {site.nit}</li>
      <li><strong>Domicilio:</strong> {site.address}, {site.city}</li>
      <li><strong>Correo para datos personales:</strong> <a href={`mailto:${site.privacyEmail}`}>{site.privacyEmail}</a></li>
      <li><strong>Teléfono:</strong> {site.phone}</li>
    </ul>
  )
}
