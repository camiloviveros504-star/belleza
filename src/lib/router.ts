import { createContext, useContext } from 'react'

export type RouterValue = {
  path: string
  search: string
  navigate: (to: string) => void
}

export const RouterContext = createContext<RouterValue>({ path: '/', search: '', navigate: () => {} })

export const useRouter = () => useContext(RouterContext)

export const routes = {
  home: '/',
  privacy: '/politica-de-datos',
  notice: '/aviso-de-privacidad',
  cookies: '/politica-de-cookies',
  terms: '/terminos-y-condiciones',
} as const
