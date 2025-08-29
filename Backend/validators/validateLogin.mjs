import { body } from "express-validator";
import argon2 from "argon2";
import { getUserByEmailM, getUserByIdM} from "../models/userModel.mjs";

const validateLogin = [
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .custom(async (email) => {
      const existingUser = await getUserByEmailM(email);
      if (!existingUser) {
        throw new Error("User not found, please sign up");
        
      }

      return true; 
    }),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .custom(async (password, { req }) => {
      const existingUser = await getUserByEmailM(req.body.email);


          if (!existingUser) {
           return
          }
      

      const existingUserPass = await getUserByIdM(existingUser.id)


      if (existingUser) {
        const match = await argon2.verify(existingUserPass.password, password);
        if (!match) {
          throw new Error("Username or password is incorrect");
        }
      }

      return true; // password validation passed
    }),
];

export default validateLogin;
