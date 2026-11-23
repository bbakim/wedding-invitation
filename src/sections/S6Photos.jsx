import SectionShell from '../components/SectionShell.jsx'
import Reveal from '../components/Reveal.jsx'
import { CameraHeart, BrideCar } from '../components/icons.jsx'
import { photos, t } from '../config.js'

export default function S6Photos() {
  return (
    <SectionShell id="photos">
      {photos.url && (
        <>
          <Reveal delay={150}>
            <CameraHeart className="mx-auto w-20 text-corn sm:w-24" />
          </Reveal>

          <Reveal delay={150} className="mt-8">
            <p className="mx-auto max-w-md font-display text-xl italic leading-relaxed text-mist/90 sm:text-2xl">
              {t('photosMessage')}
            </p>
          </Reveal>

          <Reveal delay={150} className="mt-8">
            <a
              href={photos.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-sm border border-corn bg-corn/10 px-7 py-3 font-body text-sm uppercase tracking-[0.22em] text-porcelain transition-colors hover:bg-corn/25"
            >
              {t('photosCta')}
            </a>
          </Reveal>
        </>
      )}

      <Reveal delay={150} className={photos.url ? 'mt-36 sm:mt-48' : ''}>
        <p className="font-display text-4xl tracking-[0.18em] text-porcelain sm:text-6xl">
          {t('thankYou')}
        </p>
      </Reveal>

      <Reveal delay={150} className="mt-8">
        <BrideCar className="mx-auto w-44 text-mist/70 sm:w-56" />
      </Reveal>
    </SectionShell>
  )
}
