import express from "express";
import { addRegistration } from "../controllers/registrationController.mjs";
import { protect } from "../controllers/authController.mjs";

const router = express.Router();
router.route("/").post(protect, addRegistration);

export default router;
