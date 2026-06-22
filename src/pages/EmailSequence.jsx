import { useState } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '../components/layout/Sidebar'
import { useClaudeAPI } from '../hooks/useClaudeAPI'
import ResultCard from '../components/ResultCard'

function EmailSequence() {
  const [business, setBusiness] = useState('')
  const [goal, setGoal] = useState('Bienvenida')
  const [emails, setEmails] = useState('3')
  const [result, setResult] = useState('')
  const { generate, loading, error } = useClaudeAPI()

  const handleGenerate = async () => {
    if (!business.trim()) return
    const prompt = `Eres un experto en email marketing. Crea una secuencia de ${emails} emails de tipo "${goal}" para este negocio/producto: "${business}".

Para cada email incluye:
- Asunto (subject line atractivo)
- Cuerpo del email (máximo 150 palabras, tono cercano y persuasivo)
- CTA claro al final

Numera cada email claramente (Email 1, Email 2...). Responde solo con los emails, sin introducción adicional.`
    const text = await generate(prompt)
    if (text) setResult(text)
  }

  return (
    <div className="flex flex-col lg:flex-row bg-white min-h-screen">
      <Sidebar />
      <main className="flex-1 px-5 lg:px-10 py-8 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <p className="text-[10px] font-semibold tracking-widest text-[#1e5f96] uppercase mb-2">Herramienta</p>
          <h1 className="text-2xl font-extrabold tracking-tight mb-2">Secuencias de Email</h1>
          <p className="text-sm text-gray-600 mb-8">
            Genera secuencias de email que convierten suscriptores en clientes automáticamente.
          </p>

          <div className="bg-[#E9F1FA] border border-[#c2dbf0] rounded-2xl p-5 mb-6">
            <label className="block text-xs font-bold text-gray-700 mb-2">Describe tu negocio o producto</label>
            <div className="flex gap-2 flex-wrap mb-2">
              {['Curso online de fotografía', 'Tienda de ropa sostenible', 'Consultoría de marketing'].map((ex) => (
                <button key={ex} onClick={() => setBusiness(ex)} className="text-[10px] bg-white border border-[#c2dbf0] text-[#1e5f96] px-2.5 py-1 rounded-full hover:bg-[#E9F1FA] transition-colors">
                  {ex}
                </button>
              ))}
            </div>
            <textarea
              value={business}
              onChange={(e) => setBusiness(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) handleGenerate() }}
              placeholder="Ej: Curso online de fotografía para principiantes, precio €97"
              className="w-full bg-white border border-[#c2dbf0] rounded-xl p-3 text-sm text-black placeholder-gray-400 outline-none focus:border-[#2f7fc4] resize-none"
              rows={3}
            />

            <div className="flex gap-3 mt-4 flex-wrap">
              <div className="flex-1 min-w-[140px]">
                <label className="block text-xs font-bold text-gray-700 mb-2">Tipo de secuencia</label>
                <select value={goal} onChange={(e) => setGoal(e.target.value)} className="w-full bg-white border border-[#c2dbf0] rounded-xl p-2.5 text-sm text-black outline-none">
                  <option>Bienvenida</option>
                  <option>Nurturing / Educación</option>
                  <option>Venta / Lanzamiento</option>
                  <option>Recuperación de carritos</option>
                  <option>Post-compra</option>
                </select>
              </div>
              <div className="flex-1 min-w-[140px]">
                <label className="block text-xs font-bold text-gray-700 mb-2">Número de emails</label>
                <select value={emails} onChange={(e) => setEmails(e.target.value)} className="w-full bg-white border border-[#c2dbf0] rounded-xl p-2.5 text-sm text-black outline-none">
                  <option value="3">3 emails</option>
                  <option value="5">5 emails</option>
                  <option value="7">7 emails</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading || !business.trim()}
              className="w-full mt-4 bg-[#2f7fc4] text-white font-bold text-sm py-3 rounded-xl hover:bg-[#256aa6] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? 'Generando secuencia...' : 'Generar secuencia de emails'}
            </button>
          </div>

          {error && <p className="text-sm text-red-600 mb-4">Ocurrió un error: {error}</p>}
          {result && <ResultCard text={result} />}
        </motion.div>
      </main>
    </div>
  )
}

export default EmailSequence
