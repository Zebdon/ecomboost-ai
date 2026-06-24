import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

const navItems = [
  { path: '/dashboard', label: 'Resumen', mobileLabel: 'Inicio', icon: '🏠' },
  { path: '/ads', label: 'Creador de Ads', mobileLabel: 'Ads', icon: '📣' },
  { path: '/seo', label: 'Generador SEO', mobileLabel: 'SEO', icon: '🔍' },
  { path: '/nicho', label: 'Análisis de Mercado', mobileLabel: 'Mercado', icon: '📊' },
  { path: '/branding', label: 'Branding Instantáneo', mobileLabel: 'Branding', icon: '🎨' },
  { path: '/lanzamiento', label: 'Plan de Lanzamiento', mobileLabel: 'Lanzamiento', icon: '🚀' },
  { path: '/email', label: 'Secuencias de Email', mobileLabel: 'Email', icon: '📧' },
  { path: '/ventas', label: 'Copy de Ventas', mobileLabel: 'Ventas', icon: '📝' },
  { path: '/contenido', label: 'Calendario de Contenido', mobileLabel: 'Contenido', icon: '📅' },
  { path: '/precios', label: 'Estrategia de Precios', mobileLabel: 'Precios', icon: '💰' },
  { path: '/competencia', label: 'Análisis de Competencia', mobileLabel: 'Competencia', icon: '🔎' },
  { path: '/youtube', label: 'Guion de YouTube', mobileLabel: 'YouTube', icon: '▶️' },
  { path: '/reels', label: 'Script Reels & TikTok', mobileLabel: 'Reels', icon: '🎯' },
  { path: '/bio', label: 'Bio de Redes Sociales', mobileLabel: 'Bio', icon: '📱' },
]

const LANGS = [
  { code: 'es', label: 'ES', flag: '🇪🇸' },
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'fr', label: 'FR', flag: '🇫🇷' },
]

function Sidebar() {
  const location = useLocation()
  const [lang, setLang] = useState(() => localStorage.getItem('zebcytec_lang') || 'es')

  const changeLang = (code) => {
    setLang(code)
    localStorage.setItem('zebcytec_lang', code)
  }

  return (
    <aside className="w-full lg:w-64 lg:min-h-screen bg-[#1C1A17] text-white flex flex-col">
      {/* Logo */}
      <div className="px-5 py-4 lg:py-5 border-b border-white/10">
        <Link to="/" className="text-base font-bold tracking-tight">
          Zebcy<span className="text-[#E8642A]">Tec</span>
        </Link>
      </div>

      {/* Nav móvil — scroll horizontal con chips */}
      <nav className="lg:hidden px-3 py-3 overflow-x-auto">
        <div className="flex gap-1.5 w-max">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex-shrink-0 ${
                  isActive
                    ? 'bg-[#E8642A] text-white'
                    : 'text-gray-300 bg-white/5 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span>{item.icon}</span>
                {item.mobileLabel}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Nav desktop — lista vertical */}
      <nav className="hidden lg:flex flex-1 flex-col px-3 py-4 gap-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-[#E8642A] text-white'
                  : 'text-gray-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Footer — solo desktop */}
      <div className="hidden lg:block px-4 py-4 border-t border-white/10 space-y-3">
        <div>
          <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-2">Idioma de respuesta</p>
          <div className="flex gap-1.5">
            {LANGS.map((l) => (
              <button
                key={l.code}
                onClick={() => changeLang(l.code)}
                className={`flex-1 text-[11px] font-bold py-1.5 rounded-lg transition-colors ${
                  lang === l.code
                    ? 'bg-[#E8642A] text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {l.flag} {l.label}
              </button>
            ))}
          </div>
        </div>
        <Link to="/" className="block text-xs text-gray-400 hover:text-white transition-colors">
          ← Volver al inicio
        </Link>
      </div>
    </aside>
  )
}

export default Sidebar
