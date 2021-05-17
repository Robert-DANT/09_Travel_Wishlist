const { body, validationResult } = require('express-validator')
const userValidationRules = () => {
  return [
    body('name').notEmpty(),
    body('alpha').isLength({min:2, max:2}),
    body('alpha3Code').isLength({min:3, max:3}),
    body('visited').isBoolean()
  ]
}

// const validate = (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         res.status(400).send()
//       }
//   }


module.exports = {
  userValidationRules,
  //validate,
}
