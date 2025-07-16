const fetchWithCookies = require('../utils/request');
const FormData = require('form-data');
const fs = require('fs');

/**
 * Încarcă o imagine pe Instagram (ca postare simplă)
 * @param {CookieJar} jar
 * @param {string} imagePath - Calea către fișierul imagine
 * @param {string} caption - Textul postării
 */
async function uploadPhoto(jar, imagePath, caption = '') {
  const BASE_URL = 'https://www.instagram.com';
  // 1. Upload imagine (endpoint reverse engineering)
  const uploadUrl = BASE_URL + '/create/upload/photo/';
  const form = new FormData();
  form.append('photo', fs.createReadStream(imagePath));
  const res = await fetchWithCookies(uploadUrl, {
    method: 'POST',
    headers: {
      ...form.getHeaders(),
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'X-Requested-With': 'XMLHttpRequest',
      'Referer': BASE_URL + '/',
    },
    body: form,
  }, jar);
  const json = await res.json();
  if (!json.upload_id) {
    throw new Error('Eroare la upload imagine: ' + (json.message || 'Unknown error'));
  }

  // 2. Creează postarea cu upload_id
  const createUrl = BASE_URL + '/create/configure/';
  const res2 = await fetchWithCookies(createUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'X-Requested-With': 'XMLHttpRequest',
      'Referer': BASE_URL + '/',
    },
    body: `upload_id=${json.upload_id}&caption=${encodeURIComponent(caption)}`,
  }, jar);
  const json2 = await res2.json();
  if (!json2.media || !json2.status || json2.status !== 'ok') {
    throw new Error('Eroare la creare postare: ' + (json2.message || 'Unknown error'));
  }
  return json2.media;
}

module.exports = uploadPhoto;