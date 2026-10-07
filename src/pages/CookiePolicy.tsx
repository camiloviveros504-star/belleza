import { Button } from '@/components/ui/button'
import { cta } from '../components/cta'
import { Link } from '../components/Link'
import { site } from '../config/site'
import { useConsent } from '../context/consent-context'
import { routes } from '../lib/router'
import { LegalLayout } from './LegalLayout'

const cookies = [
  { name: 'site_cookie_consent', provider: site.brandName, type: 'Necesaria', purpose: 'Guarda su decisión sobre cookies.', duration: '12 meses (almacenamiento local)' },
  { name: '_ga, _ga_*', provider: 'Google Analytics', type: 'Analítica', purpose: 'Distingue usuarios y sesiones para estadísticas agregadas.', duration: '13 meses' },
  { name: '_gid', provider: 'Google Analytics', type: 'Analítica', purpose: 'Distingue usuarios durante 24 horas.', duration: '24 horas' },
  { name: '_fbp', provider: 'Meta Platforms', type: 'Marketing', purpose: 'Mide la efectividad de anuncios en Facebook e Instagram.', duration: '3 meses' },
  { name: 'fr', provider: 'Meta Platforms', type: 'Marketing', purpose: 'Publicidad personalizada y medición de conversiones.', duration: '3 meses' },
]

export function CookiePolicy() {
  const { openPreferences, consent } = useConsent()

  return (
    <LegalLayout title="Política de cookies">
      <p>
        Esta política explica qué son las cookies, cuáles usamos en este sitio y cómo puede gestionarlas. Forma parte
        de nuestra <Link to={routes.privacy}>Política de tratamiento de datos personales</Link>, en cumplimiento de la
        Ley 1581 de 2012 y las orientaciones de la Superintendencia de Industria y Comercio.
      </p>

      <h2>¿Qué son las cookies?</h2>
      <p>
        Son pequeños archivos que un sitio web guarda en su navegador para recordar información sobre su visita.
        Algunas son indispensables para que el sitio funcione; otras permiten medir el uso del sitio o mostrar
        publicidad.
      </p>

      <h2>Su consentimiento</h2>
      <p>
        Solo usamos cookies técnicas sin su autorización. Las cookies analíticas y de marketing{' '}
        <strong>no se instalan hasta que usted las acepta</strong> en el aviso de cookies, y puede aceptarlas o
        rechazarlas por categoría. Rechazarlas no le impide usar el sitio. Su decisión se conserva por 12 meses o
        hasta que actualicemos esta política, momento en el que se la volveremos a pedir.
      </p>
      <p>
        Estado actual:{' '}
        <strong>
          {consent
            ? `analíticas ${consent.categories.analytics ? 'aceptadas' : 'rechazadas'}, marketing ${consent.categories.marketing ? 'aceptadas' : 'rechazadas'}`
            : 'aún no ha tomado una decisión'}
        </strong>
        .
      </p>
      <p>
        <Button type="button" onClick={openPreferences} className={cta()}>
          Cambiar mis preferencias de cookies
        </Button>
      </p>

      <h2>Cookies que utilizamos</h2>
      <div className="overflow-x-auto rounded-xl border bg-card">
        <table>
          <thead>
            <tr>
              <th scope="col">Cookie</th>
              <th scope="col">Proveedor</th>
              <th scope="col">Tipo</th>
              <th scope="col">Finalidad</th>
              <th scope="col">Duración</th>
            </tr>
          </thead>
          <tbody>
            {cookies.map((c) => (
              <tr key={c.name}>
                <td><code>{c.name}</code></td>
                <td>{c.provider}</td>
                <td>{c.type}</td>
                <td>{c.purpose}</td>
                <td>{c.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Transferencia internacional</h2>
      <p>
        Google y Meta pueden tratar la información en servidores ubicados fuera de Colombia. Al aceptar las
        categorías correspondientes, usted autoriza esta transferencia en los términos de su política de
        privacidad: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google</a>{' '}
        y <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer">Meta</a>.
      </p>

      <h2>Cómo retirar su consentimiento</h2>
      <p>
        Puede cambiar su decisión en cualquier momento con el botón de esta página o con el enlace “Configurar
        cookies” al pie de cada página. Al revocar una categoría eliminamos las cookies asociadas que estén a
        nuestro alcance y recargamos la página. También puede borrar las cookies desde la configuración de su
        navegador.
      </p>

      <h2>Contacto</h2>
      <p>
        Para cualquier consulta sobre esta política escriba a{' '}
        <a href={`mailto:${site.privacyEmail}`}>{site.privacyEmail}</a>.
      </p>
    </LegalLayout>
  )
}
