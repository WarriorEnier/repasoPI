const {Router} = require('express')
const router = Router();
const {getCharacters} = require('./controller');

router.get('/', getCharacters);

module.exports = router;