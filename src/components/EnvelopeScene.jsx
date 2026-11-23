import { couple, coupleNames, dateLong } from '../config.js'
import FitText from './FitText.jsx'

// Açık beyaz zarf + ağzından çıkmış, gerçek kâğıt dokulu davetiye kartı.
// Zarf beyaz, kart sıcak fildişi: ton farkı + cep ağzındaki gölge sayesinde
// iki yüzey birbirine karışmaz. İsim & tarih kartın üzerine gerçek DOM metni
// olarak bindirilir (keskin tipografi + erişilebilirlik).
// Zarf tonları temanın açık rengiyle (mist) hafifçe renklenir.
const ENV_STROKE = { stroke: 'color-mix(in srgb, #fff 15%, rgb(var(--c-mist)))' }

export default function EnvelopeScene({ className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 400 360"
        className="w-full"
        role="img"
        aria-label={`${coupleNames} — ${dateLong}`}
      >
        <defs>
          {/* Kâğıt lifi — çok hafif grain */}
          <filter id="paperGrain" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="2"
              seed="7"
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix in="noise" type="saturate" values="0" result="mono" />
            <feComponentTransfer in="mono" result="grain">
              <feFuncA type="linear" slope="0.05" />
            </feComponentTransfer>
            <feComposite in="grain" in2="SourceGraphic" operator="in" />
          </filter>

          {/* Kartın beyaz zarfa düşürdüğü yumuşak gölge — kenarları ayırır */}
          <filter id="cardShadow" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="6" stdDeviation="7" style={{ floodColor: 'rgb(var(--c-ink))' }} floodOpacity="0.30" />
          </filter>

          {/* Kâğıt yüzeyi: sıcak fildişi, üstte aydınlık */}
          <linearGradient id="paper" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#F8F2E7" />
            <stop offset="0.55" stopColor="#F1EAD9" />
            <stop offset="1" stopColor="#E7DDC9" />
          </linearGradient>

          {/* Zarf arka paneli — beyaz */}
          <linearGradient id="envBack" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" style={{ stopColor: 'color-mix(in srgb, #fff 75%, rgb(var(--c-mist)))' }} />
            <stop offset="1" style={{ stopColor: 'color-mix(in srgb, #fff 54%, rgb(var(--c-mist)))' }} />
          </linearGradient>

          {/* Açık kapağın iç yüzü — beyaz */}
          <linearGradient id="envFlap" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#FFFFFF" />
            <stop offset="1" style={{ stopColor: 'color-mix(in srgb, #fff 66%, rgb(var(--c-mist)))' }} />
          </linearGradient>

          {/* Ön cep — beyaz, hafif koyu ki katmanlar ayrışsın */}
          <linearGradient id="envPocket" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" style={{ stopColor: 'color-mix(in srgb, #fff 90%, rgb(var(--c-mist)))' }} />
            <stop offset="1" style={{ stopColor: 'color-mix(in srgb, #fff 47%, rgb(var(--c-mist)))' }} />
          </linearGradient>

          {/* Cep ağzının karta düşürdüğü iç gölge — kesişim çizgisi */}
          <linearGradient id="lipShadow" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" style={{ stopColor: 'rgb(var(--c-ink))' }} stopOpacity="0.42" />
            <stop offset="0.45" style={{ stopColor: 'rgb(var(--c-ink))' }} stopOpacity="0.16" />
            <stop offset="1" style={{ stopColor: 'rgb(var(--c-ink))' }} stopOpacity="0" />
          </linearGradient>

          {/* Kart alanı — doku & gölgeleri kırpmak için */}
          <clipPath id="cardClip">
            <rect x="90" y="44" width="220" height="264" rx="4" />
          </clipPath>
        </defs>

        {/* Zarf arka paneli */}
        <rect x="30" y="162" width="340" height="182" rx="0" fill="url(#envBack)" style={ENV_STROKE} strokeWidth="1" />

        {/* Açık kapak (geriye katlanmış, iç yüzü görünür) */}
        <path d="M30.8 161.2 L200 32 L369.1 161.2 Z" fill="url(#envFlap)" style={ENV_STROKE} strokeWidth="1" />

        {/* Kâğıt kart — zarfın ağzından yukarı çıkmış (büyütülmüş) */}
        <g filter="url(#cardShadow)">
          <rect x="90" y="44" width="220" height="264" rx="4" fill="url(#paper)" />
          {/* Lif dokusu */}
          <rect
            x="90"
            y="44"
            width="220"
            height="264"
            rx="4"
            fill="#3a2f12"
            filter="url(#paperGrain)"
            clipPath="url(#cardClip)"
            style={{ mixBlendMode: 'multiply' }}
          />
          {/* Deckle / kenar inceliği */}
          <rect x="90.5" y="44.5" width="219" height="263" rx="3.5" fill="none" stroke="#000000" strokeOpacity="0.06" strokeWidth="1" />
          <rect x="93" y="47" width="214" height="258" rx="3" fill="none" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="0.8" />
        </g>

        {/* Cep ağzının kart üstüne düşen gölgesi — zarf & kâğıt kesişimi */}
        <rect x="90" y="160" width="220" height="38" fill="url(#lipShadow)" clipPath="url(#cardClip)" />

        {/* Zarfın ön cebi — kartın alt kısmını örter */}
        <path d="M30 198 H370 V344 H30 Z" fill="url(#envPocket)" style={ENV_STROKE} strokeWidth="1" />
        {/* Cep ağzı — ince koyu kontur (kesişimi keskinleştirir) */}
        <path d="M30 198 H370" style={{ stroke: 'color-mix(in srgb, rgb(var(--c-mist)) 80%, rgb(var(--c-ink)))' }} strokeOpacity="0.55" strokeWidth="1" />
      </svg>

      {/* Kart yüzeyindeki içerik — gerçek metin, kartla orantılı büyütüldü */}
      <div className="absolute inset-x-[24%] top-[13%] flex h-[40%] flex-col items-center justify-center text-center">
        {/* Uzun isimler/tarihler kartın genişliğine sığacak kadar küçülür */}
        <FitText className="font-display text-[clamp(2rem,7vw,3rem)] italic leading-none text-ink">
          {couple.name1} <span className="text-azure">&</span> {couple.name2}
        </FitText>
        <FitText className="mt-3 font-body text-[clamp(1rem,3vw,1rem)] uppercase tracking-[0.28em] text-bosphorus">
          {dateLong}
        </FitText>
      </div>
    </div>
  )
}
