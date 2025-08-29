import { body } from "express-validator";
import { getUserByEmailM } from "../models/userModel.mjs";

const validateNewUser = [
  body().notEmpty().withMessage("User body must contain data"),
  body("username")
    .notEmpty()
    .withMessage("Username is required")
    .isString()
    .withMessage("Username must be a string")
    .isLength({ min: 2 })
    .withMessage("Username must be at least 2 characters long"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is invalid")
    .normalizeEmail()
    .isString()
    .withMessage("Email must be a string")
    .custom(async (email) => {
      const user = await getUserByEmailM(email);
      if (user) {
        throw new Error("Email already exist");
      }
      return true; // email validation passed
    }),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isString()
    .withMessage("Password must be a string")
    .isLength({ min: 4 })
    .withMessage("Password must be at least 4 characters long")
    .custom((password, { req }) => {
      if (password !== req.body.passwordconfirm) {
        throw new Error("Passwords must match. Please try again");
      }
      return true; // password validation passed
    }),
];

export default validateNewUser;
