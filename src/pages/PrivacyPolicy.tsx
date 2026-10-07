import { Link } from '../components/Link'
import { site } from '../config/site'
import { routes } from '../lib/router'
import { LegalLayout, ResponsibleData } from './LegalLayout'

export function PrivacyPolicy() {
  return (
    <LegalLayout title="Política de tratamiento de datos personales">
      <p>
        En cumplimiento de la Ley Estatutaria 1581 de 2012, el Decreto 1377 de 2013 (compilado en el Decreto Único
        1074 de 2015) y demás normas concordantes, {site.legalName} adopta la presente política para el tratamiento de
        los datos personales que recolecta a través de este sitio web, sus canales de atención y sus instalaciones.
      </p>

      <h2>1. Responsable del tratamiento</h2>
      <ResponsibleData />

      <h2>2. Definiciones</h2>
      <ul>
        <li><strong>Dato personal:</strong> información vinculada o que pueda asociarse a una persona natural determinada o determinable.</li>
        <li><strong>Dato sensible:</strong> aquel que afecta la intimidad del titular o cuyo uso indebido puede generar discriminación, como los datos relativos a la salud o los datos biométricos.</li>
        <li><strong>Titular:</strong> persona natural cuyos datos personales son objeto de tratamiento.</li>
        <li><strong>Tratamiento:</strong> cualquier operación sobre datos personales, como la recolección, almacenamiento, uso, circulación o supresión.</li>
        <li><strong>Encargado del tratamiento:</strong> persona que trata datos personales por cuenta del responsable.</li>
        <li><strong>Autorización:</strong> consentimiento previo, expreso e informado del titular para el tratamiento.</li>
      </ul>

      <h2>3. Principios</h2>
      <p>
        Aplicamos los principios de legalidad, finalidad, libertad, veracidad o calidad, transparencia, acceso y
        circulación restringida, seguridad y confidencialidad previstos en el artículo 4 de la Ley 1581 de 2012.
      </p>

      <h2>4. Datos que recolectamos</h2>
      <ul>
        <li>Identificación y contacto: nombre, número de celular y correo electrónico.</li>
        <li>Información de la reserva: servicio de interés, fecha preferida y comentarios.</li>
        <li>Datos de salud (sensibles), únicamente si el titular decide suministrarlos y lo autoriza de forma expresa: alergias, embarazo o tratamientos que puedan afectar la seguridad del servicio.</li>
        <li>Datos de navegación obtenidos mediante cookies, según lo descrito en la <Link to={routes.cookies}>Política de cookies</Link>.</li>
      </ul>

      <h2>5. Finalidades del tratamiento</h2>
      <ol>
        <li>Gestionar solicitudes de reserva, confirmar, reprogramar o cancelar citas.</li>
        <li>Prestar los servicios contratados de forma segura, incluyendo la valoración previa.</li>
        <li>Atender peticiones, quejas, reclamos y solicitudes de garantía.</li>
        <li>Cumplir obligaciones legales, contables y tributarias, incluida la facturación electrónica.</li>
        <li>Medir y mejorar el funcionamiento del sitio web, cuando el titular haya aceptado cookies analíticas.</li>
        <li>
          Enviar información comercial, promociones y novedades, solo cuando el titular lo haya autorizado y por los
          canales que haya elegido, respetando los horarios y la frecuencia de la Ley 2300 de 2023.
        </li>
      </ol>

      <h2>6. Datos sensibles</h2>
      <p>
        El titular no está obligado a autorizar el tratamiento de datos sensibles. Cuando los suministre, se
        tratarán exclusivamente para proteger su salud y seguridad durante el servicio, con acceso restringido al
        personal que lo atiende, y nunca condicionaremos la prestación de un servicio a su entrega, salvo que sean
        indispensables para realizarlo de forma segura.
      </p>

      <h2>7. Datos de niñas, niños y adolescentes</h2>
      <p>
        Este sitio está dirigido a mayores de 18 años. El tratamiento de datos de menores de edad solo se realizará con
        la autorización de su representante legal, respetando su interés superior y sus derechos fundamentales
        (artículo 7 de la Ley 1581 de 2012).
      </p>

      <h2>8. Derechos de los titulares</h2>
      <p>De acuerdo con el artículo 8 de la Ley 1581 de 2012, el titular tiene derecho a:</p>
      <ul>
        <li>Conocer, actualizar y rectificar sus datos personales.</li>
        <li>Solicitar prueba de la autorización otorgada.</li>
        <li>Ser informado sobre el uso que se ha dado a sus datos.</li>
        <li>Presentar quejas ante la Superintendencia de Industria y Comercio (SIC) por infracciones a la ley, una vez agotado el trámite ante el responsable.</li>
        <li>Revocar la autorización y/o solicitar la supresión de sus datos cuando no exista un deber legal o contractual de conservarlos.</li>
        <li>Acceder gratuitamente a sus datos personales.</li>
      </ul>

      <h2>9. Procedimiento para consultas y reclamos</h2>
      <p>
        Las solicitudes se pueden presentar al correo <a href={`mailto:${site.privacyEmail}`}>{site.privacyEmail}</a>{' '}
        o en nuestras instalaciones, indicando nombre, documento de identidad, datos de contacto, descripción de la
        solicitud y los documentos que se quieran hacer valer.
      </p>
      <ul>
        <li>
          <strong>Consultas:</strong> se responderán en un máximo de diez (10) días hábiles desde su recibo,
          prorrogables por cinco (5) días hábiles más, informando al titular los motivos de la demora.
        </li>
        <li>
          <strong>Reclamos</strong> (corrección, actualización, supresión o incumplimiento): se responderán en un
          máximo de quince (15) días hábiles, prorrogables por ocho (8) días hábiles más. Si el reclamo está
          incompleto, se requerirá al interesado dentro de los cinco (5) días siguientes; si pasan dos (2) meses sin
          que se presente la información, se entenderá desistido.
        </li>
      </ul>

      <h2>10. Encargados y transferencias</h2>
      <p>
        Para operar el sitio podemos apoyarnos en proveedores tecnológicos (alojamiento web, envío de formularios,
        correo electrónico, analítica y publicidad) que actúan como encargados del tratamiento y pueden estar
        ubicados fuera de Colombia. Con ellos exigimos niveles adecuados de protección conforme al artículo 26 de
        la Ley 1581 de 2012 y las instrucciones de la SIC. No vendemos ni cedemos sus datos a terceros.
      </p>

      <h2>11. Seguridad de la información</h2>
      <p>
        Adoptamos medidas técnicas, humanas y administrativas para proteger los datos contra pérdida, consulta, uso
        o acceso no autorizado: cifrado en tránsito (HTTPS), cabeceras de seguridad, control de acceso con mínimo
        privilegio y capacitación del personal. Los incidentes de seguridad se reportarán a la SIC a través del
        Registro Nacional de Bases de Datos dentro de los plazos establecidos.
      </p>

      <h2>12. Vigencia y conservación</h2>
      <p>
        Esta política rige desde su publicación. Los datos se conservarán mientras sean necesarios para las
        finalidades descritas y por el tiempo exigido por la ley (por ejemplo, diez años para documentos
        contables). Cualquier cambio sustancial se informará en este sitio antes de su aplicación y, cuando
        corresponda, solicitaremos una nueva autorización.
      </p>
    </LegalLayout>
  )
}
