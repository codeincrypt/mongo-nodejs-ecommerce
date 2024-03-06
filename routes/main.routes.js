const express = require('express');
const router = express.Router();

router.use(require('./auth.routes').userRouter)

module.exports = router;