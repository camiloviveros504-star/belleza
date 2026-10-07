import type { ReactNode } from 'react'
import { cn } from 'cn'
import { Reveal } from './Reveal'
import { TypeOnView } from './Typewriter'

type Props = {
  id: string
  eyebrow: string
  title: ReactNode
  intro?: ReactNode
  align?: 'left' | 'center'
  tone?: 'light' | 'dark'
  className?: string
}

/** Encabezado de sección: antetítulo con máquina de escribir y título que se revela. */
export function SectionHeading({ id, eyebrow, title, intro, align = 'left', tone = 'light', className }: Props) {
  return (
    <header className={cn('mb-14 max-w-2xl', align === 'center' && 'mx-auto text-center', className)}>
      <p
        className={cn(
          'mb-5 flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.32em]',
          tone === 'dark' ? 'text-champagne' : 'text-mocha',
          align === 'center' && 'justify-center',
        )}
      >
        <span aria-hidden="true" className="h-px w-10 bg-current" />
        <TypeOnView text={eyebrow} />
      </p>
      <Reveal>
        <h2 id={id} className={cn('text-4xl leading-[1.05] sm:text-5xl lg:text-6xl', tone === 'dark' && 'text-ivory')}>
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.15}>
          <p className={cn('mt-6 text-base leading-relaxed', tone === 'dark' ? 'text-ivory/70' : 'text-muted-foreground')}>
            {intro}
          </p>
        </Reveal>
      )}
    </header>
  )
}
