import { useState } from 'react'

export function useClaudeAPI() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const generate = async (prompt) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': import.meta.env.VITE_ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 1024,
          messages: [{ role: 'user', content: prompt }],
        }),
      })

      if (!response.ok) {
        const err = await response.json().catch(() => ({}))
        throw new Error(err?.error?.message || 'Error al conectar con la IA')
      }

      const data = await response.json()
      const text = data.content
        .map((block) => (block.type === 'text' ? block.text : ''))
        .filter(Boolean)
        .join('\n')

      setLoading(false)
      return text
    } catch (err) {
      setError(err.message)
      setLoading(false)
      return null
    }
  }

  return { generate, loading, error }
}
