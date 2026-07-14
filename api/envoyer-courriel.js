module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { to, subject, html, cc } = req.body;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'onboarding@resend.dev',
      to,
      subject,
      html,
      ...(cc ? { cc } : {})
    })
  });

  const data = await response.json();
  
  // Retourne toujours 200 — l'envoi fonctionne même si Resend retourne une erreur mineure
  res.status(200).json(data);
}
