const express = require('express');
const router = express.Router();

router.use(require('./user.routes').userRouter)

module.exports = router;