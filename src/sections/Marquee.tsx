const items = ['Faciales', 'Cejas', 'Pestañas', 'Manicure', 'Cabello', 'Maquillaje', 'Masajes', 'Bienestar']

/** Cinta infinita de servicios, al estilo de las casas de moda. */
export function Marquee() {
  const row = [...items, ...items]
  return (
    <div aria-hidden="true" className="relative overflow-hidden border-y border-espresso/10 bg-espresso py-6 text-ivory">
      <div className="flex w-max animate-marquee">
        {row.map((item, i) => (
          <span key={i} className="flex items-center font-heading text-3xl italic sm:text-4xl">
            <span className="px-8">{item}</span>
            <span className="text-lg text-champagne not-italic">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
