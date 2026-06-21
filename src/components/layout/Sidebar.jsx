import { Link, useLocation } from 'react-router-dom'

const navItems = [
  { path: '/dashboard', label: 'Resumen', mobileLabel: 'Inicio', icon: '🏠' },
  { path: '/ads', label: 'Creador de Ads', mobileLabel: 'Ads', icon: '📣' },
  { path: '/seo', label: 'Generador SEO', mobileLabel: 'SEO', icon: '🔍' },
  { path: '/nicho', label: 'Analizador de Nicho', mobileLabel: 'Nicho', icon: '📊' },
  { path: '/branding', label: 'Branding', mobileLabel: 'Branding', icon: '🎨' },
  { path: '/lanzamiento', label: 'Plan de Lanzamiento', mobileLabel: 'Lanzamiento', icon: '🚀' },
]

function Sidebar() {
  const location = useLocation()

  return (
    <aside className="w-full lg:w-64 lg:min-h-screen bg-[#1C1A17] text-white flex flex-col">
      {/* Logo */}
      <div className="px-5 py-4 lg:py-5 border-b border-white/10">
        <Link to="/" className="text-base font-bold tracking-tight">
          Ecom<span className="text-[#E8642A]">Boost</span> AI
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
      <div className="hidden lg:block px-5 py-4 border-t border-white/10">
        <Link to="/" className="text-xs text-gray-400 hover:text-white transition-colors">
          ← Volver al inicio
        </Link>
      </div>
    </aside>
  )
}

export default Sidebar
