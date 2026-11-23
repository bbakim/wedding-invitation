// Reads invitation.yaml, validates it with friendly (TR + EN) messages and
// exposes it to the app as `virtual:invitation`. Also fills <html lang>,
// <title> and <meta description> in index.html.
import fs from 'node:fs'
import path from 'node:path'
import yaml from 'js-yaml'

const VIRTUAL_ID = 'virtual:invitation'
const RESOLVED_ID = '\0' + VIRTUAL_ID
const ICONS = ['cocktail', 'rings', 'plate', 'music']
const LANGUAGES = ['tr', 'en']
// Must match the [data-theme] blocks in src/themes.css
const THEMES = ['navy', 'emerald', 'burgundy', 'plum', 'black']

class ConfigError extends Error {}
const shown = new Set() // print each warning only once

const str = (v) => (v === undefined || v === null ? '' : String(v).trim())

function isRealDate(s) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return false
  const [y, m, d] = s.split('-').map(Number)
  const dt = new Date(Date.UTC(y, m - 1, d))
  return dt.getUTCFullYear() === y && dt.getUTCMonth() === m - 1 && dt.getUTCDate() === d
}

function normalizeTime(raw) {
  if (typeof raw === 'number') return null // e.g. 19.00 written without quotes
  const s = str(raw).replace('.', ':')
  const m = /^(\d{1,2}):(\d{2})$/.exec(s)
  if (!m || Number(m[1]) > 23 || Number(m[2]) > 59) return null
  return `${m[1].padStart(2, '0')}:${m[2]}`
}

const isUrl = (s) => /^https?:\/\/\S+$/i.test(s)

export function loadInvitation(file) {
  let raw
  try {
    raw = yaml.load(fs.readFileSync(file, 'utf8'), { schema: yaml.CORE_SCHEMA })
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new ConfigError(`invitation.yaml bulunamadı / not found: ${file}`)
    }
    const line = err.mark ? err.mark.line + 1 : '?'
    throw new ConfigError(
      `invitation.yaml ${line}. satırda yazım hatası var / has a syntax error on line ${line}.\n` +
        `  İpucu: girintileri (satır başı boşluklarını) ve ":" işaretlerini kontrol edin.\n` +
        `  Tip: check the indentation (leading spaces) and the ":" signs.\n` +
        `  (${err.reason || err.message})`,
    )
  }
  if (!raw || typeof raw !== 'object') {
    throw new ConfigError('invitation.yaml boş görünüyor / looks empty.')
  }

  const errors = []
  const warnings = []
  const err = (tr, en) => errors.push(`• ${tr}\n  ${en}`)

  // language
  const language = str(raw.language || 'tr').toLowerCase()
  if (!LANGUAGES.includes(language)) {
    err(`language "tr" veya "en" olmalı (yazılan: "${language}").`, `language must be "tr" or "en" (got "${language}").`)
  }

  // theme
  const theme = str(raw.theme || 'navy').toLowerCase()
  if (!THEMES.includes(theme)) {
    err(`theme şunlardan biri olmalı: ${THEMES.join(', ')} (yazılan: "${theme}").`, `theme must be one of: ${THEMES.join(', ')} (got "${theme}").`)
  }

  // couple
  const couple = raw.couple || {}
  const name1 = str(couple.name1)
  const name2 = str(couple.name2)
  if (!name1 || !name2) err('couple altında name1 ve name2 doldurulmalı.', 'couple.name1 and couple.name2 are required.')

  // date & time
  const date = str(raw.date)
  if (!isRealDate(date)) err(`date YIL-AY-GÜN biçiminde olmalı, ör. 2027-06-12 (yazılan: "${date}").`, `date must be YEAR-MONTH-DAY, e.g. 2027-06-12 (got "${date}").`)
  const time = normalizeTime(raw.time)
  if (!time) err(`time SS:DD biçiminde ve tırnak içinde olmalı, ör. "19:00" (yazılan: ${JSON.stringify(raw.time)}).`, `time must be HH:MM in quotes, e.g. "19:00" (got ${JSON.stringify(raw.time)}).`)

  // families
  const familiesRaw = raw.families ?? []
  if (!Array.isArray(familiesRaw)) err('families bir liste olmalı (her aile "- " ile başlar).', 'families must be a list (each family starts with "- ").')
  const families = (Array.isArray(familiesRaw) ? familiesRaw : []).map((f) => ({
    names: str(f?.names),
    surname: str(f?.surname),
  }))
  if (families.length > 2) err('En fazla 2 aile yazılabilir.', 'At most 2 families are supported.')
  families.forEach((f, i) => {
    if (!f.names && !f.surname) err(`families: ${i + 1}. aile boş.`, `families: family #${i + 1} is empty.`)
  })

  // program
  const programRaw = raw.program ?? []
  if (!Array.isArray(programRaw)) err('program bir liste olmalı (her satır "- " ile başlar).', 'program must be a list (each item starts with "- ").')
  const program = (Array.isArray(programRaw) ? programRaw : []).map((p, i) => {
    const icon = str(p?.icon).toLowerCase()
    const pTime = normalizeTime(p?.time)
    if (!str(p?.title)) err(`program: ${i + 1}. satırın title alanı boş.`, `program: item #${i + 1} has no title.`)
    if (!pTime) err(`program: "${str(p?.title)}" için saat SS:DD olmalı, ör. "20:00".`, `program: time for "${str(p?.title)}" must be HH:MM, e.g. "20:00".`)
    if (!ICONS.includes(icon)) err(`program: "${str(p?.title)}" için icon şunlardan biri olmalı: ${ICONS.join(', ')} (yazılan: "${icon}").`, `program: icon for "${str(p?.title)}" must be one of: ${ICONS.join(', ')} (got "${icon}").`)
    return { title: str(p?.title), time: pTime || '', icon }
  })

  // venue
  const v = raw.venue || {}
  const venue = {
    name: str(v.name),
    address: str(v.address),
    mapsUrl: str(v.mapsUrl),
    mapImage: str(v.mapImage).replace(/^\/+/, '').replace(/^assets\//, ''),
  }
  if (!venue.name) err('venue.name (mekan adı) boş olamaz.', 'venue.name is required.')
  if (venue.mapsUrl && !isUrl(venue.mapsUrl)) err('venue.mapsUrl "https://" ile başlayan bir link olmalı.', 'venue.mapsUrl must be a link starting with "https://".')
  if (venue.mapImage && !fs.existsSync(path.resolve(path.dirname(file), 'assets', venue.mapImage))) {
    err(`venue.mapImage: "assets/${venue.mapImage}" dosyası bulunamadı.`, `venue.mapImage: file "assets/${venue.mapImage}" not found.`)
  }

  // rsvp
  const r = raw.rsvp || {}
  const rsvp = {
    scriptUrl: str(r.scriptUrl),
    deadline: str(r.deadline),
    phone: str(r.phone),
    note: str(r.note),
  }
  if (rsvp.scriptUrl && !isUrl(rsvp.scriptUrl)) err('rsvp.scriptUrl "https://" ile başlayan bir link olmalı.', 'rsvp.scriptUrl must be a link starting with "https://".')
  if (rsvp.deadline && !isRealDate(rsvp.deadline)) err(`rsvp.deadline YIL-AY-GÜN biçiminde olmalı (yazılan: "${rsvp.deadline}").`, `rsvp.deadline must be YEAR-MONTH-DAY (got "${rsvp.deadline}").`)
  if (!rsvp.scriptUrl) {
    warnings.push('rsvp.scriptUrl boş: form deneme modunda, yanıtlar kaydedilmeyecek. / rsvp.scriptUrl is empty: the form runs in demo mode, answers will NOT be saved.')
  }

  // photos
  const photos = { url: str(raw.photos?.url) }
  if (photos.url && !isUrl(photos.url)) err('photos.url "https://" ile başlayan bir link olmalı.', 'photos.url must be a link starting with "https://".')

  // texts
  const texts = {}
  if (raw.texts && typeof raw.texts === 'object') {
    for (const [k, val] of Object.entries(raw.texts)) texts[k] = str(val)
  }

  if (errors.length) {
    throw new ConfigError(
      `invitation.yaml dosyasında ${errors.length} sorun var / has ${errors.length} problem(s):\n\n${errors.join('\n\n')}\n`,
    )
  }

  return {
    config: { language, theme, couple: { name1, name2 }, date, time, families, program, venue, rsvp, photos, texts },
    warnings,
  }
}

const escapeHtml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export default function invitationPlugin({ file }) {
  let current = null
  let isBuild = false

  const load = () => {
    const { config, warnings } = loadInvitation(file)
    for (const w of warnings) {
      if (!shown.has(w)) console.warn(`\n⚠  ${w}\n`)
      shown.add(w)
    }
    current = config
    return config
  }

  return {
    name: 'invitation-config',
    configResolved(c) {
      isBuild = c.command === 'build'
    },
    buildStart() {
      this.addWatchFile(file)
      try {
        load()
      } catch (e) {
        if (e instanceof ConfigError) {
          // Short, readable output instead of a stack trace.
          console.error(`\n✖ ${e.message}`)
          if (isBuild) process.exit(1)
        }
        throw e
      }
    },
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID
    },
    load(id) {
      if (id !== RESOLVED_ID) return
      this.addWatchFile(file)
      return `export default ${JSON.stringify(load())}`
    },
    transformIndexHtml(html) {
      const c = current || load()
      const names = `${c.couple.name1} & ${c.couple.name2}`
      const title = c.texts.pageTitle || (c.language === 'en' ? `${names} · We're getting married` : `${names} · Evleniyoruz`)
      const desc = c.language === 'en' ? `${names}'s wedding invitation — ${c.date}, ${c.venue.name}` : `${names} düğün davetiyesi — ${c.date}, ${c.venue.name}`
      return html
        .replace(/<html[^>]*>/, `<html lang="${c.language}" data-theme="${c.theme}">`)
        .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
        .replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${escapeHtml(desc)}" />`)
    },
    handleHotUpdate({ file: changed, server }) {
      if (path.resolve(changed) !== path.resolve(file)) return
      try {
        load()
      } catch (e) {
        console.error(`\n✖ ${e.message}`)
        return []
      }
      const mod = server.moduleGraph.getModuleById(RESOLVED_ID)
      if (mod) server.moduleGraph.invalidateModule(mod)
      server.ws.send({ type: 'full-reload' })
      return []
    },
  }
}
