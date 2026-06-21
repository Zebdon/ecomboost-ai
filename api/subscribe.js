export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email } = req.body

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Email inválido' })
  }

  const apiKey = process.env.MAILCHIMP_API_KEY
  const listId = process.env.MAILCHIMP_LIST_ID
  const dc = apiKey.split('-').pop()

  try {
    const response = await fetch(
      `https://${dc}.api.mailchimp.com/3.0/lists/${listId}/members`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_address: email,
          status: 'subscribed',
        }),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      if (data.title === 'Member Exists') {
        return res.status(400).json({ error: '¡Ya estás en la lista! Te avisaremos pronto.' })
      }
      return res.status(400).json({ error: 'Error al suscribirse. Inténtalo de nuevo.' })
    }

    return res.status(200).json({ success: true })
  } catch {
    return res.status(500).json({ error: 'Error del servidor. Inténtalo de nuevo.' })
  }
}
