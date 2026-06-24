import { useState } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '../components/layout/Sidebar'
import { useClaudeAPI } from '../hooks/useClaudeAPI'
import ResultCard from '../components/ResultCard'

function SalesPage() {
  const [product, setProduct] = useState('')
  const [audience, setAudience] = useState('')
  const [price, setPrice] = useState('')
  const [objection, setObjection] = useState('El precio es caro')
  const [result, setResult] = useState('')
  const { generate, loading, error } = useClaudeAPI()

  const handleGenerate = async () => {
    if (!product.trim()) return
    const prompt = `Crea el copy completo de una página de ventas de alta conversión para:
Producto/servicio: "${product}"
${audience ? `Cliente ideal: ${audience}` : ''}
${price ? `Precio: ${price}` : ''}
Objeción principal a superar: "${objection}"

Estructura el copy completo con estas secciones:

**1. TITULAR PRINCIPAL**
(Gancho emocional que habla del resultado, no del producto. Usa la fórmula: Cómo [resultado deseado] sin [obstáculo temido])

**2. SUBTÍTULO**
(Refuerza el beneficio principal con una promesa específica y creíble)

**3. EL PROBLEMA QUE RESUELVES**
(3-4 líneas describiendo el dolor con palabras que el cliente usaría. Hazle sentir comprendido)

**4. POR QUÉ OTRAS SOLUCIONES FALLAN**
(1-2 párrafos: qué han intentado antes y por qué no funcionó)

**5. LA SOLUCIÓN — PRESENTA EL PRODUCTO**
(Introduce el producto como la solución lógica al problema descrito)

**6. BENEFICIOS CLAVE**
(5-6 bullets con formato: Beneficio → qué significa para su vida)

**7. PARA QUIÉN ES / NO ES**
(Lista de 4-5 "Es para ti si..." y 3 "No es para ti si...")

**8. QUÉ INCLUYE**
(Lista detallada de todo lo que recibe)

**9. PRUEBA SOCIAL**
(2-3 testimonios ficticios pero realistas y específicos)

**10. SUPERA LA OBJECIÓN: "${objection}"**
(Párrafo específico que desmonta esta objeción con lógica y empatía)
${price ? `\n**11. PRECIO Y JUSTIFICACIÓN**\n(Presenta ${price} como inversión, no gasto. Compara con el coste de NO resolver el problema)` : ''}

**12. GARANTÍA**
(Elimina el riesgo de compra — qué pasa si no está satisfecho)

**13. CTA FINAL**
(3 variaciones de llamada a la acción con urgencia real)`
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
            Copy completo de sales page: titular, beneficios, objeciones, garantía y CTA.
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
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleGenerate() } }}
              placeholder="Ej: Programa online de 8 semanas para aprender a invertir en bolsa desde cero"
              className="w-full bg-white border border-[#f0c5ab] rounded-xl p-3 text-sm text-black placeholder-gray-400 outline-none focus:border-[#E8642A] resize-none"
              rows={3}
            />

            <label className="block text-xs font-bold text-gray-700 mb-2 mt-4">Cliente ideal (opcional)</label>
            <input
              type="text"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              placeholder="Ej: Personas de 25-45 años que quieren independencia financiera"
              className="w-full bg-white border border-[#f0c5ab] rounded-xl p-3 text-sm text-black placeholder-gray-400 outline-none focus:border-[#E8642A]"
            />

            <div className="flex gap-3 mt-4 flex-wrap">
              <div className="flex-1 min-w-[140px]">
                <label className="block text-xs font-bold text-gray-700 mb-2">Precio del producto (opcional)</label>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Ej: €197 o €47/mes"
                  className="w-full bg-white border border-[#f0c5ab] rounded-xl p-2.5 text-sm text-black placeholder-gray-400 outline-none focus:border-[#E8642A]"
                />
              </div>
              <div className="flex-1 min-w-[140px]">
                <label className="block text-xs font-bold text-gray-700 mb-2">Objeción principal</label>
                <select value={objection} onChange={(e) => setObjection(e.target.value)} className="w-full bg-white border border-[#f0c5ab] rounded-xl p-2.5 text-sm text-black outline-none">
                  <option>El precio es caro</option>
                  <option>No tengo tiempo</option>
                  <option>No confío en el vendedor</option>
                  <option>Ya lo he intentado antes</option>
                  <option>No sé si funcionará para mí</option>
                  <option>Lo pienso y ya decido</option>
                </select>
              </div>
            </div>

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
