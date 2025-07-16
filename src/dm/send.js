const fetchWithCookies = require('../utils/request');

/**
 * Trimite un mesaj direct (DM) text către un user/recipient
 * @param {CookieJar} jar
 * @param {string} recipientId - Instagram user ID
 * @param {string} text
 */
async function sendTextDM(jar, recipientId, text) {
  const BASE_URL = 'https://www.instagram.com';
  // Endpoint-ul privat pentru DM (reverse engineering din browser)
  const url = BASE_URL + '/direct_v2/web/threads/broadcast/text/';
  const body = `recipient_users=[[\"${recipientId}\"]]&action=send_item&text=${encodeURIComponent(text)}`;
  const res = await fetchWithCookies(url, {
    method: 'POST',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Requested-With': 'XMLHttpRequest',
      'Referer': BASE_URL + '/direct/inbox/',
      // X-CSRFToken va fi adăugat automat din cookie-uri
    },
    body,
  }, jar);
  const json = await res.json();
  if (!json.payload || !json.status || json.status !== 'ok') {
    throw new Error('Eroare la trimitere DM: ' + (json.message || 'Unknown error'));
  }
  return json;
}

module.exports = sendTextDM;