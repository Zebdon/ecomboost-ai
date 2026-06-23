import { useState } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '../components/layout/Sidebar'
import { useClaudeAPI } from '../hooks/useClaudeAPI'
import ResultCard from '../components/ResultCard'

function SeoGenerator() {
  const [product, setProduct] = useState('')
  const [keywords, setKeywords] = useState('')
  const [result, setResult] = useState('')
  const { generate, loading, error } = useClaudeAPI()

  const handleGenerate = async () => {
    if (!product.trim()) return
    const prompt = `Eres un experto en SEO para eCommerce. Crea una descripción de producto optimizada para Google de máximo 150 palabras para: "${product}". ${keywords ? `Incluye naturalmente estas palabras clave: ${keywords}.` : ''} La descripción debe ser persuasiva, clara y orientada a conversión, evitando lenguaje genérico. Responde solo con la descripción, sin introducción ni explicación adicional.`
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
          <p className="text-[10px] font-semibold tracking-widest text-[#1e5f96] uppercase mb-2">Herramienta</p>
          <h1 className="text-2xl font-extrabold tracking-tight mb-2">Generador SEO</h1>
          <p className="text-sm text-gray-600 mb-8">
            Crea descripciones de producto que venden y posicionan en buscadores.
          </p>

          <div className="bg-[#E9F1FA] border border-[#c2dbf0] rounded-2xl p-5 mb-6">
            <label className="block text-xs font-bold text-gray-700 mb-2">Describe tu producto</label>
            <div className="flex gap-2 flex-wrap mb-2">
              {['Mochila impermeable para portátil 25L USB', 'Crema antienvejecimiento con retinol', 'Silla ergonómica para home office'].map((ex) => (
                <button key={ex} onClick={() => setProduct(ex)} className="text-[10px] bg-white border border-[#c2dbf0] text-[#1e5f96] px-2.5 py-1 rounded-full hover:bg-[#E9F1FA] transition-colors">
                  {ex.length > 30 ? ex.slice(0, 30) + '…' : ex}
                </button>
              ))}
            </div>
            <textarea
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleGenerate() } }}
              placeholder="Ej: Mochila impermeable para portátil, 25L, con compartimento USB"
              className="w-full bg-white border border-[#c2dbf0] rounded-xl p-3 text-sm text-black placeholder-gray-400 outline-none focus:border-[#2f7fc4] resize-none"
              rows={3}
            />

            <label className="block text-xs font-bold text-gray-700 mb-2 mt-4">Palabras clave (opcional)</label>
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="Ej: mochila portátil, mochila viaje resistente"
              className="w-full bg-white border border-[#c2dbf0] rounded-xl p-3 text-sm text-black placeholder-gray-400 outline-none focus:border-[#2f7fc4]"
            />

            <button
              onClick={handleGenerate}
              disabled={loading || !product.trim()}
              className="w-full mt-4 bg-[#2f7fc4] text-white font-bold text-sm py-3 rounded-xl hover:bg-[#256aa6] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? 'Generando...' : 'Generar descripción SEO'}
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

export default SeoGenerator