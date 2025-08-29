import express from "express";
import { getDatesById } from "../controllers/datesController.mjs";
import { protect } from "../controllers/authController.mjs";

const router = express.Router();
router.route("/:id").get(protect, getDatesById);

export default router;
