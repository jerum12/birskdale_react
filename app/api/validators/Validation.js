const { body,check} = require('express-validator')


const validateRegistrationBody =
    [
        body('full_name')
        .exists()
        .withMessage('Full Name field is required')
        .notEmpty()
        .withMessage("Full Name is mandatory"),
        //.isLength({min:3})
        //.withMessage('Full Name must be greater than 3 letters'),

        body('user_name').exists()
        .withMessage('Username field is required')
        .notEmpty()
        .withMessage("Username is mandatory"),
        
        body('password')
        .exists()
        .withMessage('Password field is required')
        .notEmpty()
        .withMessage("Password is mandatory")
        //.isLength({min : 6})
        //.withMessage('Password must be in between 8 to 12 characters long')
        .not().isIn(['12345678', 'password', 'god'])
        .withMessage('Do not use a common word as the password')
  ]

const validateLoginBody = 
 [ 
        body('user_name').exists()
        .withMessage('Username field is required')
        .notEmpty()
        .withMessage("Username is mandatory"),

        body('password')
        .exists()
        .withMessage('Password field is required')
        .notEmpty()
        .withMessage("Password is mandatory")
        // .isLength({min : 6})
        // .withMessage('password must be in between 8 to 12 characters long')
] 



const validateLoginBody2 =
    [
        check("email", "Please enter a valid email").isEmail(),
        check("password", "Please enter a valid password").isLength({
          min: 6
        })
      ]




module.exports = {
    validateRegistrationBody : validateRegistrationBody,
    validateLoginBody : validateLoginBody,
    validateLoginBody2 : validateLoginBody2
}