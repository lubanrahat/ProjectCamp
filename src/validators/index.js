import { body } from "express-validator";

const userRegistionsValidator = () => {
  return [
    body('email')
        .trim()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Email is invalid"),
    body("username")
        .trim()
        .notEmpty().withMessage("Email is required")
        .isLength({min:3}).withMessage("username should be at least 3 char")
        .isLength({max:13}).withMessage("username cannot exceed 13 char")

  ];
};

const userLoginValidator = () => {
    return [
        body("email")
        .isEmail().withMessage("Email is not valid"),
        body("password")
        .isEmpty().withMessage("Password is required")
    ]
}

export { userRegistionsValidator,userLoginValidator };
