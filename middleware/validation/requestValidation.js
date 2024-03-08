const { validationResult, body, param } = require('express-validator');
const _ = require('underscore');
const { errorCode } = require('../../utils/message');

module.exports = {
  validateSignup: [
    body('name').notEmpty().withMessage('Invalid name').trim(),
    body('phone').notEmpty().isMobilePhone().withMessage('Invalid phone number').trim(),
    body('email').notEmpty().isEmail().withMessage('Invalid email Id').trim(),
    body('password').notEmpty().withMessage('Invalid password').isLength({ min: 8 }).trim(),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errMsg = _.pluck(errors.array(), 'msg');
        return res.status(400).json({ message: errMsg.join(', '), statusCode: errorCode });
      }
      next();
    }
  ],
  validateLogin: [
    body('email').optional().isEmail().withMessage('Invalid email Id'),
    body('password').optional().isString().withMessage('Invalid password'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errMsg = _.pluck(errors.array(), 'msg');
        return res.status(400).json({ message: errMsg.join(', '), statusCode: errorCode });
      }
      next();
    }
  ],
  validateLoginOtp : [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isString().withMessage('User Password must be a string'),
    body('otp').isString().withMessage('Please provide Otp'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errMsg = _.pluck(errors.array(), 'msg');
        return res.status(400).json({ message: errMsg.join(', '),statusCode:errorCode });
      }
      next();
    }
  ]
}


