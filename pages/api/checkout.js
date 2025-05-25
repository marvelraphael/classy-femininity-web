// pages/api/checkout.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow','POST');
    return res.status(405).end('Method Not Allowed');
  }

  const { POLAR_ACCESS_TOKEN, POLAR_MONTHLY_PLAN_ID, NEXT_PUBLIC_APP_URL } = process.env;
  if (!POLAR_ACCESS_TOKEN || !POLAR_MONTHLY_PLAN_ID || !NEXT_PUBLIC_APP_URL) {
    return res.status(500).json({ error: 'Missing env vars' });
  }

  const apiRes = await fetch('https://api.polar.sh/v1/checkout_sessions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization:  `Bearer ${POLAR_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      data: {
        attributes: {
          plan_id:     POLAR_MONTHLY_PLAN_ID,
          success_url: `${NEXT_PUBLIC_APP_URL}/reader?book=1`,
          cancel_url:  `${NEXT_PUBLIC_APP_URL}/reader?book=1`
        }
      }
    })
  });

  if (!apiRes.ok) {
    const errTxt = await apiRes.text();
    console.error('Polar error:', errTxt);
    return res.status(502).json({ error: 'Checkout creation failed' });
  }

  const { data } = await apiRes.json();
  return res.status(200).json({ url: data.attributes.url });
}
