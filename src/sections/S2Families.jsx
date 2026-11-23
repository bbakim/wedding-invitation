import SectionShell from '../components/SectionShell.jsx'
import Reveal from '../components/Reveal.jsx'
import Countdown from '../components/Countdown.jsx'
import { Flourish } from '../components/icons.jsx'
import { families, targetISO, t } from '../config.js'

function Family({ family, className }) {
  return (
    <Reveal delay={150} className={className}>
      <p className="font-display text-2xl text-porcelain sm:text-3xl">{family.names}</p>
      <p className="font-display text-2xl text-porcelain sm:text-3xl">{family.surname}</p>
    </Reveal>
  )
}

const Ornament = () => (
  <Reveal delay={150} className="flex flex-col items-center px-2">
    <Flourish className="w-44 text-corn sm:w-48" />
  </Reveal>
)

export default function S2Families() {
  return (
    <SectionShell id="families">
      {families.length === 2 && (
        <div className="engrave mb-36 w-full rounded-sm px-6 py-10 sm:mb-48 sm:px-12">
          <div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-[1fr_auto_1fr]">
            <Family family={families[0]} className="text-center sm:text-right" />
            <Ornament />
            <Family family={families[1]} className="text-center sm:text-left" />
          </div>
        </div>
      )}

      {families.length === 1 && (
        <div className="engrave mb-36 flex w-full flex-col items-center gap-6 rounded-sm px-6 py-10 sm:mb-48 sm:px-12">
          <Ornament />
          <Family family={families[0]} className="text-center" />
        </div>
      )}

      <Reveal delay={150}>
        <p className="eyebrow">{t('countdownTitle')}</p>
      </Reveal>

      <Reveal delay={150} className="mt-6">
        <Countdown targetISO={targetISO} />
      </Reveal>
    </SectionShell>
  )
}
