import { useState } from 'react'
import SectionShell from '../components/SectionShell.jsx'
import Reveal from '../components/Reveal.jsx'
import { Crescent } from '../components/icons.jsx'
import { rsvp, language, rsvpDeadlineText, t } from '../config.js'

const initial = {
  firstName: '',
  lastName: '',
  status: '', // '' | 'yes' | 'no'
  guests: '',
  phone: '',
  website: '', // honeypot — real guests never see or fill this
}

const telHref = (phone) => `tel:${phone.replace(/(?!^\+)[^\d]/g, '')}`

function validate(form) {
  const errors = []
  if (!form.firstName.trim()) errors.push(t('rsvpErrorFirstName'))
  if (!form.lastName.trim()) errors.push(t('rsvpErrorLastName'))
  if (!form.status) errors.push(t('rsvpErrorStatus'))
  const guests = Number(form.guests)
  if (form.status === 'yes' && (!Number.isInteger(guests) || guests < 1)) errors.push(t('rsvpErrorGuests'))
  return errors
}

async function send(form) {
  const attending = form.status === 'yes'
  const payload = {
    firstName: form.firstName.trim(),
    lastName: form.lastName.trim(),
    attending,
    statusLabel: attending ? t('rsvpYes') : t('rsvpNo'),
    guests: attending ? Number(form.guests) : 0,
    phone: form.phone.trim(),
    lang: language,
    website: form.website,
  }

  if (!rsvp.scriptUrl) {
    // Demo mode: invitation.yaml has no rsvp.scriptUrl yet.
    console.warn('[RSVP] Demo mode — set rsvp.scriptUrl in invitation.yaml to save answers.', payload)
    await new Promise((r) => setTimeout(r, 600))
    return
  }

  // text/plain keeps this a "simple" request, so Google Apps Script needs no CORS preflight.
  const res = await fetch(rsvp.scriptUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok || data.ok === false) throw new Error(data.message || t('rsvpErrorGeneric'))
}

export default function S5Rsvp() {
  const [form, setForm] = useState(initial)
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('')

  const update = (e) => {
    const { name, value } = e.target
    setForm((f) => {
      const next = { ...f, [name]: value }
      // Katılmayacaksa kişi sayısı otomatik 0; tekrar "Evet"e dönerse alanı temizle
      if (name === 'status') next.guests = value === 'no' ? '0' : ''
      return next
    })
  }

  const notAttending = form.status === 'no'

  const onSubmit = async (e) => {
    e.preventDefault()
    const errors = validate(form)
    if (errors.length) {
      setErrorMsg(errors.join(' '))
      setStatus('error')
      return
    }
    setStatus('sending')
    setErrorMsg('')
    try {
      await send(form)
      setStatus('success')
    } catch (err) {
      setErrorMsg(err.message || t('rsvpErrorGeneric'))
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <SectionShell id="rsvp">
        <div className="engrave w-full max-w-lg rounded-sm px-8 py-14">
          <Reveal delay={150}>
            <p className="font-display text-4xl text-porcelain sm:text-5xl">{t('rsvpThanksTitle')}</p>
          </Reveal>
          <Reveal delay={150} className="mt-4">
            <p className="font-display text-xl italic text-mist/85">{t('rsvpThanksMessage')}</p>
          </Reveal>
        </div>
      </SectionShell>
    )
  }

  return (
    <SectionShell id="rsvp">
      <div className="engrave w-full max-w-md rounded-sm px-6 py-6 sm:max-w-lg sm:px-9 sm:py-8">
        {rsvpDeadlineText && (
          <Reveal delay={150}>
            <p className="eyebrow mb-3">{t('rsvpDeadline', { date: rsvpDeadlineText })}</p>
          </Reveal>
        )}

        <Reveal delay={150}>
          <h2 className="font-display text-3xl font-medium tracking-[0.16em] text-porcelain sm:text-5xl">
            {t('rsvpTitle')}
          </h2>
        </Reveal>

        <Reveal as="form" delay={150} onSubmit={onSubmit} className="mt-8 space-y-4 text-left sm:mt-10 sm:space-y-5" noValidate>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
            <div>
              <label className="field-label" htmlFor="firstName">{t('rsvpFirstName')}</label>
              <input id="firstName" name="firstName" type="text" required autoComplete="given-name"
                value={form.firstName} onChange={update} className="field" placeholder={t('rsvpFirstNamePlaceholder')} />
            </div>
            <div>
              <label className="field-label" htmlFor="lastName">{t('rsvpLastName')}</label>
              <input id="lastName" name="lastName" type="text" required autoComplete="family-name"
                value={form.lastName} onChange={update} className="field" placeholder={t('rsvpLastNamePlaceholder')} />
            </div>
          </div>

          <div>
            <label className="field-label" htmlFor="status">{t('rsvpStatus')}</label>
            <select id="status" name="status" required value={form.status} onChange={update} className="field">
              <option value="" disabled>{t('rsvpStatusChoose')}</option>
              <option value="yes">{t('rsvpYes')}</option>
              <option value="no">{t('rsvpNo')}</option>
            </select>
          </div>

          <div>
            <label className="field-label" htmlFor="guests">{t('rsvpGuests')}</label>
            <input id="guests" name="guests" type="number"
              min={notAttending ? '0' : '1'} step="1" required readOnly={notAttending}
              value={form.guests} onChange={update}
              className={`field${notAttending ? ' cursor-not-allowed opacity-60' : ''}`}
              placeholder={t('rsvpGuestsPlaceholder')}
              tabIndex={notAttending ? -1 : undefined}
              aria-readonly={notAttending} />
          </div>

          <div>
            <label className="field-label" htmlFor="phone">{t('rsvpPhone')}</label>
            <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" value={form.phone}
              onChange={update} className="field" placeholder={t('rsvpPhonePlaceholder')} />
          </div>

          {/* Honeypot: hidden from people, bots tend to fill it */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label htmlFor="website">Website</label>
            <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off"
              value={form.website} onChange={update} />
          </div>

          {status === 'error' && (
            <p className="text-sm text-danger" role="alert">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={status === 'sending'}
            className="mt-1 w-full rounded-sm border border-corn bg-corn/10 px-6 py-2.5 font-body text-sm uppercase tracking-[0.22em] text-porcelain transition-colors hover:bg-corn/25 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {status === 'sending' ? t('rsvpSending') : t('rsvpSubmit')}
          </button>

          {rsvp.note && (
            <div className="flex flex-col items-center gap-1.5">
              <Crescent className="h-5 w-5" />
              <p className="font-display text-xl text-center italic">{rsvp.note}</p>
            </div>
          )}

          {rsvp.phone && (
            <p className="text-center font-body text-m leading-relaxed">
              {t('rsvpCallPrefix')}{' '}
              <a href={telHref(rsvp.phone)} className="whitespace-nowrap text-corn underline-offset-2 hover:underline">
                {rsvp.phone}
              </a>
              {t('rsvpCallSuffix') ? ` ${t('rsvpCallSuffix')}` : '.'}
            </p>
          )}
        </Reveal>
      </div>
    </SectionShell>
  )
}
