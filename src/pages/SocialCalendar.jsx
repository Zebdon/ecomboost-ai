import { useState } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '../components/layout/Sidebar'
import { useClaudeAPI } from '../hooks/useClaudeAPI'
import ResultCard from '../components/ResultCard'

function SocialCalendar() {
  const [business, setBusiness] = useState('')
  const [platform, setPlatform] = useState('Instagram')
  const [days, setDays] = useState('14')
  const [result, setResult] = useState('')
  const { generate, loading, error } = useClaudeAPI()

  const handleGenerate = async () => {
    if (!business.trim()) return
    const prompt = `Eres un estratega de redes sociales. Crea un calendario de contenido de ${days} días para ${platform} para este negocio: "${business}".

Para cada día incluye:
- Día y fecha (Día 1, Día 2...)
- Tipo de contenido (Reel, Carrusel, Story, Post estático)
- Tema/idea del post
- Caption corto (máximo 2 líneas)
- 3 hashtags relevantes

Mezcla contenido educativo, entretenimiento, detrás de cámaras y ventas en proporción 70/30. Responde solo con el calendario, sin introducción adicional.`
    const text = await generate(prompt)
    if (text) setResult(text)
  }

  return (
    <div className="flex flex-col lg:flex-row bg-white min-h-screen">
      <Sidebar />
      <main className="flex-1 px-5 lg:px-10 py-8 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <p className="text-[10px] font-semibold tracking-widest text-[#2d7a42] uppercase mb-2">Herramienta</p>
          <h1 className="text-2xl font-extrabold tracking-tight mb-2">Calendario de Contenido</h1>
          <p className="text-sm text-gray-600 mb-8">
            Genera ideas de contenido para semanas o meses adaptadas a tu negocio y plataforma.
          </p>

          <div className="bg-[#EAF5EC] border border-[#c2e2c9] rounded-2xl p-5 mb-6">
            <label className="block text-xs font-bold text-gray-700 mb-2">Describe tu negocio</label>
            <div className="flex gap-2 flex-wrap mb-2">
              {['Tienda de moda sostenible', 'Coach de nutrición', 'Agencia de diseño web'].map((ex) => (
                <button key={ex} onClick={() => setBusiness(ex)} className="text-[10px] bg-white border border-[#c2e2c9] text-[#2d7a42] px-2.5 py-1 rounded-full hover:bg-[#EAF5EC] transition-colors">
                  {ex}
                </button>
              ))}
            </div>
            <textarea
              value={business}
              onChange={(e) => setBusiness(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) handleGenerate() }}
              placeholder="Ej: Estudio de yoga online para mujeres mayores de 30 años"
              className="w-full bg-white border border-[#c2e2c9] rounded-xl p-3 text-sm text-black placeholder-gray-400 outline-none focus:border-[#3f9c58] resize-none"
              rows={3}
            />

            <div className="flex gap-3 mt-4 flex-wrap">
              <div className="flex-1 min-w-[140px]">
                <label className="block text-xs font-bold text-gray-700 mb-2">Plataforma</label>
                <select value={platform} onChange={(e) => setPlatform(e.target.value)} className="w-full bg-white border border-[#c2e2c9] rounded-xl p-2.5 text-sm text-black outline-none">
                  <option>Instagram</option>
                  <option>TikTok</option>
                  <option>LinkedIn</option>
                  <option>YouTube</option>
                  <option>Twitter / X</option>
                </select>
              </div>
              <div className="flex-1 min-w-[140px]">
                <label className="block text-xs font-bold text-gray-700 mb-2">Días de contenido</label>
                <select value={days} onChange={(e) => setDays(e.target.value)} className="w-full bg-white border border-[#c2e2c9] rounded-xl p-2.5 text-sm text-black outline-none">
                  <option value="7">7 días</option>
                  <option value="14">14 días</option>
                  <option value="30">30 días</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading || !business.trim()}
              className="w-full mt-4 bg-[#3f9c58] text-white font-bold text-sm py-3 rounded-xl hover:bg-[#338049] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? 'Generando calendario...' : 'Generar calendario de contenido'}
            </button>
          </div>

          {error && <p className="text-sm text-red-600 mb-4">Ocurrió un error: {error}</p>}
          {result && <ResultCard text={result} />}
        </motion.div>
      </main>
    </div>
  )
}

export default SocialCalendar
