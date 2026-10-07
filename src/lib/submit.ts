import { site } from '../config/site'

export type SubmitResult = { ok: true; demo: boolean } | { ok: false; error: string }

const COOLDOWN_MS = 30_000
const lastSent = new Map<string, number>()

/**
 * Envía el formulario a un servicio externo (Formspree, Getform, una función
 * serverless propia, etc.) configurado en las variables de entorno. Adjunta la
 * prueba de la autorización de tratamiento de datos (art. 9 Decreto 1377/2013).
 */
export async function submitForm(
  key: string,
  endpoint: string | undefined,
  data: Record<string, unknown>,
): Promise<SubmitResult> {
  const now = Date.now()
  if (now - (lastSent.get(key) ?? 0) < COOLDOWN_MS) {
    return { ok: false, error: 'Ya recibimos un envío hace un momento. Espera unos segundos e inténtalo de nuevo.' }
  }

  const payload = {
    ...data,
    _authorization: {
      policyVersion: site.policyVersion,
      acceptedAt: new Date().toISOString(),
      page: location.pathname,
    },
  }

  if (!endpoint) {
    lastSent.set(key, now)
    console.info('[modo demostración] Configura VITE_FORM_ENDPOINT para recibir los envíos.', payload)
    return { ok: true, demo: true }
  }

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error(String(res.status))
    lastSent.set(key, now)
    return { ok: true, demo: false }
  } catch {
    return { ok: false, error: 'No pudimos enviar tu solicitud. Inténtalo de nuevo o escríbenos por WhatsApp.' }
  }
}
