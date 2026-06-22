import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Sidebar from '../components/layout/Sidebar'

const tools = [
  { path: '/ads', icon: '📣', title: 'Creador de Ads', desc: 'Copy publicitario para Instagram, Facebook y TikTok.', bg: 'bg-[#FBE9E0]', border: 'border-[#f0c5ab]' },
  { path: '/seo', icon: '🔍', title: 'Generador SEO', desc: 'Descripciones optimizadas para buscadores.', bg: 'bg-[#E9F1FA]', border: 'border-[#c2dbf0]' },
  { path: '/nicho', icon: '📊', title: 'Análisis de Mercado', desc: 'Valida tu idea antes de invertir.', bg: 'bg-[#EAF5EC]', border: 'border-[#c2e2c9]' },
  { path: '/branding', icon: '🎨', title: 'Branding Instantáneo', desc: 'Nombres, slogans y paleta de colores.', bg: 'bg-[#F0EBFA]', border: 'border-[#d9cdf0]' },
  { path: '/lanzamiento', icon: '🚀', title: 'Plan de Lanzamiento', desc: 'Checklist paso a paso para lanzar.', bg: 'bg-[#FBF1DF]', border: 'border-[#f0dba8]' },
  { path: '/email', icon: '📧', title: 'Secuencias de Email', desc: 'Automatiza tu email marketing.', bg: 'bg-[#E9F1FA]', border: 'border-[#c2dbf0]' },
  { path: '/ventas', icon: '📝', title: 'Copy de Ventas', desc: 'Página de ventas que convierte.', bg: 'bg-[#FBE9E0]', border: 'border-[#f0c5ab]' },
  { path: '/contenido', icon: '📅', title: 'Calendario de Contenido', desc: '30 días de ideas para redes sociales.', bg: 'bg-[#EAF5EC]', border: 'border-[#c2e2c9]' },
  { path: '/precios', icon: '💰', title: 'Estrategia de Precios', desc: 'Maximiza conversión con el precio correcto.', bg: 'bg-[#FBF1DF]', border: 'border-[#f0dba8]' },
  { path: '/competencia', icon: '🔎', title: 'Análisis de Competencia', desc: 'Encuentra huecos que tus rivales no cubren.', bg: 'bg-[#F0EBFA]', border: 'border-[#d9cdf0]' },
  { path: '/youtube', icon: '▶️', title: 'Guion de YouTube', desc: 'Script completo con título SEO, gancho y CTA.', bg: 'bg-[#FBE9E0]', border: 'border-[#f0c5ab]' },
  { path: '/reels', icon: '🎯', title: 'Script Reels & TikTok', desc: '3 guiones de video corto con gancho viral.', bg: 'bg-[#F0EBFA]', border: 'border-[#d9cdf0]' },
  { path: '/bio', icon: '📱', title: 'Bio de Redes Sociales', desc: '3 versiones de bio optimizada para cada red.', bg: 'bg-[#EAF5EC]', border: 'border-[#c2e2c9]' },
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
          <h1 className="text-2xl font-extrabold tracking-tight mb-2">Bienvenido a ImpulsoAI</h1>
          <p className="text-sm text-gray-600 mb-8 max-w-xl">
            13 herramientas de IA para marketing digital, ventas y crecimiento. Elige una para empezar.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tools.map((tool, i) => (
              <motion.div
                key={tool.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
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
