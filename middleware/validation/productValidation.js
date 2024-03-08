const { validationResult, body, param } = require('express-validator');
const _ = require('underscore');
const { errorCode } = require('../../utils/message');

module.exports = {
  validateProduct: [
    body('title').notEmpty().withMessage('Invalid name').trim(),
    body('description').notEmpty().withMessage('Invalid phone number').trim(),
    body('image1').notEmpty().withMessage('Invalid phone number').trim(),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errMsg = _.pluck(errors.array(), 'msg');
        return res.status(400).json({ message: errMsg.join(', '), statusCode: errorCode });
      }
      next();
    }
  ]
}