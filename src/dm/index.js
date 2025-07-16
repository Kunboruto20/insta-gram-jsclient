// Modul pentru mesaje directe (DM)

const sendTextDM = require('./send');
const getInbox = require('./receive');

module.exports = {
  sendTextDM,
  getInbox,
  // TODO: Alte funcții DM (media, reacții)
};