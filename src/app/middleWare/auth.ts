import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import config from "../config";
import { TUserRole } from "../modules/user/user.constant";

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
    jwt.verify(token, config.jwt_access_secret as string, function (err, decoded) {
      if (err) {
        throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
      }
      const verifiedRole = (decoded as JwtPayload).role;
      if (requiredRoles && !requiredRoles.includes(verifiedRole)) {
        throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
      }

      req.user = decoded as JwtPayload;
    });
    next();
  });
};

export default auth;
