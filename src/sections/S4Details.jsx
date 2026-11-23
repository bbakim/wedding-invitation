import SectionShell from '../components/SectionShell.jsx'
import Reveal from '../components/Reveal.jsx'
import { CalendarHeart, Clock, LocationHeart } from '../components/icons.jsx'
import { venue, dateShort, timeText, assetUrl, t } from '../config.js'

function Detail({ icon: Icon, value }) {
  return (
    <div className="flex flex-col items-center gap-2 py-5">
      <Icon className="w-10 text-corn" />
      <span className="font-display text-2xl tracking-wide text-porcelain sm:text-3xl">{value}</span>
    </div>
  )
}

function MapCard() {
  return (
    <a
      href={venue.mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block overflow-hidden rounded-sm border border-mist/25 transition-colors hover:border-corn"
    >
      {venue.mapImage ? (
        <div className="relative h-44 sm:h-52">
          <img
            src={assetUrl(venue.mapImage)}
            alt={t('mapAlt', { venue: venue.name })}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
          {/* alttan koyu geçiş + mekan adı */}
          <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-gradient-to-t from-ink/85 via-ink/40 to-transparent px-4 pb-3 pt-10 text-porcelain">
            <LocationHeart className="w-6 shrink-0 text-corn" />
            <span className="font-display text-lg leading-tight">{venue.name}</span>
          </div>
        </div>
      ) : (
        // Görsel yoksa: sade, ikonlu başlık
        <div className="flex flex-col items-center gap-3 bg-deep/40 px-4 py-8 text-porcelain">
          <LocationHeart className="w-12 text-corn transition-transform duration-700 group-hover:scale-110" />
          <span className="font-display text-2xl leading-tight">{venue.name}</span>
        </div>
      )}
      <p className="bg-deep/60 px-4 py-3 text-center font-body text-sm tracking-wide text-mist/85 group-hover:text-porcelain">
        {t('mapCta')}
      </p>
    </a>
  )
}

export default function S4Details() {
  const hasMapBlock = venue.mapsUrl || venue.address

  return (
    <SectionShell id="details">
      {/* Hafif süslü kutu */}
      <div className="engrave relative w-full max-w-md rounded-sm px-8 py-6">
        {/* köşe süsleri */}
        <span className="pointer-events-none absolute left-3 top-3 h-4 w-4 border-l border-t border-corn/50" />
        <span className="pointer-events-none absolute right-3 top-3 h-4 w-4 border-r border-t border-corn/50" />
        <span className="pointer-events-none absolute bottom-3 left-3 h-4 w-4 border-b border-l border-corn/50" />
        <span className="pointer-events-none absolute bottom-3 right-3 h-4 w-4 border-b border-r border-corn/50" />

        <Reveal delay={150}>
          <p className="eyebrow">{t('detailsTitle')}</p>
        </Reveal>

        <Reveal delay={150}>
          <Detail icon={CalendarHeart} value={dateShort} />
        </Reveal>
        <span className="mx-auto block h-px w-16 bg-mist/20" />
        <Reveal delay={150}>
          <Detail icon={Clock} value={timeText} />
        </Reveal>
        <span className="mx-auto block h-px w-16 bg-mist/20" />
        <Reveal delay={150}>
          <Detail icon={LocationHeart} value={venue.name} />
        </Reveal>
      </div>

      {hasMapBlock && (
        <div className="mt-36 w-full max-w-md sm:mt-48">
          {venue.mapsUrl && (
            <Reveal delay={150}>
              <MapCard />
            </Reveal>
          )}

          {venue.address && (
            <Reveal delay={150} className="mt-3">
              <p className="text-center font-body text-xs text-mist/55">{venue.address}</p>
            </Reveal>
          )}
        </div>
      )}
    </SectionShell>
  )
}
