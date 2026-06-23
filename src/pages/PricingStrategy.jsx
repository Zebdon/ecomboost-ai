import { useState } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '../components/layout/Sidebar'
import { useClaudeAPI } from '../hooks/useClaudeAPI'
import ResultCard from '../components/ResultCard'

function PricingStrategy() {
  const [product, setProduct] = useState('')
  const [currentPrice, setCurrentPrice] = useState('')
  const [result, setResult] = useState('')
  const { generate, loading, error } = useClaudeAPI()

  const handleGenerate = async () => {
    if (!product.trim()) return
    const prompt = `Eres un experto en estrategia de precios para negocios digitales. Analiza y crea una estrategia de precios para: "${product}". ${currentPrice ? `El precio actual o estimado es: ${currentPrice}.` : ''}

Responde con este formato exacto:

**Análisis del posicionamiento de precio**
(¿Es demasiado bajo, alto o correcto? ¿Qué transmite al cliente?)

**Precio recomendado y justificación**
(Precio exacto y por qué ese número funciona psicológicamente)

**Estructura de precios sugerida**
(Opciones: básico / estándar / premium o pago único / suscripción / etc.)

**Estrategia de lanzamiento**
(Precio de lanzamiento, early bird, cómo subir el precio progresivamente)

**Errores comunes a evitar**
(2-3 errores de pricing frecuentes en este tipo de producto)

Sé específico con números concretos. Responde solo con el análisis, sin introducción.`
    const text = await generate(prompt)
    if (text) setResult(text)
  }

  return (
    <div className="flex flex-col lg:flex-row bg-white min-h-screen">
      <Sidebar />
      <main className="flex-1 px-5 lg:px-10 py-8 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <p className="text-[10px] font-semibold tracking-widest text-[#9c6d0e] uppercase mb-2">Herramienta</p>
          <h1 className="text-2xl font-extrabold tracking-tight mb-2">Estrategia de Precios</h1>
          <p className="text-sm text-gray-600 mb-8">
            Descubre cómo estructurar tus precios para maximizar conversión y percepción de valor.
          </p>

          <div className="bg-[#FBF1DF] border border-[#f0dba8] rounded-2xl p-5 mb-6">
            <label className="block text-xs font-bold text-gray-700 mb-2">Describe tu producto o servicio</label>
            <div className="flex gap-2 flex-wrap mb-2">
              {['Curso online de diseño', 'Servicio de gestión de redes sociales', 'App de productividad'].map((ex) => (
                <button key={ex} onClick={() => setProduct(ex)} className="text-[10px] bg-white border border-[#f0dba8] text-[#9c6d0e] px-2.5 py-1 rounded-full hover:bg-[#FBF1DF] transition-colors">
                  {ex.length > 30 ? ex.slice(0, 30) + '…' : ex}
                </button>
              ))}
            </div>
            <textarea
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleGenerate() } }}
              placeholder="Ej: Servicio mensual de gestión de Instagram para pequeñas empresas, incluye 12 posts y stories"
              className="w-full bg-white border border-[#f0dba8] rounded-xl p-3 text-sm text-black placeholder-gray-400 outline-none focus:border-[#d4970f] resize-none"
              rows={3}
            />

            <label className="block text-xs font-bold text-gray-700 mb-2 mt-4">Precio actual o estimado (opcional)</label>
            <input
              type="text"
              value={currentPrice}
              onChange={(e) => setCurrentPrice(e.target.value)}
              placeholder="Ej: €297/mes o no tengo precio aún"
              className="w-full bg-white border border-[#f0dba8] rounded-xl p-3 text-sm text-black placeholder-gray-400 outline-none focus:border-[#d4970f]"
            />

            <button
              onClick={handleGenerate}
              disabled={loading || !product.trim()}
              className="w-full mt-4 bg-[#d4970f] text-white font-bold text-sm py-3 rounded-xl hover:bg-[#b87d0d] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? 'Analizando precios...' : 'Generar estrategia de precios'}
            </button>
          </div>

          {error && <p className="text-sm text-red-600 mb-4">Ocurrió un error: {error}</p>}
          {result && <ResultCard text={result} />}
        </motion.div>
      </main>
    </div>
  )
}

export default PricingStrategy
