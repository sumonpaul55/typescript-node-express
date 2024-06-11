import { NextFunction, Request, Response } from "express";
// global error handler
const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  let statusCode = err.statusCode || 500;
  let message = "Something went wrong";

  console.log(err);

  return res.status(statusCode).json({
    success: false,
    message: err.message || message,
    error: err,
  });
};

export default globalErrorHandler;
