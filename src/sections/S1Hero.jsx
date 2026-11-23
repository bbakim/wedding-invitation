import SectionShell from '../components/SectionShell.jsx'
import Reveal from '../components/Reveal.jsx'
import EnvelopeScene from '../components/EnvelopeScene.jsx'
import { t } from '../config.js'

// Uzun başlıklarda (ör. İngilizce) harf aralığı daralır ki satırlar dengeli kalsın.
const longTitle = t('heroTitle').length > 14

export default function S1Hero() {
  return (
    <SectionShell id="hero">
      <Reveal delay={150}>
        <h1
          className={`text-balance font-display text-[clamp(1.85rem,8vw,4.5rem)] font-medium tracking-[0.12em] text-porcelain ${
            longTitle ? 'sm:tracking-[0.14em]' : 'sm:tracking-[0.28em]'
          }`}
        >
          {t('heroTitle')}
        </h1>
        <EnvelopeScene />
      </Reveal>

      <Reveal delay={150} className="mt-8">
        <p className="mx-auto max-w-md font-display text-xl italic leading-relaxed text-mist/85 sm:text-2xl">
          {t('heroMessage')}
        </p>
      </Reveal>

      <Reveal delay={150} className="mt-8 flex flex-col items-center">
        <span className="block h-12 w-px bg-gradient-to-b from-corn/60 to-transparent" />
        <span className="mt-2 block text-[0.6rem] uppercase tracking-[0.3em] text-mist/50">
          {t('scrollHint')}
        </span>
      </Reveal>
    </SectionShell>
  )
}
