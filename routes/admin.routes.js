const express = require('express');
const router = express.Router();

router.use(require('./user.routes').userRouter)
router.use(require('./blogs.routes').userRouter)

module.exports = router;