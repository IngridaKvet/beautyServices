import express from "express";
import { protect, restrictToAdmin } from "../controllers/authController.mjs";
import {
  addProcedure,
  deleteProcedure,
  getAllProcedures,
  updateProcedure,
} from "../controllers/procedureController.mjs";

const router = express.Router();
router
  .route("/")
  .get(protect, getAllProcedures)
  .post(protect, restrictToAdmin, addProcedure);

router
  .route("/:id")
  .patch(protect, restrictToAdmin, updateProcedure)
  .delete(protect, restrictToAdmin, deleteProcedure);

export default router;
