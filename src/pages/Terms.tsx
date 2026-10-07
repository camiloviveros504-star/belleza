import { Link } from '../components/Link'
import { site } from '../config/site'
import { routes } from '../lib/router'
import { LegalLayout } from './LegalLayout'

export function Terms() {
  return (
    <LegalLayout title="Términos y condiciones">
      <p>
        Estos términos regulan el uso del sitio web de {site.brandName} y las reservas de servicios realizadas a
        través de él. Al usar el sitio usted acepta estas condiciones, que se rigen por la Ley 1480 de 2011 (Estatuto
        del Consumidor), la Ley 527 de 1999 (comercio electrónico) y demás normas colombianas aplicables.
      </p>

      <h2>1. Identificación del prestador</h2>
      <p>
        {site.legalName}, NIT {site.nit}, domicilio en {site.address}, {site.city}. Teléfono {site.phone}, correo{' '}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>

      <h2>2. Servicios y precios</h2>
      <p>
        La información sobre servicios, duración y precios es la vigente al momento de la consulta. Todos los precios
        se expresan en pesos colombianos e incluyen IVA. Los resultados de los tratamientos estéticos pueden variar
        según cada persona; nuestros servicios son de carácter cosmético y no constituyen tratamientos médicos.
      </p>

      <h2>3. Reservas</h2>
      <p>
        El formulario del sitio es una solicitud de reserva. La cita queda confirmada únicamente cuando le enviamos la
        confirmación por el medio de contacto que indicó. Puede cancelar o reprogramar sin costo avisando con al
        menos 24 horas de anticipación.
      </p>

      <h2>4. Promociones</h2>
      <p>
        Cada promoción indica su vigencia, número de cupos, condiciones y restricciones. Si no se indican cupos, la
        promoción aplica durante toda su vigencia. Las promociones no son acumulables salvo indicación expresa.
      </p>

      <h2>5. Derecho de retracto</h2>
      <p>
        Cuando adquiera un servicio o bono pagado por medios no presenciales, podrá ejercer el derecho de retracto
        dentro de los cinco (5) días hábiles siguientes a la compra, siempre que el servicio no haya comenzado a
        prestarse con su acuerdo (artículo 47 de la Ley 1480 de 2011). El dinero se reintegrará dentro de los treinta
        (30) días calendario siguientes.
      </p>

      <h2>6. Garantía y PQRS</h2>
      <p>
        Respondemos por la calidad e idoneidad de nuestros servicios. Si no está satisfecha(o), puede presentar
        peticiones, quejas, reclamos o solicitudes de garantía al correo{' '}
        <a href={`mailto:${site.email}`}>{site.email}</a>, que responderemos dentro de los quince (15) días hábiles
        siguientes. También puede acudir a la{' '}
        <a href="https://www.sic.gov.co" target="_blank" rel="noopener noreferrer">Superintendencia de Industria y Comercio</a>.
      </p>

      <h2>7. Productos cosméticos</h2>
      <p>
        Los productos utilizados cuentan con Notificación Sanitaria Obligatoria vigente ante el INVIMA. Las
        afirmaciones publicitarias sobre productos se refieren a sus efectos cosméticos y no a propiedades
        terapéuticas.
      </p>

      <h2>8. Propiedad intelectual</h2>
      <p>
        Los textos, imágenes, logotipos y diseño del sitio son propiedad de {site.legalName} o se usan con
        autorización. No pueden reproducirse sin permiso previo y escrito.
      </p>

      <h2>9. Datos personales</h2>
      <p>
        El tratamiento de sus datos se rige por nuestra{' '}
        <Link to={routes.privacy}>Política de tratamiento de datos personales</Link> y nuestra{' '}
        <Link to={routes.cookies}>Política de cookies</Link>.
      </p>

      <h2>10. Ley aplicable</h2>
      <p>
        Estos términos se rigen por las leyes de la República de Colombia. Cualquier controversia se someterá a las
        autoridades colombianas competentes, sin perjuicio de los derechos que la ley otorga al consumidor.
      </p>
    </LegalLayout>
  )
}
