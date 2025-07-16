const fetchWithCookies = require('../utils/request');

/**
 * Obține datele unui profil Instagram
 * @param {CookieJar} jar
 * @param {string} username
 * @returns {Promise<object>} - Datele profilului
 */
async function getProfile(jar, username) {
  const BASE_URL = 'https://www.instagram.com';
  const url = `${BASE_URL}/${username}/?__a=1&__d=dis`;
  const res = await fetchWithCookies(url, {
    method: 'GET',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'X-Requested-With': 'XMLHttpRequest',
      'Referer': BASE_URL + '/',
      'Accept': 'application/json',
    },
  }, jar);
  const json = await res.json();
  if (!json || !json.graphql) {
    throw new Error('Eroare la obținere profil: ' + (json.message || 'Unknown error'));
  }
  return json.graphql.user;
}

module.exports = getProfile;