import { useState } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '../components/layout/Sidebar'
import { useClaudeAPI } from '../hooks/useClaudeAPI'
import ResultCard from '../components/ResultCard'

function YouTubeScript() {
  const [topic, setTopic] = useState('')
  const [duration, setDuration] = useState('5-8 minutos')
  const [style, setStyle] = useState('Educativo')
  const [result, setResult] = useState('')
  const { generate, loading, error } = useClaudeAPI()

  const handleGenerate = async () => {
    if (!topic.trim()) return
    const prompt = `Eres un guionista experto en YouTube con millones de vistas. Crea un guion completo para un video de ${duration} sobre: "${topic}". Estilo: ${style}.

Estructura el guion así:

**TÍTULO SEO** (con keyword principal, máximo 60 caracteres)

**DESCRIPCIÓN YOUTUBE** (150 palabras con keywords, incluye timestamps y links de ejemplo)

**GANCHO (0-30 seg)**
(Las primeras palabras que enganchan al espectador y evitan que se vaya)

**INTRODUCCIÓN (30 seg - 1 min)**
(Presenta el problema y promete la solución)

**DESARROLLO**
(El contenido principal dividido en secciones claras con transiciones naturales)

**LLAMADA A LA ACCIÓN**
(Suscripción, like, comentario y siguiente video)

**TARJETAS Y PANTALLA FINAL**
(Qué mostrar en los últimos 20 segundos)

Escribe el guion en primera persona, tono natural y conversacional. Responde solo con el guion, sin explicaciones adicionales.`
    const text = await generate(prompt)
    if (text) setResult(text)
  }

  return (
    <div className="flex flex-col lg:flex-row bg-white min-h-screen">
      <Sidebar />
      <main className="flex-1 px-5 lg:px-10 py-8 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <p className="text-[10px] font-semibold tracking-widest text-[#9c3c14] uppercase mb-2">Herramienta</p>
          <h1 className="text-2xl font-extrabold tracking-tight mb-2">Guion de YouTube</h1>
          <p className="text-sm text-gray-600 mb-8">
            Genera guiones completos para YouTube con título SEO, gancho y estructura optimizada para retención.
          </p>

          <div className="bg-[#FBE9E0] border border-[#f0c5ab] rounded-2xl p-5 mb-6">
            <label className="block text-xs font-bold text-gray-700 mb-2">Tema del video</label>
            <div className="flex gap-2 flex-wrap mb-2">
              {['Cómo ganar dinero online en 2025', 'Los 5 errores al empezar un negocio', 'Tutorial de marketing en Instagram'].map((ex) => (
                <button key={ex} onClick={() => setTopic(ex)} className="text-[10px] bg-white border border-[#f0c5ab] text-[#9c3c14] px-2.5 py-1 rounded-full hover:bg-[#FBE9E0] transition-colors">
                  {ex.length > 35 ? ex.slice(0, 35) + '…' : ex}
                </button>
              ))}
            </div>
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) handleGenerate() }}
              placeholder="Ej: Cómo crear una tienda online desde cero sin experiencia en 2025"
              className="w-full bg-white border border-[#f0c5ab] rounded-xl p-3 text-sm text-black placeholder-gray-400 outline-none focus:border-[#E8642A] resize-none"
              rows={3}
            />

            <div className="flex gap-3 mt-4 flex-wrap">
              <div className="flex-1 min-w-[140px]">
                <label className="block text-xs font-bold text-gray-700 mb-2">Duración del video</label>
                <select value={duration} onChange={(e) => setDuration(e.target.value)} className="w-full bg-white border border-[#f0c5ab] rounded-xl p-2.5 text-sm text-black outline-none">
                  <option>3-5 minutos</option>
                  <option>5-8 minutos</option>
                  <option>10-15 minutos</option>
                  <option>15-20 minutos</option>
                </select>
              </div>
              <div className="flex-1 min-w-[140px]">
                <label className="block text-xs font-bold text-gray-700 mb-2">Estilo del video</label>
                <select value={style} onChange={(e) => setStyle(e.target.value)} className="w-full bg-white border border-[#f0c5ab] rounded-xl p-2.5 text-sm text-black outline-none">
                  <option>Educativo</option>
                  <option>Tutorial paso a paso</option>
                  <option>Opinión / Debate</option>
                  <option>Storytelling personal</option>
                  <option>Listado (Top X)</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading || !topic.trim()}
              className="w-full mt-4 bg-[#E8642A] text-white font-bold text-sm py-3 rounded-xl hover:bg-[#d6551e] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? 'Generando guion...' : 'Generar guion de YouTube'}
            </button>
          </div>

          {error && <p className="text-sm text-red-600 mb-4">Ocurrió un error: {error}</p>}
          {result && <ResultCard text={result} />}
        </motion.div>
      </main>
    </div>
  )
}

export default YouTubeScript
