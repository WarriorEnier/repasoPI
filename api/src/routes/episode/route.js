const {Router} = require('express');
const router = Router();
const {getAllEpisodes} = require('./controller');

router.get('/', getAllEpisodes);

module.exports = router;