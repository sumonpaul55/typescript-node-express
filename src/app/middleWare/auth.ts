import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import config from "../config";

interface CustomRequest extends Request {
  user: JwtPayload;
}
const auth = () => {
  return catchAsync(async (req: CustomRequest, res, next) => {
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
      req.user = decoded as JwtPayload;
    });
    next();
  });
};

export default auth;
