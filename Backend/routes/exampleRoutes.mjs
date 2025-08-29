import express from "express";
import {
  addItem,
  deleteItem,
  getAllItems,
  getItemById,
  updateItem,
} from "../controllers/exampleController.mjs";

const router = express.Router();
router.route("/").get(getAllItems).post(addItem);

router.route("/:id").get(getItemById).patch(updateItem).delete(deleteItem);

export default router;
