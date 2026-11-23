import { useEffect, useState } from 'react'
import { t as text } from '../config.js'

function diff(targetMs) {
  const now = Date.now()
  let d = Math.max(0, targetMs - now)
  const days = Math.floor(d / 86400000)
  d -= days * 86400000
  const hours = Math.floor(d / 3600000)
  d -= hours * 3600000
  const minutes = Math.floor(d / 60000)
  d -= minutes * 60000
  const seconds = Math.floor(d / 1000)
  return { days, hours, minutes, seconds }
}

const pad = (n) => String(n).padStart(2, '0')

export default function Countdown({ targetISO }) {
  const targetMs = new Date(targetISO).getTime()
  const [t, setT] = useState(() => diff(targetMs))

  useEffect(() => {
    const id = setInterval(() => setT(diff(targetMs)), 1000)
    return () => clearInterval(id)
  }, [targetMs])

  const units = [
    { v: t.days, label: text('countdownDays') },
    { v: t.hours, label: text('countdownHours') },
    { v: t.minutes, label: text('countdownMinutes') },
    { v: t.seconds, label: text('countdownSeconds') },
  ]

  return (
    <div className="flex items-start justify-center gap-3 sm:gap-5" role="timer" aria-live="off">
      {units.map((u, i) => (
        <div key={u.label} className="flex items-start gap-3 sm:gap-5">
          <div className="flex flex-col items-center">
            <span className="font-display text-5xl font-medium leading-none tabular-nums text-porcelain sm:text-7xl">
              {pad(u.v)}
            </span>
            <span className="mt-2 text-[0.6rem] uppercase tracking-[0.25em] text-mist/70 sm:text-xs">
              {u.label}
            </span>
          </div>
          {i < units.length - 1 && (
            <span className="font-display text-4xl leading-none text-corn/50 sm:text-6xl" aria-hidden="true">
              :
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
