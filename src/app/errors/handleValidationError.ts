import mongoose from "mongoose";
import { TErrorSources } from "../interface/error";

const handleValidationErro = (err: mongoose.Error.ValidationError) => {
  const errorSources: TErrorSources = {};

  const statusCode = 500;
};
