const fetchWithCookies = require('../utils/request');
const { CookieJar } = require('tough-cookie');

/**
 * Login Instagram web (emulează browserul)
 * @param {string} username
 * @param {string} password
 * @returns {Promise<{jar: CookieJar, user: object}>}
 */
async function login(username, password) {
  const jar = new CookieJar();
  const BASE_URL = 'https://www.instagram.com';

  // 1. GET pagina principală pentru a obține csrftoken
  const res1 = await fetchWithCookies(BASE_URL + '/', { headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
  } }, jar);
  const cookies1 = await jar.getCookies(BASE_URL);
  const csrfCookie = cookies1.find(c => c.key === 'csrftoken');
  if (!csrfCookie) throw new Error('Nu s-a găsit csrftoken');
  const csrfToken = csrfCookie.value;

  // 2. POST la /accounts/login/ajax/
  const loginRes = await fetchWithCookies(BASE_URL + '/accounts/login/ajax/', {
    method: 'POST',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'X-CSRFToken': csrfToken,
      'X-Requested-With': 'XMLHttpRequest',
      'Referer': BASE_URL + '/',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': '*/*',
    },
    body: `username=${encodeURIComponent(username)}&enc_password=#PWD_INSTAGRAM_BROWSER:0:${Date.now()}:${encodeURIComponent(password)}&queryParams={}&optIntoOneTap=false`,
  }, jar);

  const loginJson = await loginRes.json();
  if (!loginJson.authenticated) {
    throw new Error('Autentificare eșuată: ' + (loginJson.message || 'Unknown error'));
  }

  // 3. Returnează sesiunea și user-ul
  return {
    jar,
    user: loginJson.user,
  };
}

module.exports = login;