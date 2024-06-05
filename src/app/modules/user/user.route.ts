import express, { NextFunction, Request, Response } from "express";
import { userControllers } from "./user.controller";

const router = express.Router();

const shenaBahini = (name: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // validation
    console.log(`My name is ${name}`);
  };
};
router.post("/create-student", shenaBahini("paul"), userControllers.createStudent);

export const UserRoute = router;
