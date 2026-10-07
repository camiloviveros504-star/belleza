import { motion, useReducedMotion, type HTMLMotionProps } from 'motion/react'
import { ease } from './ease'

type Props = HTMLMotionProps<'div'> & { delay?: number; y?: number }

/** Aparece con desenfoque y desplazamiento la primera vez que entra en pantalla. */
export function Reveal({ delay = 0, y = 32, children, ...rest }: Props) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, delay, ease }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

/** Contenedor que anima a sus hijos <StaggerItem> en cascada. */
export function Stagger({ children, gap = 0.12, ...rest }: HTMLMotionProps<'ul'> & { gap?: number }) {
  const reduce = useReducedMotion()
  return (
    <motion.ul
      initial={reduce ? false : 'hidden'}
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      variants={{ show: { transition: { staggerChildren: gap } } }}
      {...rest}
    >
      {children}
    </motion.ul>
  )
}

export function StaggerItem({ children, ...rest }: HTMLMotionProps<'li'>) {
  return (
    <motion.li
      variants={{
        hidden: { opacity: 0, y: 40, rotateX: -12 },
        show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.9, ease } },
      }}
      style={{ transformPerspective: 1200 }}
      {...rest}
    >
      {children}
    </motion.li>
  )
}
