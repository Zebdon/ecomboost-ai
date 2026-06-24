import { useState } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '../components/layout/Sidebar'
import { useClaudeAPI } from '../hooks/useClaudeAPI'
import ResultCard from '../components/ResultCard'

function NicheAnalyzer() {
  const [niche, setNiche] = useState('')
  const [market, setMarket] = useState('España')
  const [budget, setBudget] = useState('€1.000 - €5.000')
  const [result, setResult] = useState('')
  const { generate, loading, error } = useClaudeAPI()

  const handleGenerate = async () => {
    if (!niche.trim()) return
    const prompt = `Analiza en profundidad este nicho para un emprendedor que quiere entrar en él: "${niche}".
Mercado objetivo: ${market}. Presupuesto inicial disponible: ${budget}.

Estructura tu análisis así:

**Potencial de rentabilidad**
Evalúa el tamaño real del mercado en ${market} con cifras concretas (volumen de búsquedas, tamaño del mercado en €, tasa de crecimiento). Sé honesto sobre cuánto tiempo tarda en ser rentable.

**Nivel de competencia**
Nombra competidores reales que existen en ${market}. Analiza si hay hueco de mercado real o si está saturado. Da datos de CPC aproximado si aplica publicidad.

**Audiencia objetivo**
Define el perfil exacto del cliente ideal: edad, situación, problema principal, plataformas donde está, cuánto está dispuesto a pagar y por qué.

**Riesgos críticos**
Los 2-3 obstáculos reales que hacen fracasar a la mayoría en este nicho. Sin suavizar.

**Estrategia de entrada recomendada**
Con un presupuesto de ${budget} en ${market}, cuál es el camino más realista para validar y escalar. Qué hacer primero, qué evitar.

**Veredicto final**
¿Vale la pena entrar ahora? ¿Sí, no, o con qué condiciones?`
    const text = await generate(prompt)
    if (text) setResult(text)
  }

  return (
    <div className="flex flex-col lg:flex-row bg-white min-h-screen">
      <Sidebar />
      <main className="flex-1 px-5 lg:px-10 py-8 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <p className="text-[10px] font-semibold tracking-widest text-[#2d7a42] uppercase mb-2">Herramienta</p>
          <h1 className="text-2xl font-extrabold tracking-tight mb-2">Analizador de Nicho</h1>
          <p className="text-sm text-gray-600 mb-8">
            Descubre si tu idea de producto es rentable antes de invertir un euro.
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
              placeholder="Ej: Startup de cosmética natural con ingredientes ecológicos certificados"
              className="w-full bg-white border border-[#c2e2c9] rounded-xl p-3 text-sm text-black placeholder-gray-400 outline-none focus:border-[#3f9c58] resize-none"
              rows={3}
            />

            <div className="flex gap-3 mt-4 flex-wrap">
              <div className="flex-1 min-w-[140px]">
                <label className="block text-xs font-bold text-gray-700 mb-2">Mercado objetivo</label>
                <select value={market} onChange={(e) => setMarket(e.target.value)} className="w-full bg-white border border-[#c2e2c9] rounded-xl p-2.5 text-sm text-black outline-none">
                  <option>España</option>
                  <option>México</option>
                  <option>LATAM (región)</option>
                  <option>USA (hispano)</option>
                  <option>Internacional</option>
                </select>
              </div>
              <div className="flex-1 min-w-[140px]">
                <label className="block text-xs font-bold text-gray-700 mb-2">Presupuesto inicial</label>
                <select value={budget} onChange={(e) => setBudget(e.target.value)} className="w-full bg-white border border-[#c2e2c9] rounded-xl p-2.5 text-sm text-black outline-none">
                  <option>Menos de €500</option>
                  <option>€500 - €1.000</option>
                  <option>€1.000 - €5.000</option>
                  <option>€5.000 - €20.000</option>
                  <option>Más de €20.000</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading || !niche.trim()}
              className="w-full mt-4 bg-[#3f9c58] text-white font-bold text-sm py-3 rounded-xl hover:bg-[#338049] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? 'Analizando...' : 'Analizar nicho'}
            </button>
          </div>

          {error && <p className="text-sm text-red-600 mb-4">Ocurrió un error: {error}</p>}
          {result && <ResultCard text={result} />}
        </motion.div>
      </main>
    </div>
  )
}

export default NicheAnalyzer
