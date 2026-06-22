import { useState } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '../components/layout/Sidebar'
import { useClaudeAPI } from '../hooks/useClaudeAPI'
import ResultCard from '../components/ResultCard'

function ReelsScript() {
  const [topic, setTopic] = useState('')
  const [platform, setPlatform] = useState('Instagram Reels')
  const [goal, setGoal] = useState('Educar')
  const [result, setResult] = useState('')
  const { generate, loading, error } = useClaudeAPI()

  const handleGenerate = async () => {
    if (!topic.trim()) return
    const prompt = `Eres un experto en videos virales para redes sociales. Crea 3 guiones de videos cortos (30-60 segundos) para ${platform} sobre: "${topic}". Objetivo: ${goal}.

Para cada guion usa esta estructura:

**GUION [número] — [ángulo de enfoque]**

⏱️ Duración estimada: X segundos

🎬 **GANCHO (0-3 seg):**
(Primera frase que para el scroll — pregunta, afirmación sorprendente o dato impactante)

📢 **DESARROLLO (3-45 seg):**
(Contenido principal en frases cortas, una idea por pantalla)

✅ **CTA FINAL (últimos 5 seg):**
(Qué debe hacer el espectador)

💬 **Caption del post:**
(Texto para la descripción con emojis y hashtags)

Los 3 guiones deben tener ángulos diferentes del mismo tema. Escribe en tono dinámico y directo. Responde solo con los guiones.`
    const text = await generate(prompt)
    if (text) setResult(text)
  }

  return (
    <div className="flex flex-col lg:flex-row bg-white min-h-screen">
      <Sidebar />
      <main className="flex-1 px-5 lg:px-10 py-8 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <p className="text-[10px] font-semibold tracking-widest text-[#6938b5] uppercase mb-2">Herramienta</p>
          <h1 className="text-2xl font-extrabold tracking-tight mb-2">Script de Reels y TikTok</h1>
          <p className="text-sm text-gray-600 mb-8">
            Genera 3 guiones de videos cortos con gancho viral, desarrollo y CTA para cada publicación.
          </p>

          <div className="bg-[#F0EBFA] border border-[#d9cdf0] rounded-2xl p-5 mb-6">
            <label className="block text-xs font-bold text-gray-700 mb-2">Tema del video</label>
            <div className="flex gap-2 flex-wrap mb-2">
              {['Errores al emprender online', 'Tips de productividad para emprendedores', 'Cómo conseguir clientes en Instagram'].map((ex) => (
                <button key={ex} onClick={() => setTopic(ex)} className="text-[10px] bg-white border border-[#d9cdf0] text-[#6938b5] px-2.5 py-1 rounded-full hover:bg-[#F0EBFA] transition-colors">
                  {ex.length > 35 ? ex.slice(0, 35) + '…' : ex}
                </button>
              ))}
            </div>
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) handleGenerate() }}
              placeholder="Ej: Por qué el 90% de las tiendas online fracasan en los primeros 6 meses"
              className="w-full bg-white border border-[#d9cdf0] rounded-xl p-3 text-sm text-black placeholder-gray-400 outline-none focus:border-[#7e4fd1] resize-none"
              rows={3}
            />

            <div className="flex gap-3 mt-4 flex-wrap">
              <div className="flex-1 min-w-[140px]">
                <label className="block text-xs font-bold text-gray-700 mb-2">Plataforma</label>
                <select value={platform} onChange={(e) => setPlatform(e.target.value)} className="w-full bg-white border border-[#d9cdf0] rounded-xl p-2.5 text-sm text-black outline-none">
                  <option>Instagram Reels</option>
                  <option>TikTok</option>
                  <option>YouTube Shorts</option>
                </select>
              </div>
              <div className="flex-1 min-w-[140px]">
                <label className="block text-xs font-bold text-gray-700 mb-2">Objetivo</label>
                <select value={goal} onChange={(e) => setGoal(e.target.value)} className="w-full bg-white border border-[#d9cdf0] rounded-xl p-2.5 text-sm text-black outline-none">
                  <option>Educar</option>
                  <option>Entretener</option>
                  <option>Vender</option>
                  <option>Ganar seguidores</option>
                  <option>Generar debate</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading || !topic.trim()}
              className="w-full mt-4 bg-[#7e4fd1] text-white font-bold text-sm py-3 rounded-xl hover:bg-[#6a3fb8] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? 'Generando scripts...' : 'Generar 3 scripts de video'}
            </button>
          </div>

          {error && <p className="text-sm text-red-600 mb-4">Ocurrió un error: {error}</p>}
          {result && <ResultCard text={result} />}
        </motion.div>
      </main>
    </div>
  )
}

export default ReelsScript
