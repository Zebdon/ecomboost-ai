import { useState } from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="relative bg-[#1C1A17]">
      <div className="flex justify-between items-center px-5 lg:px-12 py-4">
        <div className="text-white font-bold text-base lg:text-lg tracking-tight">
          Ecom<span className="text-[#E8642A]">Boost</span> AI
        </div>

        {/* Links desktop */}
        <div className="hidden lg:flex items-center gap-8">
          <a href="#herramientas" className="text-sm text-gray-300 hover:text-white transition-colors">Herramientas</a>
          <a href="#precio" className="text-sm text-gray-300 hover:text-white transition-colors">Precio</a>
          <a href="#comunidad" className="text-sm text-gray-300 hover:text-white transition-colors">Comunidad</a>
          <Link
            to="/dashboard"
            className="bg-[#E8642A] text-white text-sm font-bold px-5 py-2.5 rounded-lg hover:bg-[#d6551e] transition-colors"
          >
            Get Started
          </Link>
        </div>

        {/* Botón hamburguesa - solo móvil */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-white text-2xl w-8 h-8 flex items-center justify-center"
          aria-label="Abrir menú"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Menú móvil desplegable */}
      {menuOpen && (
        <div className="lg:hidden flex flex-col gap-1 px-5 pb-4 bg-[#1C1A17] border-t border-white/10">
          <a href="#herramientas" onClick={() => setMenuOpen(false)} className="text-sm text-gray-300 py-3 border-b border-white/5">Herramientas</a>
          <a href="#precio" onClick={() => setMenuOpen(false)} className="text-sm text-gray-300 py-3 border-b border-white/5">Precio</a>
          <a href="#comunidad" onClick={() => setMenuOpen(false)} className="text-sm text-gray-300 py-3 border-b border-white/5">Comunidad</a>
          <Link
            to="/dashboard"
            onClick={() => setMenuOpen(false)}
            className="bg-[#E8642A] text-white text-sm font-bold px-5 py-3 rounded-lg text-center mt-3"
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar