const mongoose = require('../database');

const ClientSchema = new mongoose.Schema({  // Crio um Schema do usuário
    /*
        Um Schema é, resumidamente, como o MONGODB armazena um conjunto de dados,
        no caso esse conjunto de dados vai ser definido como o Schema do cliente. 
    */
    name: {  // Nome
        type: String,  // Tipo do dado
        required: true, // Se ele vai ser obrigatório
    },
    email: {
        type: String,
        unique: true,  // Ele tem que ser único
        required: true,
        lowercase: true,  // Converter para minúsculas
    },
    password: {
        type: String,
        required: true,
        select: false,  // Caso eu busque no banco de dados, essa informação não vem junto
    },
    createdAt: {  // Quando foi criadi
        type: Date,
        default: Date.now  // Valor padrão (Se nada for passado)
    }
})

/*
ClientSchema.pre('save', function(next) {
    this (Se refere ao usuário)
    next()
})

Essa função me permite fazer algo antes de o usuário ser salvo no banco de dados.
Um exemplo seria encriptar a senha dele.
*/

const Client = mongoose.model('Client', ClientSchema);  // Crio o modelo do cliente
//                              Nome        Schema

module.exports = Client;  // Exporto