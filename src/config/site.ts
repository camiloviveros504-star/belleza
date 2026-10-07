/**
 * Datos del negocio. REEMPLAZA todos los valores de ejemplo por los reales
 * antes de publicar: la Ley 1581 de 2012 y el Decreto 1377 de 2013 exigen que
 * el responsable del tratamiento esté plenamente identificado.
 */
export const site = {
  brandName: 'Aurora Beauty Studio',
  legalName: 'Aurora Beauty Studio S.A.S.',
  nit: '900.000.000-0',
  address: 'Calle 93 # 11-26, Local 2',
  city: 'Bogotá D.C., Colombia',
  phone: '+57 601 000 0000',
  whatsapp: '573000000000', // formato internacional sin "+" ni espacios
  email: 'hola@aurorabeauty.co',
  privacyEmail: 'datospersonales@aurorabeauty.co',
  hours: [
    { days: 'Lunes a viernes', time: '8:00 a. m. – 7:00 p. m.' },
    { days: 'Sábados', time: '8:00 a. m. – 5:00 p. m.' },
    { days: 'Domingos y festivos', time: 'Cerrado' },
  ],
  social: {
    instagram: 'https://www.instagram.com/',
    facebook: 'https://www.facebook.com/',
    tiktok: 'https://www.tiktok.com/',
  },
  /** Cambia la versión cuando modifiques las políticas: se volverá a pedir el consentimiento. */
  policyVersion: '1.0',
  policyDate: '6 de octubre de 2026',
} as const

export const env = {
  formEndpoint: import.meta.env.VITE_FORM_ENDPOINT as string | undefined,
  newsletterEndpoint: import.meta.env.VITE_NEWSLETTER_ENDPOINT as string | undefined,
  ga4Id: import.meta.env.VITE_GA4_ID as string | undefined,
  metaPixelId: import.meta.env.VITE_META_PIXEL_ID as string | undefined,
}

export const whatsappLink = (text = 'Hola, quiero agendar una cita') =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`
