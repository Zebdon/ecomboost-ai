import { useState } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '../components/layout/Sidebar'
import { useClaudeAPI } from '../hooks/useClaudeAPI'
import ResultCard from '../components/ResultCard'

function Branding() {
  const [description, setDescription] = useState('')
  const [result, setResult] = useState('')
  const { generate, loading, error } = useClaudeAPI()

  const handleGenerate = async () => {
    if (!description.trim()) return
    const prompt = `Eres un experto en branding para eCommerce. Basándote en esta descripción de negocio: "${description}", genera:

1. 5 nombres de marca creativos y memorables (sin explicación, solo la lista)
2. 3 slogans cortos y potentes
3. Una sugerencia de paleta de colores (2-3 colores con su significado para la marca)

Responde solo con el contenido numerado, sin introducción ni texto adicional.`
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
          <p className="text-[10px] font-semibold tracking-widest text-[#6938b5] uppercase mb-2">Herramienta</p>
          <h1 className="text-2xl font-extrabold tracking-tight mb-2">Branding Instantáneo</h1>
          <p className="text-sm text-gray-600 mb-8">
            Genera nombres, slogans e identidad visual para tu marca en segundos.
          </p>

          <div className="bg-[#F0EBFA] border border-[#d9cdf0] rounded-2xl p-5 mb-6">
            <label className="block text-xs font-bold text-gray-700 mb-2">Describe tu negocio</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) handleGenerate() }}
              placeholder="Ej: Tienda de velas aromáticas artesanales hechas con cera de soja"
              className="w-full bg-white border border-[#d9cdf0] rounded-xl p-3 text-sm text-black placeholder-gray-400 outline-none focus:border-[#7e4fd1] resize-none"
              rows={3}
            />

            <button
              onClick={handleGenerate}
              disabled={loading || !description.trim()}
              className="w-full mt-4 bg-[#7e4fd1] text-white font-bold text-sm py-3 rounded-xl hover:bg-[#6a3fc0] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? 'Generando...' : 'Generar branding'}
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

export default Branding