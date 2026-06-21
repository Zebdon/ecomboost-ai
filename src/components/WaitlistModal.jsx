import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function WaitlistModal({ open, onClose }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setEmail('')
        setStatus('idle')
        setErrorMsg('')
      }, 300)
    }
  }, [open])

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()

      if (!res.ok) {
        setErrorMsg(data.error || 'Error al suscribirse.')
        setStatus('error')
      } else {
        setStatus('success')
      }
    } catch {
      setErrorMsg('Error de conexión. Inténtalo de nuevo.')
      setStatus('error')
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-5"
            onClick={onClose}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl leading-none"
              >
                ✕
              </button>

              {status === 'success' ? (
                <div className="text-center py-4">
                  <div className="text-4xl mb-3">🎉</div>
                  <h3 className="text-lg font-extrabold mb-2">¡Estás dentro!</h3>
                  <p className="text-sm text-gray-600">
                    Te avisaremos en cuanto el acceso esté disponible. Prepárate para escalar.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-5 bg-[#E8642A] text-white font-bold text-sm px-6 py-2.5 rounded-xl hover:bg-[#d6551e] transition-all"
                  >
                    Cerrar
                  </button>
                </div>
              ) : (
                <>
                  <div className="inline-block bg-[#FBE9E0] text-[#9c3c14] text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4">
                    ⚡ Early Bird — Solo 100 plazas
                  </div>
                  <h3 className="text-xl font-extrabold tracking-tight mb-1">
                    Únete a la lista de espera
                  </h3>
                  <p className="text-sm text-gray-500 mb-5">
                    Acceso anticipado a $29 · Precio sube en el lanzamiento oficial.
                  </p>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@email.com"
                      required
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#E8642A] transition-colors"
                    />

                    {status === 'error' && (
                      <p className="text-xs text-red-500">{errorMsg}</p>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full bg-[#E8642A] text-white font-bold text-sm py-3 rounded-xl hover:bg-[#d6551e] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status === 'loading' ? 'Guardando...' : 'Reservar mi plaza — $29'}
                    </button>
                  </form>

                  <p className="text-[11px] text-gray-400 text-center mt-3">
                    Sin spam. Solo te avisamos cuando abra el acceso.
                  </p>
                </>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default WaitlistModal
