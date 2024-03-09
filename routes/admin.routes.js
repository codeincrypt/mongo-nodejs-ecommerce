const express = require('express');
const router = express.Router();

router.use(require('./user.routes').userRouter)
router.use(require('./product.routes').adminRouter)
router.use(require('./category.routes').adminRouter)

module.exports = router;