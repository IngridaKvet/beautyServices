import {
  getAllProceduresM,
  addProcedureM,
  updateProcedureM,
  deleteProcedureM,
} from "../models/procedureModel.mjs";

// Get all
export const getAllProcedures = async (req, res, next) => {
  try {
    const itemList = await getAllProceduresM();
    res.status(200).json({
      status: "success",
      data: itemList,
    });
  } catch (error) {
    next(error);
  }
};

// Post item
export const addProcedure = async (req, res, next) => {
  try {
    const newProcedure = await addProcedureM(req.body);
    res.status(201).json({
      status: "success",
      new_procedure: newProcedure,
    });
  } catch (error) {
    next(error);
  }
};

// Patch item
export const updateProcedure = async (req, res, next) => {
  try {
    const id = +req.params.id;
    const newItem = req.body;

    const updatedItem = await updateProcedureM(id, newItem);

    if (!updatedItem) {
      res.status(404).json({
        status: "error",
        message: `No such item found to update`,
      });
      return;
    }

    res.status(200).json({
      status: "success",
      item: updatedItem,
    });
  } catch (error) {
    next(error);
  }
};

// Delete item
export const deleteProcedure = async (req, res, next) => {
  try {
    const id = req.params.id;
    const item = await deleteProcedureM(id);

    if (!item) {
      res.status(404).json({
        status: "404 error",
        message: `No such item found to delete`,
      });
      return;
    }

    res.status(200).json({
      status: "success",
      message: "Procedure deleted",
    });
  } catch (error) {
    next(error);
  }
};
