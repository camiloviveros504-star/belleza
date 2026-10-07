import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import { Menu } from 'lucide-react'
import { useState } from 'react'
import { cn } from 'cn'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { site } from '@/config/site'
import { routes } from '@/lib/router'
import { cta } from './cta'
import { Link } from './Link'
import { ease } from './motion/ease'

const nav = [
  { label: 'Servicios', to: '/#servicios' },
  { label: 'Promociones', to: '/#promociones' },
  { label: 'Testimonios', to: '/#testimonios' },
  { label: 'Preguntas', to: '/#preguntas' },
]

function Logo() {
  return (
    <Link to={routes.home} className="group flex items-center gap-3" aria-label={`${site.brandName}, inicio`}>
      <span className="grid size-10 place-items-center rounded-full border border-champagne/60 font-heading text-xl italic text-espresso transition-transform duration-700 group-hover:[transform:rotateY(180deg)]">
        A
      </span>
      <span className="leading-none">
        <span className="block font-heading text-2xl tracking-wide">Aurora</span>
        <span className="block text-[0.55rem] uppercase tracking-[0.42em] text-muted-foreground">Beauty Studio</span>
      </span>
    </Link>
  )
}

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(() => window.scrollY > 24)
  const { scrollY, scrollYProgress } = useScroll()
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 24))

  return (
    <header
      className={cn(
        'sticky top-0 z-40 h-[var(--header-h)] transition-all duration-500',
        scrolled ? 'border-b bg-ivory/80 shadow-[0_10px_30px_-25px_rgba(42,31,26,0.5)] backdrop-blur-xl' : 'bg-transparent',
      )}
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease }}
        className="mx-auto flex h-full max-w-7xl items-center justify-between gap-6 px-4 sm:px-8"
      >
        <Logo />

        <nav aria-label="Principal" className="hidden items-center gap-10 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="group relative text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-foreground/80 transition-colors hover:text-foreground"
            >
              {item.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-full origin-right scale-x-0 bg-champagne transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" />
            </Link>
          ))}
          <Link to="/#reservar" className={cta('default', 'h-10 px-6')}>
            Reservar
          </Link>
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger render={<Button variant="ghost" size="icon-lg" className="lg:hidden" aria-label="Abrir menú" />}>
            <Menu className="size-6" />
          </SheetTrigger>
          <SheetContent side="right" className="w-[86%] bg-ivory p-8 sm:max-w-sm">
            <SheetTitle className="sr-only">Menú</SheetTitle>
            <nav aria-label="Principal móvil" className="mt-16 grid gap-2">
              {nav.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.6, ease }}
                >
                  <Link to={item.to} onClick={() => setOpen(false)} className="block border-b py-4 font-heading text-4xl">
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <Link to="/#reservar" onClick={() => setOpen(false)} className={cta('default', 'mt-8 w-full')}>
                Reservar cita
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </motion.div>

      {/* Barra de progreso de lectura */}
      <motion.div aria-hidden="true" style={{ scaleX: scrollYProgress }} className="absolute bottom-0 left-0 h-px w-full origin-left bg-champagne" />
    </header>
  )
}
