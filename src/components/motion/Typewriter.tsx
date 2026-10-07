import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import { cn } from 'cn'

type Props = {
  words: readonly string[]
  className?: string
  typeSpeed?: number
  deleteSpeed?: number
  pause?: number
}

/**
 * Efecto de máquina de escribir que escribe, borra y rota palabras.
 * Los lectores de pantalla leen solo la primera palabra, sin el parpadeo.
 */
export function Typewriter({ words, className, typeSpeed = 90, deleteSpeed = 45, pause = 2000 }: Props) {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (reduce) return
    const word = words[index % words.length]
    const finished = !deleting && text === word
    const emptied = deleting && text === ''
    const delay = finished ? pause : emptied ? 350 : deleting ? deleteSpeed : typeSpeed

    const timer = setTimeout(() => {
      if (finished) setDeleting(true)
      else if (emptied) {
        setDeleting(false)
        setIndex((i) => i + 1)
      } else setText(word.slice(0, text.length + (deleting ? -1 : 1)))
    }, delay)
    return () => clearTimeout(timer)
  }, [text, deleting, index, words, reduce, typeSpeed, deleteSpeed, pause])

  return (
    <span className={cn('relative inline-block', className)}>
      <span className="sr-only">{words[0]}</span>
      <span aria-hidden="true">
        {reduce ? words[0] : text}
        <Caret />
      </span>
    </span>
  )
}

export function Caret({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn('ml-1 inline-block h-[0.85em] w-[2px] translate-y-[0.08em] animate-caret bg-champagne', className)}
    />
  )
}

/** Escribe el texto letra por letra la primera vez que entra en pantalla. */
export function TypeOnView({ text, className, speed = 0.035 }: { text: string; className?: string; speed?: number }) {
  const reduce = useReducedMotion()
  if (reduce) return <span className={className}>{text}</span>

  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-40px' }}
      variants={{ show: { transition: { staggerChildren: speed } } }}
      aria-label={text}
    >
      {[...text].map((char, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0 } } }}
        >
          {char}
        </motion.span>
      ))}
      <motion.span
        aria-hidden="true"
        variants={{ hidden: { opacity: 1 }, show: { opacity: 0, transition: { delay: text.length * speed + 1.2 } } }}
        className="inline-block"
      >
        <Caret className="h-[1em]" />
      </motion.span>
    </motion.span>
  )
}
