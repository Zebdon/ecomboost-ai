import { useState } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '../components/layout/Sidebar'
import { useClaudeAPI } from '../hooks/useClaudeAPI'
import ResultCard from '../components/ResultCard'

function CompetitorAnalysis() {
  const [business, setBusiness] = useState('')
  const [competitors, setCompetitors] = useState('')
  const [result, setResult] = useState('')
  const { generate, loading, error } = useClaudeAPI()

  const handleGenerate = async () => {
    if (!business.trim()) return
    const prompt = `Eres un estratega de negocios especializado en análisis competitivo. Analiza el panorama competitivo para: "${business}". ${competitors ? `Los competidores conocidos son: ${competitors}.` : ''}

Responde con este formato exacto:

**Panorama competitivo general**
(¿Qué tipo de competencia existe? ¿Está saturado o hay oportunidad?)

**Fortalezas típicas de los competidores**
(Qué hacen bien la mayoría)

**Debilidades y huecos de mercado**
(Qué hacen mal o no ofrecen — aquí está tu oportunidad)

**Tu ventaja competitiva potencial**
(3 ángulos de diferenciación concretos que puedes explotar)

**Palabras clave y posicionamiento**
(Cómo comunicar tu diferenciación en mensajes de marketing)

**Acciones inmediatas recomendadas**
(3 pasos concretos para diferenciarte esta semana)

Sé específico y directo. Responde solo con el análisis, sin introducción.`
    const text = await generate(prompt)
    if (text) setResult(text)
  }

  return (
    <div className="flex flex-col lg:flex-row bg-white min-h-screen">
      <Sidebar />
      <main className="flex-1 px-5 lg:px-10 py-8 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <p className="text-[10px] font-semibold tracking-widest text-[#6938b5] uppercase mb-2">Herramienta</p>
          <h1 className="text-2xl font-extrabold tracking-tight mb-2">Análisis de Competencia</h1>
          <p className="text-sm text-gray-600 mb-8">
            Encuentra los huecos de mercado que tus competidores no están cubriendo.
          </p>

          <div className="bg-[#F0EBFA] border border-[#d9cdf0] rounded-2xl p-5 mb-6">
            <label className="block text-xs font-bold text-gray-700 mb-2">Describe tu negocio o nicho</label>
            <div className="flex gap-2 flex-wrap mb-2">
              {['Agencia de SEO para pymes', 'Tienda de suplementos deportivos', 'App de meditación'].map((ex) => (
                <button key={ex} onClick={() => setBusiness(ex)} className="text-[10px] bg-white border border-[#d9cdf0] text-[#6938b5] px-2.5 py-1 rounded-full hover:bg-[#F0EBFA] transition-colors">
                  {ex}
                </button>
              ))}
            </div>
            <textarea
              value={business}
              onChange={(e) => setBusiness(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleGenerate() } }}
              placeholder="Ej: Servicio de diseño de logos para emprendedores digitales, precio €150-300"
              className="w-full bg-white border border-[#d9cdf0] rounded-xl p-3 text-sm text-black placeholder-gray-400 outline-none focus:border-[#7e4fd1] resize-none"
              rows={3}
            />

            <label className="block text-xs font-bold text-gray-700 mb-2 mt-4">Competidores que conoces (opcional)</label>
            <input
              type="text"
              value={competitors}
              onChange={(e) => setCompetitors(e.target.value)}
              placeholder="Ej: 99designs, Fiverr, Looka"
              className="w-full bg-white border border-[#d9cdf0] rounded-xl p-3 text-sm text-black placeholder-gray-400 outline-none focus:border-[#7e4fd1]"
            />

            <button
              onClick={handleGenerate}
              disabled={loading || !business.trim()}
              className="w-full mt-4 bg-[#7e4fd1] text-white font-bold text-sm py-3 rounded-xl hover:bg-[#6a3fb8] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? 'Analizando competencia...' : 'Analizar competencia'}
            </button>
          </div>

          {error && <p className="text-sm text-red-600 mb-4">Ocurrió un error: {error}</p>}
          {result && <ResultCard text={result} />}
        </motion.div>
      </main>
    </div>
  )
}

export default CompetitorAnalysis
