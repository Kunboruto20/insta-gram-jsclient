const fs = require('fs');
const { CookieJar, Cookie } = require('tough-cookie');

/**
 * Salvează cookie-urile din jar într-un fișier JSON
 * @param {CookieJar} jar
 * @param {string} path
 */
async function saveSession(jar, path) {
  const cookies = await jar.serialize();
  fs.writeFileSync(path, JSON.stringify(cookies, null, 2));
}

/**
 * Încarcă cookie-urile dintr-un fișier JSON într-un CookieJar
 * @param {string} path
 * @returns {CookieJar}
 */
function loadSession(path) {
  const data = fs.readFileSync(path, 'utf8');
  const jar = CookieJar.deserializeSync(JSON.parse(data));
  return jar;
}

module.exports = { saveSession, loadSession };