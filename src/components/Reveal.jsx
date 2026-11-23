import { useEffect, useRef, useState } from 'react'

// Görünüme girince yumuşak fade-up. prefers-reduced-motion CSS'te zaten devre dışı.
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // IntersectionObserver yoksa içeriği gizli bırakma
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.unobserve(el)
        }
      },
      { threshold: 0.18 },
    )
    io.observe(el)

    // Güvenlik ağı: herhangi bir sebeple tetiklenmezse içerik yine de görünsün
    const fallback = setTimeout(() => setVisible(true), 15000)

    return () => {
      io.disconnect()
      clearTimeout(fallback)
    }
  }, [])

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
