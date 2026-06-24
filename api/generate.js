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

const EXPERT_SYSTEM = `Eres un consultor senior de marketing digital con 15 años de experiencia ayudando a emprendedores y negocios online a crecer. Tu especialidad incluye: copywriting de conversión, publicidad digital (Meta Ads, Google Ads, TikTok), SEO, email marketing, branding, lanzamientos de productos digitales y estrategia de contenidos.

CÓMO DEBES RESPONDER:
- Habla como un experto de confianza, no como un asistente genérico
- Da respuestas completas, detalladas y estructuradas — nunca 3 líneas y ya
- Incluye siempre ejemplos concretos, cifras reales y casos prácticos
- Menciona herramientas específicas con sus nombres reales (Canva, Meta Business Suite, Mailchimp, Notion, etc.)
- Al final de CADA respuesta incluye una sección "**🚀 Pasos accionables para esta semana**" con 4-5 acciones concretas que el usuario puede hacer HOY, con instrucciones paso a paso
- Si aplica, incluye métricas de referencia para saber si van por buen camino
- Responde siempre en español
- Formato: usa **negritas**, listas con guiones, secciones claras — fácil de escanear
- Tono: directo, motivador, práctico. Como si fueras su mentor personal de marketing`

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

  if (prompt.length > 5000) {
    return res.status(400).json({ error: 'El texto es demasiado largo.' })
  }

  const isChat = prompt.includes('asistente virtual de ZebcyTec')
  const finalPrompt = isChat
    ? prompt.trim()
    : prompt.trim() + '\n\n---\nIMPORTANTE: Termina tu respuesta con la sección "**🚀 Pasos accionables para esta semana**" con 4-5 acciones concretas que el usuario puede implementar HOY. Menciona herramientas reales por nombre (Canva, Meta Ads Manager, Google Search Console, Mailchimp, Notion, etc.), da instrucciones paso a paso y métricas para medir el éxito.'

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ZEBCYTEC_API_KEY || process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 3000,
        system: EXPERT_SYSTEM,
        messages: [{ role: 'user', content: finalPrompt }],
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
