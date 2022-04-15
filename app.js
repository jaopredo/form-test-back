require('dotenv').config();  // Dou um require para acessar o .env
const express = require('express');  // Require no express
const { v4 } = require('uuid');  // Require no uuid

const app = express();  // Inicializo o express

/* CONFIGURANDO O JSON */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./controllers/authController')(app);
require('./controllers/projectController')(app);

// Inicializo a aplicação na porta descrita no arquivo .env
app.listen(process.env.PORT, () => {
    console.log(`Iniciado na porta ${process.env.PORT}`)
})
