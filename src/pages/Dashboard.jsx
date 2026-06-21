import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Sidebar from '../components/layout/Sidebar'

const tools = [
  { path: '/ads', icon: '📣', title: 'Creador de Ads', desc: 'Genera copy publicitario para Instagram, Facebook y TikTok.', bg: 'bg-[#FBE9E0]', border: 'border-[#f0c5ab]' },
  { path: '/seo', icon: '🔍', title: 'Generador SEO', desc: 'Descripciones de producto optimizadas para Google.', bg: 'bg-[#E9F1FA]', border: 'border-[#c2dbf0]' },
  { path: '/nicho', icon: '📊', title: 'Analizador de Nicho', desc: 'Valida si tu producto es rentable antes de invertir.', bg: 'bg-[#EAF5EC]', border: 'border-[#c2e2c9]' },
  { path: '/branding', icon: '🎨', title: 'Branding Instantáneo', desc: 'Nombres, slogans y paleta de colores para tu marca.', bg: 'bg-[#F0EBFA]', border: 'border-[#d9cdf0]' },
  { path: '/lanzamiento', icon: '🚀', title: 'Plan de Lanzamiento', desc: 'Tu checklist paso a paso para lanzar tu tienda.', bg: 'bg-[#FBF1DF]', border: 'border-[#f0dba8]' },
]

function Dashboard() {
  return (
    <div className="flex flex-col lg:flex-row bg-white min-h-screen">
      <Sidebar />

      <main className="flex-1 px-5 lg:px-10 py-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-[10px] font-semibold tracking-widest text-[#9c3c14] uppercase mb-2">Dashboard</p>
          <h1 className="text-2xl font-extrabold tracking-tight mb-2">Bienvenido a EcomBoost AI</h1>
          <p className="text-sm text-gray-600 mb-8 max-w-xl">
            Elige una herramienta para empezar a construir tu tienda online con ayuda de inteligencia artificial.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tools.map((tool, i) => (
              <motion.div
                key={tool.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Link
                  to={tool.path}
                  className={`${tool.bg} border ${tool.border} rounded-2xl p-5 block transition-all duration-300 hover:scale-[1.02] hover:shadow-lg h-full`}
                >
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-lg mb-3">
                    {tool.icon}
                  </div>
                  <div className="text-sm font-bold mb-1">{tool.title}</div>
                  <div className="text-xs text-gray-600 leading-relaxed">{tool.desc}</div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  )
}

export default Dashboard