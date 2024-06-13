import { TErrorSources, TGenericErrorResponse } from "./../interface/error";

const handleDuplicateErrr = (err: any): TGenericErrorResponse => {
  const regex = /{ name: "([^"]+)" }/;
  // Execute the regex on the error message
  const match = err.errorResponse.errmsg.match(regex);
  const errorMsg = match && match[1];
  const errorSoureces: TErrorSources = [
    {
      path: "",
      message: `${errorMsg} is already exist`,
    },
  ];
  const statusCode = 500;
  return {
    statusCode,
    message: err?.message,
    errorSources: errorSoureces,
  };
};
export default handleDuplicateErrr;
