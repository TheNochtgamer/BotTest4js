require('dotenv').config();
const Bot = require('./structures/Client');

(async function init() {
  const bot = new Bot();
  await Promise.allSettled([bot.init(process.env.TOKEN)]);
})();
