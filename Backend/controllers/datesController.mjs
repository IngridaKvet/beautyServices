import { getDatesByIdM } from "../models/datesModel.mjs";

export const getDatesById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const item = await getDatesByIdM(id);

    if (!item || item.length == 0) {
      return res.status(404).json({
        status: "fail",
        message: `Procedure with id ${id} not found`,
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
