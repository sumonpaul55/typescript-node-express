import { ErrorRequestHandler } from "express";
import { ZodError, ZodIssue } from "zod";
import { TErrorSources } from "../interface/error";
import config from "../config";
import handleZodError from "../errors/handleZodError";
// global error handler
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // setting default values
  let statusCode = 500;
  let message = "Something went wrong";

  let errorSources: TErrorSources = [
    {
      path: "",
      message: "Something went worng",
    },
  ];

  if (err instanceof ZodError) {
    //instanceof will check the err where is it come form
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.name === "ValidationError") {
    console.log(err?.errors);
  }

  return res.status(statusCode).json({
    success: false,
    message,
    err,
    errorSources,
    stack: config.NODE_ENV === "development" && err?.stack,
  });
};

export default globalErrorHandler;

/*
success
message
errorrSources: [
  path: "",
  message: ""
]
stack
*/
