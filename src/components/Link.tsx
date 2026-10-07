import type { AnchorHTMLAttributes, MouseEvent } from 'react'
import { useRouter } from '../lib/router'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { to: string }

/** Enlace interno que navega sin recargar la página. */
export function Link({ to, onClick, ...rest }: Props) {
  const { navigate } = useRouter()

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e)
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    e.preventDefault()
    navigate(to)
  }

  return <a href={to} onClick={handleClick} {...rest} />
}
