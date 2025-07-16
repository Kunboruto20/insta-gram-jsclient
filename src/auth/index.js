// Modul de autentificare Instagram

const login = require('./login');
const { saveSession, loadSession } = require('./session');

module.exports = {
  login,
  saveSession,
  loadSession,
};