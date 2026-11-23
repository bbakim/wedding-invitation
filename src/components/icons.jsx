// İnce beyaz line-art (outline) ikon seti — dış bağımlılık yok.
// Tümü fill="none", stroke="currentColor" ile çizilir → "içi boş, dışı beyaz sade".

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.25,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  xmlns: 'http://www.w3.org/2000/svg',
}

export function Envelope({ className = '', paper = '#F7FAFE', ...p }) {
  return (
    <svg viewBox="0 0 120 84" className={className} {...base} {...p}>
      {/* İçi beyaz kâğıt */}
      <rect x="4" y="6" width="112" height="72" rx="4" fill={paper} />
      <path d="M4 12 L60 50 L116 12" />
      <path d="M4 78 L46 44" />
      <path d="M116 78 L74 44" />
    </svg>
  )
}

// İki aile adını ayıran süslü ayraç — yüzük taşına gönderme yapan faseli elmas + ince filigran.
export function Flourish({ className = '', ...p }) {
  return (
    <svg viewBox="0 0 220 44" className={className} {...base} {...p}>
      {/* sol çizgi + uç kıvrımı + nokta */}
      <path d="M97 22 H40" />
      <path d="M40 22 c-7 0 -12 -4 -12 -9 M40 22 c-7 0 -12 4 -12 9" />
      <circle cx="24" cy="22" r="1.4" />
      {/* merkez elmas (faseli) */}
      <path d="M110 9 L123 22 L110 35 L97 22 Z" />
      <path d="M97 22 H123 M110 9 V35" strokeWidth="0.7" />
      {/* sağ çizgi + uç kıvrımı + nokta */}
      <path d="M123 22 H180" />
      <path d="M180 22 c7 0 12 -4 12 -9 M180 22 c7 0 12 4 12 9" />
      <circle cx="196" cy="22" r="1.4" />
    </svg>
  )
}

export function Flower({ className = '', ...p }) {
  return (
    <svg viewBox="0 0 48 48" className={className} {...base} {...p}>
      <circle cx="24" cy="24" r="4.5" />
      <ellipse cx="24" cy="11" rx="4.2" ry="7" />
      <ellipse cx="24" cy="37" rx="4.2" ry="7" />
      <ellipse cx="11" cy="24" rx="7" ry="4.2" />
      <ellipse cx="37" cy="24" rx="7" ry="4.2" />
      <ellipse cx="14.5" cy="14.5" rx="6" ry="3.8" transform="rotate(45 14.5 14.5)" />
      <ellipse cx="33.5" cy="14.5" rx="6" ry="3.8" transform="rotate(-45 33.5 14.5)" />
      <ellipse cx="14.5" cy="33.5" rx="6" ry="3.8" transform="rotate(-45 14.5 33.5)" />
      <ellipse cx="33.5" cy="33.5" rx="6" ry="3.8" transform="rotate(45 33.5 33.5)" />
    </svg>
  )
}

export function Rings({ className = '', ...p }) {
  return (
    <svg viewBox="0 0 140 96" className={className} {...base} {...p}>
      <circle cx="54" cy="56" r="30" />
      <circle cx="90" cy="56" r="30" />
      {/* Sol yüzükte küçük taş */}
      <path d="M48 22 l6 -8 l6 8 l-6 7 z" />
      <path d="M48 22 h12 M54 14 v15" strokeWidth="0.9" />
    </svg>
  )
}

export function RingsSmall({ className = '', ...p }) {
  return (
    <svg viewBox="0 0 48 48" className={className} {...base} {...p}>
      <circle cx="19" cy="28" r="13" />
      <circle cx="31" cy="28" r="13" />
      <path d="M21 8 l3 -4 l3 4 l-3 3.5 z" />
    </svg>
  )
}

export function CalendarHeart({ className = '', ...p }) {
  return (
    <svg viewBox="0 0 48 48" className={className} {...base} {...p}>
      <rect x="7" y="9" width="34" height="32" rx="4" />
      <path d="M7 18 H41" />
      <path d="M15 5 V12 M33 5 V12" />
      <path d="M24 35 c-5 -3.6 -8 -6.4 -8 -10 a4.2 4.2 0 0 1 8 -1.4 a4.2 4.2 0 0 1 8 1.4 c0 3.6 -3 6.4 -8 10 z" />
    </svg>
  )
}

export function Clock({ className = '', ...p }) {
  return (
    <svg viewBox="0 0 48 48" className={className} {...base} {...p}>
      <circle cx="24" cy="24" r="17" />
      <path d="M24 14 V24 L31 28" />
    </svg>
  )
}

export function LocationHeart({ className = '', ...p }) {
  return (
    <svg viewBox="0 0 48 48" className={className} {...base} {...p}>
      <path d="M24 43 c9 -10 14 -16.5 14 -24 a14 14 0 1 0 -28 0 c0 7.5 5 14 14 24 z" />
      <path d="M24 26 c-3.4 -2.4 -5.4 -4.3 -5.4 -6.8 a2.8 2.8 0 0 1 5.4 -1 a2.8 2.8 0 0 1 5.4 1 c0 2.5 -2 4.4 -5.4 6.8 z" />
    </svg>
  )
}

export function CameraHeart({ className = '', ...p }) {
  return (
    <svg viewBox="0 0 56 48" className={className} {...base} {...p}>
      <rect x="4" y="13" width="48" height="31" rx="5" />
      <path d="M19 13 l3.5 -6 h11 l3.5 6" />
      <circle cx="28" cy="28" r="11" />
      <path d="M28 33 c-3.4 -2.4 -5.4 -4.3 -5.4 -6.8 a2.8 2.8 0 0 1 5.4 -1 a2.8 2.8 0 0 1 5.4 1 c0 2.5 -2 4.4 -5.4 6.8 z" />
      <circle cx="45" cy="19" r="1.4" />
    </svg>
  )
}

export function BrideCar({ className = '', ...p }) {
  return (
    <svg viewBox="0 0 120 72" className={className} {...base} {...p}>
      {/* Gövde */}
      <path d="M8 50 V40 c0 -3 2 -5 5 -5 h12 l9 -11 c1.5 -2 3.5 -3 6 -3 h28 c3 0 5.5 1.4 7 4 l6 10 h6 c4 0 7 3 7 7 v8" />
      <path d="M8 50 H112" />
      <path d="M30 24 H68" strokeWidth="0.9" />
      {/* Tekerlekler */}
      <circle cx="34" cy="50" r="9" />
      <circle cx="88" cy="50" r="9" />
      {/* "Just married" ip ve kalpler */}
      <path d="M99 47 q9 6 16 2" strokeWidth="0.9" />
      <path d="M108 56 c-1.4 -1 -2.2 -1.8 -2.2 -2.8 a1.1 1.1 0 0 1 2.2 -0.4 a1.1 1.1 0 0 1 2.2 0.4 c0 1 -0.8 1.8 -2.2 2.8 z" />
      <path d="M115 51 c-1.2 -0.9 -1.9 -1.6 -1.9 -2.5 a1 1 0 0 1 1.9 -0.35 a1 1 0 0 1 1.9 0.35 c0 0.9 -0.7 1.6 -1.9 2.5 z" />
      {/* Çatıdaki kalp süsü */}
      <path d="M58 18 c-3 -2.2 -4.8 -3.9 -4.8 -6.2 a2.5 2.5 0 0 1 4.8 -0.9 a2.5 2.5 0 0 1 4.8 0.9 c0 2.3 -1.8 4 -4.8 6.2 z" />
    </svg>
  )
}

export function Cocktail({ className = '', ...p }) {
  return (
    <svg viewBox="0 0 48 48" className={className} {...base} {...p}>
      <path d="M9 11 H39 L24 28 Z" />
      <path d="M24 28 V40 M16 40 H32" />
      <circle cx="33" cy="13.5" r="2" />
    </svg>
  )
}

export function Plate({ className = '', ...p }) {
  return (
    <svg viewBox="0 0 48 48" className={className} {...base} {...p}>
      <circle cx="24" cy="24" r="14" />
      <circle cx="24" cy="24" r="8" />
      <path d="M9 12 V22 a3 3 0 0 0 6 0 V12 M12 12 V22" transform="translate(-6 0)" />
      <path d="M40 12 c-2 0 -3 2 -3 5 s1 5 3 5 V40" transform="translate(2 0)" />
    </svg>
  )
}

export function Music({ className = '', ...p }) {
  return (
    <svg viewBox="0 0 48 48" className={className} {...base} {...p}>
      <path d="M19 33 V13 L37 9 V29" />
      <circle cx="14" cy="33" r="5" />
      <circle cx="32" cy="29" r="5" />
    </svg>
  )
}

// İnce hilal — uykuya/geceye nazik gönderme. Yanında minik bir yıldız.
export function Crescent({ className = '', ...p }) {
  return (
    <svg viewBox="0 0 48 48" className={className} {...base} {...p}>
      <path d="M37 30 a14 14 0 1 1 -11.5 -21.6 a11 11 0 1 0 11.5 21.6 z" />
      <path d="M37 11 l1 2.6 2.6 1 -2.6 1 -1 2.6 -1 -2.6 -2.6 -1 2.6 -1 z" strokeWidth="0.9" />
    </svg>
  )
}

// Program ikonlarını isimle seçmek için yardımcı
export const programIcons = {
  cocktail: Cocktail,
  rings: RingsSmall,
  plate: Plate,
  music: Music,
}
