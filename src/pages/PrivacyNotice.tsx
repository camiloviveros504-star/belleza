import { Link } from '../components/Link'
import { site } from '../config/site'
import { routes } from '../lib/router'
import { LegalLayout } from './LegalLayout'

/** Aviso de privacidad: contenido mínimo del artículo 15 del Decreto 1377 de 2013. */
export function PrivacyNotice() {
  return (
    <LegalLayout title="Aviso de privacidad">
      <p>
        <strong>{site.legalName}</strong>, identificada con NIT {site.nit}, con domicilio en {site.address},{' '}
        {site.city}, teléfono {site.phone} y correo{' '}
        <a href={`mailto:${site.privacyEmail}`}>{site.privacyEmail}</a>, es responsable del tratamiento de los datos
        personales que usted nos suministra.
      </p>

      <h2>Tratamiento y finalidad</h2>
      <p>
        Sus datos serán recolectados, almacenados, usados y, cuando sea necesario, transmitidos a proveedores
        tecnológicos, con el fin de gestionar sus reservas, prestar nuestros servicios de forma segura, atender sus
        solicitudes, cumplir obligaciones legales y, solo si usted lo autoriza, enviarle información comercial.
      </p>

      <h2>Datos sensibles</h2>
      <p>
        Las preguntas sobre datos sensibles (por ejemplo, información de salud) son de respuesta facultativa. Usted no
        está obligado a responderlas ni a autorizar su tratamiento.
      </p>

      <h2>Derechos del titular</h2>
      <p>
        Usted puede conocer, actualizar, rectificar y suprimir sus datos, solicitar prueba de la autorización,
        ser informado del uso dado a sus datos, revocar la autorización y presentar quejas ante la Superintendencia
        de Industria y Comercio.
      </p>

      <h2>Política de tratamiento</h2>
      <p>
        Puede consultar nuestra <Link to={routes.privacy}>Política de tratamiento de datos personales</Link>, donde se
        describen los procedimientos para ejercer sus derechos, y nuestra{' '}
        <Link to={routes.cookies}>Política de cookies</Link>.
      </p>
    </LegalLayout>
  )
}
