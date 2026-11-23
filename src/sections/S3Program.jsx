import SectionShell from '../components/SectionShell.jsx'
import Reveal from '../components/Reveal.jsx'
import { programIcons } from '../components/icons.jsx'
import { program, formatTime, t } from '../config.js'

export default function S3Program() {
  return (
    <SectionShell id="program">
      <div className="engrave w-full rounded-sm px-6 py-10 sm:px-12">
        <Reveal delay={150}>
          <p className="eyebrow mb-4">{t('programEyebrow')}</p>
        </Reveal>

        <Reveal delay={150}>
          <h2 className="font-display text-4xl font-medium tracking-[0.18em] text-porcelain sm:text-6xl mb-8">
            {t('programTitle')}
          </h2>
        </Reveal>

        <ul>
          {program.map((item, i) => {
            const Icon = programIcons[item.icon]
            return (
              <Reveal
                as="li"
                delay={150}
                key={`${item.title}-${i}`}
                className={`flex items-center gap-5 px-4 py-5 sm:px-6 ${
                  i !== program.length - 1 ? 'border-b border-mist/15' : ''
                }`}
              >
                <Icon className="w-9 shrink-0 text-corn sm:w-10" />
                <span className="flex-1 text-left font-display text-2xl text-porcelain sm:text-3xl">
                  {item.title}
                </span>
                <span className="font-body text-base tracking-[0.18em] text-mist/80 sm:text-lg">
                  {formatTime(item.time)}
                </span>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </SectionShell>
  )
}
