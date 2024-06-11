// extends global error handler
class AppError extends Error {
  public statusCode: number;

  constructor(statusCode: number, message: string, stack = "") {
    super(message);
    // console.log(message);

    this.statusCode = statusCode;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default AppError;
