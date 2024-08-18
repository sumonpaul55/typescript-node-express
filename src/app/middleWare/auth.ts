import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import config from "../config";
import { TUserRole } from "../modules/user/user.constant";
import { User } from "../modules/user/user.model";

interface CustomRequest extends Request {
  user: JwtPayload;
}
const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: CustomRequest, res: Response, next: NextFunction) => {
    // validation
    const token = req.headers.authorization;
    // check token is sent from the client
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
    }
    // verify token is valid
    let decoded;
    let verifiedRole;
    try {
      decoded = jwt.verify(token, config.jwt_access_secret as string) as JwtPayload;
      verifiedRole = decoded.role;
    } catch (err) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized");
    }
    const { userId, role, iat } = decoded;
    // check if the user is exist
    const isExistUser = await User.isUserExistByCustomId(userId);
    if (!isExistUser) {
      throw new AppError(httpStatus.NOT_FOUND, `User not Exist with ID: ${userId}`);
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
    // check the token and desabled after change password
    if (isExistUser.passwordChangedAt && User.isJWTissuedBeforPasswordChanged(isExistUser.passwordChangedAt, iat as number)) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Your are not authorized");
    }
    if (requiredRoles && !requiredRoles.includes(verifiedRole)) {
      //
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
    }
    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
