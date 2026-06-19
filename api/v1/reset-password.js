export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { token, password } = req.body;

    if (!token || !password) return res.status(400).json({ error: 'Missing token or password' });

    const response = await fetch('https://13BB3B.playfabapi.com/Admin/ResetPassword', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-SecretKey': process.env.PLAYFAB_SECRET
        },
        body: JSON.stringify({ Token: token, Password: password })
    });

    const data = await response.json();

    if (data.status === 'OK') return res.status(200).json({ success: true });

    return res.status(400).json({ error: data.errorMessage || 'Something went wrong' });
}
