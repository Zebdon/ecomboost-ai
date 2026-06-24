import { useState } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '../components/layout/Sidebar'
import { useClaudeAPI } from '../hooks/useClaudeAPI'
import ResultCard from '../components/ResultCard'

function SeoGenerator() {
  const [product, setProduct] = useState('')
  const [keywords, setKeywords] = useState('')
  const [pageType, setPageType] = useState('Página de producto')
  const [country, setCountry] = useState('España')
  const [result, setResult] = useState('')
  const { generate, loading, error } = useClaudeAPI()

  const handleGenerate = async () => {
    if (!product.trim()) return
    const prompt = `Crea contenido SEO optimizado para "${product}" — tipo de página: ${pageType}, mercado: ${country}.
${keywords ? `Palabras clave a incluir: ${keywords}.` : ''}

Genera todo esto:

**Meta título** (máximo 60 caracteres, incluye keyword principal)

**Meta descripción** (máximo 155 caracteres, con CTA y keyword)

**H1 principal** (título de la página, diferente al meta título)

**Descripción optimizada** (150-200 palabras, persuasiva y con keywords naturales, orientada a conversión)

**Palabras clave secundarias sugeridas** (5-8 términos long-tail con intención de compra para ${country})

**Análisis de intención de búsqueda** (qué busca exactamente el usuario cuando llega a esta página y cómo adaptar el contenido)

**Estructura de contenido recomendada** (H2 y H3 sugeridos para la página completa)

Usa vocabulario y expresiones naturales para ${country}. Prioriza intención de compra sobre volumen de búsqueda.`
    const text = await generate(prompt)
    if (text) setResult(text)
  }

  return (
    <div className="flex flex-col lg:flex-row bg-white min-h-screen">
      <Sidebar />
      <main className="flex-1 px-5 lg:px-10 py-8 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <p className="text-[10px] font-semibold tracking-widest text-[#1e5f96] uppercase mb-2">Herramienta</p>
          <h1 className="text-2xl font-extrabold tracking-tight mb-2">Generador SEO</h1>
          <p className="text-sm text-gray-600 mb-8">
            Meta títulos, descripciones, H1 y estructura de contenido optimizados para Google.
          </p>

          <div className="bg-[#E9F1FA] border border-[#c2dbf0] rounded-2xl p-5 mb-6">
            <label className="block text-xs font-bold text-gray-700 mb-2">Describe tu producto o página</label>
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
              placeholder="Ej: Mochila impermeable para portátil, 25L, con compartimento USB, color negro"
              className="w-full bg-white border border-[#c2dbf0] rounded-xl p-3 text-sm text-black placeholder-gray-400 outline-none focus:border-[#2f7fc4] resize-none"
              rows={3}
            />

            <label className="block text-xs font-bold text-gray-700 mb-2 mt-4">Palabras clave principales (opcional)</label>
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="Ej: mochila portátil impermeable, mochila viaje resistente"
              className="w-full bg-white border border-[#c2dbf0] rounded-xl p-3 text-sm text-black placeholder-gray-400 outline-none focus:border-[#2f7fc4]"
            />

            <div className="flex gap-3 mt-4 flex-wrap">
              <div className="flex-1 min-w-[140px]">
                <label className="block text-xs font-bold text-gray-700 mb-2">Tipo de página</label>
                <select value={pageType} onChange={(e) => setPageType(e.target.value)} className="w-full bg-white border border-[#c2dbf0] rounded-xl p-2.5 text-sm text-black outline-none">
                  <option>Página de producto</option>
                  <option>Landing page</option>
                  <option>Artículo de blog</option>
                  <option>Página de categoría</option>
                  <option>Home / Página principal</option>
                </select>
              </div>
              <div className="flex-1 min-w-[140px]">
                <label className="block text-xs font-bold text-gray-700 mb-2">Mercado / País</label>
                <select value={country} onChange={(e) => setCountry(e.target.value)} className="w-full bg-white border border-[#c2dbf0] rounded-xl p-2.5 text-sm text-black outline-none">
                  <option>España</option>
                  <option>México</option>
                  <option>Argentina</option>
                  <option>Colombia</option>
                  <option>LATAM general</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading || !product.trim()}
              className="w-full mt-4 bg-[#2f7fc4] text-white font-bold text-sm py-3 rounded-xl hover:bg-[#256aa6] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? 'Generando SEO...' : 'Generar contenido SEO'}
            </button>
          </div>

          {error && <p className="text-sm text-red-600 mb-4">Ocurrió un error: {error}</p>}
          {result && <ResultCard text={result} />}
        </motion.div>
      </main>
    </div>
  )
}

export default SeoGenerator
