import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const validateRequest = (zodSchema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // validation
    // if everything all right next
    try {
      await zodSchema.parseAsync({
        body: req.body,
      });
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default validateRequest;
