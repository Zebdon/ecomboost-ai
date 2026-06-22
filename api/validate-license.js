export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { key } = req.body

  if (!key || key.trim().length < 10) {
    return res.status(400).json({ valid: false, error: 'Clave inválida.' })
  }

  try {
    const params = new URLSearchParams({
      product_permalink: 'uapcse',
      license_key: key.trim(),
      increment_uses_count: 'false',
    })

    const response = await fetch('https://api.gumroad.com/v2/licenses/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    })

    const data = await response.json()

    if (data.success) {
      return res.status(200).json({ valid: true, email: data.purchase?.email })
    }

    return res.status(200).json({
      valid: false,
      error: 'Clave no encontrada. Revisa el email de confirmación de Gumroad.',
    })
  } catch {
    return res.status(500).json({ valid: false, error: 'Error del servidor. Inténtalo de nuevo.' })
  }
}
