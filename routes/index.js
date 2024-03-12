const express = require('express');
const router = express.Router();

const userRoute = require('./users.routes')
const adminRoute = require('./admin.routes')
const mainRoute = require('./main.routes')

router.use('/admin', adminRoute)
router.use('/user', userRoute)
router.use('/main', mainRoute)

module.exports = router