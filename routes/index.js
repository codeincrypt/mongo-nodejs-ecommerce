const express = require('express');
const router = express.Router();

router.use('/admin',require('./admin.routes'))
router.use('/main',require('./main.routes'))

module.exports = router