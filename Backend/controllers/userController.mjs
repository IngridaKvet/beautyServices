
import {
  getUserByIdM,
  updateUserM
} from "../models/userModel.mjs";


// 1. Get user by id
export const getUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await getUserByIdM(userId);

    
    if (!user) {
      res.status(404).json({
        status: "error",
        message: `No such user found to fetch.`,
      });
      return;
    }



    user.password = undefined;
    res.status(200).json({
      status: `Success got user by id ${userId}`,
      user: user,
    });
  } catch (error) {
    next(error);
  }
};

// 2. Update user
export const updateUser = async (req, res, next) => {
  try {
    const id = +req.user.id;
    const newUser = req.body;

    const updateUser = await updateUserM(id, newUser);

    if (!updateUser) {
      res.status(404).json({
        status: "error",
        message: `No such user found to update`,
      });
      return;
    }

    updateUser.password = undefined;
    res.status(200).json({
      status: "success",
      user: updateUser,
    });
  } catch (error) {
    next(error);
  }
};
