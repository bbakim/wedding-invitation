import { useLayoutEffect, useRef, useState } from 'react'

// Keeps text on one line by shrinking it to fit its container (down to `min`).
// If it still doesn't fit at `min`, it is allowed to wrap. Useful for names of
// any length on the envelope card.
export default function FitText({ as: Tag = 'p', min = 0.55, className = '', children }) {
  const boxRef = useRef(null)
  const textRef = useRef(null)
  const [scale, setScale] = useState(1)

  useLayoutEffect(() => {
    const box = boxRef.current
    const text = textRef.current
    if (!box || !text) return

    const fit = () => {
      // Measure the natural width at full size.
      text.style.fontSize = '1em'
      text.style.whiteSpace = 'nowrap'
      const natural = text.scrollWidth
      const available = box.clientWidth
      const k = natural > available && natural > 0 ? Math.max(min, (available / natural) * 0.98) : 1
      // Apply directly too: React skips the re-render when k is unchanged.
      text.style.fontSize = `${k}em`
      text.style.whiteSpace = k > min ? 'nowrap' : 'normal'
      setScale(k)
    }

    fit()
    document.fonts?.ready.then(fit)
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(fit) : null
    ro?.observe(box)
    return () => ro?.disconnect()
  }, [children, min])

  return (
    <Tag ref={boxRef} className={`w-full ${className}`}>
      <span
        ref={textRef}
        className="inline-block max-w-full"
        style={{ fontSize: `${scale}em`, whiteSpace: scale > min ? 'nowrap' : 'normal' }}
      >
        {children}
      </span>
    </Tag>
  )
}
