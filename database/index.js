require('dotenv').config()  // Dou um require no DOTENV para acessar meu arquivo .env
const mongoose = require('mongoose');  // Require na biblioteca do mongoose

mongoose.connect(process.env.DATABASE_URL)  // Conecto com meu banco
mongoose.Promise = global.Promise;  // Passo isso como padrão

module.exports = mongoose;  // Exporto o mongoose