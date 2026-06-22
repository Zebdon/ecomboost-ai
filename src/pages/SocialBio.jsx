import { useState } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '../components/layout/Sidebar'
import { useClaudeAPI } from '../hooks/useClaudeAPI'
import ResultCard from '../components/ResultCard'

function SocialBio() {
  const [business, setBusiness] = useState('')
  const [platform, setPlatform] = useState('Instagram')
  const [result, setResult] = useState('')
  const { generate, loading, error } = useClaudeAPI()

  const handleGenerate = async () => {
    if (!business.trim()) return
    const prompt = `Eres un experto en personal branding y optimización de perfiles en redes sociales. Crea 3 versiones de bio para ${platform} para: "${business}".

Para cada versión incluye:

**BIO [número] — [enfoque: ej. Resultados / Autoridad / Cercana]**

📝 **Bio completa:**
(Adaptada al límite de caracteres de ${platform}, con emojis estratégicos)

🔗 **Link en bio sugerido:**
(Qué poner como enlace y qué texto usar)

📌 **Keywords incluidas:**
(Palabras clave que ayudan a aparecer en búsquedas)

💡 **Por qué funciona:**
(Explicación breve de la estrategia detrás)

Las 3 versiones deben ser diferentes en tono y enfoque. Responde solo con las bios, sin introducción adicional.`
    const text = await generate(prompt)
    if (text) setResult(text)
  }

  return (
    <div className="flex flex-col lg:flex-row bg-white min-h-screen">
      <Sidebar />
      <main className="flex-1 px-5 lg:px-10 py-8 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <p className="text-[10px] font-semibold tracking-widest text-[#2d7a42] uppercase mb-2">Herramienta</p>
          <h1 className="text-2xl font-extrabold tracking-tight mb-2">Bio de Redes Sociales</h1>
          <p className="text-sm text-gray-600 mb-8">
            Genera 3 versiones de bio optimizadas para convertir visitas en seguidores y clientes.
          </p>

          <div className="bg-[#EAF5EC] border border-[#c2e2c9] rounded-2xl p-5 mb-6">
            <label className="block text-xs font-bold text-gray-700 mb-2">Describe tu negocio o perfil</label>
            <div className="flex gap-2 flex-wrap mb-2">
              {['Coach de negocios online', 'Fotógrafa de bodas', 'Tienda de productos naturales'].map((ex) => (
                <button key={ex} onClick={() => setBusiness(ex)} className="text-[10px] bg-white border border-[#c2e2c9] text-[#2d7a42] px-2.5 py-1 rounded-full hover:bg-[#EAF5EC] transition-colors">
                  {ex}
                </button>
              ))}
            </div>
            <textarea
              value={business}
              onChange={(e) => setBusiness(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) handleGenerate() }}
              placeholder="Ej: Ayudo a emprendedoras a lanzar su negocio online desde cero. Curso de marketing digital, comunidad privada."
              className="w-full bg-white border border-[#c2e2c9] rounded-xl p-3 text-sm text-black placeholder-gray-400 outline-none focus:border-[#3f9c58] resize-none"
              rows={3}
            />

            <div className="mt-4">
              <label className="block text-xs font-bold text-gray-700 mb-2">Plataforma</label>
              <div className="flex gap-2 flex-wrap">
                {['Instagram', 'TikTok', 'LinkedIn', 'Twitter / X', 'YouTube'].map((p) => (
                  <button
                    key={p}
                    onClick={() => setPlatform(p)}
                    className={`text-xs font-semibold px-3 py-2 rounded-lg border transition-all ${
                      platform === p
                        ? 'bg-[#3f9c58] text-white border-[#3f9c58]'
                        : 'bg-white text-gray-600 border-[#c2e2c9] hover:border-[#3f9c58]'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading || !business.trim()}
              className="w-full mt-4 bg-[#3f9c58] text-white font-bold text-sm py-3 rounded-xl hover:bg-[#338049] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? 'Generando bios...' : 'Generar 3 versiones de bio'}
            </button>
          </div>

          {error && <p className="text-sm text-red-600 mb-4">Ocurrió un error: {error}</p>}
          {result && <ResultCard text={result} />}
        </motion.div>
      </main>
    </div>
  )
}

export default SocialBio
