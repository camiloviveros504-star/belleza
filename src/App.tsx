import { AnimatePresence, MotionConfig, motion } from 'motion/react'
import { Toaster } from '@/components/ui/sonner'
import { CookieBanner } from './components/CookieBanner'
import { CookiePreferences } from './components/CookiePreferences'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { ease } from './components/motion/ease'
import { WhatsAppButton } from './components/WhatsAppButton'
import { ConsentProvider } from './context/ConsentProvider'
import { RouterProvider } from './context/RouterProvider'
import { routes, useRouter } from './lib/router'
import { CookiePolicy } from './pages/CookiePolicy'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { PrivacyNotice } from './pages/PrivacyNotice'
import { PrivacyPolicy } from './pages/PrivacyPolicy'
import { Terms } from './pages/Terms'

const pages: Record<string, () => React.JSX.Element> = {
  [routes.home]: Home,
  [routes.privacy]: PrivacyPolicy,
  [routes.notice]: PrivacyNotice,
  [routes.cookies]: CookiePolicy,
  [routes.terms]: Terms,
}

/** Transición entre páginas: la saliente se desvanece y la entrante sube (solo opacidad y transform, aceleradas por GPU). */
function CurrentPage() {
  const { path } = useRouter()
  const key = path.replace(/\/+$/, '') || '/'
  const Page = pages[key] ?? NotFound

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={key}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.45, ease }}
      >
        <Page />
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    // "user": respeta la preferencia del sistema de reducir el movimiento.
    <MotionConfig reducedMotion="user">
      <RouterProvider>
        <ConsentProvider>
          <a
            href="#contenido"
            className="fixed top-3 left-3 z-[100] -translate-y-20 rounded-lg bg-espresso px-4 py-2 text-ivory transition-transform focus:translate-y-0"
          >
            Saltar al contenido
          </a>
          <Header />
          <main id="contenido">
            <CurrentPage />
          </main>
          <Footer />
          <WhatsAppButton />
          <CookieBanner />
          <CookiePreferences />
          <Toaster position="top-center" />
        </ConsentProvider>
      </RouterProvider>
    </MotionConfig>
  )
}
