import bcrypt from "bcrypt";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TLoginUser } from "./auth.interface";
import { User } from "../user/user.model";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";

const loginUserDb = async (payLoad: TLoginUser) => {
  // check if the user is exist
  const isExistUser = await User.isUserExistByCustomId(payLoad?.id);
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
  const matched = await User.isPasswordMatched(payLoad?.password, isExistUser?.password);
  if (!matched) {
    throw new AppError(httpStatus.FORBIDDEN, "Password do not matched");
  }
  // create token and send to the server
  const jwtPayLoad = {
    userId: isExistUser?.id,
    role: isExistUser?.role,
  };
  const accessToken = jwt.sign(jwtPayLoad, config.jwt_access_secret as string, {
    expiresIn: "10d",
  });
  return {
    accessToken,
    needsPasswordChange: isExistUser?.needsPasswordChange,
  };
  // Access Granted: Send AccessToken, Refresh Token
};

// change password service
const changePasswordDb = async (userData: JwtPayload, payLoad: { oldPassword: string; newPassword: string }) => {
  // check if the user is exist
  const isExistUser = await User.isUserExistByCustomId(userData?.userId);
  if (!isExistUser) {
    throw new AppError(httpStatus.NOT_FOUND, `User not Exist with ID: ${userData.userId}`);
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
  const matched = await User.isPasswordMatched(payLoad.oldPassword, isExistUser?.password);
  if (!matched) {
    throw new AppError(httpStatus.FORBIDDEN, "Old Password does not matched");
  }
  // hash new password
  const newHashedPassword = await bcrypt.hash(payLoad.newPassword, Number(config.BCRYPT_SALTROUND));
  const result = await User.findOneAndUpdate(
    { id: userData.userId, role: userData.role },
    {
      password: newHashedPassword,
    },
    { new: true, runValidators: true }
  );
  return null;
};

export const authService = {
  loginUserDb,
  changePasswordDb,
};
