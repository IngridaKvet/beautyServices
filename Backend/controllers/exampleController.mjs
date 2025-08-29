import {
  getAllItemsM,
  getItemByIdM,
  addItemM,
  updateItemM,
  deleteItemM,
} from "../models/exampleModel.mjs";

// Get all
export const getAllItems = async (req, res, next) => {
  try {
    const itemList = await getAllItemsM();
    res.status(200).json({
      status: "success",
      data: itemList,
    });
  } catch (error) {
    next(error);
  }
};

// Get by id
export const getItemById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const item = await getItemByIdM(id);

    if (!item || item.length == 0) {
      return res.status(404).json({
        status: "fail",
        message: `Item with id ${id} not found`,
      });
    }

    res.status(200).json({
      status: "success",
      data: item,
    });
  } catch (error) {
    next(error);
  }
};

// Post item
export const addItem = async (req, res, next) => {
  try {
    const newItem = await addItemM(req.body);
    res.status(201).json({
      status: "success",
      new_item: newItem,
    });
  } catch (error) {
    next(error);
  }
};

// Patch item
export const updateItem = async (req, res, next) => {
  try {
    const id = +req.params.id;
    const newItem = req.body;

    const updatedItem = await updateItemM(id, newItem);

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
export const deleteItem = async (req, res, next) => {
  try {
    const id = req.params.id;
    const item = await deleteItemM(id);

    if (!item) {
      res.status(404).json({
        status: "404 error",
        message: `No such item found to delete`,
      });
      return;
    }

    res.status(200).json({
      status: "success",
      message: "Item deleted",
    });
  } catch (error) {
    next(error);
  }
};
