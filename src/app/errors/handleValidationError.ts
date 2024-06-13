import mongoose from "mongoose";
import { TErrorSources, TGenericErrorResponse } from "../interface/error";

const handleValidationErro = (err: mongoose.Error.ValidationError): TGenericErrorResponse => {
  const errorSources: TErrorSources = Object.values(err.errors).map((val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
    return {
      path: val?.path,
      message: val?.message,
    };
  });
  // console.log(errorSources);
  // const errorSources: TErrorSources = {};

  const statusCode = 500;
  return {
    statusCode,
    message: "Validation Error",
    errorSources,
  };
};

export default handleValidationErro;
