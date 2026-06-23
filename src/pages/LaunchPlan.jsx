import { useState } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '../components/layout/Sidebar'
import { useClaudeAPI } from '../hooks/useClaudeAPI'
import ResultCard from '../components/ResultCard'

function LaunchPlan() {
  const [business, setBusiness] = useState('')
  const [result, setResult] = useState('')
  const { generate, loading, error } = useClaudeAPI()

  const handleGenerate = async () => {
    if (!business.trim()) return
    const prompt = `Eres un consultor de eCommerce que ayuda a emprendedores a lanzar su tienda online. Basándote en este negocio: "${business}", crea un checklist de lanzamiento con 8 pasos concretos y ordenados cronológicamente, desde la validación inicial hasta el día del lanzamiento. Cada paso debe tener un título corto y una descripción de una línea. Responde solo con la lista numerada, sin introducción ni texto adicional.`
    const text = await generate(prompt)
    if (text) setResult(text)
  }

  return (
    <div className="flex flex-col lg:flex-row bg-white min-h-screen">
      <Sidebar />

      <main className="flex-1 px-5 lg:px-10 py-8 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-[10px] font-semibold tracking-widest text-[#9c6d0e] uppercase mb-2">Herramienta</p>
          <h1 className="text-2xl font-extrabold tracking-tight mb-2">Plan de Lanzamiento</h1>
          <p className="text-sm text-gray-600 mb-8">
            Tu checklist personalizado paso a paso para lanzar sin saltarte nada.
          </p>

          <div className="bg-[#FBF1DF] border border-[#f0dba8] rounded-2xl p-5 mb-6">
            <label className="block text-xs font-bold text-gray-700 mb-2">Describe tu negocio</label>
            <div className="flex gap-2 flex-wrap mb-2">
              {['Tienda de ropa deportiva femenina', 'eCommerce de productos naturales', 'Dropshipping de gadgets tecnológicos'].map((ex) => (
                <button key={ex} onClick={() => setBusiness(ex)} className="text-[10px] bg-white border border-[#f0dba8] text-[#9c6d0e] px-2.5 py-1 rounded-full hover:bg-[#FBF1DF] transition-colors">
                  {ex.length > 30 ? ex.slice(0, 30) + '…' : ex}
                </button>
              ))}
            </div>
            <textarea
              value={business}
              onChange={(e) => setBusiness(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleGenerate() } }}
              placeholder="Ej: Tienda online de ropa deportiva para mujeres, enfocada en yoga y pilates"
              className="w-full bg-white border border-[#f0dba8] rounded-xl p-3 text-sm text-black placeholder-gray-400 outline-none focus:border-[#d4970f] resize-none"
              rows={3}
            />

            <button
              onClick={handleGenerate}
              disabled={loading || !business.trim()}
              className="w-full mt-4 bg-[#d4970f] text-white font-bold text-sm py-3 rounded-xl hover:bg-[#b87f0c] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? 'Generando...' : 'Generar plan de lanzamiento'}
            </button>
          </div>

          {error && (
            <p className="text-sm text-red-600 mb-4">Ocurrió un error: {error}</p>
          )}

          {result && <ResultCard text={result} />}
        </motion.div>
      </main>
    </div>
  )
}

export default LaunchPlan