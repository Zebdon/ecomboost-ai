import { useState } from 'react'

export function useClaudeAPI() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const generate = async (prompt) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error al conectar con la IA')
      }

      setLoading(false)
      return data.text
    } catch (err) {
      setError(err.message)
      setLoading(false)
      return null
    }
  }

  return { generate, loading, error }
}
