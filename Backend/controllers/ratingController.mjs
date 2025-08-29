// Post
import { addRatingM } from "../models/ratingModel.mjs";

export const addRating = async (req, res, next) => {
  try {
    const newRating = await addRatingM(req.body);
    res.status(201).json({
      status: "success",
      new_rating: newRating,
    });
  } catch (error) {
    next(error);
  }
};
