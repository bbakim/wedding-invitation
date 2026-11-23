// Her bölüm için ortak kabuk: ortalama + ortak genişlik.
// Öğeler arası boşluk artık container gap'i ile DEĞİL, her bloğa verilen
// mt-36 sm:mt-48 ile sağlanır — böylece her öğe ayrı bir Reveal'a alınabilir
// ve aralarındaki ritim bozulmaz.
export default function SectionShell({ id, className = '', children }) {
  return (
    <section id={id} className={`flex w-full flex-col items-center ${className}`}>
      <div className="flex w-full max-w-3xl flex-col items-center text-center">
        {children}
      </div>
    </section>
  )
}
