import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react'
import type { PointerEvent, ReactNode } from 'react'
import { cn } from 'cn'

/**
 * Tarjeta con inclinación 3D que sigue al puntero y un reflejo de luz.
 * Los hijos con `[transform:translateZ(..)]` flotan sobre la superficie.
 */
export function Tilt({ children, className, max = 9 }: { children: ReactNode; className?: string; max?: number }) {
  const reduce = useReducedMotion()
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)
  const spring = { stiffness: 180, damping: 18, mass: 0.6 }
  const rotateX = useSpring(useTransform(y, [0, 1], [max, -max]), spring)
  const rotateY = useSpring(useTransform(x, [0, 1], [-max, max]), spring)
  const gx = useTransform(x, (v) => `${v * 100}%`)
  const gy = useTransform(y, (v) => `${v * 100}%`)
  const glare = useMotionTemplate`radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.45), transparent 55%)`

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - r.left) / r.width)
    y.set((e.clientY - r.top) / r.height)
  }
  const onLeave = () => {
    x.set(0.5)
    y.set(0.5)
  }

  return (
    <motion.div
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 1100, transformStyle: 'preserve-3d' }}
      className={cn('group/tilt relative', className)}
    >
      {children}
      <motion.div
        aria-hidden="true"
        style={{ background: glare }}
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 mix-blend-soft-light transition-opacity duration-500 group-hover/tilt:opacity-100"
      />
    </motion.div>
  )
}
