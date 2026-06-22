const rateLimitMap = new Map()
const RATE_LIMIT = 10
const WINDOW_MS = 60 * 1000

function isRateLimited(ip) {
  const now = Date.now()
  const record = rateLimitMap.get(ip)
  if (!record || now - record.windowStart > WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, windowStart: now })
    return false
  }
  if (record.count >= RATE_LIMIT) return true
  record.count++
  return false
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const ip = req.headers['x-forwarded-for']?.split(',')[0] || 'unknown'
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Demasiadas peticiones. Espera un minuto e inténtalo de nuevo.' })
  }

  const { prompt } = req.body

  if (!prompt || typeof prompt !== 'string' || prompt.trim().length < 5) {
    return res.status(400).json({ error: 'Prompt inválido.' })
  }

  if (prompt.length > 2000) {
    return res.status(400).json({ error: 'El texto es demasiado largo.' })
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt.trim() }],
      }),
    })

    if (!response.ok) {
      const err = await response.json().catch(() => ({}))
      throw new Error(err?.error?.message || 'Error de la IA')
    }

    const data = await response.json()
    const text = data.content
      .map((block) => (block.type === 'text' ? block.text : ''))
      .filter(Boolean)
      .join('\n')

    return res.status(200).json({ text })
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Error del servidor.' })
  }
}
