import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Reveal } from '@/components/motion/Reveal'
import { SectionHeading } from '@/components/motion/SectionHeading'
import { faqs } from '@/data/content'

export function Faq() {
  return (
    <section id="preguntas" aria-labelledby="faq-title" className="py-28 sm:py-36">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading
          id="faq-title"
          eyebrow="Preguntas frecuentes"
          title={
            <>
              Todo lo que <em className="text-gilded">necesitas</em> saber
            </>
          }
        />
        <Reveal>
          <Accordion className="border-t">
            {faqs.map((f) => (
              <AccordionItem key={f.q} value={f.q} className="border-b">
                <AccordionTrigger className="py-6 font-heading text-2xl font-normal hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-base leading-relaxed text-muted-foreground">
                  <p>{f.a}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  )
}
