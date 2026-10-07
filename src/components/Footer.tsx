import { site, whatsappLink } from '@/config/site'
import { useConsent } from '@/context/consent-context'
import { routes } from '@/lib/router'
import { Link } from './Link'

const heading = 'mb-5 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-champagne'
const link = 'text-ivory/70 transition-colors hover:text-ivory'

export function Footer() {
  const { openPreferences } = useConsent()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#17110e] pt-24 pb-10 text-sm text-ivory/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <p className="font-heading text-[clamp(3rem,10vw,8rem)] leading-none text-ivory">
          Aurora <em className="text-gilded">Beauty</em>
        </p>

        <div className="mt-16 grid gap-12 border-t border-ivory/10 pt-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className={heading}>Estudio</p>
            <p>
              {site.legalName}
              <br />
              NIT {site.nit}
            </p>
            <address className="mt-3 not-italic">
              {site.address}
              <br />
              {site.city}
            </address>
          </div>

          <div>
            <p className={heading}>Contacto</p>
            <ul className="grid gap-2">
              <li><a className={link} href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a></li>
              <li><a className={link} href={whatsappLink()} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
              <li><a className={link} href={`mailto:${site.email}`}>{site.email}</a></li>
            </ul>
            <p className={`${heading} mt-8`}>Horario</p>
            <ul className="grid gap-1">
              {site.hours.map((h) => (
                <li key={h.days}>{h.days}: {h.time}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className={heading}>Legal</p>
            <ul className="grid gap-2">
              <li><Link className={link} to={routes.privacy}>Política de tratamiento de datos</Link></li>
              <li><Link className={link} to={routes.notice}>Aviso de privacidad</Link></li>
              <li><Link className={link} to={routes.cookies}>Política de cookies</Link></li>
              <li><Link className={link} to={routes.terms}>Términos y condiciones</Link></li>
              <li>
                <button type="button" onClick={openPreferences} className={`${link} cursor-pointer underline decoration-champagne/60 underline-offset-4`}>
                  Configurar cookies
                </button>
              </li>
              <li><a className={link} href={`mailto:${site.privacyEmail}?subject=PQRS%20-%20Datos%20personales`}>PQRS y derechos de habeas data</a></li>
            </ul>
          </div>

          <div>
            <p className={heading}>Síguenos</p>
            <ul className="grid gap-2">
              <li><a className={link} href={site.social.instagram} target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a className={link} href={site.social.facebook} target="_blank" rel="noopener noreferrer">Facebook</a></li>
              <li><a className={link} href={site.social.tiktok} target="_blank" rel="noopener noreferrer">TikTok</a></li>
            </ul>
            <a
              href="https://www.sic.gov.co"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block rounded-lg border border-ivory/15 px-4 py-3 text-xs text-ivory/70 transition-colors hover:border-champagne hover:text-ivory"
            >
              Superintendencia de Industria y Comercio
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-2 border-t border-ivory/10 pt-6 text-xs text-ivory/45 sm:flex-row">
          <p>© {year} {site.legalName.replace(/\.$/, '')}. Todos los derechos reservados.</p>
          <p>Nuestros servicios son estéticos y no sustituyen la valoración médica.</p>
        </div>
      </div>
    </footer>
  )
}
