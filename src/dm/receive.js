const fetchWithCookies = require('../utils/request');

/**
 * Obține lista de conversații DM (inbox)
 * @param {CookieJar} jar
 * @returns {Promise<object>} - Lista conversațiilor
 */
async function getInbox(jar) {
  const BASE_URL = 'https://www.instagram.com';
  const url = BASE_URL + '/direct_v2/web/inbox/';
  const res = await fetchWithCookies(url, {
    method: 'GET',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'X-Requested-With': 'XMLHttpRequest',
      'Referer': BASE_URL + '/direct/inbox/',
    },
  }, jar);
  const json = await res.json();
  if (!json.inbox) {
    throw new Error('Eroare la obținere inbox: ' + (json.message || 'Unknown error'));
  }
  return json.inbox;
}

module.exports = getInbox;