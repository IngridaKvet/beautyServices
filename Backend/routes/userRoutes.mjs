import express from "express";
import validate from "../validators/validate.mjs";
import validateNewUser from "../validators/validateSignup.mjs";
import validateLogin from "../validators/validateLogin.mjs";

import {
  protect,
  register,
  login,
  logout,
  getAuthenticatedUser,
} from "../controllers/authController.mjs";

import {
  updateUser,
} from "../controllers/userController.mjs";

const router = express.Router();

router.route("/register").post(validateNewUser, validate, register);
router.route("/login").post(validateLogin, validate, login);
router.route("/logout").post(protect, logout);
router.route("/me").get(protect, getAuthenticatedUser);
router
  .route("/")
  .patch(protect, updateUser)

export default router;
