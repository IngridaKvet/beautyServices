import express from "express";
import { addRating } from "../controllers/ratingController.mjs";

const router = express.Router();
router.route("/").post(addRating);

export default router;
