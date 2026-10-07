import { motion } from 'motion/react'
import { whatsappLink } from '@/config/site'
import { trackEvent } from '@/lib/trackers'

export function WhatsAppButton() {
  return (
    <motion.a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      onClick={() => trackEvent('contact_whatsapp')}
      initial={{ scale: 0, rotate: -90 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ delay: 1.5, type: 'spring', stiffness: 200, damping: 14 }}
      whileHover={{ scale: 1.08, rotateY: 180 }}
      style={{ transformPerspective: 600 }}
      className="fixed right-5 bottom-5 z-30 grid size-14 place-items-center rounded-full bg-espresso text-champagne shadow-[0_15px_35px_-12px_rgba(42,31,26,0.7)] ring-1 ring-champagne/40"
    >
      <svg viewBox="0 0 32 32" width="26" height="26" aria-hidden="true">
        <path
          fill="currentColor"
          d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.2.6 4.4 1.7 6.3L3 29l7.3-1.9c1.8 1 3.8 1.5 5.8 1.5 7 0 12.7-5.6 12.7-12.6S23 3 16 3Zm0 23.2c-1.9 0-3.7-.5-5.3-1.4l-.4-.2-4.3 1.1 1.2-4.2-.3-.4a10.4 10.4 0 0 1-1.6-5.5C5.3 9.8 10.1 5.1 16 5.1s10.7 4.7 10.7 10.5S21.9 26.2 16 26.2Zm5.9-7.9c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6.3-.5c.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.7s1.2 3.2 1.4 3.4c.2.2 2.4 3.6 5.7 5 .8.3 1.4.5 1.9.7.8.2 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.5Z"
        />
      </svg>
    </motion.a>
  )
}
