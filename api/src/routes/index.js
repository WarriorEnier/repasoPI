const { Router } = require("express");
const episodes = require('../routes/episode/route');
const characters = require('../routes/characters/route');

const router = Router();

// Configurar los routers

module.exports = router;
router.use('/episodes', episodes);
router.use('/characters',characters);

