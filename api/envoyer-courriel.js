module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { to, subject, html, cc } = req.body;
  
  const payload = {
    from: 'onboarding@resend.dev',
    to,
    subject,
    html,
    ...(cc ? { cc } : {})
  };

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  const data = await response.json();
  
  // Retourne tout pour déboguer
  res.status(200).json({
    ok: response.ok,
    status: response.status,
    data: data,
    keyExists: !!process.env.RESEND_API_KEY,
    keyPreview: process.env.RESEND_API_KEY ? process.env.RESEND_API_KEY.slice(0, 8) + '...' : 'MANQUANTE'
  });
}
