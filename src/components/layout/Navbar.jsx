import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-40 bg-[#1C1A17]">
      <div className="flex justify-between items-center px-5 lg:px-12 py-4">
        <div className="text-white font-bold text-base lg:text-lg tracking-tight">
          Ecom<span className="text-[#E8642A]">Boost</span> AI
        </div>

        {/* Links desktop */}
        <div className="hidden lg:flex items-center gap-8">
          <a href="#herramientas" className="text-sm text-gray-300 hover:text-white transition-colors">Herramientas</a>
          <a href="#precio" className="text-sm text-gray-300 hover:text-white transition-colors">Precio</a>
          <a href="#faq" className="text-sm text-gray-300 hover:text-white transition-colors">FAQ</a>
          <a href="#comunidad" className="text-sm text-gray-300 hover:text-white transition-colors">Comunidad</a>
          <Link
            to="/dashboard"
            className="bg-[#E8642A] text-white text-sm font-bold px-5 py-2.5 rounded-lg hover:bg-[#d6551e] transition-colors"
          >
            Get Started
          </Link>
        </div>

        {/* Hamburguesa móvil */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-white text-2xl w-8 h-8 flex items-center justify-center"
          aria-label="Abrir menú"
        >
          <motion.span animate={{ rotate: menuOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
            {menuOpen ? '✕' : '☰'}
          </motion.span>
        </button>
      </div>

      {/* Menú móvil animado */}
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
                { label: 'Herramientas', href: '#herramientas' },
                { label: 'Precio', href: '#precio' },
                { label: 'FAQ', href: '#faq' },
                { label: 'Comunidad', href: '#comunidad' },
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
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
