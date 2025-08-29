// Post item
import { addRegistrationM } from "../models/registrationModel.mjs";

export const addRegistration = async (req, res, next) => {
  try {
    const newItem = await addRegistrationM(req.body);
    res.status(201).json({
      status: "success",
      new_item: newItem,
    });
  } catch (error) {
    next(error);
  }
};
