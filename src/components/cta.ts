import { cn } from 'cn'
import { buttonVariants } from '@/components/ui/button'

type Variant = 'default' | 'outline' | 'ghost' | 'secondary' | 'gold' | 'light'

const extra: Record<Variant, string> = {
  default: '',
  outline: 'border-foreground/25 bg-transparent hover:bg-foreground hover:text-background',
  ghost: '',
  secondary: '',
  gold: 'bg-champagne text-espresso hover:bg-[#c9a86c]',
  light: 'bg-ivory text-espresso hover:bg-white',
}

/** Clases de botón grande para llamados a la acción, compartidas por <Button> y <Link>. */
export function cta(variant: Variant = 'default', className?: string) {
  const base = variant === 'gold' || variant === 'light' ? 'default' : variant
  return cn(
    buttonVariants({ variant: base }),
    'h-12 rounded-full px-7 text-[0.72rem] font-semibold uppercase tracking-[0.2em] transition-all duration-300 hover:-translate-y-0.5',
    extra[variant],
    className,
  )
}
