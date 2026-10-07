import { useEffect } from 'react'
import { site } from '../config/site'
import { Benefits } from '../sections/Benefits'
import { BookingForm } from '../sections/BookingForm'
import { Faq } from '../sections/Faq'
import { Hero } from '../sections/Hero'
import { Marquee } from '../sections/Marquee'
import { Newsletter } from '../sections/Newsletter'
import { Promo } from '../sections/Promo'
import { Services } from '../sections/Services'
import { Testimonials } from '../sections/Testimonials'

export function Home() {
  useEffect(() => {
    document.title = `${site.brandName} | Estética y belleza en ${site.city.split(',')[0]}`
  }, [])

  return (
    <>
      <Hero />
      <Marquee />
      <Services />
      <Benefits />
      <Promo />
      <Testimonials />
      <BookingForm />
      <Faq />
      <Newsletter />
    </>
  )
}
