import { useEffect, useState } from 'react'

const SLIDES = [
  '/images/maksim-larin-NOpsC3nWTzY-unsplash.jpg',
  '/images/idean-azad-foemWNkge30-unsplash.jpg',
  '/images/linda-xu-fUEP0djb1hA-unsplash.jpg',
  '/images/sara-kurfess-WM6Kyt_ndIw-unsplash.jpg',
]

export default function Slider() {
  const [current, setCurrent] = useState(0)
  const go = (n) => setCurrent((n + SLIDES.length) % SLIDES.length)

  // auto-play every 4 seconds (timer restarts whenever the slide changes)
  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % SLIDES.length), 4000)
    return () => clearInterval(t)
  }, [current])

  return (
    <div className="slider-section">
      <div className="slider-container">
        <div className="slider-track" style={{ transform: `translateX(-${current * 100}%)` }}>
          {SLIDES.map((src, i) => (
            <div className="slide" key={src}><img src={src} alt={`Shoe ${i + 1}`} /></div>
          ))}
        </div>
        <button className="slider-btn prev" onClick={() => go(current - 1)}>&#10094;</button>
        <button className="slider-btn next" onClick={() => go(current + 1)}>&#10095;</button>
      </div>
    </div>
  )
}
