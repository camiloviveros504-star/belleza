/**
 * Contenido de marketing. Los precios deben incluir IVA cuando aplique
 * (art. 26 Ley 1480 de 2011) y los testimonios deben ser reales y contar con
 * autorización de quien los da: la publicidad engañosa está prohibida por la
 * misma ley. Reemplaza los testimonios de ejemplo antes de publicar.
 */
export type Service = {
  id: string
  name: string
  description: string
  duration: string
  price: number
  tag?: string
}

export const services: Service[] = [
  {
    id: 'facial',
    name: 'Limpieza facial profunda',
    description: 'Extracción, exfoliación enzimática, mascarilla hidratante y protección solar.',
    duration: '75 min',
    price: 150000,
    tag: 'Más pedido',
  },
  {
    id: 'manicure',
    name: 'Manicure y pedicure spa',
    description: 'Cuidado de cutícula, exfoliación, masaje relajante y esmaltado semipermanente.',
    duration: '90 min',
    price: 95000,
  },
  {
    id: 'cejas',
    name: 'Diseño de cejas y lifting de pestañas',
    description: 'Visagismo personalizado, laminado de cejas y lifting con tinte.',
    duration: '60 min',
    price: 120000,
  },
  {
    id: 'cabello',
    name: 'Tratamiento capilar hidratante',
    description: 'Diagnóstico de cuero cabelludo, nutrición profunda y brushing.',
    duration: '80 min',
    price: 135000,
  },
  {
    id: 'maquillaje',
    name: 'Maquillaje social',
    description: 'Maquillaje para eventos con productos de larga duración y prueba previa.',
    duration: '60 min',
    price: 160000,
    tag: 'Eventos',
  },
  {
    id: 'masaje',
    name: 'Masaje relajante',
    description: 'Masaje corporal con aceites esenciales para liberar tensión.',
    duration: '60 min',
    price: 140000,
  },
]

export const benefits = [
  { title: 'Profesionales certificadas', text: 'Esteticistas y cosmetólogas con formación técnica y actualización constante.' },
  { title: 'Productos con registro INVIMA', text: 'Usamos únicamente cosméticos con Notificación Sanitaria Obligatoria vigente.' },
  { title: 'Bioseguridad', text: 'Instrumental esterilizado y material desechable en cada servicio.' },
  { title: 'Atención personalizada', text: 'Valoración previa para recomendarte solo lo que tu piel y tu cabello necesitan.' },
]

export const testimonials = [
  { name: 'Laura M.', service: 'Limpieza facial', text: 'Mi piel quedó luminosa y la atención fue increíble. Ya agendé mi próxima cita.' },
  { name: 'Daniela R.', service: 'Lifting de pestañas', text: 'Resultado natural y duradero. El lugar es muy limpio y tranquilo.' },
  { name: 'Carolina P.', service: 'Maquillaje social', text: 'Me maquillaron para mi grado y aguantó toda la noche. ¡Volveré!' },
  { name: 'Valentina G.', service: 'Tratamiento capilar', text: 'Mi cabello recuperó el brillo desde la primera sesión. Muy profesionales.' },
  { name: 'Andrea S.', service: 'Manicure spa', text: 'Un momento de calma total. Los detalles y la higiene son impecables.' },
]

export const faqs = [
  {
    q: '¿Cómo agendo mi cita?',
    a: 'Puedes reservar desde el formulario de esta página o escribirnos por WhatsApp. Te confirmamos disponibilidad en horario de atención.',
  },
  {
    q: '¿Puedo cancelar o reprogramar?',
    a: 'Sí. Avísanos con al menos 24 horas de anticipación y reprogramamos sin costo.',
  },
  {
    q: '¿Qué medios de pago reciben?',
    a: 'Efectivo, tarjetas débito y crédito, Nequi, Daviplata y transferencia bancaria. Todos nuestros precios incluyen IVA.',
  },
  {
    q: '¿Los tratamientos tienen contraindicaciones?',
    a: 'Algunos servicios no se recomiendan durante el embarazo o con ciertas condiciones de la piel. Antes de cada servicio hacemos una valoración. Nuestros servicios son estéticos y no reemplazan la consulta médica.',
  },
  {
    q: '¿Cómo protegen mis datos?',
    a: 'Tratamos tus datos según la Ley 1581 de 2012 y nuestra Política de Tratamiento de Datos Personales. Puedes conocer, actualizar, rectificar o suprimir tus datos en cualquier momento.',
  },
]

export const formatCOP = (value: number) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value)
