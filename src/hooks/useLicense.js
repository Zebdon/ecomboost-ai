import { useState } from 'react'

const STORAGE_KEY = 'ecomboost_license'

export function useLicense() {
  const [isLicensed, setIsLicensed] = useState(() => !!localStorage.getItem(STORAGE_KEY))
  const [isValidating, setIsValidating] = useState(false)
  const [error, setError] = useState('')

  async function activate(key) {
    setIsValidating(true)
    setError('')
    try {
      const res = await fetch('/api/validate-license', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key }),
      })
      const data = await res.json()
      if (data.valid) {
        localStorage.setItem(STORAGE_KEY, key)
        setIsLicensed(true)
      } else {
        setError(data.error || 'Clave inválida. Revisa tu email de Gumroad.')
      }
    } catch {
      setError('Error de conexión. Inténtalo de nuevo.')
    } finally {
      setIsValidating(false)
    }
  }

  function deactivate() {
    localStorage.removeItem(STORAGE_KEY)
    setIsLicensed(false)
  }

  return { isLicensed, isValidating, error, activate, deactivate }
}
