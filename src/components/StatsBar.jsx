import { useState, useEffect, useRef } from 'react'

const stats = [
  { target: 8400, suffix: '+', label: 'contenidos generados', icon: '🛠️' },
  { target: 420, suffix: '+', label: 'emprendedores activos', icon: '👥' },
  { target: 4.9, suffix: '★', label: 'valoración media', icon: '⭐', decimal: true },
  { target: 13, suffix: '', label: 'herramientas IA', icon: '🚀' },
]

function CountUp({ target, suffix, decimal }) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true) },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    const steps = 50
    const duration = 1800
    const increment = target / steps
    let current = 0
    let step = 0
    const timer = setInterval(() => {
      step++
      current += increment
      if (step >= steps) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(decimal ? Math.round(current * 10) / 10 : Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [started, target, decimal])

  return (
    <span ref={ref}>
      {decimal ? count.toFixed(1) : count.toLocaleString('es-ES')}{suffix}
    </span>
  )
}

export default function StatsBar() {
  return (
    <div className="bg-[#FBE9E0] border-y border-[#f0c5ab] py-6 px-5">
      <div className="max-w-4xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="text-center">
            <div className="text-2xl mb-1">{stat.icon}</div>
            <div className="text-xl lg:text-2xl font-extrabold text-[#1C1A17] tracking-tight">
              <CountUp target={stat.target} suffix={stat.suffix} decimal={stat.decimal} />
            </div>
            <div className="text-[11px] text-[#9c3c14] font-medium mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
