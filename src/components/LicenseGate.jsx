import { useState } from 'react'
import { useLicense } from '../hooks/useLicense'

export default function LicenseGate({ children }) {
  const { isLicensed, isValidating, error, activate } = useLicense()
  const [key, setKey] = useState('')

  if (isLicensed) return children

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-5">
      <div className="max-w-sm w-full">

        <div className="text-center mb-8">
          <div className="text-base font-bold mb-1">
            Ecom<span className="text-[#E8642A]">Boost</span> AI
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight mb-2">Activa tu acceso</h1>
          <p className="text-sm text-gray-500 leading-relaxed">
            Introduce la <strong>license key</strong> que recibiste en el email de confirmación de Gumroad.
          </p>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); activate(key.trim()) }}
          className="flex flex-col gap-3"
        >
          <input
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="XXXXXXXX-XXXXXXXX-XXXXXXXX-XXXXXXXX"
            className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8642A]/40 text-center font-mono tracking-wider"
            autoFocus
            autoComplete="off"
          />

          {error && (
            <p className="text-xs text-red-500 text-center bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={!key.trim() || isValidating}
            className="bg-[#E8642A] text-white font-bold text-sm py-3 rounded-xl hover:bg-[#d6551e] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isValidating ? 'Verificando...' : 'Activar acceso'}
          </button>
        </form>

        <div className="mt-6 bg-[#FBE9E0] border border-[#f0c5ab] rounded-xl px-4 py-3">
          <p className="text-xs text-[#9c3c14] leading-relaxed text-center">
            La license key está en el email de Gumroad con el asunto<br />
            <strong>"Thank you for your purchase"</strong>
          </p>
        </div>

        <p className="text-xs text-gray-400 text-center mt-5">
          ¿Aún no tienes acceso?{' '}
          <a
            href="https://cyntiaze.gumroad.com/l/uapcse"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#E8642A] font-semibold hover:underline"
          >
            Comprar ahora — $29
          </a>
        </p>
      </div>
    </div>
  )
}
