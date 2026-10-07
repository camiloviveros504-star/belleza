import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { RouterContext } from '../lib/router'
import { trackPageView } from '../lib/trackers'

function scrollToHash(hash: string, attempts = 60) {
  if (!hash) {
    window.scrollTo({ top: 0 })
    return
  }
  // La sección puede no existir aún si venimos de otra página (hay transición): reintenta ~1 s.
  requestAnimationFrame(() => {
    const el = document.getElementById(decodeURIComponent(hash.slice(1)))
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    else if (attempts > 0) scrollToHash(hash, attempts - 1)
  })
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [location_, setLocation] = useState({ path: location.pathname, search: location.search })

  useEffect(() => {
    if (location.hash) scrollToHash(location.hash)
    const onPop = () => setLocation({ path: location.pathname, search: location.search })
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const navigate = useCallback((to: string) => {
    const url = new URL(to, location.origin)
    const target = url.pathname + url.search + url.hash
    if (target !== location.pathname + location.search + location.hash) history.pushState(null, '', target)
    setLocation({ path: url.pathname, search: url.search })
    scrollToHash(url.hash)
    trackPageView(url.pathname)
  }, [])

  const value = useMemo(() => ({ ...location_, navigate }), [location_, navigate])
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
}
