import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useClaudeAPI } from '../hooks/useClaudeAPI'
import ReactMarkdown from 'react-markdown'

const examples = [
  'Curso online de fotografía para principiantes',
  'Tienda de ropa sostenible para mujeres',
  'Consultoría de marketing digital para pymes',
]

export default function HeroDemo() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')
  const { generate, loading } = useClaudeAPI()

  const handleDemo = async (value) => {
    const text = value || input
    if (!text.trim()) return
    setResult('')
    const prompt = `Eres un experto en copywriting publicitario. Crea 2 variaciones de anuncio para Instagram/Facebook para: "${text}".

Para cada variación usa este formato exacto:

**Variación [número]**
📢 Titular: [titular impactante, máximo 8 palabras]
✍️ Texto: [copy persuasivo, máximo 50 palabras, con 1-2 emojis]
👉 CTA: [llamada a la acción]

Sé directo, creativo y orientado a conversión. Solo los anuncios, sin texto adicional.`
    const generated = await generate(prompt)
    if (generated) setResult(generated)
  }

  return (
    <section className="bg-[#111009] py-12 px-5 lg:px-12">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-6">
            <span className="inline-block bg-[#E8642A]/15 border border-[#E8642A]/30 text-[#E8642A] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-3">
              Demo gratuita
            </span>
            <h2 className="text-xl lg:text-2xl font-extrabold text-white tracking-tight mb-2">
              Prueba la IA ahora — sin registrarte
            </h2>
            <p className="text-xs text-gray-400">Describe tu negocio y genera copy de anuncio en segundos</p>
          </div>

          <div className="flex gap-2 flex-wrap mb-3">
            {examples.map((ex) => (
              <button
                key={ex}
                onClick={() => { setInput(ex); handleDemo(ex) }}
                className="text-[10px] bg-white/5 border border-white/10 text-gray-400 px-3 py-1.5 rounded-full hover:border-[#E8642A]/50 hover:text-[#E8642A] transition-colors"
              >
                {ex.length > 35 ? ex.slice(0, 35) + '…' : ex}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleDemo()}
              placeholder="Ej: Tienda de velas artesanales para regalo..."
              className="flex-1 bg-white/8 border border-white/15 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#E8642A] transition-colors"
            />
            <button
              onClick={() => handleDemo()}
              disabled={loading || !input.trim()}
              className="bg-[#E8642A] text-white font-bold text-sm px-5 py-3 rounded-xl hover:bg-[#d6551e] disabled:opacity-40 transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
            >
              {loading ? '⏳' : 'Generar →'}
            </button>
          </div>

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-4 bg-white/5 border border-white/10 rounded-2xl p-5 text-sm text-gray-300 leading-relaxed"
              >
                <div className="prose prose-invert prose-sm max-w-none [&_strong]:text-white [&_p]:my-1.5">
                  <ReactMarkdown>{result}</ReactMarkdown>
                </div>
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                  <p className="text-[11px] text-gray-500">¿Te gustó el resultado? Accede a las 13 herramientas.</p>
                  <a
                    href="https://cyntiaze.gumroad.com/l/uapcse"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] bg-[#E8642A] text-white font-bold px-3 py-1.5 rounded-lg hover:bg-[#d6551e] transition-colors whitespace-nowrap"
                  >
                    Comprar — €47 →
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
