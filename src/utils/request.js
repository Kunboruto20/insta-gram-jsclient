const fetch = require('node-fetch');
const { CookieJar } = require('tough-cookie');

/**
 * Wrapper pentru fetch cu suport CookieJar
 * @param {string} url
 * @param {object} options
 * @param {CookieJar} jar
 * @returns {Promise<Response>}
 */
async function fetchWithCookies(url, options = {}, jar) {
  options.headers = options.headers || {};
  // Adaugă cookie-urile din jar
  const cookie = await jar.getCookieString(url);
  if (cookie) {
    options.headers['cookie'] = cookie;
  }
  const response = await fetch(url, options);
  // Salvează cookie-urile noi în jar
  const setCookie = response.headers.raw()['set-cookie'];
  if (setCookie) {
    await Promise.all(setCookie.map(c => jar.setCookie(c, url)));
  }
  return response;
}

module.exports = fetchWithCookies;