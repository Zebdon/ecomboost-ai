import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '../../contexts/LangContext'

const LANGS = [
  { code: 'es', flag: '🇪🇸', label: 'ES' },
  { code: 'en', flag: '🇬🇧', label: 'EN' },
  { code: 'fr', flag: '🇫🇷', label: 'FR' },
]

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { lang, changeLang, t } = useLang()

  return (
    <nav className="sticky top-0 z-40 bg-[#1C1A17]">
      <div className="flex justify-between items-center px-5 lg:px-12 py-4">
        <div className="text-white font-bold text-base lg:text-lg tracking-tight">
          Zebcy<span className="text-[#E8642A]">Tec</span>
        </div>

        {/* Links desktop */}
        <div className="hidden lg:flex items-center gap-6">
          <a href="#herramientas" className="text-sm text-gray-300 hover:text-white transition-colors">{t.nav.tools}</a>
          <a href="#precio" className="text-sm text-gray-300 hover:text-white transition-colors">{t.nav.price}</a>
          <a href="#faq" className="text-sm text-gray-300 hover:text-white transition-colors">{t.nav.faq}</a>
          <a href="#comunidad" className="text-sm text-gray-300 hover:text-white transition-colors">{t.nav.community}</a>

          {/* Selector de idioma */}
          <div className="flex items-center gap-0.5 bg-white/5 rounded-lg p-1">
            {LANGS.map((l) => (
              <button
                key={l.code}
                onClick={() => changeLang(l.code)}
                title={l.label}
                className={`text-xs px-2.5 py-1.5 rounded-md font-bold transition-colors ${
                  lang === l.code ? 'bg-[#E8642A] text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                {l.flag} {l.label}
              </button>
            ))}
          </div>

          <Link
            to="/dashboard"
            className="bg-[#E8642A] text-white text-sm font-bold px-5 py-2.5 rounded-lg hover:bg-[#d6551e] transition-colors"
          >
            {t.nav.cta}
          </Link>
        </div>

        {/* Móvil: idioma + hamburguesa */}
        <div className="lg:hidden flex items-center gap-2">
          <div className="flex items-center gap-0.5 bg-white/5 rounded-lg p-0.5">
            {LANGS.map((l) => (
              <button
                key={l.code}
                onClick={() => changeLang(l.code)}
                className={`text-xs px-1.5 py-1 rounded-md font-bold transition-colors ${
                  lang === l.code ? 'bg-[#E8642A] text-white' : 'text-gray-400'
                }`}
              >
                {l.flag}
              </button>
            ))}
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white text-2xl w-8 h-8 flex items-center justify-center"
            aria-label="Menu"
          >
            <motion.span animate={{ rotate: menuOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
              {menuOpen ? '✕' : '☰'}
            </motion.span>
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden lg:hidden bg-[#1C1A17] border-t border-white/10"
          >
            <div className="flex flex-col px-5 pb-5 pt-2 gap-1">
              {[
                { label: t.nav.tools, href: '#herramientas' },
                { label: t.nav.price, href: '#precio' },
                { label: t.nav.faq, href: '#faq' },
                { label: t.nav.community, href: '#comunidad' },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm text-gray-300 py-3 border-b border-white/5 hover:text-white transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <Link
                to="/dashboard"
                onClick={() => setMenuOpen(false)}
                className="bg-[#E8642A] text-white text-sm font-bold px-5 py-3 rounded-lg text-center mt-3 hover:bg-[#d6551e] transition-colors"
              >
                {t.nav.cta}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
