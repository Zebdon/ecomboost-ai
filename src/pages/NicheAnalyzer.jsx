import { useState } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '../components/layout/Sidebar'
import { useClaudeAPI } from '../hooks/useClaudeAPI'
import ResultCard from '../components/ResultCard'

function NicheAnalyzer() {
  const [niche, setNiche] = useState('')
  const [result, setResult] = useState('')
  const { generate, loading, error } = useClaudeAPI()

  const handleGenerate = async () => {
    if (!niche.trim()) return
    const prompt = `Eres un analista de mercado especializado en eCommerce. Analiza el siguiente nicho o producto: "${niche}". Da un análisis breve y honesto en este formato exacto:

1. Potencial de rentabilidad (Alto/Medio/Bajo) y por qué
2. Nivel de competencia (Alto/Medio/Bajo) y por qué
3. Audiencia objetivo principal
4. Un riesgo importante a considerar
5. Una recomendación concreta para diferenciarse

Sé directo y realista, no optimista por defecto. Responde solo con el análisis numerado, sin introducción.`
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
          <p className="text-[10px] font-semibold tracking-widest text-[#2d7a42] uppercase mb-2">Herramienta</p>
          <h1 className="text-2xl font-extrabold tracking-tight mb-2">Analizador de Nicho</h1>
          <p className="text-sm text-gray-600 mb-8">
            Descubre si tu idea de producto es rentable antes de invertir.
          </p>

          <div className="bg-[#EAF5EC] border border-[#c2e2c9] rounded-2xl p-5 mb-6">
            <label className="block text-xs font-bold text-gray-700 mb-2">Describe tu nicho o producto</label>
            <div className="flex gap-2 flex-wrap mb-2">
              {['Accesorios de yoga sostenibles', 'Ropa deportiva para mujeres', 'Suplementos veganos para deportistas'].map((ex) => (
                <button key={ex} onClick={() => setNiche(ex)} className="text-[10px] bg-white border border-[#c2e2c9] text-[#2d7a42] px-2.5 py-1 rounded-full hover:bg-[#EAF5EC] transition-colors">
                  {ex}
                </button>
              ))}
            </div>
            <textarea
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleGenerate() } }}
              placeholder="Ej: Accesorios de yoga sostenibles (esterillas, bloques de corcho)"
              className="w-full bg-white border border-[#c2e2c9] rounded-xl p-3 text-sm text-black placeholder-gray-400 outline-none focus:border-[#3f9c58] resize-none"
              rows={3}
            />

            <button
              onClick={handleGenerate}
              disabled={loading || !niche.trim()}
              className="w-full mt-4 bg-[#3f9c58] text-white font-bold text-sm py-3 rounded-xl hover:bg-[#338049] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? 'Analizando...' : 'Analizar nicho'}
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

export default NicheAnalyzer