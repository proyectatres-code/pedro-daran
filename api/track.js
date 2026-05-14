export default async function handler(req, res) {
  // CORS — permite llamadas desde cualquier tarjeta
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST')   return res.status(405).end();

  const { card_id, device_type, referrer, user_agent } = req.body || {};
  if (!card_id) return res.status(400).json({ error: 'card_id required' });

  const r = await fetch(`${process.env.SUPABASE_URL}/rest/v1/card_views`, {
    method: 'POST',
    headers: {
      'Content-Type':  'application/json',
      'apikey':        process.env.SUPABASE_SERVICE_KEY,
      'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_KEY}`,
      'Prefer':        'return=minimal'
    },
    body: JSON.stringify({ card_id, device_type, referrer, user_agent })
  });

  return res.status(r.status).end();
}
