const express = require('express');
const Client = require('../schemas/Client');
const router = express.Router();
const jwt = require('jsonwebtoken');


// Função que gera um token para validação
function generateToken(params = {}) {
    //            ID cliente, HASH da aplicação, Quando vai expirar (em segundos)
    return jwt.sign(params, process.env.HASH, { expiresIn: 3.156e+7 })
}


/* ROTAS */
// Crio uma rota POST que vai receber os dados do meu cliente/usuário
router.post('/client', async (req, res) => {
    const { email } = req.body;
    try {
        if (await Client.findOne({ email })) {  // Esse campo procura se há um usuário com esse email
            // Se sim, retorno que não posso cadastrar novamente
            return res.status(400).send({ error: "Email existente" })
        }

        // Crio o meu cliente passando como parâmetro o json enviado na API
        const client = await Client.create(req.body)
        client.password = undefined

        // Retorno a mensagem para ver como ficou
        return res.send({
            client,
            token: generateToken({ id: client.id })
        });
    } catch (err) {
        // Mensagem de erro caso algo dê errado
        return res.status(400).send({error: 'Registration failed'})
    }
});


// Rota POST para o LOGIN
router.post('/auth', async (req, res) => {
    const { email, password } = req.body;  // Pego o email e password passados
    
    // Procuro um client que tenha o mesmo email e pego a senha dele
    const client = await Client.findOne({ email }).select('+password');

    // Se não houver nenhum client, retorno um erro
    if (!client) return res.status(400).send({error: 'User not found'})
    // Se a senha desse client for diferente a senha passada, eu retorno um erro
    if (password != client.password) return res.status(400).send({error: 'Invalid password'})

    // Removo a senha para não mostrar na resposta
    client.password = undefined;

    // Retorno uma mensagem
    return res.send({
        client,
        token: generateToken({ id: client.id })
    })
})


module.exports = app => app.use('/auth', router)
/*
    Essa linha serve para que eu não precise criar outro APP, como eu fiz no arquivo
    'app.js', pois isso significaria 2 aplicações no mesmo node, algo que não se pode fazer.
    Então eu vou no arquivo app.js, referencio o meu authController (Linha 11) passando
    a minha variável APP. Então eu pego essa variável conforme mostro na linha 22 deste arquivo
    e uso a função app.use.
    Essa função me permite fazer com que eu utilize as rotas criadas na variável router, onde todas
    vão ter o prefixo "/auth"
*/
