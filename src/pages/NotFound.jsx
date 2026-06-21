import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-5 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-6xl font-extrabold text-[#E8642A] mb-3">404</div>
        <h1 className="text-xl font-bold mb-2">Página no encontrada</h1>
        <p className="text-sm text-gray-500 mb-8">
          La página que buscas no existe o fue movida.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link
            to="/"
            className="bg-[#E8642A] text-white text-sm font-bold px-5 py-3 rounded-xl hover:bg-[#d6551e] transition-all"
          >
            Ir al inicio
          </Link>
          <Link
            to="/dashboard"
            className="bg-gray-100 text-gray-800 text-sm font-bold px-5 py-3 rounded-xl hover:bg-gray-200 transition-all"
          >
            Ir al dashboard
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

export default NotFound
