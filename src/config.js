// Single entry point for invitation content: settings from invitation.yaml
// plus ready-to-display values derived from them.
import raw from 'virtual:invitation'
import { dictionaries, locales } from './i18n.js'

export const config = raw
export const { language, couple, families, program, venue, rsvp, photos } = raw

const locale = locales[language]
const texts = { ...dictionaries[language], ...raw.texts }

/** Text by key, with {placeholders} filled from `vars`. */
export function t(key, vars = {}) {
  const s = texts[key] ?? ''
  return s.replace(/\{(\w+)\}/g, (m, name) => (name in vars ? vars[name] : m))
}

// Dates are written as YYYY-MM-DD; format them in UTC so the day never shifts.
function formatDate(iso, options) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Intl.DateTimeFormat(locale, { timeZone: 'UTC', ...options }).format(new Date(Date.UTC(y, m - 1, d)))
}

/** "19:00" → "19.00" in Turkish, unchanged otherwise. */
export const formatTime = (hhmm) => (language === 'tr' ? hhmm.replace(':', '.') : hhmm)

export const coupleNames = `${couple.name1} & ${couple.name2}`

// Countdown target (guest's local time).
export const targetISO = `${raw.date}T${raw.time}:00`

export const dateLong = formatDate(raw.date, { day: 'numeric', month: 'long', year: 'numeric' })
export const dateShort =
  language === 'tr'
    ? formatDate(raw.date, { day: '2-digit', month: '2-digit', year: 'numeric' })
    : formatDate(raw.date, { day: 'numeric', month: 'short', year: 'numeric' })
export const timeText = formatTime(raw.time)

export const rsvpDeadlineText = rsvp.deadline
  ? formatDate(rsvp.deadline, { day: 'numeric', month: 'long' })
  : ''

/** Public URL of a file inside the "assets" folder. */
export const assetUrl = (file) => `${import.meta.env.BASE_URL}${encodeURI(file)}`
