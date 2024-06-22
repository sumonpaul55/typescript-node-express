import bcrypt from "bcrypt";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TLoginUser } from "./auth.interface";
import { User } from "../user/user.model";

const loginUserDb = async (payLoad: TLoginUser) => {
  // check if the user is exist
  const isExistUser = await User.isUserExistByCustomId(payLoad?.id);
  if (!isExistUser) {
    throw new AppError(httpStatus.NOT_FOUND, `User not Exist with ID: ${payLoad.id}`);
  }
  // checking if the user is already deleted
  const isDeletedUser = (await User.isUserExistByCustomId(payLoad?.id)).isDeleted;
  if (isDeletedUser) {
    throw new AppError(httpStatus.FORBIDDEN, `User is Delete`);
  }
  // checking if the user is already blocked
  const usersStatus = isExistUser?.status;
  if (usersStatus === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, `User is Blocked`);
  }
  // check password is correct using bcrypt
  const matched = await User.isPasswordMatched(payLoad?.password, isExistUser?.password);
  console.log(matched);
  if (!matched) {
    throw new AppError(httpStatus.FORBIDDEN, "Password do not matched");
  }
};
// Access Granted: Send AccessToken, Refresh Token

export const authService = {
  loginUserDb,
};
