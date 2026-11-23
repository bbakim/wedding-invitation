import S1Hero from './sections/S1Hero.jsx'
import S2Families from './sections/S2Families.jsx'
import S3Program from './sections/S3Program.jsx'
import S4Details from './sections/S4Details.jsx'
import S5Rsvp from './sections/S5Rsvp.jsx'
import S6Photos from './sections/S6Photos.jsx'
import { program } from './config.js'

export default function App() {
  return (
    <>
      {/* Tek parça zemin (renkleri temadan) — tüm sayfayı saran sabit arka plan */}
      <div
        aria-hidden="true"
        className="page-bg fixed inset-0 -z-10"
      />

      {/* Tek uzun, kaydırılabilir sayfa — bölümler arası eşit ritim */}
      <main className="flex flex-col gap-y-36 px-6 py-16 sm:gap-y-48 sm:px-10 sm:py-24">
        <S1Hero />
        <S2Families />
        {program.length > 0 && <S3Program />}
        <S4Details />
        <S5Rsvp />
        <S6Photos />
      </main>
    </>
  )
}
