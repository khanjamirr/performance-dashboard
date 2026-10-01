// Vercel serverless function: gives the dashboard its Supabase connection, read from the
// project's Environment Variables, so nobody ever has to enter it in the browser.
// Only the public (publishable / anon) key belongs here — never the secret/service_role key.
module.exports = (req, res) => {
  const env = process.env;
  const url = env.SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL || '';
  const key = env.SUPABASE_KEY || env.SUPABASE_PUBLISHABLE_KEY || env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
           || env.SUPABASE_ANON_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  res.setHeader('Cache-Control', 'no-store');
  if (isSecret(key)) { res.statusCode = 500; res.end(JSON.stringify({ error: 'That is the SECRET key. Use the publishable / anon key instead.' })); return; }
  if (!url || !key) { res.statusCode = 404; res.end(JSON.stringify({ error: 'SUPABASE_URL / SUPABASE_KEY not set' })); return; }
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ url, key }));
};

function isSecret(key) {
  if (/^sb_secret_/.test(key)) return true;
  const parts = key.split('.');
  if (parts.length === 3) {
    try { return JSON.parse(Buffer.from(parts[1], 'base64').toString()).role === 'service_role'; } catch (e) {}
  }
  return false;
}
