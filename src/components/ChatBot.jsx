import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SYSTEM = `Eres el asistente virtual de ZebcyTec, una plataforma con 13 herramientas IA para marketing digital. Tu objetivo es ayudar a los visitantes, recomendar herramientas y guiarlos a comprar.

Herramientas: Creador de Ads, Generador SEO, Análisis de Mercado, Branding Instantáneo, Plan de Lanzamiento, Secuencias de Email, Copy de Ventas, Calendario de Contenido, Estrategia de Precios, Análisis de Competencia, Guion de YouTube, Script Reels/TikTok, Bio de Redes Sociales.

Precio: €47 pago único, garantía 30 días. Acceso inmediato al comprar en Gumroad.

Responde siempre en español, máximo 3 frases, tono amigable y directo. Si preguntan dónde comprar, da el enlace: https://cyntiaze.gumroad.com/l/uapcse`

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', text: '¡Hola! 👋 Soy el asistente de ZebcyTec. ¿En qué puedo ayudarte? Puedo recomendarte la herramienta ideal para tu negocio.' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 200)
  }, [open])

  const send = async () => {
    if (!input.trim() || loading) return
    const userMsg = input.trim()
    setInput('')
    const newMessages = [...messages, { role: 'user', text: userMsg }]
    setMessages(newMessages)
    setLoading(true)

    const lastMessages = newMessages.slice(-4)
    const history = lastMessages.map(m => `${m.role === 'user' ? 'Usuario' : 'Asistente'}: ${m.text}`).join('\n')
    const prompt = `${SYSTEM}\n\nConversación reciente:\n${history}\n\nAsistente:`

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', text: data.text || 'Lo siento, no pude procesar tu pregunta. Inténtalo de nuevo.' }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', text: 'Ha ocurrido un error. Inténtalo de nuevo.' }])
    }
    setLoading(false)
  }

  const suggestions = ['¿Para qué sirve ZebcyTec?', '¿Qué herramienta me recomiendas?', '¿Cómo funciona el acceso?']

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-[#E8642A] text-white rounded-full shadow-xl flex items-center justify-center text-2xl hover:bg-[#d6551e] transition-all hover:scale-110 active:scale-95"
        aria-label="Abrir chat"
      >
        <motion.span animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.2 }}>
          {open ? '✕' : '💬'}
        </motion.span>
      </button>

      {!open && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2, duration: 0.4 }}
          className="fixed bottom-8 left-24 z-50 bg-white text-gray-800 text-xs font-semibold px-3 py-2 rounded-xl shadow-lg border border-gray-100 pointer-events-none"
        >
          ¿Tienes dudas? 👋
          <div className="absolute left-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-r-4 border-r-white" />
        </motion.div>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 left-6 z-50 w-[320px] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden"
            style={{ maxHeight: '440px' }}
          >
            <div className="bg-[#1C1A17] px-4 py-3 flex items-center gap-3 shrink-0">
              <div className="w-8 h-8 rounded-full bg-[#E8642A] flex items-center justify-center text-white font-bold text-sm shrink-0">Z</div>
              <div className="flex-1">
                <p className="text-white text-xs font-bold">Asistente ZebcyTec</p>
                <p className="text-green-400 text-[10px] flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block" /> En línea</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3 min-h-0">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`text-xs leading-relaxed px-3 py-2 rounded-2xl max-w-[85%] ${
                    msg.role === 'user'
                      ? 'bg-[#E8642A] text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}

              {messages.length === 1 && (
                <div className="flex flex-col gap-1.5">
                  {suggestions.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => { setInput(s); setTimeout(send, 0) }}
                      className="text-left text-[11px] text-[#E8642A] bg-[#FBE9E0] border border-[#f0c5ab] px-3 py-2 rounded-xl hover:bg-[#f0c5ab] transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-500 text-xs px-3 py-2 rounded-2xl rounded-bl-none flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <div className="border-t border-gray-100 p-3 flex gap-2 shrink-0">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send()}
                placeholder="Escribe tu pregunta..."
                className="flex-1 text-xs border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#E8642A] transition-colors"
                disabled={loading}
              />
              <button
                onClick={send}
                disabled={loading || !input.trim()}
                className="bg-[#E8642A] text-white text-sm font-bold w-9 h-9 rounded-xl hover:bg-[#d6551e] disabled:opacity-40 transition-colors flex items-center justify-center shrink-0"
              >
                →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
