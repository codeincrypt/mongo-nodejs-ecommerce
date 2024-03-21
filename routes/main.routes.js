const express = require('express');
const router = express.Router();

router.use(require('./auth.routes').userRouter)
router.use(require('./category.routes').homeRouter)

module.exports = router;