const express = require('express');

/* MiddleWares */
const authMiddleWare = require('../middlewares/auth');


const router = express.Router();
router.use(authMiddleWare);  // Uso o middleware criado


router.get('/', (req, res) => {
    return res.send({ ok: true, user: req.userId })
})


module.exports = app => app.use('/project', router);