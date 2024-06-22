import bcrypt from "bcrypt";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TLoginUser } from "./auth.interface";
import { User } from "../user/user.model";

const loginUserDb = async (payLoad: TLoginUser) => {
  // check if the user is exist
  const isExistUser = await User.findOne({ id: payLoad?.id });
  if (!isExistUser) {
    throw new AppError(httpStatus.NOT_FOUND, `User not Exist with ID: ${payLoad.id}`);
  }
  // checking if the user is already deleted
  const isDeletedUser = isExistUser.isDeleted;
  if (isDeletedUser) {
    throw new AppError(httpStatus.FORBIDDEN, `User is Delete`);
  }
  // checking if the user is already blocked
  const usersStatus = isExistUser?.status;
  if (usersStatus === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, `User is Blocked`);
  }
  // check password is correct using bcrypt
  const isPasswordMatched = await bcrypt?.compare(payLoad?.password, isExistUser?.password);
  console.log(isPasswordMatched);
  // Access Granted: Send AccessToken, Refresh Token
};

export const authService = {
  loginUserDb,
};
