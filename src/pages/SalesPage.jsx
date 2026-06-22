import { useState } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '../components/layout/Sidebar'
import { useClaudeAPI } from '../hooks/useClaudeAPI'
import ResultCard from '../components/ResultCard'

function SalesPage() {
  const [product, setProduct] = useState('')
  const [audience, setAudience] = useState('')
  const [result, setResult] = useState('')
  const { generate, loading, error } = useClaudeAPI()

  const handleGenerate = async () => {
    if (!product.trim()) return
    const prompt = `Eres un copywriter experto en páginas de ventas de alta conversión. Crea el copy completo para una página de ventas de: "${product}". ${audience ? `La audiencia objetivo es: ${audience}.` : ''}

Incluye estas secciones en orden:
1. **Titular principal** (hook poderoso)
2. **Subtítulo** (refuerza el beneficio)
3. **El problema** (describe el dolor del cliente)
4. **La solución** (presenta el producto como la respuesta)
5. **Beneficios clave** (3-5 bullets persuasivos)
6. **Para quién es** (perfil del cliente ideal)
7. **Qué incluye** (características principales)
8. **Garantía** (elimina el riesgo)
9. **CTA final** (llamada a la acción)

Usa lenguaje directo, emocional y orientado a conversión. Responde solo con el copy, sin explicaciones adicionales.`
    const text = await generate(prompt)
    if (text) setResult(text)
  }

  return (
    <div className="flex flex-col lg:flex-row bg-white min-h-screen">
      <Sidebar />
      <main className="flex-1 px-5 lg:px-10 py-8 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <p className="text-[10px] font-semibold tracking-widest text-[#9c3c14] uppercase mb-2">Herramienta</p>
          <h1 className="text-2xl font-extrabold tracking-tight mb-2">Copy de Página de Ventas</h1>
          <p className="text-sm text-gray-600 mb-8">
            Genera el copy completo de tu sales page: desde el titular hasta el CTA final.
          </p>

          <div className="bg-[#FBE9E0] border border-[#f0c5ab] rounded-2xl p-5 mb-6">
            <label className="block text-xs font-bold text-gray-700 mb-2">Describe tu producto o servicio</label>
            <div className="flex gap-2 flex-wrap mb-2">
              {['Curso de marketing digital', 'Programa de coaching de negocios', 'Plantillas de diseño para redes'].map((ex) => (
                <button key={ex} onClick={() => setProduct(ex)} className="text-[10px] bg-white border border-[#f0c5ab] text-[#9c3c14] px-2.5 py-1 rounded-full hover:bg-[#FBE9E0] transition-colors">
                  {ex.length > 30 ? ex.slice(0, 30) + '…' : ex}
                </button>
              ))}
            </div>
            <textarea
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) handleGenerate() }}
              placeholder="Ej: Programa online de 8 semanas para aprender a invertir en bolsa desde cero, precio €197"
              className="w-full bg-white border border-[#f0c5ab] rounded-xl p-3 text-sm text-black placeholder-gray-400 outline-none focus:border-[#E8642A] resize-none"
              rows={3}
            />

            <label className="block text-xs font-bold text-gray-700 mb-2 mt-4">Audiencia objetivo (opcional)</label>
            <input
              type="text"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              placeholder="Ej: Personas de 25-45 años que quieren independencia financiera"
              className="w-full bg-white border border-[#f0c5ab] rounded-xl p-3 text-sm text-black placeholder-gray-400 outline-none focus:border-[#E8642A]"
            />

            <button
              onClick={handleGenerate}
              disabled={loading || !product.trim()}
              className="w-full mt-4 bg-[#E8642A] text-white font-bold text-sm py-3 rounded-xl hover:bg-[#d6551e] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? 'Generando copy...' : 'Generar copy de ventas'}
            </button>
          </div>

          {error && <p className="text-sm text-red-600 mb-4">Ocurrió un error: {error}</p>}
          {result && <ResultCard text={result} />}
        </motion.div>
      </main>
    </div>
  )
}

export default SalesPage
