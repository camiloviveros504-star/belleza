export const limits = {
  name: 80,
  email: 120,
  phone: 20,
  message: 1000,
}

const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[a-z]{2,}$/i
// Celulares colombianos (3xx xxx xxxx) o fijos con indicativo, con o sin +57.
const PHONE_RE = /^(\+?57)?\s?(3\d{2}|60\d)\s?\d{3}\s?\d{4}$/

/** Elimina caracteres de control y recorta la longitud. React ya escapa el HTML al renderizar. */
export function clean(value: string, max: number) {
  // eslint-disable-next-line no-control-regex
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim().slice(0, max)
}

export const isEmail = (v: string) => v.length <= limits.email && EMAIL_RE.test(v)
export const isPhone = (v: string) => PHONE_RE.test(v.replace(/[-.]/g, ''))
export const isName = (v: string) => v.length >= 2 && v.length <= limits.name && /^[\p{L}\s'.-]+$/u.test(v)
