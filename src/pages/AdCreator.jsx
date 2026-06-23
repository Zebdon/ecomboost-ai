import { useState } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '../components/layout/Sidebar'
import { useClaudeAPI } from '../hooks/useClaudeAPI'
import ResultCard from '../components/ResultCard'

function AdCreator() {
  const [product, setProduct] = useState('')
  const [platform, setPlatform] = useState('Instagram')
  const [tone, setTone] = useState('Persuasivo')
  const [result, setResult] = useState('')
  const { generate, loading, error } = useClaudeAPI()

  const handleGenerate = async () => {
    if (!product.trim()) return
    const prompt = `Eres un experto en marketing digital para eCommerce. Crea 3 variaciones de copy publicitario para ${platform} sobre este producto: "${product}". El tono debe ser ${tone}. Cada variación debe incluir un titular corto y un cuerpo de texto persuasivo de máximo 3 líneas, optimizado para conversión. Numera cada variación claramente. Responde solo con las 3 variaciones, sin introducción ni explicación adicional.`
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
          <p className="text-[10px] font-semibold tracking-widest text-[#9c3c14] uppercase mb-2">Herramienta</p>
          <h1 className="text-2xl font-extrabold tracking-tight mb-2">Creador de Ads Multi-canal</h1>
          <p className="text-sm text-gray-600 mb-8">
            Describe tu producto y genera copy publicitario optimizado para conversión en segundos.
          </p>

          <div className="bg-[#FBE9E0] border border-[#f0c5ab] rounded-2xl p-5 mb-6">
            <label className="block text-xs font-bold text-gray-700 mb-2">Describe tu producto</label>
            <div className="flex gap-2 flex-wrap mb-2">
              {['Crema facial con ácido hialurónico para piel sensible', 'Mochila impermeable para portátil 25L', 'Zapatillas minimalistas para running'].map((ex) => (
                <button key={ex} onClick={() => setProduct(ex)} className="text-[10px] bg-white border border-[#f0c5ab] text-[#9c3c14] px-2.5 py-1 rounded-full hover:bg-[#FBE9E0] transition-colors">
                  {ex.length > 30 ? ex.slice(0, 30) + '…' : ex}
                </button>
              ))}
            </div>
            <textarea
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleGenerate() } }}
              placeholder="Ej: Crema facial natural con ácido hialurónico, hidrata 24h, para piel sensible"
              className="w-full bg-white border border-[#f0c5ab] rounded-xl p-3 text-sm text-black placeholder-gray-400 outline-none focus:border-[#E8642A] resize-none"
              rows={3}
            />

            <div className="flex gap-3 mt-4 flex-wrap">
              <div className="flex-1 min-w-[140px]">
                <label className="block text-xs font-bold text-gray-700 mb-2">Plataforma</label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full bg-white border border-[#f0c5ab] rounded-xl p-2.5 text-sm text-black outline-none"
                >
                  <option>Instagram</option>
                  <option>Facebook</option>
                  <option>TikTok</option>
                </select>
              </div>
              <div className="flex-1 min-w-[140px]">
                <label className="block text-xs font-bold text-gray-700 mb-2">Tono</label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full bg-white border border-[#f0c5ab] rounded-xl p-2.5 text-sm text-black outline-none"
                >
                  <option>Persuasivo</option>
                  <option>Cercano</option>
                  <option>Urgente</option>
                  <option>Elegante</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading || !product.trim()}
              className="w-full mt-4 bg-[#E8642A] text-white font-bold text-sm py-3 rounded-xl hover:bg-[#d6551e] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? 'Generando...' : 'Generar copy de anuncio'}
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

export default AdCreator